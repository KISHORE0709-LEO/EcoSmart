import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel | null = null;

export const loadModel = async (): Promise<tf.LayersModel> => {
  if (model) return model;
  
  try {
    console.log('🔄 Loading YOUR trained model from Google Drive...');
    
    // Your actual trained model
    const driveId = '1HHDmoGta9xvX0LyPi-fLfSBKalW9lZaY';
    
    // Use a public CORS proxy to access your model
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const modelUrl = `${proxyUrl}https://drive.google.com/uc?export=download&id=${driveId}`;
    
    console.log('📥 Downloading your 228MB trained model...');
    model = await tf.loadLayersModel(modelUrl);
    
    console.log('✅ YOUR trained model loaded successfully!');
    console.log('📊 Model input shape:', model.inputs[0].shape);
    console.log('📊 Model output shape:', model.outputs[0].shape);
    console.log('🏷️ Model name:', model.name);
    console.log('⚙️ Total parameters:', model.countParams());
    
    return model;
  } catch (error) {
    console.error('❌ Your trained model loading failed:', error);
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
    
    // Preprocess image EXACTLY like your training
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([150, 150])
      .cast('float32')
      .div(255.0)
      .expandDims(0);
    
    // Get prediction from YOUR trained model
    const prediction = await loadedModel.predict(tensor) as tf.Tensor;
    const predValue = await prediction.data();
    const confidence = predValue[0];
    
    console.log('🤖 YOUR model raw prediction:', confidence);
    
    // Use YOUR model's class mapping (might be flipped)
    const category = confidence < 0.5 ? 'biodegradable' : 'non-biodegradable';
    const confidencePercent = category === 'biodegradable' 
      ? (1 - confidence) * 100 
      : confidence * 100;
    
    console.log('📈 YOUR model result:', {
      rawValue: confidence,
      category: category,
      confidence: confidencePercent
    });
    
    // Cleanup tensors
    tensor.dispose();
    prediction.dispose();
    
    return {
      category,
      confidence: Math.round(confidencePercent * 100) / 100,
      object_name: category === 'biodegradable' ? 'Organic waste' : 'Synthetic material',
      reason: `YOUR trained CNN model classified this as ${category} with ${confidencePercent.toFixed(1)}% confidence.`
    };
    
  } catch (error) {
    console.error('❌ YOUR model prediction failed:', error);
    throw error;
  }
};