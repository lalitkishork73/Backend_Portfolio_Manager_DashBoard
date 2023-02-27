import axios from 'axios';


const BASE_URL = "http://localhost:3001/"
const options = {
    params: {
        maxResults: '50'
    },
    headers: {
        
    }
};


const fetchFromAPI = async (url:string) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/${url}`, options);
        return data;
    } catch (err:any) {
        console.log(err.message);
    }
}

export default fetchFromAPI;    