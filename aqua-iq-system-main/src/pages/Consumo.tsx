import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Tractor, Factory, Plus } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { consumptionRecords, monthlyConsumption } from '@/mocks/consumption';
import { formatNumberPt, formatDatePt } from '@/utils/format';
import { toast } from '@/hooks/use-toast';
import { subDays, startOfDay } from 'date-fns';

export default function Consumo() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    sector: 'domestico',
    volume: '',
  });

  // Calculate weekly consumption by sector
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
    const dateStr = date.toISOString().split('T')[0];
    
    const dayRecords = consumptionRecords.filter(r => 
      r.date.startsWith(dateStr)
    );
    
    return {
      date: formatDatePt(date, 'dd/MM'),
      Doméstico: dayRecords.filter(r => r.sector === 'domestico').reduce((sum, r) => sum + r.volumeM3, 0),
      Agrícola: dayRecords.filter(r => r.sector === 'agricola').reduce((sum, r) => sum + r.volumeM3, 0),
      Industrial: dayRecords.filter(r => r.sector === 'industrial').reduce((sum, r) => sum + r.volumeM3, 0),
    };
  });

  const currentMonthTotal = monthlyConsumption.current.total;
  const previousMonthTotal = monthlyConsumption.previous.total;
  const monthlyVariation = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal * 100).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.volume || parseFloat(formData.volume) <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira um volume válido",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Consumo registrado!",
      description: `${formData.volume} m³ adicionado ao setor ${
        formData.sector === 'domestico' ? 'Doméstico' :
        formData.sector === 'agricola' ? 'Agrícola' : 'Industrial'
      }`,
    });

    setDialogOpen(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      sector: 'domestico',
      volume: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={Home}
          label="Total Mês Atual"
          value={`${formatNumberPt(currentMonthTotal)} m³`}
          trend={{ 
            value: parseFloat(monthlyVariation), 
            isPositive: parseFloat(monthlyVariation) > 0 
          }}
        />
        
        <KpiCard
          icon={Home}
          label="Doméstico"
          value={`${formatNumberPt(monthlyConsumption.current.domestico)} m³`}
        />
        
        <KpiCard
          icon={Tractor}
          label="Agrícola"
          value={`${formatNumberPt(monthlyConsumption.current.agricola)} m³`}
        />
        
        <KpiCard
          icon={Factory}
          label="Industrial"
          value={`${formatNumberPt(monthlyConsumption.current.industrial)} m³`}
        />
      </div>

      {/* Register consumption button */}
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Registrar Consumo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Consumo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Setor</Label>
                <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
                  <SelectTrigger id="sector">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="domestico">Doméstico</SelectItem>
                    <SelectItem value="agricola">Agrícola</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume">Volume (m³)</Label>
                <Input
                  id="volume"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Salvar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Weekly chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Consumo Semanal por Setor
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={last7Days}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{ value: 'm³', position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="Doméstico" stackId="a" fill="hsl(var(--primary))" />
            <Bar dataKey="Agrícola" stackId="a" fill="hsl(var(--success))" />
            <Bar dataKey="Industrial" stackId="a" fill="hsl(var(--warning))" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Monthly comparison */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Comparativo Mensal
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              {monthlyConsumption.current.month}
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Doméstico:</span>
                <span className="font-semibold text-foreground">
                  {formatNumberPt(monthlyConsumption.current.domestico)} m³
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Agrícola:</span>
                <span className="font-semibold text-foreground">
                  {formatNumberPt(monthlyConsumption.current.agricola)} m³
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Industrial:</span>
                <span className="font-semibold text-foreground">
                  {formatNumberPt(monthlyConsumption.current.industrial)} m³
                </span>
              </div>
              <div className="pt-3 border-t flex justify-between items-center">
                <span className="font-medium text-foreground">Total:</span>
                <span className="text-xl font-bold text-foreground">
                  {formatNumberPt(monthlyConsumption.current.total)} m³
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              {monthlyConsumption.previous.month}
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Doméstico:</span>
                <span className="font-semibold text-foreground">
                  {formatNumberPt(monthlyConsumption.previous.domestico)} m³
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Agrícola:</span>
                <span className="font-semibold text-foreground">
                  {formatNumberPt(monthlyConsumption.previous.agricola)} m³
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Industrial:</span>
                <span className="font-semibold text-foreground">
                  {formatNumberPt(monthlyConsumption.previous.industrial)} m³
                </span>
              </div>
              <div className="pt-3 border-t flex justify-between items-center">
                <span className="font-medium text-foreground">Total:</span>
                <span className="text-xl font-bold text-foreground">
                  {formatNumberPt(monthlyConsumption.previous.total)} m³
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Variação total:{' '}
            <span className={`font-semibold ${parseFloat(monthlyVariation) > 0 ? 'text-destructive' : 'text-success'}`}>
              {parseFloat(monthlyVariation) > 0 ? '+' : ''}{monthlyVariation}%
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}
