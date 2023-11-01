import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ClerkProvider} from "@clerk/nextjs";
import {enUS} from "@clerk/localizations";
import {ToastProvider} from "@/components/providers/toaseter-provider";
import "@uploadthing/react/styles.css";
import {EdgeStoreProvider} from "@/lib/edgestore";
import '@radix-ui/themes/styles.css'
import {Theme} from '@radix-ui/themes';
import {Analytics} from '@vercel/analytics/react';


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'ILMS',
    description: '사람과 사람 그리고 생각을 연결하다',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode,
}) {
    return (
        <>
            {/*Clerk 인증기 추가*/}
            <html>
            <ClerkProvider localization={enUS}>
                <EdgeStoreProvider>
                    <body className={inter.className}>
                    <Theme>
                        <ToastProvider/>
                        {children}
                        <Analytics/>
                    </Theme>
                    </body>
                </EdgeStoreProvider>
            </ClerkProvider>
            </html>
        </>
    )
}
