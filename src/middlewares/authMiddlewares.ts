import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { firebaseAdmin } from '../config/firebase';
import { ApiError, HTTP_RESPONSE } from '../utils/httpResponse';

interface AuthRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

export const verifyFirebaseToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(HTTP_RESPONSE.UNAUTHORIZED);
        }

        const token = authHeader.split('Bearer ')[1];

        try {
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
            req.user = decodedToken;
            next();
        } catch (error) {
            throw new ApiError(HTTP_RESPONSE.UNAUTHORIZED);
        }
    } catch (error) {
        next(error);
    }
};

export const requireAdmin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw new ApiError(HTTP_RESPONSE.UNAUTHORIZED);
        }

        const { admin: isAdmin } = req.user as admin.auth.DecodedIdToken & {
            admin?: boolean;
        };

        if (!isAdmin) {
            throw new ApiError(HTTP_RESPONSE.FORBIDDEN);
        }

        next();
    } catch (error) {
        next(error);
    }
};