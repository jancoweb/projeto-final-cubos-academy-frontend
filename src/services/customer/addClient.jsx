import api from '../api';
import { getItem } from '../../utils/storage';

export default async body => {
    let data = {};
    const token = getItem('token');
    try {
        const response = await api.post('/client', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        data = {
            message: response.data.message,
            error: false
        }

    } catch (error) {
        data = {
            message: error.response.data.message,
            error: true
        };
    }
    return data;
}