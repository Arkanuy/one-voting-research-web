import type { Metadata } from "next";import {Plus_Jakarta_Sans} from "next/font/google";import "./globals.css";import {Providers} from "@/components/providers";
const font=Plus_Jakarta_Sans({subsets:["latin"],variable:"--font-jakarta"});
export const metadata:Metadata={title:{default:"One Voting Research Library",template:"%s · One Voting"},description:"Dokumentasi lengkap product discovery dan riset One Voting."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id" suppressHydrationWarning><body className={font.variable}><Providers>{children}</Providers></body></html>}
