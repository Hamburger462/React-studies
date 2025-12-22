import { useState } from "react";
import "./App.css";
import { use } from "react";

// Exercise 1
// function App() {
//     // const submitForm = (event) => {
//     //   event.preventDefault();
//     //     const username = event.target.username.value;
//     //     const password = event.target.password.value;
//     //     console.log(username, password);
//     // };

//     // return (
//     //     <>
//     //         <form onSubmit={(event) => submitForm(event)}>
//     //             <label>
//     //                 <h2>Username</h2>
//     //                 <input
//     //                     type="text"
//     //                     placeholder="Enter the username"
//     //                     name="username"
//     //                 ></input>
//     //             </label>
//     //             <label>
//     //                 <h2>Password</h2>
//     //                 <input
//     //                     type="text"
//     //                     placeholder="Enter the password"
//     //                     name="password"
//     //                 ></input>
//     //             </label>
//     //             <div>
//     //                 <button>Login</button>
//     //             </div>
//     //         </form>
//     //     </>
//     // );
// }

// Exercise 2
// function App(){
//      const submitForm = async (event) => {
//         event.preventDefault();
//         const username = event.target.username.value;
//         const password = event.target.password.value;
//         const response = await fetch('https://dummyjson.com/auth/login', {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             username: username,
//             password: password
//           })
//         });
//         if(response.ok){
//           const json = await response.json();
//           console.log(json);
//         }
//         else{
//           console.log("Error");
//         }
//     };

//     return (
//         <>
//             <form onSubmit={(event) => submitForm(event)}>
//                 <label>
//                     <h2>Username</h2>
//                     <input
//                         type="text"
//                         placeholder="Enter the username"
//                         name="username"
//                     ></input>
//                 </label>
//                 <label>
//                     <h2>Password</h2>
//                     <input
//                         type="text"
//                         placeholder="Enter the password"
//                         name="password"
//                     ></input>
//                 </label>
//                 <div>
//                     <button>Login</button>
//                 </div>
//             </form>
//         </>
//     );
// }

// Exercise 3
// function App() {
//     const [username, useName] = useState(null);
//     const [password, usePass] = useState(null);

//     const submitForm = async (event) => {
//         event.preventDefault();
//         const response = await fetch("https://dummyjson.com/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 username: username,
//                 password: password,
//             }),
//         });
//         if (response.ok) {
//             const json = await response.json();
//             console.log(json);
//         } else {
//             console.log("Error");
//         }
//     };

//     return (
//         <>
//             <form onSubmit={(event) => submitForm(event)}>
//                 <label>
//                     <h2>Username</h2>
//                     <input
//                         type="text"
//                         placeholder="Enter the username"
//                         name="username"
//                         onChange={(event) => useName(event.target.value)}
//                     ></input>
//                 </label>
//                 <label>
//                     <h2>Password</h2>
//                     <input
//                         type="text"
//                         placeholder="Enter the password"
//                         name="password"
//                         onChange={(event) => usePass(event.target.value)}
//                     ></input>
//                 </label>
//                 <div>
//                     <button>Login</button>
//                 </div>
//             </form>
//         </>
//     );
// }

// Exercise 4, 5, 6, 7
function App() {
    const [user, useUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [username, useName] = useState(null);
    const [password, usePass] = useState(null);
    const [error, useError] = useState(null);

    const validateForm = () => {
        const passRegex = /.{6,}/;
        if (!(username && password && passRegex.test(password))) {
            useError("Incorrect data");
            return false;
        } else {
            useError(null);
            return true;
        }
    };

    const submitForm = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            if (json.accessToken) {
                localStorage.setItem("user", JSON.stringify(json));
                useUser(localStorage.getItem("user"));
            }
            location.reload();
        } else {
            console.log("Error");
        }
    };

    const Logout = () => {
      localStorage.removeItem("user");
      location.reload();
    }

    const formTemp = (
        <>
            <form onSubmit={(event) => submitForm(event)}>
                <label>
                    <h2>Username</h2>
                    <input
                        type="text"
                        placeholder="Enter the username"
                        name="username"
                        onChange={(event) => useName(event.target.value)}
                    ></input>
                </label>
                <label>
                    <h2>Password</h2>
                    <input
                        type="text"
                        placeholder="Enter the password"
                        name="password"
                        onChange={(event) => usePass(event.target.value)}
                    ></input>
                </label>
                <div>
                    <button>Login</button>
                </div>
            </form>
            {error ? <div>{error}</div> : null}
        </>
    );

    const profileTemp = <>
      <h1>Hello, {user?.username}</h1>
      <button onClick={Logout}>Logout</button>
    </>;

    return (
      <>
        {user ? profileTemp : formTemp}
      </>
    );
}

export default App;
