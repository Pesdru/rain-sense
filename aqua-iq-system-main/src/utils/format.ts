import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatNumberPt(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatDatePt(date: Date | string, formatStr: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: ptBR });
}

export function formatDateTimePt(date: Date | string): string {
  return formatDatePt(date, "dd/MM/yyyy, HH:mm");
}

export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `há ${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''}`;
  }
  
  if (diffHours < 24) {
    return `há ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
  }
  
  return `há ${diffDays} dia${diffDays !== 1 ? 's' : ''}`;
}
