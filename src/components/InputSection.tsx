import React, { useState } from 'react';
import Button from './Button';
import { Sparkles } from 'lucide-react';

interface InputSectionProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Create Your Artwork</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the artwork you want to create..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md 
                focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                h-20 resize-none transition-all"
              disabled={isGenerating}
            />
          </div>
          <div className="flex-shrink-0">
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isGenerating}
              icon={<Sparkles className="w-5 h-5" />}
              className="h-full w-full md:w-auto"
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>Examples: "A serene landscape with mountains at sunset", "Futuristic city with flying cars", "Abstract art with vibrant colors"</p>
        </div>
      </form>
    </div>
  );
};

export default InputSection;