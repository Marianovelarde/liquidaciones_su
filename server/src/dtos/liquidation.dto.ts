// src/dtos/liquidation.dto.ts

export interface CreateLiquidationDTO {
  // número de liquidación
  emissionNumber: number;

  // expediente
  expedienteNumero: number;
  expedienteCodigo: number;
  expedienteAnio: number;

  // carpeta
  carpetaNumero: number;
  carpetaLetra: string;
  carpetaAnio: number;

  // padrón
  distrito: number;
  zona: number;
  manzana: number;
  parcela: number;

  // datos generales
  propietario: string;
  ubicacion: string;
  tipoObra: string;
  concepto: string;

  superficie: number;

  // categoría
  categoryId: number;

  // recargo
  hasSurcharge: boolean;
  surchargePercent?: number;

  // observaciones
  observations?: string;

  // total final
  total: number;
}

export interface UpdateLiquidationDTO {
  emissionNumber?: number;

  expedienteNumero?: number;
  expedienteCodigo?: number;
  expedienteAnio?: number;

  carpetaNumero?: number;
  carpetaLetra?: string;
  carpetaAnio?: number;

  distrito?: number;
  zona?: number;
  manzana?: number;
  parcela?: number;

  propietario?: string;
  ubicacion?: string;
  tipoObra?: string;
  concepto?: string;

  superficie?: number;

  categoryId?: number;

  hasSurcharge?: boolean;
  surchargePercent?: number;

  observations?: string;

  total?: number;
}