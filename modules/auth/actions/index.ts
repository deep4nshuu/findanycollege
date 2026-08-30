"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const currentUser = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        throw new Error("Unauthrized")
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id
        },
        select: {
            id: true,
            email: true,
            name: true,
            image: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return user;
}

export const requireAuth = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        redirect('/sign-in')
    }

    return session;
}

export const requireUnAuth = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(session){
        redirect('/')
    } 

    return null;
}