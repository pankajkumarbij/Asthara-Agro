import {url} from '../../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const Delivered_orders = () => {
    return axios.get(url + '/retrive_delivered_orders')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const Delivered_order_by_id = (id) => {
    return axios.get(url + '/retrive_delivered_order/' +id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
