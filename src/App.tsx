import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx';
import AuthCallback from './pages/AuthCallback.tsx';
import './index.css';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/api/auth/callback/google"
                    element={<AuthCallback />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
