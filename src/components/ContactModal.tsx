'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function ContactModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button
                    className="inline-block py-3 px-8 rounded-xl text-white font-medium transition-all 
          bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 
          hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                >
                    Get in Touch
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/70 fixed inset-0 z-40" />
                <Dialog.Content
                    className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          bg-white rounded-xl p-8 w-full max-w-lg shadow-lg"
                >
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-xl font-bold">Contact Us</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="text-gray-500 hover:text-black">
                                <X className="h-5 w-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" className="w-full border px-4 py-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" className="w-full border px-4 py-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea rows={4} className="w-full border px-4 py-2 rounded" required />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
                        >
                            Send Message
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
