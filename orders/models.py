from django.db import models
from products.models import products
from backend import settings
from django.utils.timezone import now
from products.models import productfeatures,features
from datetime import datetime



class order_details(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,blank=True,null=True)
    ordered=models.BooleanField(default=False)
    product=models.ForeignKey(products,on_delete=models.CASCADE)
    quantity=models.IntegerField(default=1)
    features=models.ManyToManyField(productfeatures,blank=True)
    def final_price(self):
        return self.product.price*self.quantity
    class Meta:
        ordering = ('-quantity',)

class orders(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,default=1)
    ordered=models.BooleanField(default=False)
    delivered=models.BooleanField(default=False)
    items=models.ManyToManyField(order_details)
    created_at=models.DateTimeField(default=None)
    final_order_price=models.FloatField(default=0.0)
    invoice_number=models.CharField(max_length=50,default=None,blank=True ,null=True)
    def total(self):
        tot=0
        for item in self.items.all():
            tot+=item.final_price()    
        return round(tot,2)

    def save(self,*args,**kwrgs):
        self.created_at=now()
        super(orders,self).save(*args,**kwrgs)

class wishlistdetails(models.Model):
    product = models.ForeignKey(products, on_delete=models.CASCADE)

class wishlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,default=1)
    items = models.ManyToManyField(wishlistdetails)

class review(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,default=1)
    body=models.CharField(max_length=250)