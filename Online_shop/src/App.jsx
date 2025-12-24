import Header from "./components/Header";
import Home from "./components/Home";
import { Auth, Login, Register } from "./components/Auth";
import Profile from "./components/Profile";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
    const [currentTab, useTab] = useState(
        localStorage.getItem("tab") || "shop"
    );

    useEffect(() => {
        localStorage.setItem("tab", currentTab);
    }, [currentTab]);

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/auth" element={<Auth />}>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="register" element={<Register />}></Route>
                    </Route>
                </Routes>
            </main>
        </>
    );
}

export default App;
