import React from 'react';
import '../css/NotFound.css';

function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Hata! Aradığınız sayfa mevcut değil.</p>
            <a href="/" className="button">Ana sayfaya dön</a>
        </div>
    );
}

export default NotFound;