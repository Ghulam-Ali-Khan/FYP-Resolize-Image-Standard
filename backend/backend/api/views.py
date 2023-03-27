from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ImageSerializer
from .serializers import ResizeImageSerializer
from .serializers import FlipImageSerializer

from .models import Image
from .models import ResizeImage
from .models import FlipImage

import base64
from io import BytesIO
from PIL import Image as PillowImage


import cv2
import numpy
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import os





def image_to_base64(file_name, image_data):
    """
    Convert binary image data to a Base64-encoded string.
    """
    # Get the file extension from the file name
    ext = file_name.split('.')[-1]

    # Encode the image data as Base64
    encoded_data = base64.b64encode(image_data).decode('utf-8')

    # Construct the Base64 data URI
    base64_string = f"data:image/{ext};base64,{encoded_data}"

    return base64_string


# Create your views here.
def save_base64_image(file_name, base64_string):
    """
    Save a Base64 encoded image as a file on disk.
    """
    format, imgstr = base64_string.split(';base64,')
    ext = format.split('/')[-1]

    data = ContentFile(base64.b64decode(imgstr), name=f"{file_name}.{ext}")
    path = default_storage.save(data.name, data)
    return path


def resizeImg(imgPath, width, height):

    imgRead = cv2.imread(imgPath, 1) 
    imgRead = cv2.cvtColor(imgRead, cv2.COLOR_BGR2RGB) # convert to RGB
    resized_img = cv2.resize(imgRead,(width, height))
    pillow_img = PillowImage.fromarray(resized_img)
    buffer = BytesIO()
    pillow_img.save(buffer, format='PNG')
    file_path = f"resized_img.png"
    default_storage.save(file_path, ContentFile(buffer.getvalue()))
    
    with open("resized_img.png", 'rb') as f:
        image_data = f.read()
   
    base64_string = image_to_base64("resized_img.png", image_data)
    os.remove("resized_img.png")
    return base64_string


def flipImg(imgPath, down, up, right, left):

    imgRead = cv2.imread(imgPath, 1) 
    imgRead = cv2.cvtColor(imgRead, cv2.COLOR_BGR2RGB) # convert to RGB


    if(down==1):
         fliped_img = cv2.flip(imgRead, 0)
         
    elif(up==1):
        fliped_img = cv2.flip(imgRead, 0)

    elif(left==1):
        fliped_img = cv2.flip(imgRead, 1)
    elif(right==1):
        fliped_img = cv2.flip(imgRead, -1)


   




    pillow_img = PillowImage.fromarray(fliped_img)
    buffer = BytesIO()
    pillow_img.save(buffer, format='PNG')
    file_path = f"fliped_img.png"
    default_storage.save(file_path, ContentFile(buffer.getvalue()))
    
    with open("fliped_img.png", 'rb') as f:
        image_data = f.read()
   
    base64_string = image_to_base64("fliped_img.png", image_data)
    os.remove('fliped_img.png')

    return base64_string

def showResized(req):
    latest_object = ResizeImage.objects.latest('created')
    imagy = save_base64_image('my_image', latest_object.image)
    width = latest_object.width
    height = latest_object.height
    
    base64_string = resizeImg('my_image.png', width, height)
    context = {'data': base64_string}
    
    
    os.remove('my_image.png')
    return render(req, 'file.html', context)

def showFliped(req):
    latest_object = FlipImage.objects.latest('created')
    imagy = save_base64_image('my_image', latest_object.image)
    left = latest_object.flipLeft
    right = latest_object.flipRight
    up = latest_object.flipTop
    down = latest_object.flipDown
    
    base64_string = flipImg('my_image.png', down, up, right, left)
    context = {'data': base64_string}
    
    
    os.remove('my_image.png')
    return render(req, 'file.html', context)

@api_view(['POST'])
def get_resize_data(req):
    if req.method == 'POST':
        serializer = ResizeImageSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
    else:
        return Response("Invalid request method. Only POST requests are allowed.", status=405)



@api_view(['POST'])
def get_flip_data(req):
    if req.method == 'POST':
        serializer = FlipImageSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
    else:
        return Response("Invalid request method. Only POST requests are allowed.", status=405)



