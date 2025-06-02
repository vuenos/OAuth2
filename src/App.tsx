import './index.css';
import './App.css';

function App() {
    const handleOAuthGoogle = () => {
        console.log('Google OAuth');
    };

    return (
        <>
            <div>
                <h1>OAuth2 demo</h1>

                <div>
                    <button type="button" onClick={handleOAuthGoogle}>
                        Google
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
