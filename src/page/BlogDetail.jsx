import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../component/Loading'
import "../css/BlogDetail.css"
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import BlogService from '../services/BlogService';
import { useAlert } from '../helper/AlertProvider';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useAuth } from '../helper/AuthContext';
import PopularBlogList from '../component/PopularBlogList';
import Comment from '../component/Comment';



function BlogDetail() {

    const { blogSlug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const { showAlert } = useAlert();
    const { isAuthenticated, user } = useAuth();


    useEffect(() => {
        hljs.highlightAll();
    }, []);

    //blog içeriğinı amak ıcın
    useEffect(() => {
        setLoading(true);
        const Retrieve = async () => {
            const response = await BlogService.GetBlogBySlug(blogSlug);
            setBlog(response.data);
            setLikeCount(response.data.blogLikes);
            setLoading(false);
        }
        Retrieve();
    }, [blogSlug]);
    //Kullanıcı daha once begenmıs mı kontroolu
    useEffect(() => {
        if (isAuthenticated) {
            const Retrieve = async () => {
                const response = await BlogService.IsBlogLiked(blogSlug, user.email)
                if (response.status) {
                    setLike(response.data);
                } else {
                    showAlert(response.message);
                }
            }
            Retrieve();
        }
    }, [blogSlug, isAuthenticated, user]);



    const BlogLike = async () => {
        if (!isAuthenticated) return showAlert("Giriş yapınız.")
        const response = await BlogService.BlogLike(blogSlug, user.email);
        if (response.status) {
            setLike(response.data)
            setLikeCount(prev => response.data ? prev + 1 : prev - 1);
        } else {
            showAlert(response.message)
        }
    }

    if (loading) {
        return <Loading />;
    }

    if (!blog) {
        return <p className="not-found">Blog bulunamadı.</p>;
    }

    const formattedDate = new Date(blog.createdDateTime).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <section className='section-width' id='blog-detail-section'>
            <img src={import.meta.env.VITE_API_IMAGE_URL + blog.imageUrl} alt="" loading='lazy' />
            <h1>{blog.title}</h1>
            <div className='profil-box'>
                <img src={import.meta.env.VITE_API_IMAGE_URL + blog.author.profileImage} alt="" loading='lazy' />
                {blog.author.name + " " + blog.author.surname}
            </div>
            <div className='profil-box-container'>
                <span>{formattedDate}</span>
                <div>
                    <span onClick={BlogLike} >
                        {likeCount}
                        {isAuthenticated ? (like ? <GoHeartFill className='go-heart-fill' /> : <GoHeart />) : (<GoHeart />)}
                    </span>
                </div>
            </div>
            <div id="blog-detail-content" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <div id='category-content'>
                {blog.categories && blog.categories.map((ct) => {
                    return <Link to={`/kategori/${ct.slug}`} className='category-tag' key={ct.slug}>{ct.name}</Link>
                })}
            </div>
            <Comment />
            <PopularBlogList />
        </section>
    );
}

export default BlogDetail;


