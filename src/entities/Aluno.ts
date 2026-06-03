import { ValidationError } from "../errors";
import { CriarAlunoDTO } from "../interfaces";

export class Aluno {
  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public plano: string,
    public mensalidade: number
  ) {}

  static validar(dados: CriarAlunoDTO): void {
    const erros: string[] = [];

    if (!dados.nome?.trim()) {
      erros.push("Nome é obrigatório");
    }

    if (!dados.email?.trim()) {
      erros.push("Email é obrigatório");
    }

    if (!dados.plano?.trim()) {
      erros.push("Plano é obrigatório");
    }

    if (dados.mensalidade <= 0) {
      erros.push("Mensalidade deve ser maior que zero");
    }

    if (erros.length > 0) {
      throw new ValidationError(erros);
    }
  }

  static fromJSON(obj: any): Aluno {
    return new Aluno(
      obj.id,
      obj.nome,
      obj.email,
      obj.plano,
      obj.mensalidade
    );
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      plano: this.plano,
      mensalidade: this.mensalidade,
    };
  }
}