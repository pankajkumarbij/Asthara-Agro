import {url} from '../../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const recieved_from_buyer = () => {
    return axios.get(url + '/retrive_rfb')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const recieved_from_buyer_by_id = (id) => {
    return axios.get(url + '/retrive_rfb_by_id/' +id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
