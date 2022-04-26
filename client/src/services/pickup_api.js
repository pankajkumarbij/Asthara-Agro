import {url} from '../utils/url';
import axios from 'axios';
//retrive all items
export const all_pickup_assignment = () => {
    return axios.get(url + '/retrive_all_pickup_assignment')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};
//retrive all items
export const pickup_assignment_by_id = (id) => {
    return axios.get(url + '/retrive_pickup_assignment/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};
//retrive all items
export const pickup_assignment_confirm_by_id = (id) => {
    return axios.get(url + '/retrive_pickup_assignment_confirm/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};
//retrive all items
export const all_pending_pickup_assignment = () => {
    return axios.get(url + '/retrive_all_pending_pickup_assignment')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};
//retrive all items
export const all_accepted_pickup_assignment = () => {
    return axios.get(url + '/retrive_all_accepted_pickup_assignment')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};
//retrive all items
export const all_pending_pickup_assignment_confirmed = (id) => {
    return axios.get(url + '/retrive_all_pending_pickup_assignment_confirm')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

export const all_accepted_pickup_assignment_confirmed = () => {
    return axios.get(url + '/retrive_all_accepted_pickup_assignment_confirm_buyer')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

export const purchase_order_conformed_by_id = (id) => {
    return axios.get(url + 'retrive_purchase_order_confirm/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

export const all_pickup_orders_conformed = () => {
    return axios.get(url + '/retrive_all_pickup_assignment_confirm')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

export const completed_purchase_order_by_id = (id) => {
    return axios.get(url + 'retrive_completed_purchase_order/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

export const all_completed_purchase_orders = () => {
    return axios.get(url + '/retrive_completed_purchase_orders')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};
