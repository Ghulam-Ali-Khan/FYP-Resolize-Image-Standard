import { configureStore, createSlice } from "@reduxjs/toolkit";



const reduxStates = createSlice({
    name: "animation States",
    initialState: {
        plateState: false,
        resizeState: false, submitResize: false, resizeAspects: { width: null, height: null },
        flipState:false, submitFlip: false, flipRotation: { top: null, bottom: null, right:null, left:null },
        filterState:false, submitFilter: false, filter: null,
        resolizeState:false, submitResolize: false,

    },
    reducers: {
        togglePlateState(state) {
            state.plateState = !state.plateState;

        },
        toggleResizeState(state) {
            state.plateState = !state.plateState;
            state.resizeState = !state.resizeState;


        },
        submitResizeState(state, action) {
            const { width, height, submitState } = action.payload;
            state.submitResize = submitState;
            state.resizeAspects.width = width;
            state.resizeAspects.height = height;

        },
        toggleFlipState(state) {
            state.plateState = !state.plateState;
            state.flipState = !state.flipState;
        },
        submitFlipState(state, action){
            const {top, bottom, left, right, submitFlip} = action.payload;

            state.submitFlip = submitFlip;
            state.flipRotation.bottom= bottom;
            state.flipRotation.left =left;
            state.flipRotation.right = right;
            state.flipRotation.top = top;
        },
        toggleFilterState(state) {
            state.plateState = !state.plateState;
            state.filterState = !state.filterState;
        },
        submitFilterState(state, action){
            const {filter, submitFilter} = action.payload;

            state.submitFilter = submitFilter;
            state.filter= filter;
           
        },
        toggleResolizeState(state) {
            state.plateState = !state.plateState;
            state.resolizeState = !state.resolizeState;
        },
        submitResolizeState(state, action){
            const {submitState} = action.payload;

            state.submitResolize = submitState;
            
           
        },

    }
});

export const actions = reduxStates.actions;

const store = configureStore({
    reducer: reduxStates.reducer,
});

export default store;