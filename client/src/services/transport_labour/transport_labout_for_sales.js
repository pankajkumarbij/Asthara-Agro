import {url} from '../../utils/url';
import axios from 'axios';
//retrieve all customer addresses
export const transport_labour_for_sales = () => {
    return axios.get(url + '/retrieve_transport_labour_for_sales')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

export const transport_labour_for_sales_by_id = (id) => {
    return axios.get(url + '/retrieve_transport_labour_for_sales_by_Id/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err));
};

