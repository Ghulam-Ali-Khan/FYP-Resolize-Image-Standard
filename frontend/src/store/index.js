import {configureStore, createSlice} from "@reduxjs/toolkit";



const reduxStates = createSlice({
    name:"animation States",
    initialState:{plateState:false, resizeState:false,submitResize:false, resizeAspects:{width:null, height:null} },
    reducers:{
        togglePlateState(state){
            state.plateState = !state.plateState;
               
      },
        toggleResizeState(state){
              state.plateState = !state.plateState;
              state.resizeState = !state.resizeState;
              
                 
        },
        submitResizeState(state, action){
            const { width, height, submitState } = action.payload;
            state.submitResize = submitState;
            state.resizeAspects.width = width;
            state.resizeAspects.height = height;
               
      }
        
    }
});

export const actions = reduxStates.actions;

const store = configureStore({
    reducer: reduxStates.reducer,
});

export default store;