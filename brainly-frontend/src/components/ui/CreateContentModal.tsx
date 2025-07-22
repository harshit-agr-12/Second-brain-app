import { useRef, useState } from "react"
import { CrossIcon } from "../../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import axios from "axios"

enum contentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export const CreateContentModal = ({ open, onClose }) => {

    

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type , setType ] = useState(contentType.Twitter);

    async function handleSubmit(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        await axios.post('http://localhost:4000/api/v1/content',{
            title : title,
            link : link,
            type : type
        },{
            headers : {
                "Authorization" : localStorage.getItem('token')
            }
        })
        onClose();
    }

    return <div>
        {open && <div> <div className="z-1 fixed  bg-slate-500 h-screen w-screen opacity-60" onClick={onClose}>
        </div>

            <div className="z-2 fixed  flex-col justify-center bg-white opacity-100 p-4 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

                <div className="flex justify-end p-2">
                    <span onClick={onClose} className="relative  top-0   cursor-pointer bg-gray-400 rounded p-1 hover:bg-gray-500 transition-colors duration-300">
                        <CrossIcon />
                    </span>
                </div>
                <Input placeholder="Title" ref={titleRef}/>
                <Input placeholder="Link" ref={linkRef} />
                <h1 className="text-center py-2 text-xl ">Type</h1>
                <div className="flex justify-center">
                    <Button text="Youtube" size="md" variant={type === contentType.Youtube ? "primary" : "secondary"} onClick={()=>{
                        setType(contentType.Youtube)
                    }} />
                    <Button text="Twitter" size="md" variant={type === contentType.Twitter ? "primary" : "secondary"} onClick={()=>{
                        setType(contentType.Twitter)
                    }}/>
                </div>
                <div className="flex justify-center p-4">
                    <Button variant="primary" text="Submit" size="md" onClick={handleSubmit}/>
                </div>

            </div>
        </div>
        }

    </div>
}