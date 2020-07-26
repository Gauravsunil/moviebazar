import axios from 'axios'

export const register=newUser=>{
    return axios
    .post('users/register',{
        first_name:newUser.first_name,
        last_name:newUser.last_name,
        email:newUser.email,
        password:newUser.password
    })
    .then(res=>{
        console.log("Registered!");
        console.log(res);

    })
}

export const searchmovie=newSearch=>{
    return axios
    .post('users/search',{
        movie:newSearch.movie
    })
    .then(res=>{
        console.log("Search Successfull!");
        console.log(res);
        
    })
}
