// src/layouts/AuthenticatedLayoutIssue.jsx

import { Outlet } from 'react-router-dom';
import NavbarVerify from '../components/NavbarVerify';

const AuthenticatedLayoutVerify = () => {
    return (
        <div>
            <NavbarVerify />
            <Outlet />
        </div>
    );
};

export default AuthenticatedLayoutVerify;
