import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";




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
  
  const dispatch = useDispatch();

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const [img, setImg] = useState();
  const [imgBits, setImgBits] = useState('');




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
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = () => {

        setImgBits(reader.result);
        setImg(reader.result);

      };

      console.log("Ghulam Ali 1 : " + imgBits);


    }
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

      <img src={img} alt="" className="preview-img" />


      

    </>
  );
};

export default DragDrop;
