import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../services/CustomerService';
import Loading from '../component/Loading';
import Blog from '../component/Blog';
import DefauptPP from "../assets/default.png";

function CustomerBlogComment() {
    const { customerSlug } = useParams();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(8);
    const [hasMore, setHasMore] = useState(true);

    const [initialLoading, setInitialLoading] = useState(true);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);

    const navigate = useNavigate();

    const fetchData = async (pageNumber) => {
        pageNumber === 1 ? setInitialLoading(true) : setLoadMoreLoading(true);
        try {
            const response = await CustomerService.CommentBlogs(customerSlug, pageNumber, size);
            if (response.status) {
                if (response.data?.length > 0) {
                    setData(prev => [...prev, ...response.data]);
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Yorumlu bloglar alınırken hata:", error);
        } finally {
            pageNumber === 1 ? setInitialLoading(false) : setLoadMoreLoading(false);
        }
    };

    useEffect(() => {
        setData([]);
        setPage(1);
        fetchData(1);
    }, [customerSlug]);

    useEffect(() => {
        if (page > 1) fetchData(page);
    }, [page]);

    const loadMoreBlogs = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div id='profile-comment-container'>
            {initialLoading && <Loading />}
            {!initialLoading && data.length === 0 && (
                <p className='not-found'>Yorum bulunamadı.</p>
            )}
            {data.map((blog, index) => (
                <Link to={`/blog-detay/${blog.slug}`} className='profile-comment-box' key={index}>
                    {/* <div>
                        <div>
                            <h5>{blog.title}</h5>
                            <p>{blog.description}</p>
                        </div>
                        <img src={import.meta.env.VITE_API_IMAGE_URL + blog.imageUrl} alt="" loading='lazy' width={50} />
                    </div> */}

                    <Blog blog={blog} />
                    <div>
                        {blog.comments.map((comment, i) => {
                            const formattedDate = new Date(comment.createdDateTime).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            });
                            return (
                                <div key={i} className='comment-box'>
                                    <div className="profil-box">
                                        {blog.customer.profilPhoto ? (
                                            <img src={import.meta.env.VITE_API_BASE_URL + blog.customer.profilPhoto} alt="" loading='lazy' />
                                        ) : (
                                            <img src={DefauptPP} alt="" loading='lazy' />
                                        )}
                                        <p>{blog.customer.name} {blog.customer.surnName} <span>{formattedDate}</span></p>
                                    </div>
                                    <p className='comment-html-prew' dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                                </div>
                            );
                        })}
                    </div>
                </Link>
            ))}
            {hasMore && !loadMoreLoading && (
                <button className='blog-more-btn button' onClick={loadMoreBlogs}>Daha Fazla</button>
            )}
            {loadMoreLoading && (
                <button className='blog-more-btn button' disabled>Yükleniyor...</button>
            )}
        </div>
    );
}

export default CustomerBlogComment;
