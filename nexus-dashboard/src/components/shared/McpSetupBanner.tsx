// Author: A Taylor
// License: MIT
"use client";

interface McpSetupBannerProps {
  service: string;
  setupMessage: string;
  onDismiss: () => void;
}

export default function McpSetupBanner({ service, setupMessage, onDismiss }: McpSetupBannerProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
      <span className="mt-0.5 text-amber-400">⚠️</span>
      <div className="flex-1">
        <p className="font-medium text-amber-300">{service} — Setup Required</p>
        <p className="mt-1 text-amber-200/70">{setupMessage}</p>
      </div>
      <button
        onClick={onDismiss}
        className="shrink-0 rounded-md px-2 py-1 text-xs text-amber-400 hover:bg-amber-500/20 transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
}
