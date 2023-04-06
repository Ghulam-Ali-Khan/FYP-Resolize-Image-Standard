from django.db import models

# Create your models here.


class Image(models.Model):
  image_name = models.CharField(max_length=255)
  image = models.TextField()
  width = models.IntegerField(default=0)
  height = models.IntegerField(default=0)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)

class ResizeImage(models.Model):
  image_name = models.CharField(max_length=255)
  image = models.TextField()
  width = models.IntegerField(default=0)
  height = models.IntegerField(default=0)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)


class FlipImage(models.Model):
  image_name = models.CharField(max_length=255)
  image = models.TextField()
  flipRight = models.IntegerField(default=0)
  flipLeft = models.IntegerField(default=0)
  flipTop = models.IntegerField(default=0)
  flipDown = models.IntegerField(default=0)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)

class FilterImage(models.Model):
  image_name = models.CharField(max_length=255)
  image = models.TextField()
  filter_type = models.TextField()
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)

class ResolizeImage(models.Model):
  image_name = models.CharField(max_length=255)
  image = models.TextField()
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)