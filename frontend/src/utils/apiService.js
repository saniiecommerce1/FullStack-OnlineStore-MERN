import axios from 'axios'

const apiService = axios.create({baseURL: process.env.REACT_APP_BASE_URL + '/api'})

export default apiService;