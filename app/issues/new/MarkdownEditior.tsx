'use client';
import React from 'react'
import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css";

const MarkdownEditior = () => {
  return (
    <div>
        <SimpleMDE placeholder='Description' />
    </div>
  )
}

export default MarkdownEditior