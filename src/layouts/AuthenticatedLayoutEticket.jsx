// src/layouts/AuthenticatedLayoutEticket.jsx

import { Outlet } from 'react-router-dom';
import NavbarEticket from '../components/NavbarEticket';

const AuthenticatedLayoutEticket = () => {
    return (
        <div>
            <NavbarEticket />
            <Outlet />
        </div>
    );
};

export default AuthenticatedLayoutEticket;
