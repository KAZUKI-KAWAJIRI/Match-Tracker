'use client';

import { useDuel } from '@/lib/context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

export function DuelRecords() {
  const { records, calculateStats } = useDuel();
  const stats = calculateStats();

  // 日付ごとにグループ化
  const recordsByDate = records.reduce((acc, record) => {
    const dateStr = new Date(record.date).toLocaleDateString('ja-JP');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(record);
    return acc;
  }, {} as Record<string, typeof records>);

  // 日付の配列を取得し、新しい順にソート
  const dates = Object.keys(recordsByDate).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  // 用語の日本語表記
  const translateCoin = (coin: string | null) => {
    if (coin === 'heads') return '表';
    if (coin === 'tails') return '裏';
    return '';
  };

  const translateTurn = (turn: string | null) => {
    if (turn === 'first') return '先攻';
    if (turn === 'second') return '後攻';
    return '';
  };

  const translateResult = (result: string | null) => {
    if (result === 'win') return '勝利';
    if (result === 'lose') return '敗北';
    return '';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">デュエル記録</h2>

      {/* 統計情報 */}
      {stats.totalMatches > 0 && (
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
      )}

      {/* デュエル記録一覧 */}
      {dates.length > 0 ? (
        dates.map((dateStr) => (
          <Card key={dateStr} className="mb-4">
            <CardHeader className="py-3">
              <CardTitle className="text-xl">{dateStr}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>コイン</TableHead>
                    <TableHead>順番</TableHead>
                    <TableHead>結果</TableHead>
                    <TableHead>自分のデッキ</TableHead>
                    <TableHead>相手のデッキ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recordsByDate[dateStr].map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{translateCoin(record.coin)}</TableCell>
                      <TableCell>{translateTurn(record.turnOrder)}</TableCell>
                      <TableCell>{translateResult(record.result)}</TableCell>
                      <TableCell>{record.myDeck}</TableCell>
                      <TableCell>{record.opponentDeck}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">記録がありません。デュエルの結果を入力してください。</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 