import React from 'react'
import { Link } from 'react-router-dom'
import '../css/blog.css'
import { GoHeart } from "react-icons/go";
import { LuDot } from "react-icons/lu";

function Blog({ blog }) {
    const formattedDate = new Date(blog.createdDateTime).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return (
        <Link to={`/blog-detay/${blog.slug}`} className='blog-cart'>
            <div>
                <div className='profil-box'>
                    <img src={import.meta.env.VITE_API_IMAGE_URL + blog.author.profileImage} alt="" loading='lazy' />
                    <p>
                        {blog.author.name + " " + blog.author.surname}
                    </p>
                </div>
                <h5>{blog.title}</h5>
                <p>{blog.description}</p>
                <span className='blog-dc-box'>
                    <span>
                        {blog.blogLikes}
                        <GoHeart />
                    </span>
                    <LuDot />
                    <span>{formattedDate}</span>
                </span>

            </div>
            <img src={import.meta.env.VITE_API_IMAGE_URL + blog.imageUrl} alt="" loading='lazy' />
        </Link>
    )
}

export default Blog