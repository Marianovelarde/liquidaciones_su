// src/dtos/liquidation.dto.ts

export interface CreateLiquidationDTO {

  
  // número de liquidación
  emissionNumber: number;

  // expediente
  expedienteNumero: number;
  expedienteCodigo: number;
  expedienteAnio: number;

  // carpeta
  carpetaNumero: string;
  carpetaLetra: string;
  carpetaAnio: string;

  // padrón
  distrito: number;
  zona: number;
  manzana: number;
  parcela: string;

  // datos generales
  propietario: string;
  ubicacion: string;
  tipoObra: string;
  concepto: string;

  superficie: number;

  // categoría
  categoryId: number;

  createdById: number;


  // recargo
  hasSurcharge: boolean;
  surchargePercent?: number;

  // observaciones
  observations?: string;

  //nro de boleta

  receiptNumber?: string;
  
  // total final
  total: number;
}

export interface UpdateLiquidationDTO {
  emissionNumber?: number;

  expedienteNumero?: number;
  expedienteCodigo?: number;
  expedienteAnio?: number;

  carpetaNumero?: string;
  carpetaLetra?: string;
  carpetaAnio?: string;

  distrito?: number;
  zona?: number;
  manzana?: number;
  parcela?: string;

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