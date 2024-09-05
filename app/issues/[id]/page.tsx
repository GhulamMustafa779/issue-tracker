import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import IssueDetails from "./IssueDetails";


interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  //if (typeof params.id !== 'number') notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  await delay(2000);

  return (
    <Grid columns={{ initial: "1", sm: "5"}} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex> 
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
