import api from "../config/api";


const CategoryService = {
    async CategoryBySlug(category) {
        const response = await api.get(`/Category/CategoryBySlug?slug=${category}`);
        return response.data;
    },
    async CategoryGetAll() {
        const response = await api.get('/Category/CategoryGetAll');
        return response.data;
    },

};

export default CategoryService;
