// src/layouts/AuthenticatedLayoutIssue.jsx

import { Outlet } from 'react-router-dom';
import NavbarIssue from '../components/NavbarIssue';

const AuthenticatedLayoutIssue = () => {
    return (
        <div>
            <NavbarIssue />
            <Outlet />
        </div>
    );
};

export default AuthenticatedLayoutIssue;
