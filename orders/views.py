from django.http import Http404
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, RetrieveAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from .models import orders, order_details, products, wishlistdetails, wishlist, review
from .serializers import orderListSerializer,orderdetailsserializer, reviewserializer,wishlistserializer,wishlistdetailsserializer
from user.models import User
from rest_framework.authtoken.models import Token
from products.models import features,productfeatures
import ast
from datetime import datetime

class addtocart(APIView):
    def post(self, request):
        id = request.data.get('id', None)
        token = request.data.get('token', None)
        feats=request.data.get('feats',[])
        print(id,token,feats)
        if id is None:
            return Response({"message": "invalid request"}, status=HTTP_400_BAD_REQUEST)
       
        it = get_object_or_404(products, id=id)
        order_ds= order_details.objects.filter(product=it, 
                                            user=Token.objects.get(key=token).user,
                                            ordered=False
                                                )

        features_count=features.objects.filter(product=it).count()
        if features_count>len(feats):
            return Response({"message": "please Specify the Features"}, status=HTTP_400_BAD_REQUEST)
        for i in feats:
            if not i.isnumeric():
                return Response({"message": "please Specify the Features"}, status=HTTP_400_BAD_REQUEST)
             
        for i in feats:
            order_ds=order_ds.filter(
                features__exact=i  
            )
        if order_ds.exists():
            order_item=order_ds.first()
            if order_item.quantity < 10:
                order_item.quantity+=1
                order_item.save()   
            return Response({"message": "this product is already in the cart"}, status=HTTP_200_OK)
            

            
        else:

            order_item= order_details.objects.create(product=it, 
                                            user=Token.objects.get(key=token).user,
                                            ordered=False
                                                )

            order_item.features.add(*feats)
            order_item.save()
    
        order_qs = orders.objects.filter(user=Token.objects.get(key=token).user, ordered=False)
        if order_qs.exists():
            ord = order_qs[0]
            if not ord.items.filter(product__id=order_item.id).exists():
                    ord.items.add(order_item)
            return Response({"message": "added successfully"}, status=HTTP_200_OK)
                


        else:
            ord = orders.objects.create(user=Token.objects.get(key=token).user)
            ord.invoice_number=f'{datetime.today().year}{ord.id}{ord.user.id}'
            ord.items.add(order_item)
            ord.save()
            return Response({"message": "added successfully"}, status=HTTP_200_OK)

class deletefromcart(DestroyAPIView):
    permession_classes = [IsAuthenticated]
    queryset = order_details.objects.all()

class getcartcount(APIView):
    def get(self,request):
        token=request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        count=order_details.objects.filter(user=user,ordered=False).count()
        return Response(count)

        
class orderdetailsquantity(APIView):

    def post(self, request):
        token=request.data.get('token',None)
        use=Token.objects.get(key=token).user
        orderdetail_id = request.data.get('id', None)
        qty = request.data.get('quantity')
        if orderdetail_id is None:
            return Response({"message": "invalid request"}, status=Http404)
        cartorder = orders.objects.get(ordered=False, user=use)
        orderdetail = order_details.objects.get(user=use, ordered=False, id=orderdetail_id)
        if(int(qty) > 0):
            orderdetail.quantity = qty
            orderdetail.save()
            cartorder.save()
       

        return Response({"message": "updated successfully"}, status=HTTP_200_OK)


class orderslist(ListAPIView):
   serializer_class = orderListSerializer
   def get_queryset(self):
        token=self.request.META.get('HTTP_TOKEN',None)
        use=Token.objects.get(key=token).user
        queryset = orders.objects.filter(ordered=True, user=use).order_by('-id')
        return queryset


class orderdetails(RetrieveAPIView):
    serializer_class = orderListSerializer
    def get_object(self):
        token=self.request.META.get('HTTP_TOKEN',None)
        use=Token.objects.get(key=token).user
        queryset,created = orders.objects.get_or_create(ordered=False, user=use)
        queryset.invoice_number=f'{datetime.today().year}{queryset.id}{queryset.user.id}'
        queryset.save()
        return queryset




class delivered(APIView):
    def post(self,request):
        order_id=request.data.get('id',None)
        if order_id is not None:
            order_qs=orders.objects.get(id=order_id)
            print(order_qs.delivered)
            if(order_qs.delivered==False):
                order_qs.delivered = True
                order_qs.save()
            return Response({'message':'order updated successfully'})    


