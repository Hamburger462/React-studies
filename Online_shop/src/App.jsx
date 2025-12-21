import Tab from "./components/Tab";
import TabLink from "./components/TabLink";
import { useState } from "react";
import "./App.css";

function App() {
    const [currentTab, useTab] = useState("shop");

    return (
        <>
            <header>
                <TabLink
                    name={"Shop"}
                    changeTab={() => useTab("shop")}
                ></TabLink>
                <TabLink
                    name={"Profile"}
                    changeTab={() => useTab("profile")}
                ></TabLink>
            </header>
            <main>
                <Tab tab={currentTab}></Tab>
            </main>
        </>
    );
}

export default App;
