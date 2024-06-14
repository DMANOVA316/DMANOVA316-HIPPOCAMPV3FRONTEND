import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080'
        //baseURL: 'https://hipocampbackend-5.onrender.com'

})
