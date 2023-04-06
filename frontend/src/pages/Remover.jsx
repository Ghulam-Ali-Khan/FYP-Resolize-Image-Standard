import React from 'react';
import { useState } from "react";
import ImageCropDialog from "./ImageCropDialog";
// import './test.css';
import nice from './resize-message.png';




const initData = [
  {
    id: 1,
    imageUrl: nice,
    croppedImageUrl: null,
  },
  
];





const Remover = () => {


  const [cropImg, setCropImg] = useState(initData);
  const [selectedCropImg, setSelectedCropImg] = useState(null);

  const onCancelCrop = () => {
    setSelectedCropImg(null);
  };

  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    const newCropImgList = [...cropImg];
    const cropImgIndex = cropImg.findIndex((x) => x.id === id);
    const cropyImage = cropImg[cropImgIndex];
    const newCropImg = { ...cropyImage, croppedImageUrl, crop, zoom, aspect };
    newCropImgList[cropImgIndex] = newCropImg;
    setCropImg(newCropImgList);
    setSelectedCropImg(null);
  };

  const resetCropImage = (id) => {
    setCroppedImageFor(id);
  };


  return (
    <>
    <div>
      Remover
    </div>
    {selectedCropImg ? (
        <ImageCropDialog
          id={selectedCropImg.id}
          imageUrl={selectedCropImg.imageUrl}
          cropInit={selectedCropImg.crop}
          zoomInit={selectedCropImg.zoom}
          aspectInit={selectedCropImg.aspect}
          onCancel={onCancelCrop}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetCropImage}
        />
      ) : null}
      {cropImg.map((item) => (
        <div className="imageCard" key={item.id}>
          <img
            src={item.croppedImageUrl ? item.croppedImageUrl : item.imageUrl}
            alt=""
            onClick={() => {
              console.log(item);


              setSelectedCropImg(item);

              
            }}
          />
        </div>
      ))}
    </>
  )
}

export default Remover
