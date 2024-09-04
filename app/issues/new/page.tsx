import React from 'react'
import { TextArea, TextField, Button } from '@radix-ui/themes'
import MarkdownEditor from './MarkdownEditior'


const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder='Title'>
            <TextField.Slot/>
        </TextField.Root>
        <MarkdownEditor />
        <Button>Create New Issue</Button>
    </div>
  )
}

export default NewIssuePage