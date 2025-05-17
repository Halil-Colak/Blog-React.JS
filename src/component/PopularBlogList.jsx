import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Blog from './Blog';
import CategoryService from '../services/CategoryService';
import BlogService from '../services/BlogService';

function PopularBlogList() {
    const { category } = useParams();
    const [categoryResponse, setCategory] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    // Kategori bilgisi çekme
    useEffect(() => {
        if (!category) return;
        const Retrieve = async () => {
            setInitialLoading(true);
            try {
                const response = await CategoryService.CategoryBySlug(category);
                setCategory(response.data);
            } catch (error) {
                console.error("Kategori bilgisi alınamadı:", error);
            } finally {
                setInitialLoading(false);
            }
        };
        Retrieve();
    }, [category]);

    const fetchBlogs = async (pageNumber, isInitial = false) => {
        isInitial ? setInitialLoading(true) : setLoadMoreLoading(true);
        try {
            const response = category
                ? await BlogService.GetPopularBlogsByCategory(category, pageNumber)
                : await BlogService.GetPopularBlogsByNotCategory(pageNumber);

            if (response.data?.length > 0) {
                setBlogs(prevBlogs => [...prevBlogs, ...response.data]);
                setHasMore(true);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('API Hatası:', error);
        } finally {
            isInitial ? setInitialLoading(false) : setLoadMoreLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        setBlogs([]);
        fetchBlogs(1, true);
    }, [category]);

    useEffect(() => {
        if (page > 1) fetchBlogs(page, false);
    }, [page]);

    const loadMoreBlogs = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <h2>{categoryResponse ? `${categoryResponse.name} Popüler Bloglar` : 'Popüler Bloglar'}</h2>
            <div className='blog'>
                {initialLoading && <Loading />}
                {!initialLoading && blogs.length > 0 ? (
                    blogs.map((blog) => <Blog key={blog.slug} blog={blog} />)
                ) : (
                    !initialLoading && <p className='not-found'>{category ? `Bu kategoriye ait popüler blog bulunamadı.` : `Popüler blog bulunamadı.`}</p>
                )}
                {hasMore && !initialLoading && (
                    <button
                        className='blog-more-btn button'
                        onClick={loadMoreBlogs}
                        disabled={loadMoreLoading}
                    >
                        {loadMoreLoading ? 'Yükleniyor...' : 'Daha Fazla'}
                    </button>
                )}
            </div>
        </>
    );
}

export default PopularBlogList;
