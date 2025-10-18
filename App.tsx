
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generateKissingImage } from './services/geminiService';
import type { ImageData } from './types';

const App: React.FC = () => {
    const [image1, setImage1] = useState<ImageData | null>(null);
    const [image2, setImage2] = useState<ImageData | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = useCallback((id: 'image1' | 'image2', file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                const base64String = reader.result.split(',')[1];
                const imageData: ImageData = { base64: base64String, mimeType: file.type, previewUrl: reader.result };
                if (id === 'image1') {
                    setImage1(imageData);
                } else {
                    setImage2(imageData);
                }
            }
        };
        reader.onerror = () => {
            setError('Failed to read the image file.');
        };
        reader.readAsDataURL(file);
    }, []);

    const handleGenerate = async () => {
        if (!image1 || !image2) {
            setError("Please upload both images before generating.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        try {
            const resultBase64 = await generateKissingImage(image1, image2);
            setGeneratedImage(`data:image/png;base64,${resultBase64}`);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-purple-500 selection:text-white">
            <div className="w-full max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Unite
                    </h1>
                    <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">
                        Upload two photos and let AI create a beautiful new image of them together.
                    </p>
                </header>

                <main className="flex flex-col items-center gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                        <ImageUploader id="image1" label="First Photo" onImageSelect={handleImageUpload} imageData={image1} />
                        <ImageUploader id="image2" label="Second Photo" onImageSelect={handleImageUpload} imageData={image2} />
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!image1 || !image2 || isLoading}
                        className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        <SparklesIcon className="w-6 h-6" />
                        {isLoading ? 'Creating Magic...' : 'Unite Images'}
                    </button>

                    <GeneratedImageDisplay
                        image={generatedImage}
                        isLoading={isLoading}
                        error={error}
                    />
                </main>
                 <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>Powered by Gemini. Create, imagine, and unite.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
