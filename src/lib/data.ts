import { Agent, SystemEvent, Task, Alert, SystemHealth } from '@/types';

// Mock Agents Data
export const mockAgents: Agent[] = [
  {
    id: 'moh-no',
    name: 'โม่เน่',
    role: 'Main Agent / Orchestrator',
    personality: 'ผู้นำ คุม flow ทั้งระบบ ตัดสินใจและกระจายงาน',
    status: 'working',
    currentTask: 'Processing user request',
    assignedModel: 'MiniMax-M2.5',
    fallbackModels: ['MiniMax-M2.5-Highspeed'],
    uptime: 7200000, // 2 hours
    metrics: {
      tasksCompleted: 156,
      tasksFailed: 3,
      avgLatency: 1.2,
      uptime: 99.8,
      retries: 2
    },
    color: '#3b82f6',
    icon: 'command'
  },
  {
    id: 'na-lin',
    name: 'ณลิน',
    role: 'Researcher',
    personality: 'ฉลาด ชอบสำรวจ หา context เก่ง',
    status: 'ready',
    assignedModel: 'MiniMax-M2.5',
    fallbackModels: ['MiniMax-M2.5-Highspeed'],
    uptime: 7200000,
    metrics: {
      tasksCompleted: 89,
      tasksFailed: 1,
      avgLatency: 0.8,
      uptime: 99.5,
      retries: 0
    },
    color: '#22c55e',
    icon: 'search'
  },
  {
    id: 'may',
    name: 'เมย์',
    role: 'Developer',
    personality: 'ลงมือทำเร็ว แก้ปัญหาเชิงเทคนิค',
    status: 'idle',
    assignedModel: 'MiniMax-M2.5',
    fallbackModels: ['MiniMax-M2.5-Highspeed'],
    uptime: 7200000,
    metrics: {
      tasksCompleted: 234,
      tasksFailed: 5,
      avgLatency: 2.1,
      uptime: 98.9,
      retries: 3
    },
    color: '#eab308',
    icon: 'code'
  },
  {
    id: 'ee',
    name: 'เอ',
    role: 'Architect',
    personality: 'วางโครงสร้าง มองภาพรวม คิดเป็นระบบ',
    status: 'ready',
    assignedModel: 'MiniMax-M2.5',
    fallbackModels: ['MiniMax-M2.5-Highspeed'],
    uptime: 7200000,
    metrics: {
      tasksCompleted: 45,
      tasksFailed: 0,
      avgLatency: 1.5,
      uptime: 100,
      retries: 0
    },
    color: '#a855f7',
    icon: 'layout'
  },
  {
    id: 'bee',
    name: 'บี',
    role: 'Reviewer',
    personality: 'ละเอียด รอบคอบ จับข้อผิดพลาดเก่ง',
    status: 'reviewing',
    currentTask: 'Reviewing code quality',
    assignedModel: 'MiniMax-M2.5',
    fallbackModels: ['MiniMax-M2.5-Highspeed'],
    uptime: 7200000,
    metrics: {
      tasksCompleted: 178,
      tasksFailed: 2,
      avgLatency: 0.9,
      uptime: 99.2,
      retries: 1
    },
    color: '#ef4444',
    icon: 'shield'
  },
  {
    id: 'see',
    name: 'ซี',
    role: 'Tester / QA',
    personality: 'ตรวจ test case, validate flow, ป้องกัน bug หลุด',
    status: 'testing',
    currentTask: 'Running validation tests',
    assignedModel: 'MiniMax-M2.5',
    fallbackModels: ['MiniMax-M2.5-Highspeed'],
    uptime: 7200000,
    metrics: {
      tasksCompleted: 312,
      tasksFailed: 8,
      avgLatency: 1.1,
      uptime: 97.5,
      retries: 4
    },
    color: '#06b6d4',
    icon: 'check-circle'
  },
  {
    id: 'dee',
    name: 'ดี',
    role: 'Product Designer',
    personality: 'ใส่ใจ UX, visual hierarchy, product thinking',
    status: 'ready',
    assignedModel: 'MiniMax-M2.5',
    fallbackModels: ['MiniMax-M2.5-Highspeed'],
    uptime: 7200000,
    metrics: {
      tasksCompleted: 67,
      tasksFailed: 1,
      avgLatency: 1.3,
      uptime: 99.1,
      retries: 0
    },
    color: '#ec4899',
    icon: 'palette'
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    name: 'Process user trading request',
    status: 'running',
    assignedAgent: 'moh-no',
    createdAt: new Date(Date.now() - 60000),
    downstream: ['task-2']
  },
  {
    id: 'task-2',
    name: 'Research market data',
    status: 'pending',
    upstream: ['task-1'],
    createdAt: new Date(Date.now() - 30000)
  },
  {
    id: 'task-3',
    name: 'Code implementation',
    status: 'completed',
    assignedAgent: 'may',
    createdAt: new Date(Date.now() - 300000),
    completedAt: new Date(Date.now() - 180000)
  }
];

// Mock Events
export const mockEvents: SystemEvent[] = [
  {
    id: 'evt-1',
    type: 'task',
    message: 'Task "Process trading request" started',
    timestamp: new Date(Date.now() - 60000),
    severity: 'info'
  },
  {
    id: 'evt-2',
    type: 'agent',
    message: 'Agent บี entered reviewing mode',
    timestamp: new Date(Date.now() - 120000),
    severity: 'info'
  },
  {
    id: 'evt-3',
    type: 'model',
    message: 'Fallback triggered for agent เมย์',
    timestamp: new Date(Date.now() - 300000),
    severity: 'warning'
  },
  {
    id: 'evt-4',
    type: 'system',
    message: 'System health check passed',
    timestamp: new Date(Date.now() - 600000),
    severity: 'success'
  }
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'Fallback Triggered',
    message: 'Agent เมย์ switched to fallback model due to timeout',
    severity: 'warning',
    timestamp: new Date(Date.now() - 300000),
    acknowledged: false
  },
  {
    id: 'alert-2',
    title: 'High Latency',
    message: 'Average response time exceeded 2 seconds',
    severity: 'warning',
    timestamp: new Date(Date.now() - 600000),
    acknowledged: true
  }
];

// Mock System Health
export const mockSystemHealth: SystemHealth = {
  status: 'healthy',
  activeAgents: 6,
  totalAgents: 7,
  runningTasks: 3,
  queueDepth: 5,
  avgLatency: 1.2,
  fallbackTriggered: false,
  tokensUsed: 294000,
  costUsed: 0.12
};
