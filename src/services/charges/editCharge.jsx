import api from '../api';
import { getItem } from '../../utils/storage';

export default async (body, id) => {
    let data = {};
    const token = getItem('token');
    try {

        const response = await api.put(`/charges/${id}`, body, {
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