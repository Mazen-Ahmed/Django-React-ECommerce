from django.db import models

# Create your models here.

class category(models.Model):
    name=models.CharField(unique=True,max_length=30)
    def __str__(self):
        return self.name

class brand_name(models.Model):
   name=models.CharField(unique=True,max_length=20)
   def __str__(self):
       return self.name



class products(models.Model):
    name=models.CharField(max_length=100)
    category=models.ForeignKey(category,on_delete=models.CASCADE)
    description=models.TextField(default='alt-593ecb243e2ba-3814-e492ca847df75f5ea213877f3410d8fa@1x.jpg')
    price=models.FloatField(default=100.0)
    discount_price=models.FloatField(default=0.00)
    image=models.ImageField(default='')
    brand=models.ForeignKey(brand_name,on_delete=models.CASCADE)
    def __str__(self):
        return self.name
   
 
class features(models.Model):
    product=models.ForeignKey(products,on_delete=models.CASCADE)
    featurename=models.CharField(max_length=100)
    class Meta:
        unique_together=(
            ('product','featurename')
        )
    def __str__(self):
        return self.featurename

class productfeatures(models.Model):
    feat=models.ForeignKey(features,on_delete=models.CASCADE)
    values=models.CharField(max_length=100)
    class Meta:
        unique_together=(
            ('feat','values')
        )
    def __str__(self):
        return self.values

