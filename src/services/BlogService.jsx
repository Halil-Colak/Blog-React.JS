import api from "../config/api";


const BlogService = {
    async GetBlogsByCategory(category, pageNumber) {
        const response = await api.get(`/Blog/GetBlogsByCategory?categorySlug=${category}&page=${pageNumber}&pageSize=8`);
        return response.data;
    },
    async GetBlogsPage(pageNumber) {
        const response = await api.get(`/Blog/GetBlogsPage?page=${pageNumber}&pageSize=8`);
        return response.data;
    },

    async GetBlogBySlug(blogSlug) {
        const response = await api.get(`/Blog/GetBlogBySlug?slug=${blogSlug}`);
        return response.data;
    },

    async Search(query, pageNumber) {
        const response = await api.get(`/Blog/Search?text=${query}&page=${pageNumber}&pageSize=8`);
        return response.data;
    },

    async GetRandomBlog() {
        const response = await api.get(`/Blog/GetRandomBlog`);
        return response.data;
    },

    async GetPopularBlogsByCategory(category, pageNumber) {
        const response = await api.get(`/Blog/GetPopularBlogsByCategory?page=${pageNumber}&pageSize=8&slug=${category}`);
        return response.data;
    },
    async GetPopularBlogsByNotCategory(pageNumber) {
        const response = await api.get(`/Blog/GetPopularBlogsByCategory?page=${pageNumber}&pageSize=8`);
        return response.data;
    },
    async BlogLike(slug, email) {
        const response = await api.get(`/Blog/BlogLike?slug=${slug}&email=${email}`);
        return response.data;
    },

    async IsBlogLiked(slug, email) {
        const response = await api.get(`/Blog/IsBlogLiked?slug=${slug}&email=${email}`);
        return response.data;
    },
};

export default BlogService;
