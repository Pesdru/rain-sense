import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reservatorios from "./pages/Reservatorios";
import Consumo from "./pages/Consumo";
import Previsoes from "./pages/Previsoes";
import RelatoriosAlertas from "./pages/RelatoriosAlertas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<AppLayout title="Aqua IQ" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservatorios" element={<Reservatorios />} />
            <Route path="/consumo" element={<Consumo />} />
            <Route path="/previsoes" element={<Previsoes />} />
            <Route path="/relatorios-alertas" element={<RelatoriosAlertas />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
