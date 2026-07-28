"use client";
import { Moon, Sun } from "lucide-react"; import { useTheme } from "next-themes";
export function ThemeToggle(){const {resolvedTheme,setTheme}=useTheme();return <button className="icon-button" aria-label="Ganti tema" onClick={()=>setTheme(resolvedTheme==="dark"?"light":"dark")} suppressHydrationWarning>{resolvedTheme==="dark"?<Sun/>:<Moon/>}</button>}
