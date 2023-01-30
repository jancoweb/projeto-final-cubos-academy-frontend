import api from '../api';
import { getItem } from '../../utils/storage';
import formatName from '../../utils/format/formatName';
formatName
import capitalizeName from '../../utils/format/capitalizeName';

export default async body => {
    let data = {};
    const token = getItem('token');

    const firstName = formatName(body.first_name);
    const lastName = formatName(body.last_name);
    body.first_name = await capitalizeName(firstName);
    body.last_name = await capitalizeName(lastName);

    try {
        const response = await api.put('/user', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        data = {
            message: response.data.message,
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