import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Auth.css";

const nameRegex = /.{6,}/;
const emailRegex = /.+@.+\..+/;
const passRegex = /.{6,}/;

export function Login() {
    const navigate = useNavigate();

    const [email, useEmail] = useState("");
    const [password, usePass] = useState("");

    const [currentUser, useUser] = useState(null);

    const [isSubmit, useSubmit] = useState(false);

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

        const user = JSON.parse(localStorage.getItem("user")) || {};
        if((email == user.email) && (password == user.password)){
            user.isLogin = true;
            localStorage.setItem("user", JSON.stringify(user));
            useUser(user);
            navigate("/");
        }
        else{
            useSubmit(true);
            return;
        }
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
                {!currentUser && isSubmit ? (<div className="Error">Invalid user</div>) : ""}
                <button disabled={!(isValid.email && isValid.password)}>
                    Login
                </button>
            </form>
        </>
    );
}

export function Register() {
    const navigate = useNavigate();

    const [username, useName] = useState("");
    const [email, useEmail] = useState("");
    const [password, usePass] = useState("");

    const isValid = {
        username: nameRegex.test(username),
        email: emailRegex.test(email),
        password: passRegex.test(password),
    };

    const [touched, useTouch] = useState({
        username: false,
        email: false,
        password: false,
    });

    const SubmitForm = (event) => {
        event.preventDefault();

        if(!(isValid.username && isValid.email && isValid.password)) return;

        const user = {
            avatar: null,
            username: username,
            email: email,
            password: password,
            isLogin: false,
            cart: []
        };

        localStorage.setItem("user", JSON.stringify(user));

        navigate("/auth/login");
    };

    const ValidateInput = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "username":
                useName(value);
                break;
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
            <h2>Register</h2>
            <form onSubmit={(event) => SubmitForm(event)}>
                <label>
                    <div>Username</div>
                    <input
                        type="text"
                        placeholder="Enter the username"
                        name="username"
                        onInput={(event) => ValidateInput(event)}
                    />
                    {!isValid.username && touched.username ? (
                        <div className="Error">
                            The username must contain at least 6 of any
                            character.
                        </div>
                    ) : (
                        ""
                    )}
                </label>
                <label>
                    <div>Email</div>
                    <input
                        type="text"
                        placeholder="Enter the email"
                        name="email"
                        onInput={(event) => ValidateInput(event)}
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
                        autoComplete="on"
                        onInput={(event) => ValidateInput(event)}
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
                <button
                    disabled={
                        !(isValid.username && isValid.email && isValid.password)
                    }
                >
                    Login
                </button>
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