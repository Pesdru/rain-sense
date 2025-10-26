import { ConsumptionRecord } from '@/types';
import { subDays } from 'date-fns';

const today = new Date();

export const consumptionRecords: ConsumptionRecord[] = [
  // Last 30 days of consumption data
  { id: '1', date: subDays(today, 0).toISOString(), sector: 'domestico', volumeM3: 3200 },
  { id: '2', date: subDays(today, 0).toISOString(), sector: 'agricola', volumeM3: 4800 },
  { id: '3', date: subDays(today, 0).toISOString(), sector: 'industrial', volumeM3: 2400 },
  
  { id: '4', date: subDays(today, 1).toISOString(), sector: 'domestico', volumeM3: 3100 },
  { id: '5', date: subDays(today, 1).toISOString(), sector: 'agricola', volumeM3: 4600 },
  { id: '6', date: subDays(today, 1).toISOString(), sector: 'industrial', volumeM3: 2300 },
  
  { id: '7', date: subDays(today, 2).toISOString(), sector: 'domestico', volumeM3: 3300 },
  { id: '8', date: subDays(today, 2).toISOString(), sector: 'agricola', volumeM3: 5000 },
  { id: '9', date: subDays(today, 2).toISOString(), sector: 'industrial', volumeM3: 2500 },
  
  { id: '10', date: subDays(today, 3).toISOString(), sector: 'domestico', volumeM3: 3250 },
  { id: '11', date: subDays(today, 3).toISOString(), sector: 'agricola', volumeM3: 4700 },
  { id: '12', date: subDays(today, 3).toISOString(), sector: 'industrial', volumeM3: 2350 },
  
  { id: '13', date: subDays(today, 4).toISOString(), sector: 'domestico', volumeM3: 3150 },
  { id: '14', date: subDays(today, 4).toISOString(), sector: 'agricola', volumeM3: 4500 },
  { id: '15', date: subDays(today, 4).toISOString(), sector: 'industrial', volumeM3: 2250 },
  
  { id: '16', date: subDays(today, 5).toISOString(), sector: 'domestico', volumeM3: 3400 },
  { id: '17', date: subDays(today, 5).toISOString(), sector: 'agricola', volumeM3: 5100 },
  { id: '18', date: subDays(today, 5).toISOString(), sector: 'industrial', volumeM3: 2550 },
  
  { id: '19', date: subDays(today, 6).toISOString(), sector: 'domestico', volumeM3: 3280 },
  { id: '20', date: subDays(today, 6).toISOString(), sector: 'agricola', volumeM3: 4900 },
  { id: '21', date: subDays(today, 6).toISOString(), sector: 'industrial', volumeM3: 2450 },
];

// Monthly totals
export const monthlyConsumption = {
  current: {
    month: 'Outubro 2025',
    domestico: 93600,
    agricola: 144000,
    industrial: 72000,
    total: 309600,
  },
  previous: {
    month: 'Setembro 2025',
    domestico: 89400,
    agricola: 138000,
    industrial: 69000,
    total: 296400,
  },
};

// Daily consumption with rainfall for charts
export const dailyConsumptionWithRain = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(today, 29 - i);
  return {
    date: date.toISOString().split('T')[0],
    consumptionM3: 9500 + Math.random() * 2000,
    rainMm: Math.random() * 30,
  };
});
