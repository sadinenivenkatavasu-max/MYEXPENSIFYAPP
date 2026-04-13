import{useReducer,useEffect} from "react";
import axios from '../config/axios.js';
import UserContext from "../context/UserContext.js";
import  {useNavigate} from "react-router-dom";
const userReducer=(state,action)=>
{
    switch(action.type)
    {
case "LOG_IN":{
return{...state,isLoggedIn:true,user:action.payload,serverErrors:''}
}
case "LOGOUT":{
    return {...state,isLoggedIn:false,user:null}
}
case "SET_SERVER_ERRORS":
    {
        return{...state,serverErrors:action.payload}
    }
    
    default :
        {
            return {...state}
        }
    }
}
export default function AuthProvider(props)
{
    const navigate=useNavigate();
    const [userState,userDispatch]=useReducer(userReducer,{
        user:null,
        isLoggedIn:false,
        serverErrors:'',
    })
    console.log(props);


    const handleRegister=async(formData,resetForm)=>
    {
        console.log('call register Api');
        try{
const response=await axios.post('/register',formData);
console.log(response.data);
 alert('successfully registered');
 resetForm();
 navigate('/Login');
        }
        catch(err)
        {
            console.log(err.message);
            userDispatch({type:"SET_SERVER_ERRORS",payload:err.response.data.error});
resetForm();
        }
       
    }

     const handleLogin = async (formData, resetForm) => {
    try {
        const response = await axios.post('/user/login', formData);
        localStorage.setItem('token', response.data.token);

         const userResponse=await axios.get('/user/account',{headers:{Authorization:localStorage.getItem('token')}});
         console.log("data",userResponse);
        resetForm();
        alert("Successfully login");
        userDispatch({type:'LOG_IN',payload:userResponse.data});
        navigate('/dashboard');
        
    } catch (err) {
        console.log(err.message);
userDispatch({type:"SET_SERVER_ERRORS",payload:err.response.data.error});
resetForm();
    }
};

const handleLogOut = () => {
    localStorage.removeItem('token');
    userDispatch({ type: 'LOGOUT' });
    navigate('/Login');
};

useEffect(()=>
{
if(localStorage.getItem('token'))
{
    const fetchUser=async()=>
    {
         try{
const response=await axios.get('/users/account',{headers:{Authorization:localStorage.getItem('token')}});
userDispatch({type:"LOG_IN",payload:response.data});

    }
    catch(err)
    {
        console.log(err);

    }

    }
    fetchUser();
   
}
},[])

    return(
        <div>
          
            <UserContext.Provider value={{...userState,userDispatch,handleRegister,handleLogin,handleLogOut}}>
   {props.children}
            </UserContext.Provider>
        
        </div>
    )
}