import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { predictClassification } from '../services/inferenceService';
import { PredictionResult } from '../types/predictionTypes';
import { ApiError, HTTP_RESPONSE } from '../utils/httpResponse';

const histories: { id: string; history: PredictionResult }[] = [];

export const postPredictHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const image = req.file?.buffer;

    if (!image) {
      throw new ApiError(HTTP_RESPONSE.BAD_REQUEST);
    }

    const model = req.app.locals.model;
    const { confidenceScore, label, suggestion } = await predictClassification(model, image);

    const id = uuidv4();
    const history: PredictionResult = {
      id,
      result: label,
      suggestion,
      createdAt: new Date().toISOString()
    };

    histories.push({ id, history });

    res.status(HTTP_RESPONSE.CREATED.code).json({
      status: HTTP_RESPONSE.CREATED.status,
      message: 'Model is predicted successfully',
      data: history
    });
  } catch (error) {
    next(error);
  }
};

export const getHistoriesHandler = (
  req: Request,
  res: Response
): void => {
  res.status(HTTP_RESPONSE.OK.code).json({
    status: HTTP_RESPONSE.OK.status,
    data: histories
  });
};