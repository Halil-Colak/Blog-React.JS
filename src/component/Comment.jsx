import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentService from '../services/CommentService';
import { RiItalic, RiBold } from "react-icons/ri";
import { PiPaperPlaneRightLight } from "react-icons/pi";
import Loading from './Loading';
import { useAuth } from '../helper/AuthContext';
import { useAlert } from '../helper/AlertProvider';
import { AiOutlineDelete } from "react-icons/ai";
import DefauptPP from "../assets/default.png"

function Comment() {
    const [data, setData] = useState([]);
    const { blogSlug } = useParams();
    const navigate = useNavigate();

    const editorRef = useRef(null);
    const [preview, setPreview] = useState("");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const { isAuthenticated, user } = useAuth();
    const { showAlert } = useAlert();

    const [initialLoading, setInitialLoading] = useState(true);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [size] = useState(8);
    const [hasMore, setHasMore] = useState(true);



    const applyFormat = (tag, isActive, setIsActive, otherFormatState, setOtherFormatState) => {
        if (otherFormatState) setOtherFormatState(false);
        if (document.queryCommandSupported(tag)) {
            document.execCommand(tag);
        }
        setIsActive(!isActive);
    };


    const fetchComments = async (pageNumber) => {
        pageNumber === 1 ? setInitialLoading(true) : setLoadMoreLoading(true);
        try {
            const response = await CommentService.TaretBlogComment(blogSlug, pageNumber, size);
            if (response.status) {
                if (response.data?.length > 0) {
                    setData(prev => [...prev, ...response.data]);
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }
            } else {
                navigate(`/`);
            }
        } catch (error) {
            console.error("Yorumları alırken hata:", error);
        } finally {
            pageNumber === 1 ? setInitialLoading(false) : setLoadMoreLoading(false);
        }
    };

    useEffect(() => {
        setData([]);
        setPage(1);
        fetchComments(1);
    }, [blogSlug]);

    useEffect(() => {
        if (page > 1) fetchComments(page);
    }, [page]);

    const loadMoreBlogs = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSubmit = async () => {
        if (!isAuthenticated) return showAlert("Yorum yazmak için giriş yapınız.", false);
        if (editorRef.current.innerHTML == "") return showAlert("Boş yorum gönderemezsiniz.", false);
        setSubmitLoading(true);
        let commentHtml = editorRef.current.innerHTML;
        commentHtml = commentHtml.replace(/<(?!\/?(p|b|i)\b)[^>]+>/g, '');

        const formData = new FormData();
        formData.append('content', commentHtml);
        formData.append('blogSlug', blogSlug);
        formData.append('customerSlug', user.slug);

        const response = await CommentService.Add(formData);

        if (response.status) {
            showAlert("Yorumunuz başarıyla gönderildi. Admin onayından geçmesi gerekiyor.");
            setSubmitLoading(false);
            editorRef.current.innerHTML = "";
        } else {
            showAlert("Bir hata oluştu, lütfen tekrar deneyin.", false);
        }
    };

    const handleDelete = async (commentId) => {
        const formData = new FormData();
        formData.append('commentId', commentId);
        formData.append('customerSlug', user.slug);
        debugger

        const response = await CommentService.Delete(formData);
        if (response.status) {
            showAlert(response.message, true);
            setData(prevData => prevData.filter(comment => comment.id !== commentId));
        } else {
            showAlert("Bir hata oluştu, lütfen tekrar deneyin.", false);
        }
    };


    if (submitLoading) {
        return <Loading />
    }
    return (
        <div id='comment-container'>
            <div id='comment-write'>
                <div className="profil-box">
                    {user ? (
                        <>
                            <img src={user.profilPhoto ? import.meta.env.VITE_API_BASE_URL + user.profilPhoto : DefauptPP} alt="" loading='lazy' />
                            {user.name + " " + user.surnName}
                        </>
                    ) : (
                        <>
                            <img src={DefauptPP} alt="" loading='lazy' />
                            Anonim
                        </>
                    )}
                </div>
                <div id='comment-write-box'>
                    <div ref={editorRef} contentEditable title="Düşüncelerinizi yazın😉" />
                    <div>
                        <div>
                            <button onClick={() => applyFormat("bold", isBold, setIsBold, isItalic, setIsItalic)} >
                                <RiBold />
                            </button>
                            <button onClick={() => applyFormat("italic", isItalic, setIsItalic, isBold, setIsBold)}>
                                <RiItalic />
                            </button>
                        </div>
                        <button onClick={handleSubmit} disabled={submitLoading}>
                            <PiPaperPlaneRightLight />
                        </button>
                    </div>
                </div>
            </div>
            <div id='comment-content'>
                {initialLoading ? (
                    <Loading />
                ) : (
                    <>
                        {data.length > 0 ? data.map((comment, index) => {
                            const formattedDate = new Date(comment.createdDateTime).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            });
                            const isOwner = isAuthenticated && comment.customer.slug === user.slug;

                            return (
                                <div className='comment-box' key={index}>
                                    <Link to={`/profil/${comment.customer.slug}/begeniler`} className="profil-box">
                                        <img src={comment.customer.profilPhoto ? import.meta.env.VITE_API_BASE_URL + comment.customer.profilPhoto : DefauptPP} alt="" loading='lazy' />
                                        <p>{comment.customer.name} {comment.customer.surnName} <span>{formattedDate}</span></p>
                                    </Link>
                                    <p className='comment-html-prew' dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                                    {isOwner && (
                                        <AiOutlineDelete onClick={() => handleDelete(comment.id)} className='detete-comment-icon' />
                                    )}
                                </div>
                            );
                        }) : <p className='not-found'>Henüz yorum yapılmamış.</p>}
                        {hasMore && !loadMoreLoading && (
                            <button className='blog-more-btn button' onClick={loadMoreBlogs}>Daha Fazla</button>
                        )}
                        {loadMoreLoading && <button className='blog-more-btn button' disabled>Yükleniyor...</button>}
                    </>
                )}
            </div>
        </div>
    );
}

export default Comment;
