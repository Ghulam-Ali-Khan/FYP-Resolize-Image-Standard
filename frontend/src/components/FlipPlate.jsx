import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';

const FlipPlate = () => {

    const [flipPlate, setFlipPlate] = useState(null);
    const flipState = useSelector((state) => state.flipState);
    const submitFlip = useSelector((state) => state.submitFlip);
    const dispatch = useDispatch();

    useEffect(() => {
        setFlipPlate(document.getElementById("flipPlate"));

    }, []);

    useEffect(() => {
        if (flipPlate) {

            if (flipState) {
                console.log("Pakistan Zindabad");
                flipPlate.style.transform = "translateY(25rem)";
            }else {
                flipPlate.style.transform = "translateY(-25rem)";
                
            }

        }

    }, [flipState]);




    return (
        <>


            <div className="flipbox" id='flipPlate'>
                <h3>Flip Image</h3>

                <div className="buttons-area">
                    <button
                    
                    onClick={()=>{
                        dispatch(actions.toggleFlipState());
                        dispatch(actions.submitFlipState({top:1, bottom:0, left:0, right:0, submitFlip:true}));
                        setTimeout(()=>{
                            dispatch(actions.submitFlipState({top:null, bottom:null, left:null, right:null, submitFlip:false}));
                            console.log("After submitFlip : "+ submitFlip);
                           },2000);
                    }}

                    ><span className="material-symbols-outlined">arrow_upward</span> Top </button>
                    <button
                    
                    onClick={()=>{
                        dispatch(actions.toggleFlipState());
                        dispatch(actions.submitFlipState({top:0, bottom:1, left:0, right:0, submitFlip:true}));
                        setTimeout(()=>{
                            dispatch(actions.submitFlipState({top:null, bottom:null, left:null, right:null, submitFlip:false}));
                            console.log("After submitFlip : "+ submitFlip);
                           },2000);
                    }}
                    
                    ><span className="material-symbols-outlined">arrow_downward</span> Bottom </button>
                    <button
                    
                    onClick={()=>{
                        dispatch(actions.toggleFlipState());
                        dispatch(actions.submitFlipState({top:0, bottom:0, left:1, right:0, submitFlip:true}));
                        setTimeout(()=>{
                            dispatch(actions.submitFlipState({top:null, bottom:null, left:null, right:null, submitFlip:false}));
                            console.log("After submitFlip : "+ submitFlip);
                           },2000);
                    }}

                    ><span className="material-symbols-outlined">arrow_back</span> Left </button>
                    <button
                    
                    onClick={()=>{
                        dispatch(actions.toggleFlipState());
                        dispatch(actions.submitFlipState({top:0, bottom:0, left:0, right:1, submitFlip:true}));
                        setTimeout(()=>{
                            dispatch(actions.submitFlipState({top:null, bottom:null, left:null, right:null, submitFlip:false}));
                            console.log("After submitFlip : "+ submitFlip);
                           },2000);
                    }}
                    
                    ><span className="material-symbols-outlined">arrow_forward</span> Right </button>
                </div>

            </div>

        </>
    )
}

export default FlipPlate;
