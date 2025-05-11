//Created by Oluwadamilare Akabashorun 05/04/25
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
                    className="fixed z-50 top-1/2 left-1/2 w-full max-w-lg p-8 rounded-xl shadow-lg bg-white 
          -translate-x-1/2 -translate-y-1/2 focus:outline-none text-black"
                >
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-xl font-bold">Contact Us</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="text-black hover:text-purple-600">
                                <X className="h-5 w-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <Dialog.Description className="sr-only">
                        Fill out the form to send us a message.
                    </Dialog.Description>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-black">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Message</label>
                            <textarea
                                name="message"
                                rows={4}
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                            />
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