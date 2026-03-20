// Agent Types
export type AgentStatus = 
  | 'working' 
  | 'idle' 
  | 'ready' 
  | 'waiting' 
  | 'blocked' 
  | 'reviewing' 
  | 'testing' 
  | 'fallback' 
  | 'error' 
  | 'offline';

export interface AgentMetrics {
  tasksCompleted: number;
  tasksFailed: number;
  avgLatency: number;
  uptime: number;
  retries: number;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  personality: string;
  status: AgentStatus;
  currentTask?: string;
  assignedModel: string;
  fallbackModels: string[];
  uptime: number;
  metrics: AgentMetrics;
  color: string;
  icon: string;
}

// Task Types
export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  assignedAgent?: string;
  upstream?: string[];
  downstream?: string[];
  createdAt: Date;
  completedAt?: Date;
}

// Model Types
export interface ModelConfig {
  agentId: string;
  primary: string;
  fallback: string[];
  triggerCondition: string;
}

// Event Types
export type EventSeverity = 'info' | 'warning' | 'error' | 'success';
export type EventType = 'task' | 'agent' | 'model' | 'system';

export interface SystemEvent {
  id: string;
  type: EventType;
  message: string;
  timestamp: Date;
  severity: EventSeverity;
  agentId?: string;
  taskId?: string;
}

// Alert Types
export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: EventSeverity;
  timestamp: Date;
  acknowledged: boolean;
}

// System Health
export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  activeAgents: number;
  totalAgents: number;
  runningTasks: number;
  queueDepth: number;
  avgLatency: number;
  fallbackTriggered: boolean;
  tokensUsed: number;
  costUsed: number;
}
