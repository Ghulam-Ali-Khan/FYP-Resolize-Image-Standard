import React from "react";
import DragDrop from "../components/DragDrop";
import Typography from "@mui/material/Typography";
import Test from "../components/Test";
import EditorPlate from "../components/EditPlate";

const Editor = () => {

 

  return (

    <>
      <div className="editor-section">
        <h1>Resolize <span>Image</span> Standard</h1>
        <h2>Editor</h2>
        <DragDrop/>
        <EditorPlate/>
     
    
      </div>
    </>
  );
};

export default Editor;
