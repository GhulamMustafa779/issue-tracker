'use client';

import React,{useState} from 'react'
import { TextArea, TextField, Button, Callout, Text } from '@radix-ui/themes'
import {useForm, Controller} from 'react-hook-form'
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import 'easymde/dist/easymde.min.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/misc/validationSchemas';
import { z } from 'zod';


type IssueForm = z.infer<typeof createIssueSchema>
 
const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  return (
    <div className='max-w-xl'>
      {error && 
      <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
      }
      <form className=' space-y-3' onSubmit={handleSubmit(async (data)=>{
      try {
        await axios.post('/api/issues', data)
        router.push('/issues'); 
      } catch (error) {
        setError('An unexpected error has occurred');
      }
    })}>
        <TextField.Root placeholder='Title' {...register('title')} />
        {
          errors.title && <Text color="red" as="p">{errors.title.message}</Text>
        }
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field; // removes ref
            return <SimpleMDE placeholder="Enter the description" {...rest} />;
          }}
        />
        {
          errors.description && <Text color="red" as="p">{errors.description.message}</Text>
        }
        <Button type='submit'>Create New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage