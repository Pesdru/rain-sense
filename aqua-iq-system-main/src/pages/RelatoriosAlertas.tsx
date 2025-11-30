import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { alerts, reports } from '@/mocks/alerts';
import { formatDateTimePt, formatRelativeTime } from '@/utils/format';
import { toast } from '@/hooks/use-toast';

export default function RelatoriosAlertas() {
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredAlerts = severityFilter === 'all' 
    ? alerts 
    : alerts.filter(a => a.severity === severityFilter);

  const infoCount = alerts.filter(a => a.severity === 'info').length;
  const warningCount = alerts.filter(a => a.severity === 'atencao').length;
  const criticalCount = alerts.filter(a => a.severity === 'critico').length;

  const handleDownload = (report: typeof reports[0]) => {
    toast({
      title: "Download iniciado",
      description: `${report.title}.${report.format}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Alert counters */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="text-3xl font-bold text-primary">{infoCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Informativos</div>
        </Card>
        
        <Card className="p-6">
          <div className="text-3xl font-bold text-warning">{warningCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Atenção</div>
        </Card>
        
        <Card className="p-6">
          <div className="text-3xl font-bold text-destructive">{criticalCount}</div>
          <div className="text-sm text-muted-foreground mt-1">Críticos</div>
        </Card>
      </div>

      {/* Reports section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Relatórios Disponíveis
        </h3>
        <Card className="divide-y">
          {reports.map((report) => (
            <div key={report.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{report.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Gerado em {formatDateTimePt(report.generatedAt)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground uppercase">
                  {report.format}
                </span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDownload(report)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Alerts section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Histórico de Alertas
          </h3>
          
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="info">Informativos</SelectItem>
              <SelectItem value="atencao">Atenção</SelectItem>
              <SelectItem value="critico">Críticos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`p-4 ${
                alert.severity === 'critico' ? 'border-l-4 border-l-destructive' :
                alert.severity === 'atencao' ? 'border-l-4 border-l-warning' :
                'border-l-4 border-l-primary'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {alert.active ? (
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                    )}
                    <h4 className="font-semibold text-foreground">{alert.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      alert.active 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-success/10 text-success'
                    }`}>
                      {alert.active ? 'Ativo' : 'Encerrado'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {alert.message}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Regra: {alert.rule}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(alert.createdAt)}</span>
                    {alert.resolvedAt && (
                      <>
                        <span>•</span>
                        <span>Resolvido: {formatRelativeTime(alert.resolvedAt)}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <StatusBadge status={alert.severity} size="sm" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
