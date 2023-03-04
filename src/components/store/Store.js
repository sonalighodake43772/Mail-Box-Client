import { configureStore } from "@reduxjs/toolkit";
import MailReducer from "./auth-slice";


const store=configureStore({
    reducer:{
        auth:MailReducer,
       
    }
})

export default store