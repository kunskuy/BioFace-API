import * as tf from '@tensorflow/tfjs-node';
import { ApiError, HTTP_RESPONSE } from '../utils/httpResponse';
import { ModelPrediction } from '../types/predictionTypes';

/*
export async function predictClassification(
  model: tf.GraphModel, // paramater: object
  image: Buffer
): Promise<ModelPrediction> {
  try {
    const tensor = tf.node
      .decodeJpeg(image) // gambar => tensorf
      .resizeNearestNeighbor([224, 224]) // resize pixel gambar 
      .expandDims() // dimensi tensor 3d => 4d
      .toFloat(); // tipe data tensor => float

    const prediction = model.predict(tensor) as tf.Tensor;
    const score = await prediction.data();

    const confidenceScore = score[0] * 100;

    const label = confidenceScore > 50 ? 'Cancer' : 'Non-cancer'; // > 50% cancer | < 50% non-cancer
    const suggestion = label === 'Cancer'
      ? 'Segera periksa ke dokter!'
      : 'Penyakit kanker tidak terdeteksi.';

    return { confidenceScore, label, suggestion };
  } catch (error) {
    throw new ApiError(HTTP_RESPONSE.BAD_REQUEST);
  }
}
*/