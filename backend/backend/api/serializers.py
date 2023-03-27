from rest_framework import serializers
from .models import Image
from .models import ResizeImage
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__' 


class ResizeImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResizeImage
        fields = '__all__' 