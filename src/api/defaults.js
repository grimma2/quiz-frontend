import axios from 'axios'

export const ax = axios.create({
  baseURL: `${location.protocol}//localhost:8000/api/v1/`
})
