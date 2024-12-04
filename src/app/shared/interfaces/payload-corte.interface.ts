import { ICorte } from "./corte.interfaces";

export type ICortePayload = Omit<ICorte, 'id'>;