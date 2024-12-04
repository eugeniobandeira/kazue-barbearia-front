import { ActivatedRouteSnapshot } from "@angular/router";
import { FilaService } from "../fila.service";
import { inject } from "@angular/core";

export const getFilaPorIdResolver = (route: ActivatedRouteSnapshot) => {
    const filaService = inject(FilaService);
    const id = Number(route.paramMap.get('id'));

    return filaService.listarPorId(id);;
}