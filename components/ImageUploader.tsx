
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import type { ImageData } from '../types';

interface ImageUploaderProps {
    id: 'image1' | 'image2';
    label: string;
    imageData: ImageData | null;
    onImageSelect: (id: 'image1' | 'image2', file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, imageData, onImageSelect }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageSelect(id, file);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div
            className="relative w-full aspect-square bg-gray-800 rounded-2xl border-4 border-dashed border-gray-600 flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all duration-300 hover:border-purple-500 hover:bg-gray-700/50 group"
            onClick={handleClick}
        >
            <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
            />
            {imageData ? (
                <>
                    <img src={imageData.previewUrl} alt={label} className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                        <span className="text-white text-lg font-semibold">Change Photo</span>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center gap-4 text-gray-400">
                    <UploadIcon className="w-16 h-16 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-xl font-semibold">{label}</span>
                    <p className="text-sm">Click to upload</p>
                </div>
            )}
        </div>
    );
};
