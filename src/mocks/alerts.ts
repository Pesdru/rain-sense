import { AlertItem, ReportItem } from '@/types';
import { subHours, subDays } from 'date-fns';

const now = new Date();

export const alerts: AlertItem[] = [
  {
    id: '1',
    title: 'Nível Crítico - Reservatório Sul',
    message: 'Nível abaixo de 35%. Medidas emergenciais recomendadas.',
    rule: 'nivel_critico_35',
    createdAt: subHours(now, 2).toISOString(),
    severity: 'critico',
    active: true,
  },
  {
    id: '2',
    title: 'Consumo Elevado - Setor Agrícola',
    message: 'Consumo 15% acima da média histórica nos últimos 3 dias.',
    rule: 'consumo_elevado_agricola',
    createdAt: subHours(now, 8).toISOString(),
    severity: 'atencao',
    active: true,
  },
  {
    id: '3',
    title: 'Previsão de Chuvas',
    message: 'Precipitação acima de 20mm prevista para próximas 48h.',
    rule: 'previsao_chuva_intensa',
    createdAt: subHours(now, 12).toISOString(),
    severity: 'info',
    active: true,
  },
  {
    id: '4',
    title: 'Nível em Atenção - Açude Norte',
    message: 'Nível entre 40% e 60%. Monitoramento reforçado.',
    rule: 'nivel_atencao_40_60',
    createdAt: subDays(now, 1).toISOString(),
    severity: 'atencao',
    active: true,
  },
  {
    id: '5',
    title: 'Manutenção Programada',
    message: 'Sistema de bombeamento será desativado dia 15/11.',
    rule: 'manutencao_programada',
    createdAt: subDays(now, 2).toISOString(),
    severity: 'info',
    active: false,
    resolvedAt: subDays(now, 1).toISOString(),
  },
  {
    id: '6',
    title: 'Normalização - Reservatório Leste',
    message: 'Nível retornou para faixa normal (>70%).',
    rule: 'nivel_normalizado',
    createdAt: subDays(now, 3).toISOString(),
    severity: 'info',
    active: false,
    resolvedAt: subDays(now, 2).toISOString(),
  },
];

export const reports: ReportItem[] = [
  {
    id: '1',
    title: 'Relatório Mensal - Outubro 2025',
    generatedAt: subDays(now, 1).toISOString(),
    kind: 'mensal',
    format: 'pdf',
  },
  {
    id: '2',
    title: 'Análise de Consumo por Setor',
    generatedAt: subDays(now, 5).toISOString(),
    kind: 'analise',
    format: 'csv',
  },
  {
    id: '3',
    title: 'Relatório Mensal - Setembro 2025',
    generatedAt: subDays(now, 32).toISOString(),
    kind: 'mensal',
    format: 'pdf',
  },
  {
    id: '4',
    title: 'Histórico de Precipitações - Q3 2025',
    generatedAt: subDays(now, 40).toISOString(),
    kind: 'analise',
    format: 'csv',
  },
];
