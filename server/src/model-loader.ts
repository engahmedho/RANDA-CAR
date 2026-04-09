import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

/**
 * Model Loader - Loads pre-trained ML models and preprocessing objects
 * This module handles loading XGBoost, LightGBM, scaler, and label encoders
 */

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let loadedModels: {
  xgbModel: any;
  lgbModel: any;
  scaler: any;
  labelEncoders: any;
} | null = null;

/**
 * Load all models and preprocessing objects from pickle files
 * Uses Python subprocess to load pickle files since Node.js doesn't have native pickle support
 */
export async function loadModels() {
  if (loadedModels) {
    return loadedModels;
  }

  try {
    const { execSync } = await import("child_process");
    const serverDir = __dirname;

    // Create a Python script to load and serialize the models
    const pythonScript = `
import pickle
import json
import numpy as np
import sys
import os

sys.path.insert(0, '/usr/local/lib/python3.11/dist-packages')

try:
    # Load models
    with open('${serverDir}/xgb_price_prediction_model.pkl', 'rb') as f:
        xgb_model = pickle.load(f)
    
    with open('${serverDir}/lgb_price_prediction_model.pkl', 'rb') as f:
        lgb_model = pickle.load(f)
    
    with open('${serverDir}/scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    
    with open('${serverDir}/label_encoders.pkl', 'rb') as f:
        label_encoders = pickle.load(f)
    
    # Extract label encoder classes
    encoder_classes = {}
    for col, encoder in label_encoders.items():
        encoder_classes[col] = encoder.classes_.tolist()
    
    # Extract scaler parameters
    scaler_params = {
        'mean': scaler.mean_.tolist(),
        'scale': scaler.scale_.tolist(),
    }
    
    result = {
        'success': True,
        'encoders': encoder_classes,
        'scaler': scaler_params,
    }
    
    print(json.dumps(result))
    
except Exception as e:
    import traceback
    result = {
        'success': False,
        'error': str(e),
        'traceback': traceback.format_exc(),
    }
    print(json.dumps(result))
`;

    // Write Python script to temp file
    const tempScript = path.join("/tmp", "load_models.py");
    fs.writeFileSync(tempScript, pythonScript);

    // Execute Python script
    const output = execSync(`python3.11 ${tempScript}`, { encoding: "utf-8" });
    const result = JSON.parse(output);

    if (!result.success) {
      throw new Error(`Failed to load models: ${result.error}`);
    }

    // Store loaded data
    loadedModels = {
      xgbModel: null, // Model objects can't be serialized to JSON
      lgbModel: null,
      scaler: result.scaler,
      labelEncoders: result.encoders,
    };

    console.log("[Model Loader] Successfully loaded models and preprocessing objects");
    return loadedModels;
  } catch (error) {
    console.error("[Model Loader] Error loading models:", error);
    throw error;
  }
}

/**
 * Get loaded models (returns cached version if already loaded)
 */
export function getLoadedModels() {
  return loadedModels;
}

/**
 * Predict using loaded models
 * This is a placeholder - actual prediction requires model inference in Python
 */
