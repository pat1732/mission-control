'use client';

import { useAppStore } from '@/store';
import { AgentCard } from '@/components/agents/AgentCard';
import { SystemHealthWidget } from '@/components/dashboard/SystemHealthWidget';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { QueueWidget } from '@/components/dashboard/QueueWidget';

export default function MissionControl() {
  const { agents, tasks } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Mission Control</h1>
        <p className="text-mission-muted">System Overview - All Agents</p>
      </div>

      {/* Top Section - Health + Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SystemHealthWidget />
        <QueueWidget />
        <AlertsPanel />
      </div>

      {/* Agent Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Agent Roster</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}
