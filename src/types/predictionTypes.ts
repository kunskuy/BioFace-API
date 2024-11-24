export interface PredictionResult {
    id: string;
    result: string;
    suggestion: string;
    createdAt: string;
}

export interface ModelPrediction {
    confidenceScore: number;
    label: string;
    suggestion: string;
}