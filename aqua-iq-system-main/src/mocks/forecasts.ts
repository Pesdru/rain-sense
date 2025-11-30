import { ForecastDay } from '@/types';
import { addDays } from 'date-fns';

const today = new Date();

export const forecasts: ForecastDay[] = [
  {
    date: addDays(today, 1).toISOString(),
    rainMm: 12.5,
    projectedConsumptionM3: 10200,
    projectedLevelPct: 68,
    status: 'normal',
  },
  {
    date: addDays(today, 2).toISOString(),
    rainMm: 8.3,
    projectedConsumptionM3: 10400,
    projectedLevelPct: 67,
    status: 'normal',
  },
  {
    date: addDays(today, 3).toISOString(),
    rainMm: 18.7,
    projectedConsumptionM3: 9800,
    projectedLevelPct: 69,
    status: 'normal',
  },
  {
    date: addDays(today, 4).toISOString(),
    rainMm: 5.2,
    projectedConsumptionM3: 11000,
    projectedLevelPct: 66,
    status: 'atencao',
  },
  {
    date: addDays(today, 5).toISOString(),
    rainMm: 22.1,
    projectedConsumptionM3: 9500,
    projectedLevelPct: 70,
    status: 'normal',
  },
  {
    date: addDays(today, 6).toISOString(),
    rainMm: 14.8,
    projectedConsumptionM3: 10100,
    projectedLevelPct: 71,
    status: 'normal',
  },
  {
    date: addDays(today, 7).toISOString(),
    rainMm: 9.6,
    projectedConsumptionM3: 10600,
    projectedLevelPct: 70,
    status: 'normal',
  },
];

export const forecastSummary = {
  totalRainMm: forecasts.reduce((sum, f) => sum + f.rainMm, 0),
  avgRainMm: forecasts.reduce((sum, f) => sum + f.rainMm, 0) / forecasts.length,
  totalConsumptionM3: forecasts.reduce((sum, f) => sum + f.projectedConsumptionM3, 0),
  avgConsumptionM3: forecasts.reduce((sum, f) => sum + f.projectedConsumptionM3, 0) / forecasts.length,
};
