import React, { useEffect, useState } from 'react';
import BlogList from '../component/BlogList';
import PopularBlogList from '../component/PopularBlogList';
import '../css/Home.css';
import Catagory from '../component/Catagory';
import { useAuth } from '../helper/AuthContext';
import { Helmet } from 'react-helmet';
import axios from 'axios';

function Home() {
    const { isAuthenticated, user } = useAuth();

    return (
        <>
            <section id="catagory-container">
                {isAuthenticated ? (
                    <h1>Hoşgeldin {user.name} {user.surnName} 🎉</h1>
                ) : (
                    <h1>Keşfet, Öğren, İlham Al</h1>
                )}
                <p>En yeni içerikler ve popüler bloglarla bilgiye dair her şey burada!</p>
                <Catagory />
            </section>
            <section id='blog-container' className='section-width blog-container'>
                <BlogList />
            </section>

            <section id='popular-blog-container' className='section-width blog-container'>
                <PopularBlogList />
            </section>
        </>
    );
}

export default Home;
