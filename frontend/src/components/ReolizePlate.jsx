import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';

const ReolizePlate = () => {
  
    const [resolizePlate, setResolizePlate] = useState(null);
    const resolizeState = useSelector((state)=>state.resolizeState);
    const submitResolize = useSelector((state)=>state.submitResolize);
    const dispatch =useDispatch();
    
    
    
    useEffect(() => {
        setResolizePlate(document.getElementById("resolizePlate"));
    
    }, []);
    
    useEffect(()=>{
        if (resolizePlate) {
    
            if(resolizeState){
                resolizePlate.style.transform = "translateY(30rem)";
            }else{
                resolizePlate.style.transform = "translateY(-30rem)";
            }
    
        }
           
        
    }, [resolizeState]);
    
    
    
      
  
  
  
    return (

    <>
     <div className="resolize-plate" id="resolizePlate">
    <h1>Resolize Image</h1>
     <button
     onClick={()=>{
        dispatch(actions.toggleResolizeState());
        dispatch(actions.submitResolizeState({  submitState:true }));
        console.log("Before submitResolize : "+ submitResolize);
       setTimeout(()=>{
        dispatch(actions.submitResolizeState({ submitState:false }));
        console.log("After submitResolize : "+ submitResolize);
       },2000);
    }}
     
     > <span className="material-symbols-outlined">high_quality</span> Resolize</button>
     </div> 
    </>
  )
}

export default ReolizePlate
