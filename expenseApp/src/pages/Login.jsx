import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Login() {

    const { handleLogin, serverErrors } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values, { resetForm }) => {
            handleLogin(values, resetForm);
        }
    });

    return (
        <div>
            <h2>Login</h2>

  {/* 🔥 ERROR DISPLAY */}
            {serverErrors && (
                <ul style={{ color: "red" }}>
                    <li>{serverErrors}</li>
                </ul>
            )}
            <form onSubmit={formik.handleSubmit}>
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

                <button type="submit">Login</button>

            </form>

          

        </div>
    );
}