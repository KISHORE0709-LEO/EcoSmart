import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel | null = null;

export const loadModel = async (): Promise<tf.LayersModel> => {
  if (model) return model;
  
  try {
    console.log('🔄 Loading model from Google Drive...');
    
    // Convert Google Drive link to direct download
    const driveId = '1HHDmoGta9xvX0LyPi-fLfSBKalW9lZaY';
    const modelUrl = `https://drive.google.com/uc?export=download&id=${driveId}`;
    
    // Load model directly in browser
    model = await tf.loadLayersModel(modelUrl);
    console.log('✅ Model loaded successfully!');
    console.log('Model input shape:', model.inputs[0].shape);
    
    return model;
  } catch (error) {
    console.error('❌ Model loading failed:', error);
    throw error;
  }
};

export const predictWaste = async (imageElement: HTMLImageElement): Promise<{
  category: string;
  confidence: number;
  object_name: string;
  reason: string;
}> => {
  try {
    const loadedModel = await loadModel();
    
    // Preprocess image exactly like training
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([150, 150])
      .cast('float32')
      .div(255.0)
      .expandDims(0);
    
    // Get prediction
    const prediction = await loadedModel.predict(tensor) as tf.Tensor;
    const predValue = await prediction.data();
    const confidence = predValue[0];
    
    console.log('🤖 Raw prediction:', confidence);
    
    // Binary classification: < 0.5 = biodegradable, >= 0.5 = non-biodegradable
    const category = confidence < 0.5 ? 'biodegradable' : 'non-biodegradable';
    const confidencePercent = category === 'biodegradable' 
      ? (1 - confidence) * 100 
      : confidence * 100;
    
    // Cleanup tensors
    tensor.dispose();
    prediction.dispose();
    
    return {
      category,
      confidence: Math.round(confidencePercent * 100) / 100,
      object_name: category === 'biodegradable' ? 'Organic waste' : 'Synthetic material',
      reason: `TensorFlow.js model classified this as ${category} with ${confidencePercent.toFixed(1)}% confidence.`
    };
    
  } catch (error) {
    console.error('❌ Prediction failed:', error);
    throw error;
  }
};