// src/routes/predictionRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { postPredictHandler, getHistoriesHandler } from '../controllers/predictionController';
import { fileSizeErrorHandler } from '../middlewares/errorMiddlewares';
import { verifyFirebaseToken } from '../middlewares/authMiddlewares';

const router = Router();

const upload = multer({ limits: { fileSize: 1 * 1024 * 1024 } });

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: error
 *               message:
 *                 type: string
 *                 example: Unauthorized - Invalid or missing token
 * 
 * /predict:
 *   post:
 *     tags:
 *       - Prediction
 *     security:
 *       - BearerAuth: []
 *     summary: Classify an image using the trained model
 *     description: Upload an image to be classified by the model, requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to be classified (max 1MB)
 *     responses:
 *       201:
 *         description: Successful classification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     prediction:
 *                       type: string
 *                       example: "Normal"
 *                     confidence:
 *                       type: number
 *                       example: 0.95
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         description: Bad request - No image provided or invalid image format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No image file provided
 *       413:
 *         description: Payload too large - File size exceeds 1MB limit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: File too large
 *       500:
 *         description: Internal server error - Something went wrong with the prediction service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
// router.post('/predict', upload.single('image'), fileSizeErrorHandler, postPredictHandler);
// auth
router.post('/predict', verifyFirebaseToken, upload.single('image'), fileSizeErrorHandler, postPredictHandler);

/**
 * @swagger
 * /predict/histories:
 *   get:
 *     tags:
 *       - Prediction
 *     security:
 *       - BearerAuth: []
 *     summary: Get prediction history
 *     description: Retrieve a list of past predictions, requires authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved prediction histories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       prediction:
 *                         type: string
 *                       confidence:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
// router.get('/predict/histories', getHistoriesHandler);
// auth
router.get('/predict/histories', verifyFirebaseToken, getHistoriesHandler);

export default router;
