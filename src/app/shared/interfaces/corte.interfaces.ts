export interface ICorte {
  id: number,
  nome: string,
  servico: string,
  barbeiroPreferido?: string,
  registradoEm: Date,
  status: string
}