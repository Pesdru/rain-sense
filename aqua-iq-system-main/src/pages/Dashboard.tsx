import { useState } from 'react';
import { KpiCard } from '@/components/ui/kpi-card';
import { Card } from '@/components/ui/card';
import { 
  Droplets, 
  CloudRain, 
  Activity,
  BarChart3,
  FileText,
  TrendingUp
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { dailyConsumptionWithRain } from '@/mocks/consumption';
import { formatDatePt, formatNumberPt, formatDateTimePt } from '@/utils/format';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [period, setPeriod] = useState('7');
  
  const chartData = dailyConsumptionWithRain.slice(-parseInt(period)).map(d => ({
    date: formatDatePt(d.date, 'dd/MM'),
    'Consumo (m³)': Math.round(d.consumptionM3),
    'Chuva (mm)': parseFloat(d.rainMm.toFixed(1)),
  }));

  const totalConsumption = 26400;
  const avgRainfall = 23.4;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          icon={Droplets}
          label="Consumo Total Atual"
          value={`${formatNumberPt(totalConsumption)} m³`}
          trend={{ value: 4.7, isPositive: false }}
        />
        
        <KpiCard
          icon={CloudRain}
          label="Precipitação Média"
          value={`${formatNumberPt(avgRainfall, 1)} mm`}
          trend={{ value: 12.3, isPositive: true }}
        />
        
        <KpiCard
          icon={Activity}
          label="Status Geral"
          value="Normal"
          subtitle="Todos os sistemas operando normalmente"
        />
      </div>

      {/* Chart */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Consumo vs. Chuvas</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Análise comparativa do período
            </p>
          </div>
          
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="14">Últimos 14 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="hsl(var(--primary))"
              fontSize={12}
              label={{ value: 'm³', position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))' } }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke="hsl(var(--success))"
              fontSize={12}
              label={{ value: 'mm', position: 'insideRight', style: { fill: 'hsl(var(--muted-foreground))' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="Consumo (m³)" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="Chuva (mm)" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--success))' }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground flex flex-col md:flex-row gap-2 md:justify-between">
          <span>Última atualização: {formatDateTimePt(new Date())}</span>
          <span>Fonte: API Interna + INMET</span>
        </div>
      </Card>

      {/* Quick access */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Acesso Rápido</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/reservatorios">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Droplets className="h-10 w-10 text-primary mb-3" />
              <h4 className="font-semibold text-foreground mb-1">Reservatórios</h4>
              <p className="text-sm text-muted-foreground">
                Monitorar níveis e capacidade
              </p>
            </Card>
          </Link>

          <Link to="/consumo">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <BarChart3 className="h-10 w-10 text-primary mb-3" />
              <h4 className="font-semibold text-foreground mb-1">Consumo</h4>
              <p className="text-sm text-muted-foreground">
                Análise por setor
              </p>
            </Card>
          </Link>

          <Link to="/previsoes">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <TrendingUp className="h-10 w-10 text-primary mb-3" />
              <h4 className="font-semibold text-foreground mb-1">Previsões</h4>
              <p className="text-sm text-muted-foreground">
                Projeções hídricas
              </p>
            </Card>
          </Link>

          <Link to="/relatorios-alertas">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <FileText className="h-10 w-10 text-primary mb-3" />
              <h4 className="font-semibold text-foreground mb-1">Relatórios</h4>
              <p className="text-sm text-muted-foreground">
                Documentos e alertas
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
