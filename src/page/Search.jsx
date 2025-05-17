import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import Catagory from '../component/Catagory';
import "../css/Search.css";
import api from '../config/api';
import Blog from "../component/Blog";
import Loading from "../component/Loading";
import { useAlert } from '../helper/AlertProvider';
import BlogService from '../services/BlogService';

function Search() {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const { showAlert } = useAlert();


    const fetchBlogs = async (pageNumber, query) => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const Retrieve = async () => {
                const response = await BlogService.Search(query, pageNumber)
                if (response.data?.length > 0) {
                    setBlogs(pageNumber === 1 ? response.data : prev => [...prev, ...response.data]);
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }
            }
            Retrieve();
        } catch (error) {
            console.error('API Hatası:', error);
            showAlert("Beklenmedik hata", false);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setBlogs([]);
        setIsSearched(true);
        fetchBlogs(1, searchText);
    };

    const loadMoreBlogs = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBlogs(nextPage, searchText);
    };

    return (
        <>
            <section id='search-container' className="section-width">
                <h1>Konuları keşfedin</h1>
                <p>Merak ettiğin konulara bir adım daha yakınsın!</p>
                <form onSubmit={handleSearch}>
                    <button type="submit"><FiSearch /></button>
                    <input
                        type="text"
                        placeholder='Tüm konuları ara'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </form>
                <div>
                    <Catagory />
                </div>
                <div className='blog' id='search-blog'>
                    {loading && <Loading />}
                    {blogs.length > 0 ? (
                        blogs.map((blog, index) => <Blog key={`${blog.slug}-${index}`} blog={blog} />)
                    ) : (!loading && isSearched && (
                        <p className="not-found" style={{ margin: "auto" }}>Sonuç bulunamadı.</p>
                    ))}
                    {hasMore && !loading && blogs.length > 0 && (
                        <button className='blog-more-btn button' onClick={loadMoreBlogs}>
                            Daha Fazla
                        </button>
                    )}
                </div>
            </section>
        </>
    );
}

export default Search;
