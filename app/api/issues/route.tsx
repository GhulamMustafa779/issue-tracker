import { NextRequest, NextResponse } from "next/server";
import {z}  from 'zod'
import prisma from '@/prisma/client'
import { BsFolderSymlink } from "react-icons/bs";

const issueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255), // for custom error message
    description: z.string().min(1, 'Description is required')
})

export async function POST(request: NextRequest){
 const body = await request.json();
 const validation = issueSchema.safeParse(body);

 if(!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 }); // for formatting errors in objects for simplification

 const newIssue = await prisma.issue.create({
    data:{
        title: body.title,
        description: body.description
    }
 })

 return NextResponse.json(newIssue,{ status: 201 });
}