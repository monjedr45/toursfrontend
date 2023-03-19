import axios from "axios";

export const useUser = () => {


    const getUser = async ( token ) => {
        const res = await axios({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
            url: 'http://localhost:3000/api/v1/users/me',
        });
        return  res.data.data.doc
    }
   

    return { getUser }
}