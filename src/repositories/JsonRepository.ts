import { readFile, writeFile } from "fs/promises";
import { IEntidade } from "../interfaces";
import { NotFoundError } from "../errors";

export class JsonRepository<T extends IEntidade> {
  constructor(
    private arquivo: string,
    private fromJSON: (obj: any) => T
  ) {}

  private async carregar(): Promise<T[]> {
    try {
      const dados = await readFile(this.arquivo, "utf-8");
      const objetos = JSON.parse(dados);
      return objetos.map((obj: any) => this.fromJSON(obj));
    } catch {
      return [];
    }
  }

  private async salvar(entidades: T[]): Promise<void> {
    await writeFile(
      this.arquivo,
      JSON.stringify(entidades, null, 2),
      "utf-8"
    );
  }

  public async listarTodos(): Promise<T[]> {
    return this.carregar();
  }

  public async buscarPorId(id: number): Promise<T> {
    const entidades = await this.carregar();
    const entidade = entidades.find((e) => e.id === id);

    if (!entidade) {
      throw new NotFoundError(`Entidade com ID ${id}`);
    }

    return entidade;
  }

  public async adicionar(entidade: T): Promise<void> {
    const entidades = await this.carregar();
    entidades.push(entidade);
    await this.salvar(entidades);
  }

  public async atualizar(id: number, entidadeAtualizada: T): Promise<void> {
    const entidades = await this.carregar();
    const indice = entidades.findIndex((e) => e.id === id);

    if (indice === -1) {
      throw new NotFoundError(`Entidade com ID ${id}`);
    }

    entidades[indice] = entidadeAtualizada;
    await this.salvar(entidades);
  }

  public async remover(id: number): Promise<void> {
    const entidades = await this.carregar();
    const indice = entidades.findIndex((e) => e.id === id);

    if (indice === -1) {
      throw new NotFoundError(`Entidade com ID ${id}`);
    }

    entidades.splice(indice, 1);
    await this.salvar(entidades);
  }
}