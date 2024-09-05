'use client';

import { useState } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/components";

const DeleteIssueButton = ({issueId}:{issueId: number}) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleteing] = useState(false);

    const handleDelete = async() =>{
        try {
            setDeleteing(true);
            await axios.delete(`/api/issues/${issueId}`);
            router.push('/issues/list');
            router.refresh();
        } catch (error) {
            setError(true);
        }
    }

  return (
    <>
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button color="red" disabled={isDeleting}>
                Delete Issue
                { isDeleting && <Spinner />}
            </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>
                Confirm Deletion
            </AlertDialog.Title>
            <AlertDialog.Description>
                Are you sure you want to delete this issue? This action cannot be undone.
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button color="red" onClick={handleDelete}>Delete Issue</Button>
                </AlertDialog.Action>            
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>This issue cannot be deleted.</AlertDialog.Description>
            <AlertDialog.Cancel>
                <Button variant="soft" color="gray" mt="3" onClick={()=> setError(false)}>OK</Button>
            </AlertDialog.Cancel>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton