import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { reservoirs } from '@/mocks/reservoirs';
import { formatNumberPt } from '@/utils/format';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';

export default function Reservatorios() {
  const [sortBy, setSortBy] = useState('name');

  const healthyCount = reservoirs.filter(r => r.status === 'normal').length;
  const warningCount = reservoirs.filter(r => r.status === 'atencao').length;
  const criticalCount = reservoirs.filter(r => r.status === 'critico').length;

  const sortedReservoirs = [...reservoirs].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'level') return b.currentLevelPct - a.currentLevelPct;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Summary counters */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 border-l-4 border-l-success">
          <div className="text-3xl font-bold text-foreground">{healthyCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Saudável (≥70%)</div>
        </Card>
        
        <Card className="p-6 border-l-4 border-l-warning">
          <div className="text-3xl font-bold text-foreground">{warningCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Em Atenção (40-69%)</div>
        </Card>
        
        <Card className="p-6 border-l-4 border-l-destructive">
          <div className="text-3xl font-bold text-foreground">{criticalCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Crítico (&lt;40%)</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrar por região" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as regiões</SelectItem>
            <SelectItem value="norte">Norte</SelectItem>
            <SelectItem value="sul">Sul</SelectItem>
            <SelectItem value="leste">Leste</SelectItem>
            <SelectItem value="oeste">Oeste</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome (A-Z)</SelectItem>
            <SelectItem value="level">Nível (%)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reservoirs list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedReservoirs.map((reservoir) => (
          <Card key={reservoir.id} className="p-6 hover:shadow-lg transition-shadow">
            {reservoir.status === 'critico' && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-destructive">Nível crítico!</p>
                  <p className="text-muted-foreground">Medidas emergenciais recomendadas</p>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-lg">{reservoir.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Capacidade: {formatNumberPt(reservoir.capacityM3)} m³
                </p>
              </div>
              <StatusBadge status={reservoir.status} size="sm" />
            </div>

            <div className="mb-4">
              <div className="text-4xl font-bold text-foreground mb-3">
                {reservoir.currentLevelPct}%
              </div>
              <ProgressBar value={reservoir.currentLevelPct} showLabel={false} size="lg" />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume atual:</span>
                <span className="font-medium text-foreground">
                  {formatNumberPt(reservoir.currentVolumeM3)} m³
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Variação semanal:</span>
                <span 
                  className={`font-medium flex items-center gap-1 ${
                    reservoir.weeklyDeltaPct > 0 ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {reservoir.weeklyDeltaPct > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {reservoir.weeklyDeltaPct > 0 ? '+' : ''}{reservoir.weeklyDeltaPct}%
                </span>
              </div>
            </div>

            <Button variant="ghost" className="w-full mt-4" asChild>
              <a href={`/reservatorios/${reservoir.id}`}>
                Ver detalhes →
              </a>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
