import {configureStore, createSlice} from "@reduxjs/toolkit";



const reduxStates = createSlice({
    name:"animation States",
    initialState:{plateState:false, resizeState:false },
    reducers:{
        togglePlateState(state){
            state.plateState = !state.plateState;
               
      },
        toggleResizeState(state){
              state.plateState = !state.plateState;
              state.resizeState = !state.resizeState;
                 
        },
        
    }
});

export const actions = reduxStates.actions;

const store = configureStore({
    reducer: reduxStates.reducer,
});

export default store;