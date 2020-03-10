export interface Produto {
  id: string;
  nome: string;
  precoCusto: number;
  precoVenda: number;
  categoria: string;
  descricao: string;
  quantidade: number;
  estoqueMinimo: number;
  done: boolean;
}
