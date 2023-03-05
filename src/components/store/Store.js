import { configureStore } from "@reduxjs/toolkit";
import MailReducer from "./auth-slice";
import InboxReducer from "./inbox-slice";
import ObjReducer from "./obj-slice";




const store=configureStore({
    reducer:{
        auth:MailReducer,
        array:InboxReducer,
        obj: ObjReducer,
        

    }
})

export default store