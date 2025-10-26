import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { forecasts, forecastSummary } from '@/mocks/forecasts';
import { formatDatePt, formatNumberPt } from '@/utils/format';
import { CloudRain, Droplets, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function Previsoes() {
  const overallStatus = forecasts.filter(f => f.status !== 'normal').length > 2 ? 'atencao' : 'normal';

  return (
    <div className="space-y-6">
      {/* Overall status */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Status Geral da Previsão
            </h3>
            <p className="text-sm text-muted-foreground">
              Próximos 7 dias: Estável
            </p>
          </div>
          <StatusBadge status={overallStatus} size="lg" />
        </div>
      </Card>

      {/* Daily forecasts */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Previsões Diárias
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forecasts.map((forecast, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {formatDatePt(forecast.date, 'EEEE')}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatDatePt(forecast.date)}
                  </p>
                </div>
                <StatusBadge status={forecast.status} size="sm" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CloudRain className="h-5 w-5 text-success flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Chuva prevista</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatNumberPt(forecast.rainMm, 1)} mm
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Droplets className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Consumo previsto</p>
                    <p className="text-xl font-bold text-foreground">
                      {formatNumberPt(forecast.projectedConsumptionM3)} m³
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">Nível previsto</p>
                    <p className="text-lg font-semibold text-foreground">
                      {forecast.projectedLevelPct}%
                    </p>
                  </div>
                  <ProgressBar value={forecast.projectedLevelPct} showLabel={false} size="md" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Summary panels */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-4">
            Análise de Precipitação
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total 7 dias:</span>
              <span className="font-semibold text-foreground">
                {formatNumberPt(forecastSummary.totalRainMm, 1)} mm
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Média diária:</span>
              <span className="font-semibold text-foreground">
                {formatNumberPt(forecastSummary.avgRainMm, 1)} mm
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-4">
            Projeção de Consumo
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total 7 dias:</span>
              <span className="font-semibold text-foreground">
                {formatNumberPt(forecastSummary.totalConsumptionM3)} m³
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Média diária:</span>
              <span className="font-semibold text-foreground">
                {formatNumberPt(forecastSummary.avgConsumptionM3)} m³
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Explanation card */}
      <Card className="p-6 bg-muted/30">
        <div className="flex items-start gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-primary mt-0.5 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">
                  As previsões são calculadas com base em dados históricos de consumo, 
                  precipitação esperada e capacidade atual dos reservatórios.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-2">
              Como calculamos?
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Normal:</strong> Nível previsto ≥ 70% ou precipitação suficiente
              </p>
              <p>
                <strong>Atenção:</strong> Nível previsto entre 40-69% com consumo elevado
              </p>
              <p>
                <strong>Crítico:</strong> Nível previsto &lt; 40% ou tendência de queda acentuada
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
