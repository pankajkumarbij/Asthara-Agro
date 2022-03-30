import {url} from '../utils/url';
import axios from 'axios';
//retrieve all vendor addresses
export const all_vendor_addresses = (vendorId) => {
    return axios.get(url + '/retrieve_vendor_address_by_vendorId/' + vendorId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrieve vendor address by id
export const vendor_address_by_id = (id) => {
    return axios.get(url + '/retrieve_vendor_address/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrieve all items using vendor id
export const all_vendor_items_by_id = (vendorId) => {
    return axios.get(url + '/vendors_retrive_item/' + vendorId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrieve all items using vendor id and pincode
export const all_vendor_items_by_id_pincode = (vendorId, pincode) => {
    return axios.get(url + '/vendors_retrive_item_by_vendorid_pincode/' + vendorId + "/" + pincode)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrieve all items using id
export const all_vendor_items_by_itemid = (id) => {
    return axios.get(url + '/retrive_vendor_item/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrieve all items 
export const all_vendor_items = () => {
    return axios.get(url + '/vendors_retrive_all_item')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const vendor_by_low_price = (itemname,grade,vendorPoolId) => {
    return axios.get(url + '/retrive_vendor_item_by_name_grade_lower_price/'+itemname + "/" + grade + "/" + vendorPoolId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const vendor_items_by_access_details = (vendorid, itemname, grade) => {
    return axios.get(url + '/retrive_vendor_item_by_access_details/'+itemname + '/' + grade + '/' + vendorid)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

