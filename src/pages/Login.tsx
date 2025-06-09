import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce.ts';

const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT;
const redirectUri = 'http://localhost:3000/api/auth/callback/google';
const scope = 'openid email profile';
const kakaoClientId = import.meta.env.VITE_APP_KAKAO_CLIENT;
const kakaoRedirectUri = 'http://localhost:3000/api/auth/callback/kakao';

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

    const handleKakaoLogin = async () => {
        if (!kakaoClientId) {
            throw new Error('Missing Kakao client ID');
        }

        const kakaoAuthUrl = new URL('https://kauth.kakao.com/oauth/authorize');
        kakaoAuthUrl.searchParams.set('client_id', kakaoClientId);
        kakaoAuthUrl.searchParams.set('redirect_uri', kakaoRedirectUri);
        kakaoAuthUrl.searchParams.set('response_type', 'code');
        kakaoAuthUrl.searchParams.set(
            'scope',
            'profile_nickname profile_image account_email',
        );

        window.location.href = kakaoAuthUrl.toString();
    };

    return (
        <>
            <button onClick={handleLogin}>Login with Google</button>
            <button onClick={handleKakaoLogin}>Login with Kakao</button>
        </>
    );
}

export default Login;
