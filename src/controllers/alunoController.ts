import { Request, Response, NextFunction } from "express";
import { AlunoModel } from "../models/alunoModel";
import {
  ApiResponse,
  AlunoParams,
  FiltroQuery,
  CriarAlunoDTO,
  AtualizarAlunoDTO,
} from "../interfaces";
import { Aluno } from "../entities/Aluno";

const model = new AlunoModel();

export const listar = async (
  req: Request<{}, {}, {}, FiltroQuery>,
  res: Response<ApiResponse<Aluno[]>>,
  next: NextFunction
) => {
  try {
    let alunos = await model.listarTodos();

    if (req.query.plano) {
      alunos = alunos.filter(
        (aluno) => aluno.plano === req.query.plano
      );
    }

    if (req.query.ativo !== undefined) {
      const ativo = req.query.ativo === "true";

      alunos = alunos.filter(
        (aluno: any) => aluno.ativo === ativo
      );
    }

    res.json({
      sucesso: true,
      dados: alunos,
    });
  } catch (erro) {
    next(erro);
  }
};

export const buscarPorId = async (
  req: Request<AlunoParams>,
  res: Response<ApiResponse<Aluno>>,
  next: NextFunction
) => {
  try {
    const aluno = await model.buscarPorId(Number(req.params.id));

    res.json({
      sucesso: true,
      dados: aluno,
    });
  } catch (erro) {
    next(erro);
  }
};

export const criar = async (
  req: Request<{}, {}, CriarAlunoDTO>,
  res: Response<ApiResponse<Aluno>>,
  next: NextFunction
) => {
  try {
    const aluno = await model.criar(req.body);

    res.status(201).json({
      sucesso: true,
      dados: aluno,
    });
  } catch (erro) {
    next(erro);
  }
};

export const atualizar = async (
  req: Request<AlunoParams, {}, AtualizarAlunoDTO>,
  res: Response<ApiResponse<Aluno>>,
  next: NextFunction
) => {
  try {
    const aluno = await model.atualizarAluno(
      Number(req.params.id),
      req.body
    );

    res.json({
      sucesso: true,
      dados: aluno,
    });
  } catch (erro) {
    next(erro);
  }
};

export const remover = async (
  req: Request<AlunoParams>,
  res: Response<ApiResponse<null>>,
  next: NextFunction
) => {
  try {
    await model.remover(Number(req.params.id));

    res.json({
      sucesso: true,
      dados: null,
    });
  } catch (erro) {
    next(erro);
  }
};