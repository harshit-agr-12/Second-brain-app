import {  useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card.js'
import { CreateContentModal } from '../components/ui/CreateContentModal.js'
import { Sidebar } from '../components/ui/Sidebar.js'
import { PlusIcon } from '../icons/PlusIcon.js'
import { ShareIcon } from '../icons/ShareIcon.js'
import { useContent } from '../hooks/useContent.js'
import { Query } from './Query.js'

function Dashboard() {

  const [open , setOpen] = useState(false);
  const [chatOpen , setChatOpen] = useState(false);
  const contents = useContent();

  function AddContentHandler(){
    setOpen(!open);
  }

  function chatBot(){
    setChatOpen(!chatOpen);
  }

  return (
    <div>
      <CreateContentModal open={open} onClose={AddContentHandler}/>
      <div className='flex justify-end'>
        <Sidebar />
        <Button text="Share Brain" variant="secondary" size="md" startIcon={<ShareIcon size="md" />} onClick={() => { }} />
        <Button text="Add Content" variant="primary" size="md" startIcon={<PlusIcon size="md" />} onClick={AddContentHandler} />
      </div>
      <div className='flex gap-4 p-4 ml-72 flex-wrap'>
        {contents.map(({type , link , title}) => <Card type={type} link={link} title={title} />)}
      </div>
      <div className='flex justify-end  items-center p-4'>
        <Button text="Query" size="md" variant="primary" onClick={chatBot}/>
        <Query open={chatOpen} onClose={chatBot}/>
      </div>
    </div>  
  )
}

export default Dashboard