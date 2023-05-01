import React from "react";
import { useState, useEffect } from "react";
import cropImg from "../imgs/crop2.png";
import resizeImg from "../imgs/resize.png";
import filterImg from "../imgs/filters.png";
import resolizeImg from "../imgs/resolize.png";
import removerImg from "../imgs/remover.png";
import layerImg from "../imgs/layer.png";
import flipImg from "../imgs/flip.png";
import textImg from "../imgs/text.png";
import shapesImg from "../imgs/shapes.png";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";

const EditPlate = () => {
  const resizeState = useSelector((state)=> state.resizeState);
  const plateState = useSelector((state)=> state.plateState);
  const submitResize = useSelector((state)=>state.submitResize);
  const flipState = useSelector((state) => state.flipState);
  const filterState = useSelector((state)=> state.filterState); 
  const resolizeState = useSelector((state)=>state.resolizeState);
  const submitResolize = useSelector((state)=>state.submitResolize);

  console.log("Plate State : "+ plateState+ "  Resize State : "+ resizeState+ " submitResize : "+ submitResize + "Flip State : "+flipState);


  const dispatch = useDispatch();
  const [resize, setResize] = useState(false);
  const [resolize, setResolize] = useState(false);

  
  
  // function messageImgae(id, value){
    
  //   let message = document.getElementById(`${id}`);
  //     message.style.transform = `translateX(${value}px)`;

  //  }
  
  
   useEffect(() => {
    let plate = document.getElementById("editorPlate");
    // Update the document title using the browser API
    if (resize) {
      let resizeMessage = document.getElementById("resizeMessage");
      resizeMessage.style.transform = "translateX(300px)";
    } else if (!resize) {
      let resizeMessage = document.getElementById("resizeMessage");
      resizeMessage.style.transform = "translateX(0px)";
    } 
    
    if (resolize) {
      let resolizeMessage = document.getElementById("resolizeMessage");
      resolizeMessage.style.transform = "translateX(300px)";
    //   console.log("Resolize Enter");
    } else if (!resolize) {
      let resolizeMessage = document.getElementById("resolizeMessage");
      resolizeMessage.style.transform = "translateX(0px)";
    //   console.log("Resolize Leave");
    }

// onclick actions withreduz states



  }, []);



  return (
    <>
      <div className="editor-plate drop-shadow-lg" id="editorPlate">
        <div className="plate">
          <div className="custom-row">
            <button
              onMouseEnter={(e) => {
                setResize(true);
              }}
              onMouseLeave={(e) => {
                setResize(false);
              }}

              onClick={(e)=>{
                dispatch(actions.toggleResizeState());
               
                console.log(resizeState, plateState);
              }}
            >
              <img src={resizeImg} alt="resize" />
              Resize
            </button>
            <button
            onMouseEnter={(e) => {
                setResolize(true);
              }}
              onMouseLeave={(e) => {
                setResolize(false);
              }}

              onClick={(e)=>{
                dispatch(actions.toggleResolizeState());
               
                console.log(resolizeState);
              }}
            >
              <img src={resolizeImg} alt="resolize" />
              Resolize
            </button>
            <button>
              <img src={cropImg} alt="crop" />
              Crop
            </button>
          </div>

          <div className="custom-row">
            <button>
              <img src={removerImg} alt="remover" />
              Remover
            </button>
            <button>
              <img src={layerImg} alt="layer" />
              Overlayer
            </button>
            <button
            onClick={(e)=>{
              dispatch(actions.toggleFilterState());
             
              console.log(filterState, plateState);
            }}
            >
              <img src={filterImg} alt="filter" />
              Filters
            </button>
          </div>

          <div className="custom-row">
            <button
            
            onClick={(e)=>{
              dispatch(actions.toggleFlipState());
             
              console.log(flipState);
            }}

            >
              <img src={flipImg} alt="flip" />
              Flip
            </button>
            <button>
              <img src={textImg} alt="text" />
              Text
            </button>
            <button>
              <img src={shapesImg} alt="shapes" />
              Shapes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPlate;
