import api from '../api';

export default async body => {
    let data = {};
    try {
        const response = await api.post('/user', body);
        data = {
            user: response.data,
            error: false
        };
    } catch (error) {
        data = {
            message: error.response.data.message,
            error: true
        };
    }
    return data;
};