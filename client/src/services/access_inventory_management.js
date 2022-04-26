import {url} from '../utils/url';
import axios from 'axios';
//retrive all Access Inventory Items
export const all_aim = () => {
    return axios.get(url + '/retrieve_excess_inventory_details')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};
