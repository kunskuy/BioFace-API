import * as tf from '@tensorflow/tfjs-node';
import { MODEL_URL } from '../config/model';

export async function loadModel() {
  try {
    // return await tf.loadLayersModel(MODEL_URL);
    return await tf.loadGraphModel(MODEL_URL);
  } catch (error) {
    throw new Error(`Failed to load model: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
