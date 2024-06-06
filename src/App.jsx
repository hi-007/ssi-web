// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
