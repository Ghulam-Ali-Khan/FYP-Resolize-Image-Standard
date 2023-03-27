from rest_framework import serializers
from .models import Image
from .models import ResizeImage
from .models import FlipImage
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