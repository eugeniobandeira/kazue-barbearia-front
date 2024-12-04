import { FilaService } from "../fila.service";
import { inject } from "@angular/core";

export const getAllFilaResolver = () => {
    const filaService = inject(FilaService);

    return filaService.listar();
}