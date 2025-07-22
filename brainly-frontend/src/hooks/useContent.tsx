import { useEffect, useState } from "react";
import axios from "axios";

export function useContent(){
    const [contents , setContents] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:4000/api/v1/content',{
            headers :{
                "Authorization" : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setContents(response.data?.content)
        })

    },[])

    return contents;
}