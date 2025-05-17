import api from "../config/api";


const ReportService = {
    async Add(formData) {
        const response = await api.post('/Report/Add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data
    },

};

export default ReportService;
