import { Outlet } from "react-router-dom";
import Head from "./Header";

export default function Layout () {
    return (
        <div className="py-3 px-1 flex flex-col min-h-screen md:py-4 md:px-8 lg:py-4 lg:px-8">
        <Head />
        <Outlet />

        </div>
    );
}