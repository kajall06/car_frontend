import axios from "axios"

const API = axios.create({
  baseURL: "https://car-backend-1-hsbv.onrender.com/api"
})

export default API