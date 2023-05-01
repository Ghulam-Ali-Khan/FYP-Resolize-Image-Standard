import React from "react";
import DragDrop from "../components/DragDrop";
import Typography from "@mui/material/Typography";
import Test from "../components/Test";
import EditorPlate from "../components/EditPlate";
import particlesImg from "../imgs/ri-processing.png";
import resizeMessage from "../imgs/resize-message.png"; 
import resolizeMessage from "../imgs/resolize-message.png";
import ResizePlate from "../components/ResizePlate";
import FlipPlate from "../components/FlipPlate";
import FilterPlate from "../components/FilterPlate";
import ReolizePlate from "../components/ReolizePlate";

const Editor = () => {

 

  return (

    <>
      <div className="editor-section">
        <h1>Resolize <span>Image</span> Standard</h1>
        <h2>Editor</h2>
        <DragDrop/>
        <div className="message-imgs" style={{ position:"absolute", top:"100px", left:"-300px"}}>
          <img src={resizeMessage} style={{maxWidth:"300px"}} id="resizeMessage"/>
          <img src={resolizeMessage} style={{maxWidth:"300px"}} id="resolizeMessage"/>
        </div>
        <EditorPlate/>
        <ResizePlate/>
        <FlipPlate/>
        <FilterPlate/>
        <ReolizePlate/>
         <img src={particlesImg}   style={{maxWidth:"100%", zIndex:"-3", position:"absolute", right:"-150px", bottom:"-10rem"}} id="particlesImg"/>
    
      </div>
    </>
  );
};

export default Editor;
