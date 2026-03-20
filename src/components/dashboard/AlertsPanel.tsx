'use client';

import { useAppStore } from '@/store';
import { AlertTriangle, Bell, Check, X } from 'lucide-react';
import clsx from 'clsx';

export function AlertsPanel() {
  const { alerts, acknowledgeAlert } = useAppStore();
  const unacknowledged = alerts.filter(a => !a.acknowledged);

  return (
    <div className="bg-mission-card border border-mission-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-400" />
          <h3 className="font-semibold text-white">Alerts</h3>
        </div>
        {unacknowledged.length > 0 && (
          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
            {unacknowledged.length}
          </span>
        )}
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {alerts.slice(0, 3).map((alert) => (
          <div 
            key={alert.id}
            className={clsx(
              'p-3 rounded-lg border',
              alert.acknowledged 
                ? 'bg-mission-dark border-mission-border opacity-60' 
                : 'bg-mission-dark border-orange-500/30'
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className={clsx(
                  'w-4 h-4 mt-0.5 flex-shrink-0',
                  alert.severity === 'warning' ? 'text-yellow-400' : 'text-red-400'
                )} />
                <div>
                  <p className="text-sm font-medium text-white">{alert.title}</p>
                  <p className="text-xs text-mission-muted mt-0.5">{alert.message}</p>
                </div>
              </div>
              {!alert.acknowledged && (
                <button 
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="p-1 hover:bg-mission-border rounded transition-colors"
                >
                  <Check className="w-3.5 h-3.5 text-mission-muted hover:text-green-400" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <p className="text-sm text-mission-muted text-center py-4">No alerts</p>
      )}
    </div>
  );
}
