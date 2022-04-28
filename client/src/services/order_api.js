import {url} from '../utils/url';
import axios from 'axios';
//retrive all items
export const allOrder = () => {
    return axios.get(url + '/retrive_all_order')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all oreder by status 
export const Order_by_status = (status) => {
    return axios.get(url + '/retrive_orders_by_status/'+ status)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all oreder by id 
export const Order_by_id = (id) => {
    return axios.get(url + '/retrive_order/'+ id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
export const OrderSummary = () => {
    return axios.get(url + '/retrive_all_order_item_summary')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
export const OrderSummary_by_id = (id) => {
    return axios.get(url + '/retrive_all_order_item_summary_by_id/'+id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive_all_completed_order
export const all_completed_order = () => {
    return axios.get(url + '/retrive_all_completed_order')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive_all_order
export const order_item_summary_quantity = (id) => {
    return axios.get(url + '/retrive_order_item_summary_quantity/'+id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive_all_completed_order by id
export const all_completed_order_by_id = (id) => {
    return axios.get(url + '/retrive_all_order_item_summary_by_id/'+id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive_all_completed_order by id
export const all_pending_purchase_order = () => {
    return axios.get(url + '/retrive_all_pending_purchase_order')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive_all_completed_order by id
export const purchase_order_by_id = (id) => {
    return axios.get(url + '/retrive_purchase_order/'+ id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const purchase_order= () => {
    return axios.get(url + '/retrive_all_purchase_order')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const all_accepted_purchase_order= () => {
    return axios.get(url + '/retrive_all_accepted_purchase_order')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const all_confirm_purchase_order_by_id= (id) => {
    return axios.get(url + '/retrive_purchase_order_confirm/'+id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const all_confirm_purchase_order= () => {
    return axios.get(url + '/retrive_all_purchase_order_confirm')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const all_pending_confirm_purchase_order= () => {
    return axios.get(url + '/retrive_all_pending_purchase_order_confirm')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const all_accepted_confirm_purchase_order= () => {
    return axios.get(url + '/retrive_all_accepted_purchase_order_confirm')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
