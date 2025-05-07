"use client"

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CoinResult, TurnOrder, MatchResult, DuelRecord, Stats, KnownDecks } from './types';
import { calculateStatsFromRecords } from './utils';
import { v4 as uuidv4 } from 'uuid';

interface DuelContextType {
  records: DuelRecord[];
  addRecord: (record: Omit<DuelRecord, 'id' | 'date'>) => void;
  calculateStats: () => Stats;
  knownDecks: KnownDecks;
  clearAllRecords: () => void;
}

const DuelContext = createContext<DuelContextType | undefined>(undefined);

const STORAGE_KEY = 'duelRecords';

export function useDuel() {
  const context = useContext(DuelContext);
  if (context === undefined) {
    throw new Error('useDuel must be used within a DuelProvider');
  }
  return context;
}

export function DuelProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<DuelRecord[]>([]);
  const [knownDecks, setKnownDecks] = useState<KnownDecks>({
    myDecks: [],
    opponentDecks: []
  });

  // ローカルストレージからデータを読み込む
  useEffect(() => {
    try {
      const savedRecords = localStorage.getItem(STORAGE_KEY);
      if (savedRecords) {
        const parsedRecords = JSON.parse(savedRecords) as DuelRecord[];
        // 日付文字列をDateオブジェクトに変換
        const recordsWithDates = parsedRecords.map(record => ({
          ...record,
          date: new Date(record.date)
        }));
        setRecords(recordsWithDates);
      }
    } catch (error) {
      console.error('ローカルストレージからのデータ読み込みエラー:', error);
    }
  }, []);

  // 既知のデッキリストを更新
  useEffect(() => {
    if (records.length > 0) {
      const myDecks = Array.from(new Set(records.map(r => r.myDeck)));
      const opponentDecks = Array.from(new Set(records.map(r => r.opponentDeck)));
      
      setKnownDecks({ myDecks, opponentDecks });
    }
  }, [records]);

  // 記録が変更されたらローカルストレージに保存
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error('ローカルストレージへのデータ保存エラー:', error);
    }
  }, [records]);

  // 新しい記録を追加
  const addRecord = useCallback((record: Omit<DuelRecord, 'id' | 'date'>) => {
    const newRecord: DuelRecord = {
      ...record,
      id: uuidv4(),
      date: new Date()
    };
    setRecords(prev => [...prev, newRecord]);
  }, []);

  // すべての記録をクリア
  const clearAllRecords = useCallback(() => {
    if (window.confirm('全ての記録を削除してもよろしいですか？この操作は元に戻せません。')) {
      setRecords([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // 統計情報を計算 - メモ化して不要な再計算を防止
  const calculateStats = useCallback(() => {
    return calculateStatsFromRecords(records);
  }, [records]);

  // コンテキスト値をメモ化
  const contextValue = useMemo(() => ({
    records,
    addRecord,
    calculateStats,
    knownDecks,
    clearAllRecords
  }), [records, addRecord, calculateStats, knownDecks, clearAllRecords]);

  return (
    <DuelContext.Provider value={contextValue}>
      {children}
    </DuelContext.Provider>
  );
} 