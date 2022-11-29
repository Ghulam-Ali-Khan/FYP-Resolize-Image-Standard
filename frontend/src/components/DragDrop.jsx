import React from "react";
import { useState,useEffect } from "react";
// import Typography from "@mui/material/Typography";
// import { FileUploader } from "react-drag-drop-files";
import { useDropzone } from "react-dropzone";

const fileTypes = ["JPG", "PNG"];

const DragDrop = ({ open }) => {
  // const [file, setFile] = useState(null);
  // const handleChange = (file) => {
  //   setFile(file);
  // };
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    // Update the document title using the browser API
    if(acceptedFiles!=""){
      let plate = document.getElementById("editorPlate");

         
         plate.style.transform ='translateX(-400px)';
    }
  });




  return (
    <>
      {/* <FileUploader handleChange={handleChange} name="file" types={fileTypes} hoverTitle="Ghulam Ali" style={{height:"300px", width:"200px"}} /> */}

      <div
        {...getRootProps({ className: "dropzone" })}
        className="dropzone-custom drop-shadow-lg"
        style={{}}
      >
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          <span class="material-symbols-outlined">upload</span>
          <p className="dropzone-content">Upload or Drag your files here</p>

          <aside>
            <ul>{files}</ul>
          </aside>
        </div>
      </div>

      
    </>
  );
};

export default DragDrop;
