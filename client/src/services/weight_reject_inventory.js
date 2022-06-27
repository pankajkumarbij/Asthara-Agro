import {url} from '../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const all_weight_reject_inventory = () => {
    return axios.get(url + '/retrive_weight_reject_inventory')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const weight_reject_inventory_by_id = (id) => {
    return axios.get(url + '/retrive_weight_reject_inventory_by_id/' +id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}