import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'
import SoundControl from '@/components/SoundControl'
import CustomCursor from '@/components/CustomCursor'

const pressStart2P = Press_Start_2P({
    weight: '400',
    subsets: ['latin', 'cyrillic'],
    variable: '--font-pixel',
})

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'Personal Portfolio',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={pressStart2P.variable}>
            <body className="font-[family-name:var(--font-pixel)] antialiased bg-black">
                <CustomCursor />
                {children}
                <SoundControl />
            </body>
        </html>
    )
}
