from rest_framework import serializers
from .models import Image
from .models import ResizeImage
from .models import FlipImage
from .models import FilterImage
from .models import ResolizeImage

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__' 


class ResizeImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResizeImage
        fields = '__all__' 


class FlipImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlipImage
        fields = '__all__' 

class FilterImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilterImage
        fields = '__all__' 


class ResolizeImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResolizeImage
        fields = '__all__'