import api from '../api';
import { getItem } from '../../utils/storage';

export default async () => {
    let data = {};
    const token = getItem('token');
    try {
        const response = await api.get('/clients', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        data = {
            clients: response.data,
            error: false
        }

    } catch (error) {
        data = {
            message: error.response.data.message,
            error: true
        };
    }
    return data
}