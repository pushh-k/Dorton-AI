import axios from 'axios'
import { API_BASE_URL } from '../../../app/apiBase.js'


const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials:true
})

// Cross-site auth cookies may be blocked by browser privacy settings. Keep the
// login token as a fallback and attach it to every protected request.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('dorton_auth_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})



export async function login({email,password}){
    
    const res = await api.post('api/auth/login',{email,password})
    return res.data 
}

export async function register({email,username,password}){
    const res = await api.post('api/auth/register',{
        email,username,password
    })
    return res.data
}
export async function getme(){
   const res= await api.get('api/auth/get-me')
   return res.data
}

export async function logout(){
   const res = await api.post('api/auth/logout')
   return res.data
}

export async function deleteAccount(){
   const res = await api.delete('api/auth/delete')
   return res.data
}
