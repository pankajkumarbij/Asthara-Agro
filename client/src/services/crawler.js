import {url} from '../utils/url';
import axios from 'axios';

//retrive Crawlers by item name
export const retrieve_crawler_by_item_name = (item_name) => {
    return axios.get(url + '/retrieve_crawler_by_item_name/' + item_name)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}