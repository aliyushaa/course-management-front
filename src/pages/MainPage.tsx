import React from 'react';
import BlogSection from "../components/sections/BlogSection";
import {getUser} from "../services/auth-token.services";

const user = getUser()

const MainPage: React.FC = () => {
    return (
        <div className="container h-screen mt-20 px-52">
            {user != null ?
                <>
                    <h1 className="text-3xl font-semibold mb-4"
                        style={{color: "blue"}}>{`Welcome, ${user.name} - Your Gateway to Endless Learning Opportunities! `}</h1>

                </>
                :
                <>
                    <h1 className="text-3xl font-semibold mb-4" style={{color: "blue"}}>Welcome to learning
                        platform!</h1>
                    <h2>Dive into a world of learning opportunities and unlock your potential with our diverse range of courses. Start your journey today!</h2>

                </>

            }
            <BlogSection/>
        </div>
    );
};

export default MainPage;
