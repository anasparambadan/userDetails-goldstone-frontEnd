import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });


export const createUsers = async(users) =>  await API.post("/user/create",users)
export const editUser = async(data) =>  await API.put("/user/edit/",data)
export const getUsers = async()=> await API.get('/user')
export const exportCsv = async(data)=> await API.post('user/exportCsv',data)
