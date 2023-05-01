from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ImageSerializer
from .serializers import ResizeImageSerializer
from .serializers import FlipImageSerializer
from .serializers import FilterImageSerializer
from .serializers import ResolizeImageSerializer

from .models import Image
from .models import ResizeImage
from .models import FlipImage
from .models import FilterImage
from .models import ResolizeImage


import base64
from io import BytesIO
from PIL import Image as PillowImage


import cv2
import numpy
import numpy as np
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import os
import tensorflow as tf






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



def filterImg(imgPath, filter):

    imgRead = cv2.imread(imgPath, 1) 
    imgRead = cv2.cvtColor(imgRead, cv2.COLOR_BGR2RGB) # convert to RGB


    if(filter=="Gaussian"):
        # Define the filter kernel
        kernel = cv2.getGaussianKernel(5, 0)
        # Apply the filter
        filtered_img = cv2.filter2D(imgRead, -1, kernel)
    elif(filter=="Median"):
        filtered_img = cv2.medianBlur(imgRead, 5)
    elif(filter=="Bilateral"):
        filtered_img = cv2.bilateralFilter(imgRead, 9, 75, 75)
    elif(filter=="Laplacian"):
        filtered_img = cv2.Laplacian(imgRead, cv2.CV_64F)
    elif(filter=="Sobel"):
        gray_img = cv2.cvtColor(imgRead, cv2.COLOR_BGR2GRAY)
        grad_x = cv2.Sobel(gray_img, cv2.CV_64F, 1, 0, ksize=3)
        grad_y = cv2.Sobel(gray_img, cv2.CV_64F, 0, 1, ksize=3)
        filtered_img = cv2.addWeighted(grad_x, 0.5, grad_y, 0.5, 0)

    # Convert image data type to unsigned 8-bit integers
    filtered_img = cv2.convertScaleAbs(filtered_img)

    # Convert image to Pillow format
    pillow_img = PillowImage.fromarray(filtered_img)

    # Save image as PNG
    buffer = BytesIO()
    pillow_img.save(buffer, format='PNG')
    file_path = f"filtered_img.png"
    default_storage.save(file_path, ContentFile(buffer.getvalue()))
        
    with open("filtered_img.png", 'rb') as f:
        image_data = f.read()
        
    base64_string = image_to_base64("filtered_img.png", image_data)
    os.remove('filtered_img.png')

    return base64_string



def resolizeImg(imgPath):
    imgRead = cv2.imread(imgPath, 1) 
    imgRead = cv2.cvtColor(imgRead, cv2.COLOR_BGR2RGB) # convert to RGB

     # Define the scaling factor
    upscaled_img = cv2.resize(imgRead, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

    # Convert image data type to unsigned 8-bit integers
    resolized_img = cv2.convertScaleAbs(upscaled_img)

    # Convert image to Pillow format
    pillow_img = PillowImage.fromarray(resolized_img)

    # Save image as PNG
    buffer = BytesIO()
    pillow_img.save(buffer, format='PNG')
    file_path = f"filtered_img.png"
    default_storage.save(file_path, ContentFile(buffer.getvalue()))
        
    with open("filtered_img.png", 'rb') as f:
        image_data = f.read()
        
    base64_string = image_to_base64("filtered_img.png", image_data)
    os.remove('filtered_img.png')

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



def showFiltered(req):
    latest_object = FilterImage.objects.latest('created')
    imagy = save_base64_image('my_image', latest_object.image)
    filter = latest_object.filter_type
    
    
    base64_string = filterImg('my_image.png', filter)
    context = {'data': base64_string}
    
    
    os.remove('my_image.png')
    return render(req, 'file.html', context)


def showResolized(req):
    latest_object = ResolizeImage.objects.latest('created')
    imagy = save_base64_image('my_image', latest_object.image)
    
    base64_string = resolizeImg('my_image.png')
    context = {'data': base64_string}
    
    
    os.remove('my_image.png')
    return render(req, 'file.html', context)


@api_view(['POST'])
def get_resize_data(req):
    if req.method == 'POST':



        
        imagy = save_base64_image('my_image', req.data['image'])
        width = req.data['width']
        height = req.data['height']
        
        base64_string = resizeImg('my_image.png', int(width), int(height))
        # context = {'data': base64_string}
        data_copy = req.data.copy()
        data_copy['image'] =  base64_string
        
        
        os.remove('my_image.png')

        print(req.data["width"])
        
        serializer = ResizeImageSerializer(data=data_copy)
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


@api_view(['POST'])
def get_filter_data(req):
    if req.method == 'POST':
        serializer = FilterImageSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
    else:
        return Response("Invalid request method. Only POST requests are allowed.", status=405)

@api_view(['POST'])
def get_resolized_data(req):
    if req.method == 'POST':
        serializer = ResolizeImageSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
    else:
        return Response("Invalid request method. Only POST requests are allowed.", status=405)


