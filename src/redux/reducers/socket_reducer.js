import { createSlice } from "@reduxjs/toolkit";

const initialState={
    socket:{}
}


export const Socket_Reducer=createSlice({
    name:"socket",
    initialState:initialState,
    reducers:{
        addSocket:(state,action)=>{
state.socket=action.payload
        }
    }
});

export const {addSocket}=Socket_Reducer.actions;

export default Socket_Reducer.reducer;