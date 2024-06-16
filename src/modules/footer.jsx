import * as React from "react"


import {
    Copyright,
    Package,
    Package2,
    Home,
    LineChart,
    Settings,
} from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



function Footer(props) {
    return (
        <>
            <div className="fixed z-0 bottom-0 w-full h-6 flex justify-end items-start text-sm text-zinc-400 hover:text-zinc-500 rounded-b-lg px-4 py-1 bg-gradient-to-r from-cor-80 to-cor-60"> 
                <a href="https://www.scheleder.com" target="_blank" className="text-xs">v.0.20240614&nbsp;&nbsp;</a><Copyright className="w-2 h-2"/>
            </div>
        </>
    )
}

export default Footer
