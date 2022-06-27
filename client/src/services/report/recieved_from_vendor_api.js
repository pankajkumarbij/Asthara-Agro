import {url} from '../../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const recieved_from_vendor = () => {
    return axios.get(url + '/retrive_rfv')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const recieved_from_vendor_by_id = (id) => {
    return axios.get(url + '/retrive_rfv_by_id/' +id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
