'use client';

import React,{useState} from 'react'
import { TextArea, TextField, Button } from '@radix-ui/themes'
import {useForm, Controller} from 'react-hook-form'
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import 'easymde/dist/easymde.min.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface IssueForm{ 
  title:string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, setValue } = useForm<IssueForm>({
    defaultValues: {
      description: '',
    },
  });
  const [editorValue, setEditorValue] = useState<string>('');
  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data)=>{
      await axios.post('/api/issues', data)
      router.push('/issues'); 
    })}>
        <TextField.Root placeholder='Title' {...register('title')} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field; // removes ref
            return <SimpleMDE placeholder="Enter the description" {...rest} />;
          }}
        />
        <Button type='submit'>Create New Issue</Button>
    </form>
  )
}

export default NewIssuePage