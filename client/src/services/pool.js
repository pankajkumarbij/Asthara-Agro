import {url} from '../utils/url';
import axios from 'axios';
//retrive all customer pools
export const all_customer_pools = () => {
    return axios.get(url + '/retrieve_customer_pools')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all customer pool by id
export const customer_pool_by_id = (id) => {
    return axios.get(url + '/retrieve_customer_pool/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all vendor pools
export const all_vendor_pools = () => {
    return axios.get(url + '/retrieve_vendor_pools')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all vendor pool by id
export const vendor_pool_by_id = (id) => {
    return axios.get(url + '/retrieve_vendor_pool/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all customer vendor pools
export const all_customer_vendor_pools = () => {
    return axios.get(url + '/retrieve_vendor_customer_cross_pools')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all customer vendor pool by id
export const customer_vendor_pool_by_id = (id) => {
    return axios.get(url + '/retrieve_vendor_custmer_cross_pool/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all manager pools
export const all_manager_pools = () => {
    return axios.get(url + '/retrieve_manager_pools')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all manager pool by id
export const manager_pool_by_id = (id) => {
    return axios.get(url + '/retrieve_manager_pool/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all customer manager pools
export const all_customer_manager_pools = () => {
    return axios.get(url + '/retrieve_manager_customer_cross_pools')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all customer manager pool by id
export const customer_manager_pool_by_id = (id) => {
    return axios.get(url + '/retrieve_manager_custmer_cross_pool/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all customer manager pool by manager pool id
export const customer_manager_pool_by_manager_pool_id = (id) => {
    return axios.get(url + '/retrieve_cross_pool_by_manager_pool_id/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}