/// <reference types="jest" />

// Jestグローバル型の拡張
declare global {
  // Jest型のエクスポート
  export const describe: typeof import('@jest/globals').describe;
  export const expect: typeof import('@jest/globals').expect;
  export const test: typeof import('@jest/globals').test;
  export const beforeEach: typeof import('@jest/globals').beforeEach;
  export const afterEach: typeof import('@jest/globals').afterEach;
  export const beforeAll: typeof import('@jest/globals').beforeAll;
  export const afterAll: typeof import('@jest/globals').afterAll;
  export const jest: typeof import('@jest/globals').jest;
}

// テスト関連モジュールへのパス解決を助けるためのモジュール宣言
declare module '@/components/ImportButton' {
  export const ImportButton: React.FC;
}

declare module '@/lib/services/duelService' {
  import { DuelRecord, KnownDecks } from '@/lib/types';
  
  export const duelService: {
    getUserRecords: (userId: string) => Promise<DuelRecord[]>;
    addRecord: (userId: string, record: DuelRecord) => Promise<DuelRecord>;
    importRecords: (userId: string, records: DuelRecord[]) => Promise<void>;
    clearRecords: (userId: string) => Promise<void>;
    getKnownDecks: (userId: string) => Promise<KnownDecks>;
    updateKnownDecks: (userId: string, decks: KnownDecks) => Promise<void>;
  };
} 