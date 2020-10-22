from django.shortcuts import render
from rest_framework.generics import CreateAPIView,ListAPIView,RetrieveDestroyAPIView,RetrieveAPIView
from rest_framework.viewsets import ModelViewSet
from .models import products,category,productfeatures,features,brand_name
from .serializers import (productsserializer,
                          brandserializer,
                          categoryserializer)
from rest_framework import filters,pagination
from rest_framework.views import APIView
import requests
import urllib.request 
import bs4 
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import ast
from django.db.models import Q
from itertools import chain



class productpagination(pagination.PageNumberPagination):
    page_size=9
    pag_size_query_param='size'
    max_page_size=20
    def get_paginated_response(self,data):
        queryset={
            'next':self.get_next_link(),
            'prev':self.get_previous_link(),
            'count':self.page.paginator.count,
            'results':data
        }
        return Response(queryset)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2

class productshomelist(ListAPIView):
   serializer_class = productsserializer
   def get_queryset(self):
        queryset = products.objects.all().order_by('-id')[:6]
        return queryset

class categoryviewset(ModelViewSet):
    serializer_class = categoryserializer
    queryset = category.objects.all()


class getbrands(ListAPIView):
    serializer_class = brandserializer
    queryset = brand_name.objects.all()




class productfilter(ListAPIView):
    serializer_class=productsserializer
    def get_queryset(self):
        ids=self.request.query_params.get('id', None)
        print(ids)
        cat=category.objects.get(id=ids)
        prod=products.objects.filter(category=cat)
        return prod

class singleproduct(RetrieveAPIView):
    serializer_class = productsserializer
    queryset = products.objects.all()
          

class shopfilter(ListAPIView):
    serializer_class=productsserializer
    pagination_class=productpagination
    def get_queryset(self):
        brands=[]
        cat=self.request.META.get('HTTP_CATEGORY',None)
        max=self.request.META.get('HTTP_MAX',None)
        min=self.request.META.get('HTTP_MIN',None)
        brand=self.request.META.get('HTTP_BRAND',None)
        feats=self.request.META.get('HTTP_FEATS',None)
        name = self.request.query_params.get('name', None)
        print(min,max)
       
        queryset=products.objects.all().order_by('id')
        if name:
            queryset=queryset.filter(Q(name__icontains=name))
        if cat.isnumeric():                
            queryset=queryset.filter(category=cat)

        if max.isnumeric() :
            queryset=queryset.filter(price__lte=max)
        if min.isnumeric():
            queryset=queryset.filter(price__gte=min)

        if brand.isnumeric():
            br=brand_name.objects.get(id=brand)
            queryset=queryset.filter(brand=br)

        if(feats):
            for i  in feats:
               if(productfeatures.objects.filter(values=i).count()>0): 
                    PF=productfeatures.objects.filter(values=i)
                    for x in PF:
                        F=features.objects.get(id=x.feat.id)
                        print(F.product.id)
                        l.append(F.product)
                    for x in queryset:
                        if x not in l:
                            queryset=queryset.exclude(id = x.id)
               else:
                   pass
        return queryset
   


def scrape():
    path=''
    counter=5

    session= requests.Session()
    session.headers={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"
    }
    url='https://egypt.souq.com/eg-en/samsung/mobile-phones-33%7Csmart-watches-511%7Ctablets-94%7Cfitness-technology-498%7Cpower-banks-562/samsung/a-t-7/s/?_=1500309575629&sortby=sr&page=1&ref=nav'
    content=session.get(url,verify=False).content
    soup=bs4.BeautifulSoup(content,'html.parser')
    result=soup.find_all('div',{'class':'column column-block block-list-large single-item'})
    for i in result:
        counter+=16
        name=i.find_all('h1',{'class':'itemTitle'})[0]
        price=i.find('h3',{'class':'itemPrice'}).text
        price2=price[0:len(price)-3]
        print(price2)
        str=price2.replace(' ','')
        str2=str.replace(',','')
        finalprice=float(str2)
        image=i.find('img',{'class':'img-size-medium imageUrl'})['data-src']
        path=f'pics/{counter}.jpg'
        img=f'{counter}.jpg'
        description='this is my product'
        urllib.request.urlretrieve(image,path)
        cat=category.objects.get(id=1)
        bran=brand_name.objects.get(id=1)
        products.objects.create(name=name.text,image=img,
        description=description,price=finalprice,category=cat,brand=bran)

#scrape()