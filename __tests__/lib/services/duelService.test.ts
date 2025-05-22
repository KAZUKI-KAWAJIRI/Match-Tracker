/// <reference path="../../global.d.ts" />
/// <reference path="../../module-declarations.d.ts" />

import { duelService } from '@/lib/services/duelService';
import type { DuelRecord } from '@/lib/types';

describe('DuelService', () => {
  // 各テストの前にデータをリセット
  beforeEach(() => {
    // プライベートな実装の詳細にアクセスするためのワークアラウンド
    // @ts-ignore
    duelService.inMemoryRecords = {};
    // @ts-ignore
    duelService.inMemoryDecks = {};
  });

  test('初期状態では空の配列を返す', async () => {
    const records = await duelService.getUserRecords('test-user');
    expect(records).toEqual([]);
  });

  test('新しいレコードを追加して取得できる', async () => {
    const userId = 'test-user';
    const record: DuelRecord = {
      id: 'test-id',
      date: new Date(),
      coin: 'heads',
      turnOrder: 'first',
      result: 'win',
      myDeck: 'テストデッキ',
      opponentDeck: 'テスト相手デッキ',
    };

    await duelService.addRecord(userId, record);

    const records = await duelService.getUserRecords(userId);
    expect(records).toHaveLength(1);
    expect(records[0]).toEqual(record);
  });

  test('複数のレコードをインポートできる', async () => {
    const userId = 'test-user';
    const records: DuelRecord[] = [
      {
        id: 'test-id-1',
        date: new Date(),
        coin: 'heads',
        turnOrder: 'first',
        result: 'win',
        myDeck: 'テストデッキA',
        opponentDeck: 'テスト相手デッキX',
      },
      {
        id: 'test-id-2',
        date: new Date(),
        coin: 'tails',
        turnOrder: 'second',
        result: 'lose',
        myDeck: 'テストデッキB',
        opponentDeck: 'テスト相手デッキY',
      },
    ];

    await duelService.importRecords(userId, records);

    const retrievedRecords = await duelService.getUserRecords(userId);
    expect(retrievedRecords).toHaveLength(2);
    expect(retrievedRecords).toEqual(records);
  });

  test('レコードをクリアできる', async () => {
    const userId = 'test-user';
    const record: DuelRecord = {
      id: 'test-id',
      date: new Date(),
      coin: 'heads',
      turnOrder: 'first',
      result: 'win',
      myDeck: 'テストデッキ',
      opponentDeck: 'テスト相手デッキ',
    };

    await duelService.addRecord(userId, record);
    let records = await duelService.getUserRecords(userId);
    expect(records).toHaveLength(1);

    await duelService.clearRecords(userId);
    records = await duelService.getUserRecords(userId);
    expect(records).toHaveLength(0);
  });

  test('既知のデッキを更新して取得できる', async () => {
    const userId = 'test-user';
    const knownDecks = {
      myDecks: ['デッキA', 'デッキB'],
      opponentDecks: ['デッキX', 'デッキY', 'デッキZ'],
    };

    await duelService.updateKnownDecks(userId, knownDecks);

    const retrievedDecks = await duelService.getKnownDecks(userId);
    expect(retrievedDecks).toEqual(knownDecks);
  });
});
