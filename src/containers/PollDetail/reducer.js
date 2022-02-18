import { createSlice } from "@reduxjs/toolkit";
import { alterDataService } from "../../services/PollDetailService";

const initialState={
    poll:{},
}

const slice = createSlice({
    name:"polldetail",
    initialState,
    setPoll: (state, action) => {
        state.poll = action.payload;
    },
    alterPollAction : (state,action)=>{},
    getDetailAction () {}
})

export const {
    setPoll,getDetailAction,alterPollAction,
} = slice.action;

export default slice.reducer;
