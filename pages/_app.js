import { useEffect } from 'react';
import { setCookie, getCookie } from '../utils/cookies';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

    useEffect(() => {
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
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
