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

from django.http import JsonResponse




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

    print("Filter Value :"+ filter)

    if(filter=="Gaussian"):
        print("Gaussian")
        kernel_size = 21 # increase the kernel size for more blurring effect
        kernel = cv2.getGaussianKernel(kernel_size, 0)
        filtered_img = cv2.filter2D(imgRead, -1, kernel)

    elif(filter=="Median"):
        print("Median")
        filtered_img = cv2.medianBlur(imgRead, 15) # increase the kernel size for more blurring effect

    elif(filter=="Bilateral"):
        print("Bilateral")
        filtered_img = cv2.bilateralFilter(imgRead, 9, 75, 75)

    elif(filter=="Laplacian"):
        print("Laplacian")
        gray_img = cv2.cvtColor(imgRead, cv2.COLOR_BGR2GRAY)
        filtered_img = cv2.Laplacian(gray_img, cv2.CV_8U) # increase the depth of the output image

    elif(filter=="Sobel"):
        print("Sobel")
        gray_img = cv2.cvtColor(imgRead, cv2.COLOR_BGR2GRAY)
        grad_x = cv2.Sobel(gray_img, cv2.CV_16S, 1, 0, ksize=3)
        grad_y = cv2.Sobel(gray_img, cv2.CV_16S, 0, 1, ksize=3)
        abs_grad_x = cv2.convertScaleAbs(grad_x)
        abs_grad_y = cv2.convertScaleAbs(grad_y)
        filtered_img = cv2.addWeighted(abs_grad_x, 0.5, abs_grad_y, 0.5, 0)

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
    file_path = f"resolize_img.png"
    default_storage.save(file_path, ContentFile(buffer.getvalue()))
        
    with open("resolize_img.png", 'rb') as f:
        image_data = f.read()
        
    base64_string = image_to_base64("resolize_img.png", image_data)
    os.remove('resolize_img.png')

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

        imagy = save_base64_image('my_image', req.data['image'])
        flipRight = req.data['flipRight']
        flipLeft = req.data['flipLeft']
        flipTop = req.data['flipTop']
        flipDown = req.data['flipDown']
        base64_string = flipImg('my_image.png', int(flipDown), int(flipTop), int(flipRight), int(flipLeft))
        # context = {'data': base64_string}
        data_copy = req.data.copy()
        data_copy['image'] =  base64_string
        
        
        os.remove('my_image.png')


        serializer = FlipImageSerializer(data=data_copy)
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

        imagy = save_base64_image('my_image', req.data['image'])
        filter_type = req.data['filter_type']
        
        base64_string = filterImg('my_image.png', filter_type)
        # context = {'data': base64_string}
        data_copy = req.data.copy()
        data_copy['image'] =  base64_string
        
        
        os.remove('my_image.png')


        serializer = FilterImageSerializer(data=data_copy)
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

        imagy = save_base64_image('my_image', req.data['image'])
    
        base64_string = resolizeImg('my_image.png')

        data_copy = req.data.copy()
        data_copy['image'] =  base64_string
        os.remove('my_image.png')
        serializer = ResolizeImageSerializer(data=data_copy)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
    else:
        return Response("Invalid request method. Only POST requests are allowed.", status=405)

# post apis

def show_resized_data(request):

    latest_object = ResizeImage.objects.latest('created')
    print(latest_object)
    data = {"id" : latest_object.id, "image_name": latest_object.image_name, "image": latest_object.image }
    return JsonResponse(data, safe=False)

def show_fliped_data(request):

    latest_object = FlipImage.objects.latest('created')
    print(latest_object)
    data = {"id" : latest_object.id, "image_name": latest_object.image_name, "image": latest_object.image }
    return JsonResponse(data, safe=False)

def show_filter_data(request):

    latest_object = FilterImage.objects.latest('created')
    print(latest_object)
    data = {"id" : latest_object.id, "image_name": latest_object.image_name, "image": latest_object.image }
    return JsonResponse(data, safe=False)

def show_resolize_data(request):

    latest_object = ResolizeImage.objects.latest('created')
    print(latest_object)
    data = {"id" : latest_object.id, "image_name": latest_object.image_name, "image": latest_object.image }
    return JsonResponse(data, safe=False)