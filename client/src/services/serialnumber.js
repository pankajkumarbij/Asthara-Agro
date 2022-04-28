import {url} from '../utils/url';
import axios from 'axios';
//retrive all serial number
export const all_serial_number = () => {
    return axios.get(url + '/retrieve_sn')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}