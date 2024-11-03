import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo: localStorage.getItem("jwt_localstorage") ? JSON.parse(localStorage.getItem("jwt_localstorage")) : null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.userInfo = action.payload
            localStorage.setItem("jwt_localstorage", JSON.stringify(action.payload))

            const expired = new Date().getTime() * 7 * 24 * 60 * 60 * 1000
            localStorage.setItem("expired", expired)
        },
        logout(state) {
            state.userInfo = null;
            localStorage.clear("jwt_localstorage");
            window.location.reload()
        }
    },
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;