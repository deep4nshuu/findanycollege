"use client";

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LogoutButton = () => {
    const router = useRouter();

    const onLogOut = async() => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success('Logout successfull')
                    router.push('/sign-in')
                }
            }
        })
    }

    return (
        <Button variant={'destructive'} size={'lg'} onClick={onLogOut}>
            Logout
        </Button>
    )
}

export default LogoutButton
