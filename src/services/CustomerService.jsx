import api from "../config/api";


const CustomerService = {
    async GetBySlug(customerSlug) {
        const response = await api.get(`/Customer/GetBySlug?slug=${customerSlug}`);
        return response.data;
    },
    async Update(formData) {
        const response = await api.post('/Customer/Update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data
    },
    async LikeBlogs(slug, page, size) {
        const response = await api.get(`/Customer/CustomerLikeBlog?slug=${slug}&page=${page}&pageSize=${size}`);
        return response.data;
    },
    async CommentBlogs(slug, page, size) {
        const response = await api.get(`/Customer/CustomerCommentBlog?slug=${slug}&page=${page}&pageSize=${size}`);
        return response.data;
    },
};

export default CustomerService;
