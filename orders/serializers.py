from rest_framework import  serializers
from.models import orders,order_details,wishlist,wishlistdetails,review
from products.serializers import productsserializer
from products.serializers import ProductFeaturesSerializer,FeatureValuesSerializer



class string(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return data


class orderdetailsserializer(serializers.ModelSerializer):
    product=string()
    product_obj=serializers.SerializerMethodField()
    price=serializers.SerializerMethodField()
    features=serializers.SerializerMethodField()
    class Meta:
        model=order_details
        fields=['product','quantity','id','product_obj','price','features']
    def get_product_obj(self,obj):
        return productsserializer(obj.product).data
    def get_price(self,obj):
        return obj.final_price()
    def get_features(self,obj):
        return FeatureValuesSerializer(obj.features.all(),many=True).data

class orderListSerializer(serializers.ModelSerializer):
    user=string()
    items=serializers.SerializerMethodField()
    total=serializers.SerializerMethodField()
    created_at=serializers.SerializerMethodField()
    class Meta:
        model=orders
        fields=['user','ordered','id','items','delivered','final_order_price','total','created_at','invoice_number']

    def get_items(self,obj):
        return orderdetailsserializer(obj.items.all(),many=True).data
    def get_total(self,obj):
        return obj.total()
    def get_created_at(self,obj):
        if(obj.created_at.hour>=00 and obj.created_at.hour<12):
            x='am'
        else:
            x='pm'
        return f'{obj.created_at.date()} at {str(obj.created_at.time())[:8]} {x}'


class wishlistdetailsserializer(serializers.ModelSerializer):
    product=serializers.SerializerMethodField()

    class Meta:
        model = wishlistdetails
        fields = ['product', 'id']

    def get_product(self, obj):
        return productsserializer(obj.product).data



class wishlistserializer(serializers.ModelSerializer):
    user=string()
    items=serializers.SerializerMethodField()
    class Meta:
        model=wishlist
        fields=['user','id','items']

    def get_items(self,obj):
        return wishlistdetailsserializer(obj.items.all(),many=True).data


class reviewserializer(serializers.ModelSerializer):
    user=string()
    class Meta:
        model=review
        fields=['id','body','user']