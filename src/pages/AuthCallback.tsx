import { useState, useEffect } from 'react';

export default function AuthCallback() {
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const fetchTokens = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            const codeVerifier = sessionStorage.getItem('code_verifier');

            if (!code || !codeVerifier) {
                console.log('Missing code or code_verifier');
                return;
            }

            const data = {
                code,
                client_id:
                    '791442778641-col33dab8tme8b35udmk0a9o3hetskol.apps.googleusercontent.com',
                client_secret: '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',
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
