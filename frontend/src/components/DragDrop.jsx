import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";
import ImageCropDialog from "./ImageCropDialog";


const initCropData = [
  {
    id: 1,
    imageUrl: null,
    croppedImageUrl: null,
  },
  
];

const fileTypes = ["JPG", "PNG"];

const DragDrop = ({ open }) => {
  const [plate, setPlate] = useState(null);
  const [particlesImg, setParticlesImg] = useState(null);
  const [dropzoneId, setDropzoneId] = useState(null);
  const resizeState = useSelector((state) => state.plateState);
  const submitResize = useSelector((state) => state.submitResize);
  const resizeAspects = useSelector((state) => state.resizeAspects);
  const flipState = useSelector((state) => state.flipState); 
  const submitFlip = useSelector((state) => state.submitFlip); 
  const flipRotation = useSelector((state) => state.flipRotation); 
  const submitFilter = useSelector((state) => state.submitFilter); 
  const filter = useSelector((state) => state.filter);
  const filterState = useSelector((state) => state.filterState);
  const submitResolize = useSelector((state) => state.submitResolize); 
  const resolizeState = useSelector((state) => state.resolizeState);


  const dispatch = useDispatch();

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const [img, setImg] = useState(null);
  const [imgBits, setImgBits] = useState('');


// Crop Section Start
const [cropImg, setCropImg] = useState(initCropData);
const [selectedCropImg, setSelectedCropImg] = useState(null);
const [flag, setFlag]  = useState(true);
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
// Crop Section End

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    setPlate(document.getElementById("editorPlate"));
    setParticlesImg(document.getElementById("particlesImg"));
    setDropzoneId(document.getElementById("dropzoneId"));
  }, []);


  useEffect(() => {
    if (acceptedFiles.length > 0) {

      if (particlesImg) particlesImg.style.display = "none";
      if (dropzoneId) dropzoneId.style.display = "none";
      if (plate) plate.style.transform = "translateX(-400px)";
      dispatch(actions.togglePlateState());
    }
  }, [acceptedFiles]);

  useEffect(() => {
   
   if(flag){
  
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = () => {

        setImgBits(reader.result);
        setImg(reader.result);

      };

      console.log("Files Function : ");

      setFlag(false);
    }}
    
  }, [files]);


  useEffect(() => {

    console.log("GA Test1");

    if (plate) {
      console.log("GA Test2")
      if (resizeState) {
        console.log("GA Test3")

        console.log("resizeState Transt");
        plate.style.transform = "translateX(-400px)";
      } else if (!resizeState) {
        console.log("GA Test4")
        console.log("resizeState Not Transt");
        plate.style.transform = "translateX(400px)";
      }
    }
  }, [resizeState, plate]);


  useEffect(()=>{
    if (submitResize) {

      // e.preventDefault();

      const formData = new FormData();
      formData.append('image', imgBits);
      formData.append('width', resizeAspects.width);
      formData.append('height', resizeAspects.height);
      formData.append('image_name', "Resize Image");
      fetch('http://127.0.0.1:8000/api/resize/', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
  
  
  
      console.log("Form Data : " + formData.get('image'));


    }
       
    
}, [submitResize]);
useEffect(()=>{
  if (submitResize) {

    

    setTimeout(()=>{

      fetch('http://127.0.0.1:8000/api/show-resize-data/',{
      method: 'GET',
    }
      ).then(response => response.json())
  .then(data => setImg(data.image))
  .catch(error => console.error(error));


  console.log("Resized Img Ghulam Ali bhai");

    },2000);

  }
     
  
}, [submitResize]);

useEffect(()=>{
  if (submitFlip) {

    // e.preventDefault();
    console.log("Ghulam Function Clicked...............");
    const formData = new FormData();
    formData.append('image', imgBits);
    formData.append('flipRight', flipRotation.right);
    formData.append('flipLeft', flipRotation.left);
    formData.append('flipTop', flipRotation.top);
    formData.append('flipDown', flipRotation.bottom);

    formData.append('image_name', "Flip Image");
    fetch('http://127.0.0.1:8000/api/flip/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));



    console.log("Form Data : " + formData.get('image'));

  }
     
  
}, [submitFlip]);
 


useEffect(()=>{
  if (submitFlip) {

    

    setTimeout(()=>{

      fetch('http://127.0.0.1:8000/api/show-fliped-data/',{
      method: 'GET',
    }
      ).then(response => response.json())
  .then(data => setImg(data.image))
  .catch(error => console.error(error));


  console.log("Resized Img Ghulam Ali bhai");

    },2000);

  }
     
  
}, [submitFlip]);

useEffect(()=>{
  if (submitFilter) {

    // e.preventDefault();
    console.log("Ghulam Function filter form Clicked...............");
    const formData = new FormData();
    formData.append('image', imgBits);
    formData.append('filter_type', filter);
    

    formData.append('image_name', "Filter Image");
    fetch('http://127.0.0.1:8000/api/filter/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));



    console.log("Form Data : " + formData.get('image'));

  }
     
  
}, [submitFilter]);






useEffect(()=>{
  if (submitFilter) {

    

    setTimeout(()=>{

      fetch('http://127.0.0.1:8000/api/show-filter-data/',{
      method: 'GET',
    }
      ).then(response => response.json())
  .then(data => setImg(data.image))
  .catch(error => console.error(error));


  console.log("Resized Img Ghulam Ali bhai");

    },2000);

  }
     
  
}, [submitFilter]);



useEffect(()=>{
  if (submitResolize) {

    // e.preventDefault();
    console.log("Ghulam Function resolize form Clicked...............");
    const formData = new FormData();
    formData.append('image', imgBits);

    formData.append('image_name', "Filter Image");
    fetch('http://127.0.0.1:8000/api/resolize/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));



    console.log("Form Data : " + formData.get('image'));

  }
     
  
}, [submitResolize]);

useEffect(()=>{
  if (submitResolize) {

    

    setTimeout(()=>{

      fetch('http://127.0.0.1:8000/api/show-resolize-data/',{
      method: 'GET',
    }
      ).then(response => response.json())
  .then(data => setImg(data.image))
  .catch(error => console.error(error));


  console.log("Resized Img Ghulam Ali bhai");

    },2000);

  }
     
  
}, [submitResolize]);




  return (
    <>


      <div
        {...getRootProps({ className: "dropzone" })}
        className="dropzone-custom drop-shadow-lg"
        style={{}}
        id="dropzoneId"
      >
        <input className="input-zone" {...getInputProps()} id="dndImg" />

        <div className="text-center">
          <span className="material-symbols-outlined">upload</span>
          <p className="dropzone-content">Upload or Drag your files here</p>

          <aside>
            <ul>{files}</ul>
          </aside>
        </div>
      </div>


      {!flag && (<a href={img} className="download-btn" download>    <span className="material-symbols-outlined">cloud_download</span> Download</a>) }  


      <img src={img} alt="" className="preview-img" />


      
        
        


    </>
  );
};

export default DragDrop;
