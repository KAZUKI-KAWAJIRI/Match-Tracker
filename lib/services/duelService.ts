import { DuelRecord, KnownDecks } from '@/lib/types';

/**
 * メモリ内にデータを保持するデュエル記録サービス（テスト用）
 */
class DuelService {
  private inMemoryRecords: Record<string, DuelRecord[]> = {};
  private inMemoryDecks: Record<string, KnownDecks> = {};

  /**
   * ユーザーのデュエル記録を取得する
   */
  async getUserRecords(userId: string): Promise<DuelRecord[]> {
    return this.inMemoryRecords[userId] || [];
  }

  /**
   * 新しいデュエル記録を追加する
   */
  async addRecord(userId: string, record: DuelRecord): Promise<DuelRecord> {
    if (!this.inMemoryRecords[userId]) {
      this.inMemoryRecords[userId] = [];
    }
    this.inMemoryRecords[userId].push(record);
    return record;
  }

  /**
   * 複数のデュエル記録をインポートする
   */
  async importRecords(userId: string, records: DuelRecord[]): Promise<void> {
    if (!this.inMemoryRecords[userId]) {
      this.inMemoryRecords[userId] = [];
    }
    this.inMemoryRecords[userId] = [...records];
  }

  /**
   * ユーザーのデュエル記録をクリアする
   */
  async clearRecords(userId: string): Promise<void> {
    this.inMemoryRecords[userId] = [];
  }

  /**
   * ユーザーの既知のデッキ情報を取得する
   */
  async getKnownDecks(userId: string): Promise<KnownDecks> {
    return this.inMemoryDecks[userId] || { myDecks: [], opponentDecks: [] };
  }

  /**
   * ユーザーの既知のデッキ情報を更新する
   */
  async updateKnownDecks(userId: string, decks: KnownDecks): Promise<void> {
    this.inMemoryDecks[userId] = decks;
  }
}

// シングルトンインスタンスをエクスポート
export const duelService = new DuelService(); 