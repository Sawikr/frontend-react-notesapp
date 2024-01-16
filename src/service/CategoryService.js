import axios from 'axios';
import {BASE_URL} from '../http-common';

export const getAll = () =>
    axios.get(BASE_URL + '/notes/category')

export const get = id =>
    axios.get(BASE_URL + `/notes/category${id}`)

export const createCategory = data =>
    axios.post(BASE_URL + '/notes/category', data)

export const saveCategory = (category) => sessionStorage.setItem("category", category);

export const getCategory = () => {
    let category;
    return category = sessionStorage.getItem("category");
}

export const setCategoryToken = (setCategory) => sessionStorage.setItem("setCategory", setCategory);

export const getSetCategoryToken = () => sessionStorage.getItem("setCategory");

export const updatedCategoryToken = (updatedCategory) => sessionStorage.setItem("updatedCategory", updatedCategory);

export const getUpdatedCategoryToken = () => sessionStorage.getItem("updatedCategory");

export function getSelectCategory() {
    return <>
        <option value="all">All categories</option>
        <option value="congregation">Congregation</option>
        <option value="circuit">Circuit</option>
        <option value="letters">Letters</option>
        <option value="meeting">Meeting</option>
        <option value="talk">Public talk</option>
        <option value="programming">Programming</option>
        <option value="other">Other</option>
        <option value="vacation">Vacation</option>
        <option value="visits">Visits</option>
    </>;
}

// eslint-disable-next-line
export default { getAll, get, createCategory };