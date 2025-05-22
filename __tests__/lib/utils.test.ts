/// <reference path="../global.d.ts" />
/// <reference path="../module-declarations.d.ts" />

import type { DuelRecord } from '@/lib/types';
import { calculateStatsFromRecords } from '@/lib/utils';

describe('Utils - calculateStatsFromRecords', () => {
  test('空の記録配列に対して正しい統計情報を返す', () => {
    const records: DuelRecord[] = [];
    const stats = calculateStatsFromRecords(records);

    expect(stats.totalMatches).toBe(0);
    expect(stats.coinStats.heads).toBe(0);
    expect(stats.coinStats.tails).toBe(0);
    expect(stats.coinStats.headsPercentage).toBe(0);
    expect(stats.coinStats.tailsPercentage).toBe(0);
    expect(stats.turnStats.first).toBe(0);
    expect(stats.turnStats.second).toBe(0);
    expect(stats.turnStats.firstPercentage).toBe(0);
    expect(stats.turnStats.secondPercentage).toBe(0);
    expect(stats.resultStats.wins).toBe(0);
    expect(stats.resultStats.losses).toBe(0);
    expect(stats.resultStats.winPercentage).toBe(0);
  });

  test('記録配列に対して正しい統計情報を計算する', () => {
    const records: DuelRecord[] = [
      {
        id: '1',
        date: new Date(),
        coin: 'heads',
        turnOrder: 'first',
        result: 'win',
        myDeck: 'デッキA',
        opponentDeck: 'デッキX',
      },
      {
        id: '2',
        date: new Date(),
        coin: 'tails',
        turnOrder: 'second',
        result: 'lose',
        myDeck: 'デッキB',
        opponentDeck: 'デッキY',
      },
      {
        id: '3',
        date: new Date(),
        coin: 'heads',
        turnOrder: 'first',
        result: 'win',
        myDeck: 'デッキA',
        opponentDeck: 'デッキZ',
      },
    ];

    const stats = calculateStatsFromRecords(records);

    // 全体の統計
    expect(stats.totalMatches).toBe(3);

    // コイントス統計
    expect(stats.coinStats.heads).toBe(2);
    expect(stats.coinStats.tails).toBe(1);
    expect(stats.coinStats.headsPercentage).toBe(66.67);
    expect(stats.coinStats.tailsPercentage).toBe(33.33);

    // 手番統計
    expect(stats.turnStats.first).toBe(2);
    expect(stats.turnStats.second).toBe(1);
    expect(stats.turnStats.firstPercentage).toBe(66.67);
    expect(stats.turnStats.secondPercentage).toBe(33.33);

    // 勝敗統計
    expect(stats.resultStats.wins).toBe(2);
    expect(stats.resultStats.losses).toBe(1);
    expect(stats.resultStats.winPercentage).toBe(66.67);
  });

  test('null値を含むレコードを正しく処理する', () => {
    const records: DuelRecord[] = [
      {
        id: '1',
        date: new Date(),
        coin: null,
        turnOrder: 'first',
        result: 'win',
        myDeck: 'デッキA',
        opponentDeck: 'デッキX',
      },
      {
        id: '2',
        date: new Date(),
        coin: 'tails',
        turnOrder: null,
        result: 'lose',
        myDeck: 'デッキB',
        opponentDeck: 'デッキY',
      },
      {
        id: '3',
        date: new Date(),
        coin: 'heads',
        turnOrder: 'first',
        result: null,
        myDeck: 'デッキA',
        opponentDeck: 'デッキZ',
      },
    ];

    const stats = calculateStatsFromRecords(records);

    // 全体の統計
    expect(stats.totalMatches).toBe(3);

    // コイントス統計（nullを除外）
    expect(stats.coinStats.heads).toBe(1);
    expect(stats.coinStats.tails).toBe(1);
    expect(stats.coinStats.headsPercentage).toBe(50);
    expect(stats.coinStats.tailsPercentage).toBe(50);

    // 手番統計（nullを除外）
    expect(stats.turnStats.first).toBe(2);
    expect(stats.turnStats.second).toBe(0);
    expect(stats.turnStats.firstPercentage).toBe(100);
    expect(stats.turnStats.secondPercentage).toBe(0);

    // 勝敗統計（nullを除外）
    expect(stats.resultStats.wins).toBe(1);
    expect(stats.resultStats.losses).toBe(1);
    expect(stats.resultStats.winPercentage).toBe(50);
  });
});
