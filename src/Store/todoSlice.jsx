import {createSlice} from '@reduxjs/toolkit'

const initValue = {
    todoArr:[]
}

const todoSlice = createSlice({
    name:"todo",
    initialState: initValue,
    reducers:{
        insert:(state,actions)=>{
            state.todoArr=actions.payload.arr
        }
    }
})

export const {insert} = todoSlice.actions
export default todoSlice.reducer