import { useState, useEffect } from 'react';

export default function AuthCallback() {
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const fetchTokens = async () => {
            const GOOGLE_CLIENT = import.meta.env.VITE_APP_GOOGLE_CLIENT;
            const GOOGLE_SECRET = import.meta.env.VITE_APP_GOOGLE_SECRET;
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            const codeVerifier = sessionStorage.getItem('code_verifier');

            if (!code || !codeVerifier) {
                console.log('Missing code or code_verifier');
                return;
            }

            if (!GOOGLE_CLIENT || !GOOGLE_SECRET) {
                throw new Error('Missing GOOGLE_CLIENT or GOOGLE_SECRET');
            }

            const data = {
                code,
                client_id: GOOGLE_CLIENT,
                client_secret: GOOGLE_SECRET,
                redirect_uri: 'http://localhost:3000/api/auth/callback/google',
                grant_type: 'authorization_code',
                code_verifier: codeVerifier,
            };

            const tokenRes = await fetch(
                'https://oauth2.googleapis.com/token',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(data).toString(),
                },
            );

            const tokenJson = await tokenRes.json();
            console.log('tokenJson:', tokenJson);
            const { id_token } = tokenJson;

            //
            const payload = JSON.parse(atob(id_token.split('.')[1]));
            setUserInfo(payload);
        };

        fetchTokens();
    }, []);

    if (!userInfo) return <div>Authenticating...</div>;

    return (
        <div>
            <h2>Hi, {userInfo.name}</h2>
            <p>Email: {userInfo.email}</p>
            <p>
                <img src={userInfo.picture} alt="Profile" />
            </p>
        </div>
    );
}
