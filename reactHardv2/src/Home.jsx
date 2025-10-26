import React from "react";
import Navbar from "./components/Navbar";
import "./Home.css";

function Home() {
    return (
        <>
            <Navbar />
            <div className="home-container">
                <h1>Welcome To Your To-Do List App! </h1>
                <p>Organize and manage your tasks efficiently.</p>
            </div>
        </>
    )
}

export default Home;