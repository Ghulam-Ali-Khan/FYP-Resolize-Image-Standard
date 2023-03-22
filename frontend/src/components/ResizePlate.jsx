import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';


const ResizePlate = () => {
const [resizePlate, setResizePlate] = useState(null);
const resizeState = useSelector((state)=>state.resizeState);
const dispatch =useDispatch();


useEffect(() => {
    setResizePlate(document.getElementById("resizePlate"));

}, []);

useEffect(()=>{
    if (resizePlate) {

        if(resizeState){
        resizePlate.style.transform = "translateX(50px)";
        }else{
            resizePlate.style.transform = "translateY(-35rem)";
        }

    }
       
    
}, [resizeState]);


    return (
        <>
            <div className="resize-plate" id='resizePlate' >
                <TextField id="outlined-basic resizeWidth" name="resize_width" label="Width" variant="filled" color="success" type="number" style={{ backgroundColor: "white", borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }} focused />
                <TextField id="outlined-basic resizeHeight" name="resize_height" label="Height" variant="filled" color="success" type="number" style={{ backgroundColor: "white", borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }} focused />
               
                <button onClick={()=>{
                    dispatch(actions.toggleResizeState());
                }}><span className="material-symbols-outlined">photo_size_select_small</span>  Resize</button>
            </div>
        </>
    )
}

export default ResizePlate
