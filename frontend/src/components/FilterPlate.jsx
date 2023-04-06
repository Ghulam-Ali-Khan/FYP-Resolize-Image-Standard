import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store';

const FilterPlate = () => {


    const [filterPlate, setFilterPlate] = useState(null);
    const filterState = useSelector((state) => state.filterState);
    const submitFilter = useSelector((state) => state.submitFilter);
    const dispatch = useDispatch();


    const [filter, setFilter] = useState("Gaussian");


    useEffect(() => {
      setFilterPlate(document.getElementById("filterPlate"));

  }, []);


  useEffect(() => {
    if (filterPlate) {

        if (filterState) {
            console.log("Filter show");
            filterPlate.style.transform = "translateY(25rem)";
        }else {
          filterPlate.style.transform = "translateY(0rem)";
          console.log("Filter hide");
        }
        console.log("Filter condition");

    }

}, [filterState]);


  return (
    <>
     <div className="filter-plate" id='filterPlate'>
        <h1>Filter Plate</h1>
        <select name="filter-name" id="filter" onChange={(e)=>setFilter(e.target.value)}>
            <option value="Gaussian">Gaussian Blur Filter</option>
            <option value="Median">Median Filter</option>
            <option value="Bilateral">Bilateral Filter</option>
            <option value="Laplacian">Laplacian Filter</option>
            <option value="Sobel">Sobel Filter</option>
            
        </select>

        <button
        onClick={()=>{
          dispatch(actions.toggleFilterState());
          dispatch(actions.submitFilterState({ filter:filter, submitFilter:true }));
          console.log("Before submitFilter : "+ submitFilter);
         setTimeout(()=>{
          dispatch(actions.submitFilterState({ filter:null, submitFilter:false }));
          console.log("After submitFilter : "+ submitFilter);
         },2000);
      }}
        
        ><span className="material-symbols-outlined">palette</span>  Filter</button>
     </div> 
    </>
  )
}

export default FilterPlate;
