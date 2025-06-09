import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx';
import AuthCallbackGoogle from './pages/AuthCallbackGoogle.tsx';
import './index.css';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/api/auth/callback/google"
                    element={<AuthCallbackGoogle />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
