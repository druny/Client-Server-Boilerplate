import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DocMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DocMonitor
    toggleVisibilityKey="ctrl-i"
    changePositionKey="ctrl-y"
    defaultIsVisible
  >
    <LogMonitor theme="tomorrow" />
  </DocMonitor>,
);
