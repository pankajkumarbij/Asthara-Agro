import {url} from '../../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const transport_labour_from_vendor = () => {
    return axios.get(url + '/retrieve_transport_labour_from_vendor')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

export const transport_labour_from_vendor_by_id = (id) => {
    return axios.get(url + '/retrieve_transport_labour_from_vendor_by_Id/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};
