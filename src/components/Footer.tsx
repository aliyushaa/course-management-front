import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto flex flex-wrap justify-around">
                <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-4 md:mb-0">
                    <h3 className="text-lg font-bold mb-2">About Us</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab esse est impedit laudantium provident quis sint unde vero! Asperiores cum distinctio dolores est nam numquam quo soluta sunt temporibus ullam.</p>
                </div>
                <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-4 md:mb-0">
                    <h3 className="text-lg font-bold mb-2">Contact</h3>
                    <ul>
                        <li>Email: example@example.com</li>
                        <li>Phone: 123-456-7890</li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-4 md:mb-0">
                    <h3 className="text-lg font-bold mb-2">Follow Us</h3>
                    <ul>
                        <li>Twitter</li>
                        <li>Facebook</li>
                        <li>Instagram</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto mt-8">
                <p className="text-center">SE-2114. All rights will be reserved. &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};
