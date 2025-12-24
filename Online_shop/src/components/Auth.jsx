import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Auth.css";

const nameRegex = /.{6,}/;
const emailRegex = /.+@.+\..+/;
const passRegex = /.{6,}/;

export function Login() {
    const [email, useEmail] = useState("");
    const [password, usePass] = useState("");

    const isValid = {
        email: emailRegex.test(email),
        password: passRegex.test(password),
    };

    const [touched, useTouch] = useState({
        email: false,
        password: false,
    });

    const SubmitForm = (event) => {
        event.preventDefault();

        useNavigate("/");
    };

    const ValidateInput = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "email":
                useEmail(value);
                break;
            case "password":
                usePass(value);
                break;
        }

        useTouch({ ...touched, [name]: true }); // changing input's touched state using their name property
    };

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={(event) => SubmitForm(event)}>
                <label>
                    <div>Email</div>
                    <input
                        type="text"
                        placeholder="Enter the email"
                        name="email"
                        onInput={(event) => ValidateInput(event)}
                        value={email}
                    />
                    {!isValid.email && touched.email ? (
                        <div className="Error">The email must be valid</div>
                    ) : (
                        ""
                    )}
                </label>
                <label>
                    <div>Password</div>
                    <input
                        type="password"
                        placeholder="Enter the password"
                        name="password"
                        onInput={(event) => ValidateInput(event)}
                        autoComplete="on"
                        value={password}
                    />
                    {!isValid.password && touched.password ? (
                        <div className="Error">
                            The password must contain at least 6 of any
                            character.
                        </div>
                    ) : (
                        ""
                    )}
                </label>
                <button disabled={!isValid.email && !isValid.password}>
                    Login
                </button>
            </form>
        </>
    );
}

export function Register() {
    const SubmitForm = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={(event) => SubmitForm(event)}>
                <label>
                    <div>Username</div>
                    <input
                        type="text"
                        placeholder="Enter the username"
                        name="username"
                    />
                </label>
                <label>
                    <div>Email</div>
                    <input
                        type="text"
                        placeholder="Enter the email"
                        name="email"
                    />
                </label>
                <label>
                    <div>Password</div>
                    <input
                        type="password"
                        placeholder="Enter the password"
                        name="password"
                    />
                </label>
                <button>Login</button>
            </form>
        </>
    );
}

export function Auth() {
    return (
        <>
            <h1>This is Auth</h1>
            <nav className="Auth-nav">
                <Link to="login" className="Auth-nav-link">
                    Login
                </Link>
                <Link to="register" className="Auth-nav-link">
                    Register
                </Link>
            </nav>
            <Outlet></Outlet>
        </>
    );
}
