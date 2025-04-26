import React from 'react';
import LoadingIndicator from './LoadingIndicator';
import { ImageState } from '../types';

interface ImageDisplayProps {
  imageState: ImageState;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageState }) => {
  const { url, loading, error } = imageState;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Creation</h2>
        <div 
          className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
          style={{ aspectRatio: '16/9' }}
        >
          {loading ? (
            <LoadingIndicator />
          ) : url ? (
            <img 
              src={url} 
              alt="Generated artwork" 
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center px-4">
                {error ? (
                  <span className="text-red-500 dark:text-red-400">{error}</span>
                ) : (
                  "Your artwork will appear here"
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;