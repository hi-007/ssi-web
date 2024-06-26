// src/App.jsx

// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginLayoutIssue from './layouts/LoginLayoutIssue';
import LoginLayoutVerify from './layouts/LoginLayoutVerify';
import LoginLayoutEticket from './layouts/LoginLayoutEticket';
import AuthenticatedLayoutIssue from './layouts/AuthenticatedLayoutIssue';
import AuthenticatedLayoutVerify from './layouts/AuthenticatedLayoutVerify';
import AuthenticatedLayoutEticket from './layouts/AuthenticatedLayoutEticket';
import LoginPageIssue from './pages/LoginPageIssue';
import LoginPageVerify from './pages/LoginPageVerify';
import LoginPageEticket from './pages/LoginPageEticket';
import HomePage from './pages/issue/HomePage';
import OrganizationInfoPage from './pages/issue/OrganizationInfoPage';
import NewsInfoPage from './pages/issue/NewsInfoPage';
import FAQPage from './pages/issue/FAQPage';
import ProfilePage from './pages/issue/ProfilePage';

import HomePageVerify from './pages/verify/HomePageVerify';
import OrganizationInfoPageVerify from './pages/verify/OrganizationInfoPageVerify';
import NewsInfoPageVerify from './pages/verify/NewsInfoPageVerify';
import FAQPageVerify from './pages/verify/FAQPageVerify';
import ProfilePageVerify from './pages/verify/ProfilePageVerify';

import HomePageEticket from './pages/e-ticket/issuer/HomePageEticket';
import ProfilePageEticket from './pages/e-ticket/issuer/ProfilePageEticket';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<LoginLayoutIssue />}>
                    <Route path="/" element={<LoginPageIssue />} />
                    <Route element={<AuthenticatedLayoutIssue />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/organization-info" element={<OrganizationInfoPage />} />
                        <Route path="/news-info" element={<NewsInfoPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/issuer" element={<ProfilePage />} />
                    </Route>
                </Route>
                <Route element={<LoginLayoutVerify />}>
                    <Route path="/xxx" element={<LoginPageVerify />} />
                    <Route element={<AuthenticatedLayoutVerify />}>
                        <Route path="/homeverify" element={<HomePageVerify />} />
                        <Route path="/organization-infoverify" element={<OrganizationInfoPageVerify />} />
                        <Route path="/news-infoverify" element={<NewsInfoPageVerify />} />
                        <Route path="/faqverify" element={<FAQPageVerify />} />
                        <Route path="/profileverify" element={<ProfilePageVerify />} />
                    </Route>
                </Route>
                <Route element={<LoginLayoutEticket />}>
                    <Route path="/eticket" element={<LoginPageEticket/>} />
                    <Route element={<AuthenticatedLayoutEticket />}>
                        <Route path="/home-eticket" element={<HomePageEticket />} />
                        <Route path="/organization-info-eticket" element={<OrganizationInfoPageVerify />} />
                        <Route path="/news-info-eticket" element={<NewsInfoPageVerify />} />
                        <Route path="/faq-eticket" element={<FAQPageVerify />} />
                        <Route path="/profile-eticket" element={<ProfilePageEticket />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;


/* import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/issue/HomePage';
import OrganizationInfoPage from './pages/issue/OrganizationInfoPage';
import NewsInfoPage from './pages/issue/NewsInfoPage';
import FAQPage from './pages/issue/FAQPage';
import ProfilePage from './pages/issue/ProfilePage';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/organization-info" element={<OrganizationInfoPage />} />
                    <Route path="/news-info" element={<NewsInfoPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
 */