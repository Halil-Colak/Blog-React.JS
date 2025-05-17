import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../services/CustomerService';
import Loading from '../component/Loading';
import Blog from '../component/Blog';

function CustomerBlogLike() {
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
            const response = await CustomerService.LikeBlogs(customerSlug, pageNumber, size);
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
            console.error("Beğeniler alınırken hata:", error);
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
        <div className='blog'>
            {initialLoading && <Loading />}
            {!initialLoading && data.length === 0 && (
                <p className='not-found'>Beğeni bulunamadı.</p>
            )}
            {data.map((blog, index) => (
                <Blog key={`${blog.slug}-${index}`} blog={blog} />
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

export default CustomerBlogLike;
