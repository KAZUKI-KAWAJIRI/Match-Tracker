'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDuel } from '@/lib/context';
import {
  type CoinResult,
  type MatchResult,
  TRANSLATIONS,
  type TurnOrder,
} from '@/lib/types';
import { useCallback, useState } from 'react';

// ラジオグループコンポーネント
interface RadioGroupFieldProps {
  title: string;
  value: string | null;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}

function RadioGroupField({
  title,
  value,
  onChange,
  options,
}: RadioGroupFieldProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <RadioGroup
        value={value || ''}
        onValueChange={onChange}
        className="flex space-x-4"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${title}-${option.value}`}
            />
            <Label htmlFor={`${title}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

// デッキ選択コンポーネント
interface DeckSelectorProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  knownDecks: string[];
}

function DeckSelector({
  title,
  value,
  onChange,
  knownDecks,
}: DeckSelectorProps) {
  const [tabValue, setTabValue] = useState(
    knownDecks.length > 0 ? 'existing' : 'new',
  );

  // デッキリストが変更されたときのタブ制御
  const hasKnownDecks = knownDecks.length > 0;
  if (!hasKnownDecks && tabValue === 'existing') {
    setTabValue('new');
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <Tabs value={tabValue} onValueChange={setTabValue}>
        <TabsList className="mb-2">
          <TabsTrigger value="new">新規</TabsTrigger>
          {hasKnownDecks && <TabsTrigger value="existing">既存</TabsTrigger>}
        </TabsList>
        <TabsContent value="new">
          <Input
            placeholder="デッキ名を入力"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </TabsContent>
        {hasKnownDecks && (
          <TabsContent value="existing">
            <RadioGroup
              value={value}
              onValueChange={onChange}
              className="flex flex-col space-y-2"
            >
              {knownDecks.map((deck) => (
                <div key={deck} className="flex items-center space-x-2">
                  <RadioGroupItem value={deck} id={`deck-${deck}`} />
                  <Label htmlFor={`deck-${deck}`}>{deck}</Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

// 初期状態
const initialFormState = {
  coin: null as CoinResult,
  turnOrder: null as TurnOrder,
  result: null as MatchResult,
  myDeck: '',
  opponentDeck: '',
};

export function DuelForm() {
  const { addRecord, knownDecks } = useDuel();
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // フォーム状態の更新ハンドラ
  const updateFormState = useCallback(
    <K extends keyof typeof initialFormState>(
      key: K,
      value: (typeof initialFormState)[K],
    ) => {
      setFormState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  // フォーム送信ハンドラ
  const handleSubmit = useCallback(() => {
    const { coin, turnOrder, result, myDeck, opponentDeck } = formState;

    // 必須項目の検証
    if (!coin || !turnOrder || !result || !myDeck || !opponentDeck) {
      alert('すべての項目を入力してください');
      return;
    }

    setIsSubmitting(true);

    try {
      // デュエル記録の追加
      addRecord({
        coin,
        turnOrder,
        result,
        myDeck,
        opponentDeck,
      });

      // フォームをリセット
      setFormState(initialFormState);
    } catch (error) {
      console.error('記録の保存に失敗しました:', error);
      alert('記録の保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, addRecord]);

  // コイントスオプション
  const coinOptions = [
    { value: 'heads', label: TRANSLATIONS.coin.heads },
    { value: 'tails', label: TRANSLATIONS.coin.tails },
  ];

  // ターン順オプション
  const turnOptions = [
    { value: 'first', label: TRANSLATIONS.turn.first },
    { value: 'second', label: TRANSLATIONS.turn.second },
  ];

  // 勝敗オプション
  const resultOptions = [
    { value: 'win', label: TRANSLATIONS.result.win },
    { value: 'lose', label: TRANSLATIONS.result.lose },
  ];

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>デュエル記録</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* コイン選択 */}
          <RadioGroupField
            title="コイントス"
            value={formState.coin}
            onChange={(value) => updateFormState('coin', value as CoinResult)}
            options={coinOptions}
          />

          {/* 先攻後攻選択 */}
          <RadioGroupField
            title="順番"
            value={formState.turnOrder}
            onChange={(value) =>
              updateFormState('turnOrder', value as TurnOrder)
            }
            options={turnOptions}
          />

          {/* 勝敗選択 */}
          <RadioGroupField
            title="結果"
            value={formState.result}
            onChange={(value) =>
              updateFormState('result', value as MatchResult)
            }
            options={resultOptions}
          />

          {/* 自分のデッキ選択 */}
          <div className="md:col-span-3 lg:col-span-1">
            <DeckSelector
              title="自分のデッキ"
              value={formState.myDeck}
              onChange={(value) => updateFormState('myDeck', value)}
              knownDecks={knownDecks.myDecks}
            />
          </div>

          {/* 相手のデッキ選択 */}
          <div className="md:col-span-3 lg:col-span-1">
            <DeckSelector
              title="相手のデッキ"
              value={formState.opponentDeck}
              onChange={(value) => updateFormState('opponentDeck', value)}
              knownDecks={knownDecks.opponentDecks}
            />
          </div>

          {/* 記録ボタン */}
          <div className="md:col-span-3 lg:col-span-1 flex items-end">
            <Button
              onClick={handleSubmit}
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? '保存中...' : '記録する'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
