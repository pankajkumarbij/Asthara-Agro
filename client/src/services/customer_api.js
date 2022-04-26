import {url} from '../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const all_customer_addresses = (customerId) => {
    return axios.get(url + '/retrieve_customer_address_by_customerId/' + customerId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};
//retrieve customer address by id
export const customer_address_by_id = (id) => {
    return axios.get(url + '/retrieve_customer_address/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

//retrieve all items using customer id
export const all_customer_items_by_id = (customerId) => {
    return axios.get(url + '/retrieve_customer_address_by_customerId/' + customerId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

//retrieve all items using id
export const all_customer_items_by_itemid = (id) => {
    return axios.get(url + '/retrive_customer_item/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};
