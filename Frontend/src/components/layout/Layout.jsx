import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar';
import Footer from '../Footer';
import FeatureModal from '../FeatureModal';

const Layout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </main>
            <Footer />
            <FeatureModal />
        </div>
    );
};

export default Layout;

