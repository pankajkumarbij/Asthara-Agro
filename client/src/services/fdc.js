import {url} from '../utils/url';
import axios from 'axios';

export const all_fdcs = () => {
    return axios.get(url + '/retrieve_fdc')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

export const fdc_by_id = (id) => {
    return axios.get(url + '/retrieve_fdc_by_id/' +id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}