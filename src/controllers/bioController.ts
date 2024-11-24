import { Request, Response } from 'express';
import db from '../config/db';
import { HTTP_RESPONSE, ApiError } from '../utils/httpResponse';
import { BioDictItem, BioSkincareItem, BioArticle } from '../types/bioTypes';
import { QueryError, QueryResult, FieldPacket } from 'mysql2';

export class BioController {
  // get all articles from database
  public getAllArticles = (req: Request, res: Response) => {
    const sql = 'SELECT * FROM bio_article';
    db.query(sql, (err: QueryError, results: QueryResult) => {
      if (err) {
        return this.errorResponse(res, HTTP_RESPONSE.INTERNAL_SERVER_ERROR);
      }
      this.successResponse(res, HTTP_RESPONSE.OK, { data: results as BioArticle[] });
    });
  };

  // get articles by query
  public getArticlesByQuery = (req: Request, res: Response) => {
    const { query } = req.query;
    let sql = 'SELECT * FROM bio_article WHERE 1=1';

    if (query) {
      sql += ` AND (title LIKE '%${query}%' OR content LIKE '%${query}%')`;
    }

    db.query(sql, (err: QueryError, results: QueryResult) => {
      if (err) {
        return this.errorResponse(res, HTTP_RESPONSE.INTERNAL_SERVER_ERROR);
      }
      this.successResponse(res, HTTP_RESPONSE.OK, { data: results as BioArticle[] });
    });
  };

  // get article by id
  public getArticlesById = (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM bio_article WHERE id = ?';

    db.query(sql, [id], (err: QueryError, results: QueryResult) => {
      if (err) {
        return this.errorResponse(res, HTTP_RESPONSE.INTERNAL_SERVER_ERROR);
      }
      if ((results as BioArticle[]).length === 0) {
        return this.errorResponse(res, HTTP_RESPONSE.NOT_FOUND);
      }
      this.successResponse(res, HTTP_RESPONSE.OK, (results as BioArticle[])[0]);
    });
  };

  // get all bio from database
  public getAllBio = (req: Request, res: Response) => {
    const sql = 'SELECT * FROM bio_dict';
    db.query(sql, (err: QueryError, results: QueryResult) => {
      if (err) {
        return this.errorResponse(res, HTTP_RESPONSE.INTERNAL_SERVER_ERROR);
      }
      this.successResponse(res, HTTP_RESPONSE.OK, { data: results as BioDictItem[] });
    });
  };

  // get bio by query
  public getBioByQuery = (req: Request, res: Response) => {
    const { query } = req.query;
    let sql = 'SELECT * FROM bio_dict WHERE 1=1';
    const params: any[] = [];

    if (query) {
      sql += ' AND (name LIKE ? OR benefit LIKE ?)';
      const likeQuery = `%${query}%`;
      params.push(likeQuery, likeQuery);
    }

    db.query(sql, params, (err: QueryError, results: QueryResult) => {
      if (err) {
        return this.errorResponse(res, HTTP_RESPONSE.INTERNAL_SERVER_ERROR);
      }
      this.successResponse(res, HTTP_RESPONSE.OK, { data: results as BioDictItem[] });
    });
  };

  // get bio by id
  public getBioById = (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM bio_dict WHERE id = ?';

    db.query(sql, [id], (err: QueryError, results: QueryResult) => {
      if (err) {
        return this.errorResponse(res, HTTP_RESPONSE.INTERNAL_SERVER_ERROR);
      }
      if ((results as BioDictItem[]).length === 0) {
        return this.errorResponse(res, HTTP_RESPONSE.NOT_FOUND);
      }
      this.successResponse(res, HTTP_RESPONSE.OK, (results as BioDictItem[])[0]);
    });
  };

  // get all bio from database
  public getAllBioSkincare = (req: Request, res: Response) => {
    const sql = 'SELECT * FROM bio_skincare';
    db.query(sql, (err: QueryError, results: QueryResult) => {
      if (err) {
        return this.errorResponse(res, HTTP_RESPONSE.INTERNAL_SERVER_ERROR);
      }
      this.successResponse(res, HTTP_RESPONSE.OK, { data: results as BioSkincareItem[] });
    });
  };

  // get bio skincare by query
  public getBioSkincareByQuery = (req: Request, res: Response) => {
    const { query } = req.query;
    let sql = 'SELECT * FROM bio_skincare WHERE 1=1';
    const params: any[] = [];

    if (query) {
      sql += ' AND (name LIKE ? OR benefit LIKE ?)';
      const likeQuery = `%${query}%`;
      params.push(likeQuery, likeQuery);
    }

    db.query(sql, params, (err: QueryError, results: QueryResult) => {
      if (err) {
        return this.errorResponse(res, HTTP_RESPONSE.INTERNAL_SERVER_ERROR);
      }
      this.successResponse(res, HTTP_RESPONSE.OK, { data: results as BioSkincareItem[] });
    });
  };

  // get bio skincare by id
  public getBioSkincareById = (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM bio_skincare WHERE id = ?';

    db.query(sql, [id], (err: QueryError, results: QueryResult) => {
      if (err) {
        return this.errorResponse(res, HTTP_RESPONSE.INTERNAL_SERVER_ERROR);
      }
      if ((results as BioSkincareItem[]).length === 0) {
        return this.errorResponse(res, HTTP_RESPONSE.NOT_FOUND);
      }
      this.successResponse(res, HTTP_RESPONSE.OK, (results as BioSkincareItem[])[0]);
    });
  };

  private successResponse(res: Response, httpResponse: typeof HTTP_RESPONSE[keyof typeof HTTP_RESPONSE], data?: any) {
    res.status(httpResponse.code).json({
      status: httpResponse.status,
      message: httpResponse.message,
      data
    });
  }

  private errorResponse(res: Response, httpResponse: typeof HTTP_RESPONSE[keyof typeof HTTP_RESPONSE]) {
    throw new ApiError(httpResponse);
  }
}