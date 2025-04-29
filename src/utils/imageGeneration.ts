import axios from 'axios';

const REPLICATE_API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
  throw new Error('VITE_REPLICATE_API_TOKEN is not set in environment variables');
}

// ✅ Step 1: Define the response type for Replicate
interface ReplicateResponse {
  id: string;
  status: string;
  output: string[] | null;
  error?: string;
}

export async function generateImage(prompt: string): Promise<string> {
  if (!prompt.trim()) {
    throw new Error('Please provide a prompt for the image generation');
  }

  try {
    // ✅ Step 2: Send request to Replicate
    const response = await axios.post<ReplicateResponse>(
      '/api/v1/predictions',  // Use the /api prefix instead of the full URL
      {
        version: 'db21e45c-5b5d-420c-bb94-24f9c68f9a01', // SDXL model version
        input: {
          prompt: prompt.trim(),
        },
      },
      {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const prediction = response.data;

    // ✅ Step 3: Poll until the image is ready
    let imageResponse = prediction;
    while (
      imageResponse.status !== 'succeeded' &&
      imageResponse.status !== 'failed'
    ) {
      await new Promise((res) => setTimeout(res, 2000));
      const pollRes = await axios.get<ReplicateResponse>(
        `/api/v1/predictions/${prediction.id}`,  // Use /api prefix for polling as well
        {
          headers: {
            Authorization: `Token ${REPLICATE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      imageResponse = pollRes.data;
    }

    if (imageResponse.status === 'succeeded' && imageResponse.output?.[0]) {
      return imageResponse.output[0];
    } else {
      throw new Error(`Image generation failed: ${imageResponse.error ?? 'Unknown error'}`);
    }

  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(`Replicate API error: ${error.response.data.detail}`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate image. Please try again.');
  }
}
