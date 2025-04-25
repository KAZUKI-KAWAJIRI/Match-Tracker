'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useDuel } from '@/lib/context';
import { CoinResult, TurnOrder, MatchResult } from '@/lib/types';

export function DuelForm() {
  const { addRecord, knownDecks } = useDuel();

  const [coin, setCoin] = useState<CoinResult>(null);
  const [turnOrder, setTurnOrder] = useState<TurnOrder>(null);
  const [result, setResult] = useState<MatchResult>(null);
  const [myDeck, setMyDeck] = useState('');
  const [opponentDeck, setOpponentDeck] = useState('');

  const [myDeckTab, setMyDeckTab] = useState('new');
  const [opponentDeckTab, setOpponentDeckTab] = useState('new');

  const handleSubmit = () => {
    if (!coin || !turnOrder || !result || !myDeck || !opponentDeck) {
      alert('すべての項目を入力してください');
      return;
    }

    addRecord({
      coin,
      turnOrder,
      result,
      myDeck,
      opponentDeck
    });

    // フォームをリセット
    setCoin(null);
    setTurnOrder(null);
    setResult(null);
    setMyDeck('');
    setOpponentDeck('');
    setMyDeckTab('new');
    setOpponentDeckTab('new');
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* コイン選択 */}
          <div>
            <h3 className="text-lg font-medium mb-2">コイントス</h3>
            <RadioGroup
              value={coin || ''}
              onValueChange={(value) => setCoin(value as CoinResult)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="heads" id="heads" />
                <Label htmlFor="heads">表</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tails" id="tails" />
                <Label htmlFor="tails">裏</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 先攻後攻選択 */}
          <div>
            <h3 className="text-lg font-medium mb-2">順番</h3>
            <RadioGroup
              value={turnOrder || ''}
              onValueChange={(value) => setTurnOrder(value as TurnOrder)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="first" id="first" />
                <Label htmlFor="first">先攻</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="second" id="second" />
                <Label htmlFor="second">後攻</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 勝敗選択 */}
          <div>
            <h3 className="text-lg font-medium mb-2">結果</h3>
            <RadioGroup
              value={result || ''}
              onValueChange={(value) => setResult(value as MatchResult)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="win" id="win" />
                <Label htmlFor="win">勝利</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lose" id="lose" />
                <Label htmlFor="lose">敗北</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 自分のデッキ選択 */}
          <div className="md:col-span-3 lg:col-span-1">
            <h3 className="text-lg font-medium mb-2">自分のデッキ</h3>
            <Tabs value={myDeckTab} onValueChange={setMyDeckTab}>
              <TabsList className="mb-2">
                <TabsTrigger value="new">新規</TabsTrigger>
                {knownDecks.myDecks.length > 0 && (
                  <TabsTrigger value="existing">既存</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="new">
                <Input
                  placeholder="デッキ名を入力"
                  value={myDeck}
                  onChange={(e) => setMyDeck(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="existing">
                <RadioGroup
                  value={myDeck}
                  onValueChange={setMyDeck}
                  className="flex flex-col space-y-2"
                >
                  {knownDecks.myDecks.map((deck) => (
                    <div key={deck} className="flex items-center space-x-2">
                      <RadioGroupItem value={deck} id={`my-${deck}`} />
                      <Label htmlFor={`my-${deck}`}>{deck}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>
            </Tabs>
          </div>

          {/* 相手のデッキ選択 */}
          <div className="md:col-span-3 lg:col-span-1">
            <h3 className="text-lg font-medium mb-2">相手のデッキ</h3>
            <Tabs value={opponentDeckTab} onValueChange={setOpponentDeckTab}>
              <TabsList className="mb-2">
                <TabsTrigger value="new">新規</TabsTrigger>
                {knownDecks.opponentDecks.length > 0 && (
                  <TabsTrigger value="existing">既存</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="new">
                <Input
                  placeholder="デッキ名を入力"
                  value={opponentDeck}
                  onChange={(e) => setOpponentDeck(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="existing">
                <RadioGroup
                  value={opponentDeck}
                  onValueChange={setOpponentDeck}
                  className="flex flex-col space-y-2"
                >
                  {knownDecks.opponentDecks.map((deck) => (
                    <div key={deck} className="flex items-center space-x-2">
                      <RadioGroupItem value={deck} id={`op-${deck}`} />
                      <Label htmlFor={`op-${deck}`}>{deck}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>
            </Tabs>
          </div>

          {/* 記録ボタン */}
          <div className="md:col-span-3 lg:col-span-1 flex items-end">
            <Button 
              onClick={handleSubmit} 
              className="w-full"
              size="lg"
            >
              記録する
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 