import {url} from '../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const all_reject_inventory = () => {
    return axios.get(url + '/retrive_reject_inventory')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const reject_inventory_by_id = (id) => {
    return axios.get(url + '/retrive_reject_inventory_by_id/' +id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}