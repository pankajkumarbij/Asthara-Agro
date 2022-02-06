import {url} from '../utils/url';
import axios from 'axios';
//retrive users by category
export function all_users(host){
    return fetch(`http://${host}:5000/retrive_all_user`, {
         method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(allusers =>{
        return allusers;
    });
}
//retrive user by id
export const users_by_id = (userId) => {
    return axios.get(url + '/retrive_user/' + userId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive user by email
export const users_by_email = (email) => {
    return axios.get(url + '/retrive_user_by_email/' + email)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retrive all disabled users
export function disabled_users(host){
    return fetch(`http://${host}:5000/retrive_all_disabled_user`, {
            method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(allusers =>{
        return allusers;
    });
}
//retive all users by category
export const all_users_by_role = (role) => {
    return axios.get(url + '/retrive_user_by_role/' + role)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}
//retive all disabled users category
export function disabled_user_category(host){
    return fetch(`http://${host}:5000/retrive_all_disabled_user_category`, {
            method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(categories =>{
        return categories;
    });
}
//retive all disabled users category by id
export function disabled_all_disabled_user_category(host){
    return fetch(`http://${host}:5000/retrive_user_category`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(user => {
        return user;
    });
}
//retrive users address by user id
export function address_by_usersId(host,userId){
    return fetch(`http://${host}:5000/retrive_address_by_userId/${userId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(address => {
        return address;
    });
}
//retrive users address by user id
export function address_by_Id(host,addressId){
    return fetch(`http://${host}:5000/retrive_address/${addressId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(address => {
        return address;
    });
}
//retrive bank details by user id
export function bank_by_userId(host,userId){
    return fetch(`http://${host}:5000/retrive_bank_by_userId/${userId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(bank => {
        return bank;
    });
}
//retrive  user Category
export function user_category(host){
    return fetch(url+"/retrive_all_user_category", {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(userCategory => {
        return userCategory;
    });
}

//retrive user Address by userId
export function user_address(userId){
    return axios.get(url + '/retrive_address_by_userId/' + userId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive user Bank Details by userId
export function user_bank(userId){
    return axios.get(url + '/retrive_bank_by_userId/' + userId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}