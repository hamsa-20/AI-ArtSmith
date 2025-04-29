import axios from 'axios';

const DREAMSTUDIO_API_KEY = import.meta.env.VITE_DREAMSTUDIO_API_KEY;

if (!DREAMSTUDIO_API_KEY) {
  throw new Error('VITE_DREAMSTUDIO_API_KEY is not set in environment variables');
}

// ✅ Step 1: Define the type of API response
interface DreamStudioResponse {
  artifacts: {
    uri: string;
  }[];
}

export async function generateImage(prompt: string): Promise<string> {
  if (!prompt.trim()) {
    throw new Error('Please provide a prompt for the image generation');
  }

  try {
    // ✅ Step 2: Tell axios that response.data is of type DreamStudioResponse
    const response = await axios.post<DreamStudioResponse>(
      'https://api.stability.ai/v2beta/stable-image/generate/core',
      {
        prompt: prompt.trim(),
        negative_prompt: "low quality, blurry, distorted, disfigured",
        width: 1024,
        height: 1024,
        steps: 50,
        cfg_scale: 7.5,
        samples: 1,
        style_preset: "photographic",
      },
      {
        headers: {
          Authorization: `Bearer ${DREAMSTUDIO_API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    // ✅ Step 3: Now no error here
    const imageUrl = response.data.artifacts?.[0]?.uri;

    if (!imageUrl) {
      throw new Error('No image was generated');
    }

    return imageUrl;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(`DreamStudio API error: ${error.response.data.message}`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate image. Please try again.');
  }
}
