import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";




const fileTypes = ["JPG", "PNG"];

const DragDrop = ({ open }) => {
  const [plate, setPlate] = useState(null);
  const [particlesImg, setParticlesImg] = useState(null);
  const [dropzoneId, setDropzoneId] = useState(null);  
const resizeState = useSelector((state)=>state.plateState);
const dispatch = useDispatch();

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});
  const [img, setImg] = useState();
  const [imgInfo, setImgInfo] = useState([]);
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

   

    if (files.length > 0) {
    
      console.log("696969");
      setImg(URL.createObjectURL(acceptedFiles[0]));
      if (particlesImg) particlesImg.style.display = "none";
      if (dropzoneId) dropzoneId.style.display = "none";
      if (plate) plate.style.transform = "translateX(-400px)";
      dispatch(actions.togglePlateState());
      
    }

    
  }, [acceptedFiles]);


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
