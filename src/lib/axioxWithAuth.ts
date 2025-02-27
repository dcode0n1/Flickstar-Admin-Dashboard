import axios from 'axios';


export const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/admin';
export default async function axiosWithAuth(url: string, method: string = 'get', data: Record<string, unknown> | null = null): Promise<any> {
    try {
        const response = await axios({
            method: method,
            url: `${baseURL}/${url}`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            data
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};