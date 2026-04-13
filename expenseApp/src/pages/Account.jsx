import{useContext} from "react";
import UserContext from "../context/UserContext";
export default function Account(props)
{
    const{user}=useContext(UserContext);
    return(
        <div>
            <h1>Account Component</h1>
            <p>username-{user?.username}</p>
            <p>email-{user?.email}</p>
            <p>role-{user?.role}</p>
        </div>
    )
}