// src/app/models/ruta.models.ts
export interface Ruta {
  id: number;
  codigo?: string;
  nombre: string;
  origen: string;
  destino: string;
  activa?: boolean;
}