import{useContext} from "react";
import UserContext from "../context/UserContext";
export default function Dashboard(props)
{
    const{user}=useContext(UserContext);
    console.log("Data is",user);
    if(!user)
    {
        return <p>loading.....</p>
    }
   return(
    <div>
        <h1>Dashboard Component</h1>
        <h2>Welcome  Dashboard,{user.username}</h2>
    </div>
   )
}