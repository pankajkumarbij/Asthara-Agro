import {url} from '../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const all_scrap_inventory = () => {
    return axios.get(url + '/retrive_scrap_inventory')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const scrap_inventory_by_id = (id) => {
    return axios.get(url + '/retrive_scrap_inventory_by_id/' +id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}