import Replicate from 'replicate';

const REPLICATE_API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
  throw new Error('VITE_REPLICATE_API_TOKEN is not set in environment variables');
}

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

export async function generateImage(prompt: string): Promise<string> {
  if (!prompt.trim()) {
    throw new Error('Please provide a prompt for the image generation');
  }

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt.trim(),
          negative_prompt: "low quality, blurry, distorted, disfigured",
          width: 1024,
          height: 1024,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          refine: "expert_ensemble_refiner",
          high_noise_frac: 0.8,
        }
      }
    );

    if (!Array.isArray(output) || output.length === 0) {
      throw new Error('No image was generated');
    }

    return output[0] as string;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('API token')) {
        throw new Error('Invalid or missing API token. Please check your environment variables.');
      }
      throw error;
    }
    throw new Error('Failed to generate image. Please try again.');
  }
}