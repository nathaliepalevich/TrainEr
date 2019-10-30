
import axios from 'axios'

export default {
     getFilters
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? ''
    : '//localhost:3000' 
async function getFilters() { 
     const { data } = await axios.get(`${BASE_URL}/api/filter/getfilter`)  
     return data
}


