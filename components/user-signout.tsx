"use client";

import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useClerk} from "@clerk/clerk-react";
import {useRouter} from 'next/navigation'

export function UserSignOutButton() {

    const {signOut} = useClerk();
    const router = useRouter();

    return (
        <>
            <Button
                onClick={() => signOut(() => router.push("/"))}
                className="text-white p-0 text-xl font-semibold"
                variant="link">
                <LogOut className="w-6 h-6 mr-2"/>
                로그아웃
            </Button>
        </>
    )
}
