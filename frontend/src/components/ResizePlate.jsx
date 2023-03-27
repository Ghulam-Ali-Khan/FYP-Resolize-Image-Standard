import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';


const ResizePlate = () => {
const [resizePlate, setResizePlate] = useState(null);
const resizeState = useSelector((state)=>state.resizeState);
const submitResize = useSelector((state)=>state.submitResize);
const dispatch =useDispatch();

const [width, setWidth] = useState(null);
const [height, setHeight] = useState(null);

useEffect(() => {
    setResizePlate(document.getElementById("resizePlate"));

}, []);

useEffect(()=>{
    if (resizePlate) {

        if(resizeState){
        resizePlate.style.transform = "translateX(50px)";
        }else{
            resizePlate.style.transform = "translateY(-35rem)";
            console.log("Height : "+ height + " Width : "+width);
        }

    }
       
    
}, [resizeState]);









    return (
        <>
            <div className="resize-plate" id='resizePlate' >
                <TextField id="outlined-basic resizeWidth" name="resize_width" label="Width" variant="filled" color="success" type="number" style={{ backgroundColor: "white", borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }} onChange={(e)=>setWidth(e.target.value)} focused />
                <TextField id="outlined-basic resizeHeight" name="resize_height" label="Height" variant="filled" color="success" type="number" style={{ backgroundColor: "white", borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }} onChange={(e)=>setHeight(e.target.value)} focused />
               
                <button onClick={()=>{
                    dispatch(actions.toggleResizeState());
                    dispatch(actions.submitResizeState({ width: width, height: height, submitState:true }));
                    console.log("Before submitResize : "+ submitResize);
                   setTimeout(()=>{
                    dispatch(actions.submitResizeState({ width: null, height: null, submitState:false }));
                    console.log("After submitResize : "+ submitResize);
                   },2000);
                }}><span className="material-symbols-outlined">photo_size_select_small</span>  Resize</button>
            </div>
        </>
    )
}

export default ResizePlate;
