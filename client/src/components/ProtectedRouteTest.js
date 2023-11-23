import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";
import { SERVER_BASE_URL } from "../config/config.local";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.user);

  //get user 
  const getuser  = async ()=>{
    //console.log('Hello '+user)

    try {

        dispatch(showLoading())
        const res = await axios.post(SERVER_BASE_URL+
          "/api/v1/user/getUserData",
          { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        dispatch(hideLoading());

        if(res.data.success){
          dispatch(setUser(res.data.data))
        }else{
          //alert();
          <Navigate to="/login" />;
          localStorage.clear();
        }

    } catch (error) {
        dispatch(hideLoading());
      console.log(error); 
    }

  }

  useEffect(()=>{
      if(!user){
        getuser();
      }
  },[user])

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
