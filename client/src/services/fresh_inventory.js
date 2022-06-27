import {url} from '../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const all_fresh_inventory = () => {
    return axios.get(url + '/retrive_fresh_inventory')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const fresh_inventory_by_id = (id) => {
    return axios.get(url + '/retrive_fresh_inventory_by_id/' +id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}