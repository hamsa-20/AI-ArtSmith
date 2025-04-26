import React, { useState } from 'react';
import Header from '../components/Header';
import InputSection from '../components/InputSection';
import ImageDisplay from '../components/ImageDisplay';
import NFTMintingSection from '../components/NFTMintingSection';
import { ImageState } from '../types';
import { generateImage } from '../utils/imageGeneration';

const Home: React.FC = () => {
  const [imageState, setImageState] = useState<ImageState>({
    url: null,
    loading: false,
    error: null
  });
  const [isMinting, setIsMinting] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setImageState({
      url: null,
      loading: true,
      error: null
    });

    try {
      const imageUrl = await generateImage(prompt);
      setImageState({
        url: imageUrl,
        loading: false,
        error: null
      });
    } catch (error) {
      setImageState({
        url: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to generate image'
      });
    }
  };

  const handleMint = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      alert('Your artwork has been minted as an NFT!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Transform Your Ideas into Digital Art
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Use AI to create stunning artwork from your descriptions, then mint them as unique NFTs.
          </p>
        </div>
        
        <InputSection 
          onGenerate={handleGenerate} 
          isGenerating={imageState.loading} 
        />
        
        <ImageDisplay imageState={imageState} />
        
        <NFTMintingSection 
          imageGenerated={!!imageState.url} 
          onMint={handleMint}
          isMinting={isMinting}
        />
      </main>
      
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">AI ArtSmith</p>
              <p className="text-sm text-gray-400">Transforming imagination into digital reality</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-800 text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} AI ArtSmith. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;