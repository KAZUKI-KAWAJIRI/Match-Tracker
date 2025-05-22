'use client';

import type React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  CoinResult,
  type DuelRecord,
  type KnownDecks,
  MatchResult,
  type Stats,
  TurnOrder,
} from './types';
import { calculateStatsFromRecords } from './utils';

interface DuelContextType {
  records: DuelRecord[];
  addRecord: (record: Omit<DuelRecord, 'id' | 'date'>) => void;
  calculateStats: () => Stats;
  knownDecks: KnownDecks;
  clearAllRecords: () => void;
  storageKey: string;
}

const DuelContext = createContext<DuelContextType | undefined>(undefined);

// 基本ストレージキー
const STORAGE_KEY = 'duelRecords';

/**
 * ローカルストレージからユーザーIDを取得する関数
 * 複数の認証情報の保存形式に対応
 */
function getUserIdFromLocalStorage(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    // Supabase認証トークンからの取得を試みる (新形式)
    const sbToken = localStorage.getItem('sb-wzabhxqdnzkkjxbohlby-auth-token');
    if (sbToken) {
      const tokenData = JSON.parse(sbToken);
      const userId = tokenData?.user?.id;
      if (userId) return userId;
    }

    // 古い形式からの取得を試みる
    const legacyToken = localStorage.getItem('supabase.auth.token');
    if (legacyToken) {
      const tokenData = JSON.parse(legacyToken);
      const userId = tokenData?.currentSession?.user?.id;
      if (userId) return userId;
    }

    return null;
  } catch (error) {
    console.error('ユーザーID取得エラー:', error);
    return null;
  }
}

export function useDuel() {
  const context = useContext(DuelContext);
  if (context === undefined) {
    throw new Error('useDuel must be used within a DuelProvider');
  }
  return context;
}

export function DuelProvider({ children }: { children: React.ReactNode }) {
  // ストレージキーの状態管理
  const [storageKey, setStorageKey] = useState(STORAGE_KEY);
  const [records, setRecords] = useState<DuelRecord[]>([]);
  const [knownDecks, setKnownDecks] = useState<KnownDecks>({
    myDecks: [],
    opponentDecks: [],
  });
  const [initialized, setInitialized] = useState(false);

  // クライアントサイドでのみ認証情報を取得してストレージキーを設定
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userId = getUserIdFromLocalStorage();
    if (userId) {
      console.log('認証済みユーザーIDを検出:', `${userId.substring(0, 8)}...`);
      setStorageKey(`${STORAGE_KEY}_${userId}`);
    } else {
      console.log('未認証ユーザー: 共有ストレージキーを使用');
      setStorageKey(STORAGE_KEY);
    }

    setInitialized(true);
  }, []);

  // ローカルストレージからデータを読み込む
  useEffect(() => {
    if (!initialized || typeof window === 'undefined') return;

    try {
      console.log(`ストレージキー "${storageKey}" からデータを読み込み中...`);
      const savedRecords = localStorage.getItem(storageKey);

      if (savedRecords) {
        const parsedRecords = JSON.parse(savedRecords) as DuelRecord[];
        // 日付文字列をDateオブジェクトに変換
        const recordsWithDates = parsedRecords.map((record) => ({
          ...record,
          date: new Date(record.date),
        }));
        setRecords(recordsWithDates);
        console.log(`${recordsWithDates.length}件のレコードを読み込みました`);
      } else {
        // 新しいキーの場合、レコードをクリア
        setRecords([]);
        console.log('レコードが見つかりません。新規作成します。');
      }
    } catch (error) {
      console.error('ローカルストレージからのデータ読み込みエラー:', error);
      // エラー時は空の配列を設定
      setRecords([]);
    }
  }, [storageKey, initialized]);

  // 既知のデッキリストを更新
  useEffect(() => {
    if (records.length > 0) {
      const myDecks = Array.from(new Set(records.map((r) => r.myDeck))).filter(
        Boolean,
      );
      const opponentDecks = Array.from(
        new Set(records.map((r) => r.opponentDeck)),
      ).filter(Boolean);

      setKnownDecks({ myDecks, opponentDecks });
    } else {
      setKnownDecks({ myDecks: [], opponentDecks: [] });
    }
  }, [records]);

  // 記録が変更されたらローカルストレージに保存
  useEffect(() => {
    if (!initialized || typeof window === 'undefined' || records.length === 0)
      return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(records));
      console.log(`${records.length}件のレコードを保存しました`);
    } catch (error) {
      console.error('ローカルストレージへのデータ保存エラー:', error);
    }
  }, [records, storageKey, initialized]);

  // 新しい記録を追加
  const addRecord = useCallback((record: Omit<DuelRecord, 'id' | 'date'>) => {
    const newRecord: DuelRecord = {
      ...record,
      id: uuidv4(),
      date: new Date(),
    };
    setRecords((prev) => [...prev, newRecord]);
  }, []);

  // すべての記録をクリア
  const clearAllRecords = useCallback(() => {
    if (
      window.confirm(
        '全ての記録を削除してもよろしいですか？この操作は元に戻せません。',
      )
    ) {
      setRecords([]);
      try {
        localStorage.removeItem(storageKey);
        console.log('全レコードを削除しました');
      } catch (error) {
        console.error('ローカルストレージからのデータ削除エラー:', error);
      }
    }
  }, [storageKey]);

  // 統計情報を計算 - メモ化して不要な再計算を防止
  const calculateStats = useCallback(() => {
    return calculateStatsFromRecords(records);
  }, [records]);

  // コンテキスト値をメモ化
  const contextValue = useMemo(
    () => ({
      records,
      addRecord,
      calculateStats,
      knownDecks,
      clearAllRecords,
      storageKey,
    }),
    [
      records,
      addRecord,
      calculateStats,
      knownDecks,
      clearAllRecords,
      storageKey,
    ],
  );

  return (
    <DuelContext.Provider value={contextValue}>{children}</DuelContext.Provider>
  );
}
