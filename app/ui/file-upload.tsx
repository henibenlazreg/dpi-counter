'use client';

import { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function ImageUploadUI({ callback }) {
    // old state definitions
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        callback(file);
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="flex flex-col items-center gap-4 p-4 justify-center bg-blue-50 border-dashed w-full border-1 rounded-lg border-blue-500">
            <ArrowUpTrayIcon className='size-8 block stroke-blue-500' />
            <label
                htmlFor="image"
                className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
            >
                Upload image and get dimensions
            </label>

            <input
                id="image"
                type="file"
                className="hidden"
                onChange={(e) => {
                    if (e.target.files) {
                        callback(e.target.files[0]);
                    }
                }}
            />
        </div>
    );
}
