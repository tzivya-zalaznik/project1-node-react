import {createSlice} from '@reduxjs/toolkit'

const initValue = {
    postArr:[]
}

const postSlice = createSlice({
    name:"post",
    initialState: initValue,
    reducers:{
        insert:(state,actions)=>{
            state.postArr=actions.payload.arr
        }
    }
})

export const {insert} = postSlice.actions
export default postSlice.reducer