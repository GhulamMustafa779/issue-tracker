import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import delay from 'delay';

interface Props{
    params: {id: string}
}

const IssueDetailsPage = async ({params}: Props) => {
    //if (typeof params.id !== 'number') notFound();

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!issue) notFound();

    await delay(2000);

  return (
    <div>  
        <Heading>{issue.title}</Heading>
        <Flex gap="5" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt="5">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
    </div>
  )
}

export default IssueDetailsPage