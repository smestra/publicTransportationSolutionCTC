export interface NotificacionRequest {
  mensaje: string;
  rutaId: number;
  usuarioCodigo?: string;
}

export interface Notificacion {
  id: number;
  mensaje: string;
  fecha: string;
  leida: boolean;
  ruta: {
    id: number;
    nombre: string;
    origen?: string;
    destino?: string;
  };
  usuario?: {
    codigo: string;
  } | null;
}