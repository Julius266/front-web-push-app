import { useEffect, useState } from 'react';
import { setCookie, getCookie } from '../utils/cookies';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Verificar si las cookies ya fueron aceptadas
        const cookiesAccepted = getCookie("cookiesAccepted");
        if (!cookiesAccepted) {
            setShowBanner(true);
        }

        const visitedPages = getCookie("visitedPages") ? JSON.parse(getCookie("visitedPages")) : [];
        visitedPages.push(window.location.href);
        setCookie("visitedPages", JSON.stringify(visitedPages), 7);

        const sendVisitedPagesToBackend = async () => {
            if (visitedPages.length > 0) {
                try {
                    // Asegúrate de que la URL apunte al backend correcto
                    const response = await fetch('https://ktwqzgnc-5000.use2.devtunnels.ms/api/track-visit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ visitedPages })
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    console.log(data.message);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        sendVisitedPagesToBackend();
    }, []);

    const acceptCookies = () => {
        setCookie("cookiesAccepted", "true", 365); // Establecer la cookie por un año
        setShowBanner(false);
    };

    return (
        <>
            {showBanner && (
                <div id="cookie-banner" style={{ position: 'fixed', bottom: '10px', width: '100%', backgroundColor: '#f1f1f1', textAlign: 'center', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <img src="/genesisbanner.jpg" alt="Cookies" style={{ width: '50px', height: '50px' }} />
                    <p>Utilizamos cookies propias y de terceros para mejorar nuestros servicios.</p>
                    <button onClick={acceptCookies} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>De acuerdo</button>
                    <a href="/cookies-policy" style={{ color: '#555', textDecoration: 'underline' }}>Aviso de Cookies</a>
                </div>
            )}
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
