import axios from 'axios';

export default axios.create({
    //baseURL: 'http://localhost:8080'
        //baseURL: 'https://hipocampbackend-5.onrender.com'
        baseURL: 'http://ec2-52-40-245-130.us-west-2.compute.amazonaws.com:9090/'

})
