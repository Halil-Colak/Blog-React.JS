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

            {/* <Helmet>
                <title>Ana Sayfa | Halil'in Blogu</title>
                <meta name="description" content="Halil'in blogunun ana sayfası." />
                <meta name="keywords" content="blog, halil, react, seo" />
                <meta property="og:title" content="Ana Sayfa | Halil'in Blogu" />
                <meta property="og:description" content="Halil'in blogunun ana sayfası." />
                <meta property="og:image" content="https://halil-blog.com/gorsel.jpg" />
                <meta property="og:url" content="https://halil-blog.com" />
            </Helmet> */}

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
