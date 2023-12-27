import {createSlice} from '@reduxjs/toolkit'

const initValue = {
    userArr:[]
}

const userSlice = createSlice({
    name:"user",
    initialState: initValue,
    reducers:{
        insert:(state,actions)=>{
            state.userArr=actions.payload.arr
        }
    }
})

export const {insert} = userSlice.actions
export default userSlice.reducer