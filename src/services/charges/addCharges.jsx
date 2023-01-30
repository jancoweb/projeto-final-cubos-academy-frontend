import api from '../api';
import { getItem } from '../../utils/storage';

export default async body => {
    let data = {};
    const token = getItem('token');
    try {

        const response = await api.post('/charge', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        data = {
            charges: response.data,
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