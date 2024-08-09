import * as React from "react"
import { Link } from "react-router-dom"
import { Copyright, Warehouse } from 'lucide-react'
import { Toaster } from "@/components/ui/toaster"
import { getDefaultLocal } from "@/lib/utils"


const Footer = (props) => {

    let local = getDefaultLocal();

    return (
        <>
            <div className="grid grid-cols-2 fixed z-0 bottom-0 w-full h-6">
                <div className="text-left pl-16 py-1">
                    {local && (
                        <span className="text-xs text-lime-400 flex items-center justify-start">
                            <Warehouse className="w-3 h-3 mr-1" />
                            {local?.label}
                        </span>
                    )}
                </div>
                <div className="text-right text-gray-400 hover:text-lime-400 pr-8 py-1">
                    <Link to="/about">
                        <span className="text-xs flex items-center justify-end">
                            v.0.20240808
                            <Copyright className="w-3 h-3 ml-1" />
                        </span>
                    </Link>
                    <Toaster />
                </div>
            </div>

        </>
    )
}

export default Footer
