'use client';

import { useState } from 'react';
import { useAppStore } from '@/store';
import { 
  Brain, 
  ArrowRight, 
  Plus, 
  Play, 
  RotateCcw,
  Settings,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import clsx from 'clsx';

const availableModels = [
  'MiniMax-M2.5',
  'MiniMax-M2.5-Highspeed',
  'MiniMax-M2.5-Lightning',
  'GPT-4o',
  'Claude-3.5-Sonnet'
];

export default function ModelsPage() {
  const { agents } = useAppStore();
  const [selectedAgent, setSelectedAgent] = useState(agents[0]?.id);

  const agent = agents.find(a => a.id === selectedAgent);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Model Routing</h1>
        <p className="text-mission-muted">Configure primary and fallback models</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-white">Agents</h2>
          <div className="space-y-2">
            {agents.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelectedAgent(a.id)}
                className={clsx(
                  'w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left',
                  selectedAgent === a.id
                    ? 'bg-blue-500/20 border-blue-500/30'
                    : 'bg-mission-card border-mission-border hover:border-mission-muted'
                )}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: a.color + '20' }}
                >
                  <Brain className="w-4 h-4" style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{a.name}</p>
                  <p className="text-xs text-mission-muted truncate">{a.assignedModel}</p>
                </div>
                {a.fallbackModels.length > 0 && (
                  <span className="text-xs text-mission-muted">
                    +{a.fallbackModels.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Model Config */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white">Model Configuration</h2>
          
          {agent && (
            <div className="space-y-4">
              {/* Primary Model */}
              <div className="bg-mission-card border border-mission-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">Primary Model</h3>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <select
                  value={agent.assignedModel}
                  className="w-full px-4 py-2 bg-mission-dark border border-mission-border rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {availableModels.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {/* Fallback Chain */}
              <div className="bg-mission-card border border-mission-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">Fallback Chain</h3>
                  <button className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </div>
                
                <div className="space-y-2">
                  {agent.fallbackModels.map((model, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-mission-dark rounded-full text-xs text-mission-muted">
                        {index + 1}
                      </span>
                      <select
                        value={model}
                        className="flex-1 px-3 py-2 bg-mission-dark border border-mission-border rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        {availableModels.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <button className="p-2 text-mission-muted hover:text-red-400">
                        ×
                      </button>
                    </div>
                  ))}
                  
                  {agent.fallbackModels.length === 0 && (
                    <p className="text-sm text-mission-muted text-center py-4">
                      No fallback models configured
                    </p>
                  )}
                </div>
              </div>

              {/* Trigger Conditions */}
              <div className="bg-mission-card border border-mission-border rounded-xl p-4">
                <h3 className="font-medium text-white mb-3">Trigger Conditions</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-2 bg-mission-dark rounded-lg cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span className="text-sm text-white">Timeout (&gt;30s)</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 bg-mission-dark rounded-lg cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span className="text-sm text-white">Error Response</span>
                  </label>
                  <label className="flex items-center gap-3 p-2 bg-mission-dark rounded-lg cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-sm text-white">High Latency (&gt;5s)</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  <Settings className="w-4 h-4" />
                  Save Configuration
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-mission-border text-white rounded-lg hover:bg-mission-muted">
                  <Play className="w-4 h-4" />
                  Test Fallback
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
