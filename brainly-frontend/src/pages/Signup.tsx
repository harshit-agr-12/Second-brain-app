
import { useRef } from "react";  
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signup(){
        const username =   usernameRef.current?.value;
        const password =   passwordRef.current?.value;
        

        await axios.post('http://localhost:4000/api/v1/signup', { username : username , password : password})
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log('Error adding user:', error)
        })

        navigate('/signin');
        if(usernameRef.current && passwordRef.current){
            usernameRef.current.value = "";
            passwordRef.current.value= "";
        }

            
    }

    return(
    <div className="h-screen  w-screen bg-gray-200 flex justify-center items-center"> 
        <div className="bg-white rounded-xl p-8 border-gray min-w-48 ">
            <Input placeholder="Username" ref={usernameRef}/>
            <Input placeholder="Password"ref={passwordRef} />
            <div className="flex justify-center">
                <Button variant="primary" size="lg" text="Signup" fullWidth={true} onClick={signup}/>
            </div>
        </div>
    </div>)
}