import { useState, useRef } from 'react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button';
import axios from 'axios';

export function Query({ open, onClose }: { open: boolean, onClose: () => void }) {
    // This component is for querying the brain database
    // It will have an input field for the query and a button to submit the query
    // The results will be displayed in a list below the input field
    // The query will be sent to the backend and the results will be displayed in the list
    // The component will be used in the Dashboard page
    // The query will be a simple text input and the results will be a list of items

    const queryRef = useRef<HTMLInputElement>(null);
    const [result , setResult] = useState<string | unknown>("");

    async function queryDB() {
        const query = queryRef.current?.value;

        const response = await axios.post('http://localhost:4000/api/v1/brain/query', { query: query })
        const Result = response.data?.result;
        setResult(Result);
    }
    return (open && <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
        <h1 className='text-2xl font-bold'>Query Your Brain</h1>
        <div className='flex'>
            <Input
            ref={queryRef}
            placeholder='Enter your query here'
            />
            <Button
                text='Query'
                variant='primary'
                size='md'
                onClick={queryDB}
            />
        </div>
        <div className='w-1/2 h-64 border border-gray-300 rounded-md p-4 overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-2'>Results:</h2>
            <div className='text-gray-700'>
                {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
            </div>
        </div>
    </div>
    )
}