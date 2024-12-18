import axios from 'axios';
import { param } from '../../../backend/routes/Donation_setting';

export async function sendLogin(fromData) {
    try{
        const response = await axios.post(
            'http://localhost:5000/users/login',
            fromData
        );
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

export async function createDonation(fromData) {
    const accessToken = localStorage.getItem('accessToken');
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };
    try{
        const response = await axios.post(
            'http://localhost:5000/donations/create',
            fromData,
            config
        );
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}

export async function getDonations(){
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        params: {
            id: userId,
        }
    };
    try{
        const response = await axios.get(
            'http://localhost:5000/donations/user',
            config
        );
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}