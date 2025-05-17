import api from "../config/api";


const CommentService = {
    async Add(formData) {
        const response = await api.post('/Comment/Add', formData);
        return response.data;
    },
    async TaretBlogComment(blogSlug, page, size) {
        const response = await api.get(`/Comment/TaretBlogComment?slug=${blogSlug}&page=${page}&pageSize=${size}`);
        return response.data;
    },

    async Delete(formData) {
        const response = await api.post('/Comment/Delete', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    },
};

export default CommentService;
