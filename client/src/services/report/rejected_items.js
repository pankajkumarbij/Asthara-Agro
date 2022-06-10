import {url} from '../../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const Rejected_Items = () => {
    return axios.get(url + '/retrive_rejected_items')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const Rejected_Item_by_id = (id) => {
    return axios.get(url + '/retrive_rejected_item/' +id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
