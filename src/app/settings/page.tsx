'use client';

import { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Save,
  RefreshCw
} from 'lucide-react';
import clsx from 'clsx';

const tabs = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'data', label: 'Data', icon: Database },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-mission-muted">Configure your Mission Control</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all',
                  activeTab === tab.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-mission-muted hover:bg-mission-card hover:text-white'
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="bg-mission-card border border-mission-border rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">General Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Dashboard Title
                    </label>
                    <input
                      type="text"
                      defaultValue="Mission Control"
                      className="w-full px-4 py-2 bg-mission-dark border border-mission-border rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Refresh Interval
                    </label>
                    <select
                      defaultValue="5"
                      className="w-full px-4 py-2 bg-mission-dark border border-mission-border rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="1">1 second</option>
                      <option value="5">5 seconds</option>
                      <option value="10">10 seconds</option>
                      <option value="30">30 seconds</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Default Page
                    </label>
                    <select
                      defaultValue="/"
                      className="w-full px-4 py-2 bg-mission-dark border border-mission-border rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="/">Mission Control</option>
                      <option value="/agents">Agents</option>
                      <option value="/models">Models</option>
                      <option value="/tasks">Tasks</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-mission-card border border-mission-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { label: 'Task completed', desc: 'When a task finishes' },
                  { label: 'Agent error', desc: 'When an agent encounters an error' },
                  { label: 'Fallback triggered', desc: 'When model fallback is activated' },
                  { label: 'System alerts', desc: 'Critical system notifications' },
                  { label: 'Daily summary', desc: 'Daily performance report' },
                ].map((item, i) => (
                  <label key={i} className="flex items-center justify-between p-3 bg-mission-dark rounded-lg cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-mission-muted">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-mission-card border border-mission-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Security Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue="60"
                    className="w-full px-4 py-2 bg-mission-dark border border-mission-border rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <label className="flex items-center gap-3 p-3 bg-mission-dark rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                  <div>
                    <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-mission-muted">Require 2FA for login</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-mission-dark rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                  <div>
                    <p className="text-sm font-medium text-white">Audit Logging</p>
                    <p className="text-xs text-mission-muted">Log all admin actions</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-mission-card border border-mission-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Appearance</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Dark', 'Light', 'System'].map((theme) => (
                      <button
                        key={theme}
                        className={clsx(
                          'p-4 rounded-lg border text-center transition-all',
                          theme === 'Dark'
                            ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                            : 'bg-mission-dark border-mission-border text-mission-muted hover:text-white'
                        )}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Accent Color
                  </label>
                  <div className="flex gap-3">
                    {['#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ef4444', '#ec4899'].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white transition-all"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Font Size
                  </label>
                  <select
                    defaultValue="medium"
                    className="w-full px-4 py-2 bg-mission-dark border border-mission-border rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="bg-mission-card border border-mission-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Data Management</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-mission-dark rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">Local Storage</span>
                    <span className="text-sm text-mission-muted">2.4 MB</span>
                  </div>
                  <div className="h-2 bg-mission-border rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-blue-500 rounded-full" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-mission-border text-white rounded-lg hover:bg-mission-muted">
                    <RefreshCw className="w-4 h-4" />
                    Clear Cache
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                    <Database className="w-4 h-4" />
                    Reset Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
