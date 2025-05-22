'use client';

import React, { useMemo, useState } from 'react';
import { useDuel } from '@/lib/context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { translate, groupRecordsByDate, sortDateStrings } from '@/lib/utils';
import { DuelRecord, Stats } from '@/lib/types';

// 統計情報を表示するコンポーネント
function StatsCard({ stats }: { stats: Stats }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>統計情報</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">コイントス統計</h3>
            <p>表: {stats.coinStats.heads}回 ({stats.coinStats.headsPercentage}%)</p>
            <p>裏: {stats.coinStats.tails}回 ({stats.coinStats.tailsPercentage}%)</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">ターン順統計</h3>
            <p>先攻: {stats.turnStats.first}回 ({stats.turnStats.firstPercentage}%)</p>
            <p>後攻: {stats.turnStats.second}回 ({stats.turnStats.secondPercentage}%)</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">勝率統計</h3>
            <p>勝利: {stats.resultStats.wins}回</p>
            <p>敗北: {stats.resultStats.losses}回</p>
            <p>勝率: {stats.resultStats.winPercentage}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 日付ごとの記録リストを表示するコンポーネント
function DateRecordCard({ dateStr, records }: { dateStr: string; records: ReturnType<typeof useDuel>['records'] }) {
  return (
    <Card key={dateStr} className="mb-4">
      <CardHeader className="py-3">
        <CardTitle className="text-xl">{dateStr}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>コイン</TableHead>
              <TableHead>手番</TableHead>
              <TableHead>結果</TableHead>
              <TableHead>使用デッキ</TableHead>
              <TableHead>対戦デッキ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record: DuelRecord) => (
              <TableRow key={record.id}>
                <TableCell>{translate.coin(record.coin)}</TableCell>
                <TableCell>{translate.turn(record.turnOrder)}</TableCell>
                <TableCell>{translate.result(record.result)}</TableCell>
                <TableCell>{record.myDeck}</TableCell>
                <TableCell>{record.opponentDeck}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// 空の記録メッセージを表示するコンポーネント
function EmptyRecordsCard() {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <p className="text-muted-foreground">記録がありません。デュエルの結果を入力してください。</p>
      </CardContent>
    </Card>
  );
}

export function DuelRecords() {
  const { records, calculateStats, clearAllRecords } = useDuel();
  const [filterDate, setFilterDate] = useState<string | null>(null);
  
  const stats = useMemo(() => calculateStats(), [calculateStats]);

  // 日付ごとにグループ化された記録
  const recordsByDate = useMemo(() => groupRecordsByDate(records), [records]);
  
  // 日付の配列を新しい順にソート
  const dates = useMemo(() => sortDateStrings(Object.keys(recordsByDate)), [recordsByDate]);

  // 表示する日付をフィルタリング
  const displayDates = filterDate ? [filterDate] : dates;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">デュエル記録</h2>
        {records.length > 0 && (
          <Button variant="destructive" onClick={clearAllRecords}>
            全記録を削除
          </Button>
        )}
      </div>

      {/* 統計情報 */}
      {stats.totalMatches > 0 && <StatsCard stats={stats} />}

      {/* 日付フィルター（記録が複数日ある場合のみ表示） */}
      {dates.length > 1 && (
        <div className="mb-4">
          <select 
            className="px-3 py-2 border rounded"
            value={filterDate || ''}
            onChange={(e) => setFilterDate(e.target.value || null)}
          >
            <option value="">全ての日付</option>
            {dates.map((date: string) => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
      )}

      {/* デュエル記録一覧 */}
      {dates.length > 0 ? (
        displayDates.map((dateStr: string) => (
          <DateRecordCard 
            key={dateStr} 
            dateStr={dateStr} 
            records={recordsByDate[dateStr]} 
          />
        ))
      ) : (
        <EmptyRecordsCard />
      )}
    </div>
  );
} 