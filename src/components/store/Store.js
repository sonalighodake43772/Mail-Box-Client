import { configureStore } from "@reduxjs/toolkit";
import MailReducer from "./auth-slice";
import InboxReducer from "./inbox-slice";



const store=configureStore({
    reducer:{
        auth:MailReducer,
        array:InboxReducer
    }
})

export default store