import {url} from '../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const all_deliveries = () => {
    return axios.get(url + '/retrieve_delivery')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const delivery_by_id = (id) => {
    return axios.get(url + '/retrieve_delivery_by_Id/' +id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}