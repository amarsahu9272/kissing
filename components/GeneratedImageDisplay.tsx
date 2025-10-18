
import React from 'react';

interface GeneratedImageDisplayProps {
    image: string | null;
    isLoading: boolean;
    error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-gray-400">
        <svg className="animate-spin h-12 w-12 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg font-medium">Generating your image...</p>
        <p className="text-sm text-gray-500">This might take a moment.</p>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center text-red-400 bg-red-900/50 border border-red-500 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
        <p className="text-md">{message}</p>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="text-center text-gray-500">
        <h3 className="text-2xl font-bold">Your creation will appear here</h3>
        <p className="mt-2">Once you upload two photos, click "Unite Images" to see the magic happen.</p>
    </div>
);

export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ image, isLoading, error }) => {
    return (
        <div className="w-full max-w-2xl aspect-square bg-gray-800/50 rounded-2xl border-2 border-gray-700 flex items-center justify-center p-4 mt-4 transition-all duration-300">
            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorDisplay message={error} />
            ) : image ? (
                <img src={image} alt="Generated" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
            ) : (
                <Placeholder />
            )}
        </div>
    );
};
