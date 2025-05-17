import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Blog from './Blog';
import Loading from './Loading';
import BlogService from "../services/BlogService";
import CategoryService from "../services/CategoryService";

function BlogList() {
    const { category } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [categoryResponse, setCategory] = useState(null);

    const fetchBlogs = async (pageNumber, isInitial = false) => {
        isInitial ? setInitialLoading(true) : setLoadMoreLoading(true);
        try {
            const response = category
                ? await BlogService.GetBlogsByCategory(category, pageNumber)
                : await BlogService.GetBlogsPage(pageNumber);

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
        if (!category) return;
        const Retrieve = async () => {
            setInitialLoading(true);
            try {
                const response = await CategoryService.CategoryBySlug(category);
                setCategory(response.name);
            } catch (error) {
                console.error("Kategori verisi alınamadı:", error);
            } finally {
                setInitialLoading(false);
            }
        };
        Retrieve();
    }, [category]);

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
            <h2>{categoryResponse ? `${categoryResponse}` : 'Tüm Bloglar'}</h2>
            <div className='blog'>
                {initialLoading && <Loading />}
                {blogs.length > 0 ? (
                    blogs.map((blog, index) => <Blog key={`${blog.slug}-${index}`} blog={blog} />)
                ) : (
                    !initialLoading && <p className='not-found'>{category ? `Bu kategoriye ait blog bulunamadı.` : `Blog bulunamadı.`}</p>
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

export default BlogList;