class singleorderdetails(RetrieveAPIView):
    serializer_class = orderListSerializer
    queryset = orders.objects.filter(ordered=True)



class Addtowhitelist(APIView):
    def post(self,request):
        item_id=request.data.get('id',None)
        token=request.data.get('token',None)
        if item_id is None:
            return Response({"message":"invalid request"},status=Http404)
        it = get_object_or_404(products, id=item_id)
        user=Token.objects.get(key=token).user
        wish, created = wishlistdetails.objects.get_or_create( product=it)
        wishs = wishlist.objects.filter(user=user)
        if wishs.exists():
            W = wishs[0]
            if W.items.filter(product_id=it.id).exists():
                x=W.items.get(product_id=it.id)
                x.delete()
                return Response({"message": "item already in the wishlist"})
            else:
                W.items.add(wish)
                return Response(status=HTTP_200_OK)
        else:
            W = wishlist.objects.create(user=user)
            W.items.add(wish)
            return Response({"message": "added successfully "},status=HTTP_200_OK)
            
class whitelistList(RetrieveAPIView):
    serializer_class=wishlistserializer
    def get_object(self):
       token=self.request.META.get('HTTP_TOKEN',None)
       user=Token.objects.get(key=token).user
       object= wishlist.objects.get(user=user)
       return object

class deleteFromWhitelist(DestroyAPIView):
    serializer_class=wishlistdetailsserializer
    queryset=wishlistdetails.objects.all()


class review(CreateAPIView):
    queryset = review.objects.all()
    serializer_class = reviewserializer


class topuserproducts(APIView):
    def get(self,request):
        token=request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        user_orders=orders.objects.filter(user=user,ordered=True)
        products=[]
        counted=[]
        unique=[]
        dic={}
        for i in user_orders:
            for x in i.items.all():
                products.append(x.product.name[:40]+'...')
        for i in products:
            if i in unique:
                pass
            else:
                unique.append(i)
        for i in unique:
            counted.append(products.count(i))
            

        data={
             'labels':unique[:5],
             'datasets':[
                {
                    'label':'top products',
                    'data':counted[:5],
                    'backgroundColor':[
                        'rgb(230, 126, 34)',
                        'rgb(231, 76, 60)',
                        'rgb(41, 128, 185)',
                        'rgb(46, 204, 113)',
                        'rgb(241, 196, 15)'
                    ]
                }
            ]
        }
                
        return Response(data)



class submitorder(APIView):
    def post(self,request):
        token=request.data.get('token',None)
        order_id=request.data.get('order_id',None)
        points_req=request.data.get('points',None)
        use=Token.objects.get(key=token).user
        ord=orders.objects.get(user=use,ordered=False)  
        print(token,points_req,ord.total())
        print(ord.id,datetime.today().year)
        if( points_req is None or int(points_req) <= 0 ):
            if( ord.total() >=1  and  ord.total() <=200  ):
                  pts = (ord.total()*5)/100
                  point=int(pts)
                  use.points+=point
                  ord.ordered=True
                  for i in ord.items.all():
                      i.ordered=True
                      i.save()
                  use.save()
                  ord.save()
                  return Response(status=HTTP_200_OK)

            elif(ord.total() > 200 and ord.total() <=1000):
                  pts = (ord.total()*15)/100
                  point=int(pts)
                  use.points+=pts
                  ord.ordered=True
                  for i in ord.items.all():
                      i.ordered=True
                      i.save()
                  use.save()
                  ord.save()
                  return Response(status=HTTP_200_OK)

            elif(ord.total() >1000 and ord.total() <=5000):
            
                  pts = (ord.total()*20)/100
                  point=int(pts)
                  use.points+=pts
                  ord.ordered=True
                  for i in ord.items.all():
                      i.ordered=True
                      i.save()
                  use.save()
                  ord.save()
                  return Response(status=HTTP_200_OK)

            elif(ord.total() > 5000 ):
                  
                  pts = (ord.total()*25)/100
                  point=int(pts)
                  use.points+=pts
                  ord.ordered=True          
                  for i in ord.items.all():
                      i.ordered=True
                      i.save()
                  use.save()
                  ord.save() 
                  return Response(status=HTTP_200_OK)

                  
        else: 
            use.points-=int(points_req)
            ord.final_order_price=ord.total()-float(int(points_req)/4)
            ord.ordered=True
            use.save()
            ord.save()
            for i in ord.items.all():   
                      i.ordered=True
                      i.save()
            return Response(status=HTTP_200_OK)


