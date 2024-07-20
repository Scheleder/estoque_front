import { Barcode, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Scanner = () => {
    const inputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const observer = new MutationObserver(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    observer.disconnect();
                }
            });

            observer.observe(document, {
                childList: true,
                subtree: true
            });

            return () => observer.disconnect();
        }
    }, [isOpen]);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>
                <div className='text-orange-700 hover:text-lime-500 text-sm cursor-pointer'><Barcode /></div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-100">
                <AlertDialogHeader>
                    <AlertDialogTitle>Leitor de código de barras</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input id="barCodeScan" ref={inputRef} />
                        <AlertDialogFooter className="mt-4">
                            <AlertDialogCancel onClick={() => setIsOpen(false)}>
                                <X className='w-4 h-4 mr-2' /> Cancelar
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Scanner;
