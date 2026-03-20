'use client';

import { useAppStore } from '@/store';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  XCircle,
  Check,
  Trash2,
  Filter
} from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

export default function AlertsPage() {
  const { alerts, acknowledgeAlert } = useAppStore();
  const [filter, setFilter] = useState<string>('all');

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.acknowledged;
    return alert.severity === filter;
  });

  const severityConfig = {
    info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Info' },
    warning: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Warning' },
    error: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20', label: 'Error' },
    success: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20', label: 'Success' },
  };

  const stats = {
    total: alerts.length,
    unread: alerts.filter(a => !a.acknowledged).length,
    warning: alerts.filter(a => a.severity === 'warning').length,
    error: alerts.filter(a => a.severity === 'error').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Alerts & Incidents</h1>
          <p className="text-mission-muted">System alerts and incident management</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setFilter('all')}
          className={clsx(
            'p-4 rounded-xl border transition-all text-center',
            filter === 'all'
              ? 'bg-blue-500/20 border-blue-500/30'
              : 'bg-mission-card border-mission-border hover:border-mission-muted'
          )}
        >
          <Bell className="w-6 h-6 text-mission-muted mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-mission-muted">Total</p>
        </button>

        <button
          onClick={() => setFilter('unread')}
          className={clsx(
            'p-4 rounded-xl border transition-all text-center',
            filter === 'unread'
              ? 'bg-orange-500/20 border-orange-500/30'
              : 'bg-mission-card border-mission-border hover:border-mission-muted'
          )}
        >
          <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{stats.unread}</p>
          <p className="text-sm text-mission-muted">Unread</p>
        </button>

        <button
          onClick={() => setFilter('warning')}
          className={clsx(
            'p-4 rounded-xl border transition-all text-center',
            filter === 'warning'
              ? 'bg-yellow-500/20 border-yellow-500/30'
              : 'bg-mission-card border-mission-border hover:border-mission-muted'
          )}
        >
          <AlertTriangle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{stats.warning}</p>
          <p className="text-sm text-mission-muted">Warnings</p>
        </button>

        <button
          onClick={() => setFilter('error')}
          className={clsx(
            'p-4 rounded-xl border transition-all text-center',
            filter === 'error'
              ? 'bg-red-500/20 border-red-500/30'
              : 'bg-mission-card border-mission-border hover:border-mission-muted'
          )}
        >
          <XCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{stats.error}</p>
          <p className="text-sm text-mission-muted">Errors</p>
        </button>
      </div>

      {/* Alert List */}
      <div className="bg-mission-card border border-mission-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Alert History</h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-mission-muted" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-mission-dark border border-mission-border rounded-lg px-3 py-1 text-sm text-white"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;
            
            return (
              <div 
                key={alert.id}
                className={clsx(
                  'flex items-start gap-4 p-4 rounded-lg border transition-all',
                  alert.acknowledged
                    ? 'bg-mission-dark border-mission-border opacity-60'
                    : 'bg-mission-dark border-mission-border'
                )}
              >
                <div className={clsx('p-2 rounded-lg flex-shrink-0', config.bg)}>
                  <Icon className={clsx('w-5 h-5', config.color)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white">{alert.title}</h3>
                    <span className={clsx(
                      'px-2 py-0.5 text-xs font-medium rounded-full',
                      config.bg,
                      config.color
                    )}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-mission-muted">{alert.message}</p>
                  <p className="text-xs text-mission-muted mt-2">
                    {alert.timestamp.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="p-2 text-mission-muted hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                      title="Acknowledge"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    className="p-2 text-mission-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredAlerts.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-mission-muted mx-auto mb-4" />
              <p className="text-mission-muted">No alerts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
