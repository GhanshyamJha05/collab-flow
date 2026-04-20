import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import Navbar from './Navbar.jsx';
import SideMenu from './SideMenu.jsx';

const DashboardLayout = ({ children, activeMenu }) => {

    const { user } = useContext(UserContext);

    return (
        <div className="w-full min-h-screen overflow-x-hidden">
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex flex-col lg:flex-row w-full">

                    {/* Sidebar */}
                    <div className="hidden lg:block">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 w-full px-3 sm:px-6 lg:px-8">
                        {children}
                    </div>

                </div>
            )}
        </div>
    );
}

export default DashboardLayout;