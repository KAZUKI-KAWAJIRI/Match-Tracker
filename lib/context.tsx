"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CoinResult, TurnOrder, MatchResult, DuelRecord, Stats } from './types';
import { v4 as uuidv4 } from 'uuid';

interface DuelContextType {
  records: DuelRecord[];
  addRecord: (record: Omit<DuelRecord, 'id' | 'date'>) => void;
  calculateStats: () => Stats;
  knownDecks: {
    myDecks: string[];
    opponentDecks: string[];
  };
}

const DuelContext = createContext<DuelContextType | undefined>(undefined);

export function useDuel() {
  const context = useContext(DuelContext);
  if (context === undefined) {
    throw new Error('useDuel must be used within a DuelProvider');
  }
  return context;
}

export function DuelProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<DuelRecord[]>([]);
  const [knownDecks, setKnownDecks] = useState<{ myDecks: string[], opponentDecks: string[] }>({
    myDecks: [],
    opponentDecks: []
  });

  // ローカルストレージからデータを読み込む
  useEffect(() => {
    const savedRecords = localStorage.getItem('duelRecords');
    if (savedRecords) {
      const parsedRecords = JSON.parse(savedRecords) as DuelRecord[];
      // 日付文字列をDateオブジェクトに変換
      const recordsWithDates = parsedRecords.map(record => ({
        ...record,
        date: new Date(record.date)
      }));
      setRecords(recordsWithDates);
    }
  }, []);

  // 記録が変更されたらローカルストレージに保存
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem('duelRecords', JSON.stringify(records));
      
      // 既知のデッキリストを更新
      const myDecks = Array.from(new Set(records.map(r => r.myDeck).filter(Boolean)));
      const opponentDecks = Array.from(new Set(records.map(r => r.opponentDeck).filter(Boolean)));
      
      setKnownDecks({
        myDecks,
        opponentDecks
      });
    }
  }, [records]);

  // 新しい記録を追加
  const addRecord = (record: Omit<DuelRecord, 'id' | 'date'>) => {
    const newRecord: DuelRecord = {
      ...record,
      id: uuidv4(),
      date: new Date()
    };
    setRecords(prev => [...prev, newRecord]);
  };

  // 統計情報を計算
  const calculateStats = (): Stats => {
    const totalMatches = records.length;
    
    if (totalMatches === 0) {
      return {
        totalMatches: 0,
        coinStats: {
          heads: 0,
          tails: 0,
          headsPercentage: 0,
          tailsPercentage: 0
        },
        turnStats: {
          first: 0,
          second: 0,
          firstPercentage: 0,
          secondPercentage: 0
        },
        resultStats: {
          wins: 0,
          losses: 0,
          winPercentage: 0
        }
      };
    }

    const heads = records.filter(r => r.coin === 'heads').length;
    const tails = records.filter(r => r.coin === 'tails').length;
    
    const first = records.filter(r => r.turnOrder === 'first').length;
    const second = records.filter(r => r.turnOrder === 'second').length;
    
    const wins = records.filter(r => r.result === 'win').length;
    const losses = records.filter(r => r.result === 'lose').length;

    return {
      totalMatches,
      coinStats: {
        heads,
        tails,
        headsPercentage: totalMatches > 0 ? Math.round((heads / totalMatches) * 100) : 0,
        tailsPercentage: totalMatches > 0 ? Math.round((tails / totalMatches) * 100) : 0
      },
      turnStats: {
        first,
        second,
        firstPercentage: totalMatches > 0 ? Math.round((first / totalMatches) * 100) : 0,
        secondPercentage: totalMatches > 0 ? Math.round((second / totalMatches) * 100) : 0
      },
      resultStats: {
        wins,
        losses,
        winPercentage: totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0
      }
    };
  };

  return (
    <DuelContext.Provider value={{ records, addRecord, calculateStats, knownDecks }}>
      {children}
    </DuelContext.Provider>
  );
} 