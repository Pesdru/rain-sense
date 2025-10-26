export type ReservoirStatus = 'normal' | 'atencao' | 'critico';

export interface Reservoir {
  id: string;
  name: string;
  region?: string;
  capacityM3: number;
  currentLevelPct: number; // 0..100
  currentVolumeM3: number;
  weeklyDeltaPct: number;  // variação semanal em pontos %
  status: ReservoirStatus;
}

export type Sector = 'domestico' | 'agricola' | 'industrial';

export interface ConsumptionRecord {
  id: string;
  date: string;  // ISO
  sector: Sector;
  volumeM3: number;
}

export interface ForecastDay {
  date: string;          // ISO
  rainMm: number;
  projectedConsumptionM3: number;
  projectedLevelPct: number;
  status: ReservoirStatus;
}

export type AlertSeverity = 'info' | 'atencao' | 'critico';

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  rule: string;          // regra disparada
  createdAt: string;
  resolvedAt?: string;
  severity: AlertSeverity;
  active: boolean;
}

export interface ReportItem {
  id: string;
  title: string;
  generatedAt: string;
  kind: 'mensal' | 'analise';
  format: 'pdf' | 'csv';
}
