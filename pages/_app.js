import { useEffect, useState } from 'react';
import { setCookie, getCookie } from '../utils/cookies';
import '../styles/globals.css';
import '../styles/cookies.css';  
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const [showBanner, setShowBanner] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            const cookiesAccepted = getCookie("cookiesAccepted");
            if (cookiesAccepted) {
                const visitedPages = getCookie("visitedPages") ? JSON.parse(getCookie("visitedPages")) : [];
                visitedPages.push(url);
                setCookie("visitedPages", JSON.stringify(visitedPages), 7);

                const sendVisitedPagesToBackend = async () => {
                    if (visitedPages.length > 0) {
                        try {
                            const response = await fetch('https://ktwqzgnc-5000.use2.devtunnels.ms/api/track-visit', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ visitedPages })
                            });
                            const data = await response.json();
                            console.log(data.message);
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
                };

                sendVisitedPagesToBackend();
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        const cookiesAccepted = getCookie("cookiesAccepted");
        if (!cookiesAccepted) {
            setShowBanner(true);
        }

        handleRouteChange(window.location.href);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    const acceptCookies = () => {
        setCookie("cookiesAccepted", "true", 365);
        setShowBanner(false);
        const visitedPages = getCookie("visitedPages") ? JSON.parse(getCookie("visitedPages")) : [];
        visitedPages.push(window.location.href);
        setCookie("visitedPages", JSON.stringify(visitedPages), 7);

        const sendVisitedPagesToBackend = async () => {
            if (visitedPages.length > 0) {
                try {
                    const response = await fetch('https://ktwqzgnc-5000.use2.devtunnels.ms/api/track-visit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ visitedPages })
                    });
                    const data = await response.json();
                    console.log(data.message);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        sendVisitedPagesToBackend();
    };

    return (
        <>
            {showBanner && (
                <>
                    <div id="cookie-banner-overlay"></div>
                    <div id="cookie-banner">
                        <img src="/cookie.png" alt="Cookies" />
                        <h2>Cookies</h2>
                        <p>Utilizamos cookies propias y de terceros para mejorar nuestros servicios.</p>
                        <button onClick={acceptCookies}>De acuerdo</button>
                        <a href="/cookies-policy">Aviso de Cookies</a>
                    </div>
                </>
            )}
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
