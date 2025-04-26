import React from 'react';
import Button from './Button';
import { Rocket } from 'lucide-react';

interface NFTMintingSectionProps {
  imageGenerated: boolean;
  onMint: () => void;
  isMinting: boolean;
}

const NFTMintingSection: React.FC<NFTMintingSectionProps> = ({ 
  imageGenerated, 
  onMint, 
  isMinting 
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Ready to Mint</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Turn your artwork into a unique NFT</p>
        </div>
        <div className="w-full md:w-auto">
          <Button
            onClick={onMint}
            disabled={!imageGenerated || isMinting}
            icon={<Rocket className="w-5 h-5" />}
            className="w-full md:w-auto"
          >
            {isMinting ? 'Minting...' : 'Mint as NFT'}
          </Button>
        </div>
      </div>
      
      {!imageGenerated && (
        <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
          <p className="text-sm text-purple-800 dark:text-purple-200">
            Generate an artwork first to enable NFT minting
          </p>
        </div>
      )}
    </div>
  );
};

export default NFTMintingSection;