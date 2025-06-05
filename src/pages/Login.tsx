import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce.ts';

const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT;
const redirectUri = 'http://localhost:3000/api/auth/callback/google';
const scope = 'openid email profile';

function Login() {
    const handleLogin = async () => {
        if (!clientId) {
            throw new Error('Missing Google client ID');
        }

        const codeVerifier = await generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        sessionStorage.setItem('code_verifier', codeVerifier);

        const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        authUrl.searchParams.set('client_id', clientId);
        authUrl.searchParams.set('redirect_uri', redirectUri);
        authUrl.searchParams.set('response_type', 'code');
        authUrl.searchParams.set('scope', scope);
        authUrl.searchParams.set('code_challenge', codeChallenge);
        authUrl.searchParams.set('code_challenge_method', 'S256');

        window.location.href = authUrl.toString();
    };

    return <button onClick={handleLogin}>Login with Google</button>;
}

export default Login;
