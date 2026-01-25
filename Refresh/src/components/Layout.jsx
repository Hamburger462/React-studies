import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Layout() {
    return (
        <main>
            <Nav />
            <hr />
            <Outlet />
        </main>
    );
}
export default Layout;