export async function predictPrice(input: {
  year: number;
  mileage: number;
  engineSize: number;
  make: string;
  type: string;
  region: string;
  origin: string;
  fuelType: string;
  gearType: string;
  color: string;
  options: string;
  negotiable: boolean;
}): Promise<{
  predictedPrice: number;
  confidence: { lower: number; upper: number };
}> {
  const models = await loadModels();

  if (!models) {
    throw new Error("Models not loaded");
  }

  try {
    const { execSync } = await import("child_process");
    const serverDir = __dirname;

    // Create Python script for prediction
    const pythonScript = `
import pickle
import json
import numpy as np
import pandas as pd
import sys

sys.path.insert(0, '/usr/local/lib/python3.11/dist-packages')

try:
    # Load models
    with open('${serverDir}/xgb_price_prediction_model.pkl', 'rb') as f:
        xgb_model = pickle.load(f)
    
    with open('${serverDir}/lgb_price_prediction_model.pkl', 'rb') as f:
        lgb_model = pickle.load(f)
    
    with open('${serverDir}/scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    
    with open('${serverDir}/label_encoders.pkl', 'rb') as f:
        label_encoders = pickle.load(f)
    
    # Prepare input data
    input_data = ${JSON.stringify(input)}
    
    # Feature engineering
    car_age = 2026 - input_data['year']
    log_mileage = np.log1p(input_data['mileage'])
    is_negotiable = int(input_data['negotiable'])
    
    # Options encoding
    options_map = {'Standard': 0, 'Semi Full': 1, 'Full': 2}
    options_encoded = options_map.get(input_data['options'], 0)
    
    # Make_Type combination
    make_type = input_data['make'] + '_' + input_data['type']
    
    # Color categorization
    dark_colors = ['Black', 'Grey', 'Navy', 'Brown', 'Bronze']
    bright_colors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange']
    neutral_colors = ['White', 'Silver', 'Golden']
    
    if input_data['color'] in dark_colors:
        color_category = 'Dark'
    elif input_data['color'] in bright_colors:
        color_category = 'Bright'
    elif input_data['color'] in neutral_colors:
        color_category = 'Neutral'
    else:
        color_category = 'Other'
    
    # Create feature array
    features = {
        'Car_Age': car_age,
        'Log_Mileage': log_mileage,
        'Engine_Size': input_data['engineSize'],
        'Options_Encoded': options_encoded,
        'Is_Negotiable': is_negotiable,
        'Make': input_data['make'],
        'Type': input_data['type'],
        'Region': input_data['region'],
        'Origin': input_data['origin'],
        'Fuel_Type': input_data['fuelType'],
        'Gear_Type': input_data['gearType'],
        'Color_Category': color_category,
        'Make_Type': make_type,
    }
    
    # Create DataFrame
    df = pd.DataFrame([features])
    
    # Encode categorical variables
    for col in ['Make', 'Type', 'Region', 'Origin', 'Fuel_Type', 'Gear_Type', 'Color_Category', 'Make_Type']:
        if col in label_encoders:
            try:
                df[col] = label_encoders[col].transform(df[col].astype(str))
            except:
                df[col] = 0
    
    # Scale numerical features
    numerical_cols = ['Car_Age', 'Log_Mileage', 'Engine_Size']
    df[numerical_cols] = scaler.transform(df[numerical_cols])
    
    # Make predictions
    X = df[['Car_Age', 'Log_Mileage', 'Engine_Size', 'Options_Encoded', 'Is_Negotiable', 'Make', 'Type', 'Region', 'Origin', 'Fuel_Type', 'Gear_Type', 'Color_Category', 'Make_Type']]
    
    pred_xgb = xgb_model.predict(X)[0]
    pred_lgb = lgb_model.predict(X)[0]
    pred_ensemble = (pred_xgb + pred_lgb) / 2
    
    # Convert back from log scale
    predicted_price = np.expm1(pred_ensemble)
    
    # Calculate confidence range (using MAE from training)
    mae = 12500  # From training data
    
    result = {
        'success': True,
        'predictedPrice': float(predicted_price),
        'confidence': {
            'lower': float(predicted_price - mae),
            'upper': float(predicted_price + mae),
        }
    }
    
    print(json.dumps(result))
    
except Exception as e:
    import traceback
    result = {
        'success': False,
        'error': str(e),
        'traceback': traceback.format_exc(),
    }
    print(json.dumps(result))
`;

    // Write Python script to temp file
    const tempScript = path.join("/tmp", `predict_${Date.now()}.py`);
    fs.writeFileSync(tempScript, pythonScript);

    // Execute Python script
    const output = execSync(`python3.11 ${tempScript}`, { encoding: "utf-8" });
    const result = JSON.parse(output);

    if (!result.success) {
      throw new Error(`Prediction failed: ${result.error}`);
    }

    return {
      predictedPrice: Math.round(result.predictedPrice),
      confidence: {
        lower: Math.round(result.confidence.lower),
        upper: Math.round(result.confidence.upper),
      },
    };
  } catch (error) {
    console.error("[Model Loader] Prediction error:", error);
    throw error;
  }
}
