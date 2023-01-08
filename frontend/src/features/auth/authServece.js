import axios from 'axios'
// we can do asynchronous http request to rest end point.
//we can fatch the data from API ( upgrad version of fatch method)

const API_URL = '/api/users'

//Register User 
const register = async (userData) => {
    const response = await axios.post(API_URL,userData);

    if(response.data) {
        //Sotring data inside localStorage 
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response.data;
}

//login user
const login = async (userData) => {
    const response = await axios.post(API_URL + '/login',userData);
    console.log(response);
    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response.data;
}

const logout = () => localStorage.removeItem('user')

const authService =  {
    register,
    logout,
    login,
}

export default authService