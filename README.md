# マッチトラッカー（Match Tracker）

![バージョン](https://img.shields.io/badge/version-1.0.0-blue)
![ライセンス](https://img.shields.io/badge/license-MIT-green)
![テスト](https://github.com/yourusername/Match-Tracker/workflows/CI%20Pipeline/badge.svg)

マッチトラッカーは、カードゲームやeスポーツにおける試合記録と統計分析を簡単に行えるウェブアプリケーションです。コイントス結果、先攻/後攻、勝敗などを記録し、勝率や各種傾向を可視化します。

## 📋 主な機能

- **デュエル記録**: コイントス、先攻/後攻、勝敗、使用デッキなどを記録
- **統計分析**: 勝率や先攻/後攻の成績など、さまざまな統計情報を自動計算
- **カスタマイズ**: デッキ名やプレイヤー情報のカスタマイズ
- **オフライン対応**: ローカルストレージを使用し、オフラインでも使用可能
- **レスポンシブデザイン**: モバイルからデスクトップまで、あらゆるデバイスに対応
- **データベース連携**: ログイン後にデータをクラウドに保存可能（開発中）

## 🖥️ スクリーンショット

![アプリのスクリーンショット](/images/app-screenshot0.png)
![アプリのスクリーンショット](/images/app-screenshot1.png)


## 🛠️ 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org/) - ReactベースのWebフレームワーク
- **言語**: [TypeScript](https://www.typescriptlang.org/) - 型安全なJavaScript
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストのCSSフレームワーク
- **コンポーネント**: [shadcn/ui](https://ui.shadcn.com/) - 再利用可能なUIコンポーネント
- **開発ツール**: [Biome](https://biomejs.dev/) - 高速なLinterとFormatter
- **テスト**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions) - 継続的インテグレーション/デリバリー

実装中の機能:
- **バックエンド**: [Supabase](https://supabase.io/) - バックエンドとデータベース
- **ORM**: [Prisma](https://www.prisma.io/) - 次世代のORMツール

## 📦 インストールと実行

### 前提条件

- Node.js 18.x 以上
- npm 9.x 以上

### 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/KAZUKI-KAWAJIRI/Match-Tracker.git
cd Match-Tracker

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてアプリケーションにアクセスできます。

### 環境変数の設定

`.env` ファイルを作成し、以下の環境変数を設定してください：

```
DATABASE_URL="postgresql://user:password@localhost:5432/match_tracker"
NEXT_PUBLIC_SUPABASE_URL="https://wzabhxqdnzkkjxbohlby.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6YWJoeHFkbnpra2p4Ym9obGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTU3MzYsImV4cCI6MjA2MzMzMTczNn0.JYEqa2cDskUUl8UJu86CTI1qX8PEqW0Uf6QLsmkizwk"
```

## 🧪 テスト

このプロジェクトはJestとReact Testing Libraryを使用したテストスイートを含んでいます。

```bash
# すべてのテストを実行
npm test

# ウォッチモードでテストを実行（開発中に便利）
npm run test:watch

# カバレッジレポートを生成
npm run test:coverage
```

## 🔄 継続的インテグレーション

このプロジェクトはGitHub Actionsを使用した継続的インテグレーションを実装しています。mainブランチへのプッシュやプルリクエストごとに以下の処理が自動実行されます：

- TypeScriptの型チェック
- Biomeによるコード品質チェック
- ビルドプロセスの検証
- テストスイートの実行

CIパイプラインのステータスは、このREADMEの上部にあるバッジで確認できます。

## 🚀 デプロイ

Next.jsアプリケーションは、Vercel、Netlify、GitHub Pagesなど様々なプラットフォームにデプロイできます。

```bash
# 本番用ビルドの作成
npm run build

# ビルドしたアプリの起動
npm start
```

## 📊 使用方法

1. ホーム画面でデュエル情報（コイン結果、先攻/後攻、勝敗など）を入力
2. 「記録する」ボタンをクリックして保存
3. 下部の統計セクションで自動計算された勝率や各種統計を確認
4. 日付ごとのフィルタリングで過去の記録を閲覧
5. ログインするとデータをクラウドに保存できます（開発中）

## 🔮 将来の計画

- **ユーザー認証**: マルチユーザー対応とプロフィール管理
- **クラウド同期**: 複数デバイス間でのデータ同期
- **詳細統計**: 高度なフィルタリングとグラフ表示
- **API対応**: 外部サービスとの連携
- **ソーシャル機能**: フレンドとの対戦記録の共有

## ⚖️ ライセンス

[MIT](https://choosealicense.com/licenses/mit/) ライセンスの下で配布されています。

---