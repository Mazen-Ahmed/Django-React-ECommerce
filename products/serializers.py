from rest_framework import serializers
from .models import products,category,features,productfeatures,brand_name
class string(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return data

class FeatureValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model=productfeatures
        fields=['id','values']
   

class ProductFeaturesSerializer(serializers.ModelSerializer):
    values=serializers.SerializerMethodField()
    product=string()
    class Meta:
        model=features
        fields=['id','featurename','values','product']
    def get_values(self,obj):
        return FeatureValuesSerializer(obj.productfeatures_set.all(),many=True).data


class categoryserializer(serializers.ModelSerializer):
    class Meta:
        model=category
        fields=['name','id']



class brandserializer(serializers.ModelSerializer):
    class Meta:
        model=brand_name
        fields=['name','id']

class productsserializer(serializers.ModelSerializer):
    category=string()
    brand=string()
    feature=serializers.SerializerMethodField()
    featurecount=serializers.SerializerMethodField()
    class Meta:
        model=products
        fields=['name','description','discount_price','image','id','category','brand','price','feature','featurecount']
    def get_feature(self,obj):
        return ProductFeaturesSerializer(obj.features_set.all(),many=True).data
    def get_featurecount(self,obj):
        return obj.features_set.count()
   
