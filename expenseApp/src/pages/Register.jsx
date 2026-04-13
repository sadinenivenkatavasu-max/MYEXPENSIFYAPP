import { useFormik } from "formik";
import {useContext} from "react";
import UserContext from "../context/UserContext.js";
export default function Register(props) {

    const{handleRegister,serverErrors}=useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    onSubmit: (values,{resetForm}) => {
      console.log('formData',values);
      handleRegister(values,resetForm);
      
    }
  });

  return (
    <div>
      <h1>Register Component</h1>
        {serverErrors && (
                <ul style={{ color: "red" }}>
                    <li>{serverErrors}</li>
                </ul>
            )}

      <form onSubmit={formik.handleSubmit}>
        <div>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder="Enter Username"
        />
        </div> 
<div>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter Email"
        />
</div>
<div>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter Password"
        />
</div>
        <button type="submit">Sign Up</button>

      </form>
    </div>
  );
}