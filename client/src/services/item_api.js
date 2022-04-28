import {url} from '../utils/url';
import axios from 'axios';
//retrive all items
export const allitem = () => {
    return axios.get(url + '/retrive_all_item')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive item by item_Id
export const item_by_item_id = (itemId) => {
    return axios.get(url + '/retrive_item/' + itemId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all disabled items
export const all_disabled_item = () => {
    return axios.get(url + '/retrive_all_disabled_items')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all item grade
export const item_grade = () => {
    return axios.get(url + '/retrive_all_item_grade')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all disabled items
export const all_disabled_item_grade= () => {
    return axios.get(url + '/retrive_all_disabled_item_grade')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all item grade by id
export const item_grade_by_grade_id = (id) => {
    return axios.get(url + '/retrive_item_grade/'+id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all item Categories
export const item_all_category = () => {
    return axios.get(url + '/retrive_all_item_category')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all items category by id
export const item_category_by_id = (id) => {
    return axios.get(url + '/retrive_item_category/'+id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all disabled item categories

export const all_disabled_item_category = () => {
    return axios.get(url + '/retrive_all_disabled_item_category')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all item units
export const item_unit = () => {
    return axios.get(url + '/retrive_all_item_unit')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all item disabled units
export const item_unit_diasabled = () => {
    return axios.get(url + '/retrive_all_disabled_item_unit')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all item units by id
export const item_unit_by_unitid = (id) => {
    return axios.get(url + '/retrive_item_unit/'+id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
