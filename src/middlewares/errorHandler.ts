import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      sucesso: false,
      erro: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    sucesso: false,
    erro: "Erro interno do servidor",
  });
}