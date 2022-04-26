import {url} from '../../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const order_status = () => {
    return axios.get(url + '/retrive_order_status')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

export const order_status_by_id = (id) => {
    return axios.get(url + '/retrive_order_status_by_id/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

export const order_status_by_orderId = (id) => {
    return axios.get(url + '/retrive_order_status_by_orderId/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

