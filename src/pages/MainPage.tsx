import React from 'react';
import CalendarSection from "../components/sections/CalendarSection";
import BlogSection from "../components/sections/BlogSection";

const MainPage: React.FC = () => {
    return (
        <div className="container h-screen mt-20 px-52">
            <h1 className="text-3xl font-semibold mb-4">Welcome!</h1>
            <BlogSection/>
            <br/>
            <CalendarSection/>
        </div>
    );
};

export default MainPage;
