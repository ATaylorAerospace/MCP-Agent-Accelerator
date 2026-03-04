import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import AgentAccelerator, { ServerConfig } from './main';

// Suppress logger output during tests
jest.mock('winston', () => {
  const noop = jest.fn();
  const logger = { info: noop, warn: noop, error: noop, debug: noop };
  return {
    createLogger: jest.fn(() => logger),
    format: {
      combine: jest.fn(),
      timestamp: jest.fn(),
      errors: jest.fn(),
      json: jest.fn(),
    },
    transports: { Console: jest.fn() },
  };
});

describe('AgentAccelerator', () => {
  let accelerator: AgentAccelerator;

  beforeEach(() => {
    accelerator = new AgentAccelerator();
  });

  describe('constructor', () => {
    it('should create an instance', () => {
      expect(accelerator).toBeInstanceOf(AgentAccelerator);
    });
  });

  describe('registerServers', () => {
    it('should register servers from a config array', () => {
      const configs: ServerConfig[] = [
        { name: 'github' },
        { name: 'filesystem', url: 'file:///tmp' },
      ];
      accelerator.registerServers(configs);
      expect(accelerator.getRegisteredServers()).toEqual(['github', 'filesystem']);
    });

    it('should handle empty config array without throwing', () => {
      expect(() => accelerator.registerServers([])).not.toThrow();
    });

    it('should default to empty array when called with no arguments', () => {
      expect(() => accelerator.registerServers()).not.toThrow();
      expect(accelerator.getRegisteredServers()).toHaveLength(0);
    });

    it('should overwrite a server registered with the same name', () => {
      accelerator.registerServers([{ name: 'github', url: 'https://old.url' }]);
      accelerator.registerServers([{ name: 'github', url: 'https://new.url' }]);
      expect(accelerator.getRegisteredServers()).toHaveLength(1);
    });
  });

  describe('runWorkflow', () => {
    it('should not throw for a valid workflow name', () => {
      expect(() => accelerator.runWorkflow('code-review')).not.toThrow();
    });

    it('should throw when given an empty workflow name', () => {
      expect(() => accelerator.runWorkflow('')).toThrow('workflowName is required');
    });
  });

  describe('getRegisteredServers', () => {
    it('should return an empty array when no servers are registered', () => {
      expect(accelerator.getRegisteredServers()).toEqual([]);
    });

    it('should return server names in registration order', () => {
      accelerator.registerServers([
        { name: 'alpha' },
        { name: 'beta' },
        { name: 'gamma' },
      ]);
      expect(accelerator.getRegisteredServers()).toEqual(['alpha', 'beta', 'gamma']);
    });
  });
});
