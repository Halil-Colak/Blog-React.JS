import api from "../config/api";

const AuthService = {
    async Login(formData) {
        const response = await api.post('/Auth/Login', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    async Register(formData) {
        const response = await api.post('/Auth/Register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    async ConfirmEmail(email, token) {
        const response = await api.get(`/Auth/ConfirmEmail?email=${email}&token=${token}`);
        return response.data;
    },

    async ForgotPassword(formData) {
        const response = await api.post('/Auth/ForgotPassword', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    async ResetPassword(formData) {
        const response = await api.post('/Auth/ResetPassword', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
};

export default AuthService;
