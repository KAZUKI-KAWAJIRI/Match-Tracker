// グローバルJestの型定義
import '@testing-library/jest-dom';

// Jest関連の型
declare global {
  namespace jest {
    interface Mock<T = any, Y extends any[] = any> {
      (...args: Y): T;
      mockImplementation: (fn: (...args: Y) => T) => Mock<T, Y>;
      mockReturnValue: (value: T) => Mock<T, Y>;
      mockResolvedValue: (value: T) => Mock<T, Y>;
      mockRejectedValue: (error: any) => Mock<T, Y>;
      mockReturnThis: () => Mock<T, Y>;
      mockRestore: () => void;
      mockReset: () => void;
      mockClear: () => void;
      getMockName: () => string;
      getMockImplementation: () => ((...args: Y) => T) | undefined;
      mockName: (name: string) => Mock<T, Y>;
    }
  }
  
  function describe(name: string, fn: () => void): void;
  function test(name: string, fn: (done?: jest.DoneCallback) => void | Promise<any>, timeout?: number): void;
  function expect<T>(actual: T): jest.Matchers<T>;
  function beforeEach(fn: () => void | Promise<any>, timeout?: number): void;
  function afterEach(fn: () => void | Promise<any>, timeout?: number): void;
  function beforeAll(fn: () => void | Promise<any>, timeout?: number): void;
  function afterAll(fn: () => void | Promise<any>, timeout?: number): void;
  
  // jestオブジェクトをグローバルに定義
  const jest: {
    fn: <T = any, Y extends any[] = any>() => jest.Mock<T, Y>;
    mock: (moduleName: string, factory?: any) => jest.Mock;
    clearAllMocks: () => void;
    resetAllMocks: () => void;
    restoreAllMocks: () => void;
    spyOn: <T extends {}, M extends keyof T>(object: T, method: M) => jest.SpyInstance<T[M], T extends any[] ? T : any[]>;
  };
  
  // テスト用のエイリアス
  const it: typeof test;
} 