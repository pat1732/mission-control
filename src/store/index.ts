import { create } from 'zustand';
import { Agent, Task, SystemEvent, Alert, SystemHealth } from '@/types';
import { mockAgents, mockTasks, mockEvents, mockAlerts, mockSystemHealth } from '@/lib/data';

interface AppState {
  // Agents
  agents: Agent[];
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent | null) => void;
  updateAgentStatus: (agentId: string, status: Agent['status']) => void;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  
  // Events
  events: SystemEvent[];
  addEvent: (event: SystemEvent) => void;
  
  // Alerts
  alerts: Alert[];
  acknowledgeAlert: (alertId: string) => void;
  
  // System Health
  systemHealth: SystemHealth;
  updateSystemHealth: (health: Partial<SystemHealth>) => void;
  
  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Agents
  agents: mockAgents,
  selectedAgent: null,
  setSelectedAgent: (agent) => set({ selectedAgent: agent }),
  updateAgentStatus: (agentId, status) => set((state) => ({
    agents: state.agents.map((a) => 
      a.id === agentId ? { ...a, status } : a
    )
  })),
  
  // Tasks
  tasks: mockTasks,
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
  updateTaskStatus: (taskId, status) => set((state) => ({
    tasks: state.tasks.map((t) => 
      t.id === taskId ? { ...t, status } : t
    )
  })),
  
  // Events
  events: mockEvents,
  addEvent: (event) => set((state) => ({
    events: [event, ...state.events].slice(0, 50) // Keep last 50 events
  })),
  
  // Alerts
  alerts: mockAlerts,
  acknowledgeAlert: (alertId) => set((state) => ({
    alerts: state.alerts.map((a) => 
      a.id === alertId ? { ...a, acknowledged: true } : a
    )
  })),
  
  // System Health
  systemHealth: mockSystemHealth,
  updateSystemHealth: (health) => set((state) => ({
    systemHealth: { ...state.systemHealth, ...health }
  })),
  
  // UI State
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
