import { Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const LoadingIssueDetailsPage = () => {
  return (
    <Box className='max-w-xl'>  
    <Skeleton />
    <Flex gap="5" my="2">
    <Skeleton width={"5rem"}/>
    <Skeleton width={"8rem"}/>
    </Flex>
    <Card className='prose' mt="5">
       <Skeleton count={3}/>
    </Card>
  </Box>
  )
}

export default LoadingIssueDetailsPage