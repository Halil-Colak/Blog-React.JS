import React, { useEffect, useState } from 'react';
import { MdOutlineCookie } from "react-icons/md";

function Cookies() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const isAccepted = localStorage.getItem('cookieAccepted');
        if (!isAccepted) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieAccepted', 'true');
        setShowBanner(false);
    };

    const handleReject = () => {
        window.location.href = 'https://www.google.com';
    };

    if (!showBanner) return null;
    return (
        <div id='cookie'>
            <div>
                <MdOutlineCookie />
                <p>
                    Bu site, kullanıcı deneyimini geliştirmek ve oturum bilgilerini saklamak için tarayıcı verilerini kullanır.
                    <b> Devam ederek bu kullanımı kabul etmiş olursunuz.</b>
                </p>
                <div>
                    <button className='button' onClick={handleReject}>Kabul Etmiyorum</button>
                    <button className='button' onClick={handleAccept}>Kabul Ediyorum</button>
                </div>
            </div>
        </div>
    );
}


export default Cookies;
