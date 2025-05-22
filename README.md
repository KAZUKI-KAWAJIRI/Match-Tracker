# マッチトラッカー（Match Tracker）

![バージョン](https://img.shields.io/badge/version-0.1.0-blue)
![ライセンス](https://img.shields.io/badge/license-MIT-green)
![テスト](https://github.com/KAZUKI-KAWAJIRI/Match-Tracker/workflows/CI%20Pipeline/badge.svg)

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

### フロントエンド
- **フレームワーク**: [Next.js](https://nextjs.org/) v15.3.1
- **言語**: [TypeScript](https://www.typescriptlang.org/) v5.8.3
- **UI ライブラリ**: [React](https://reactjs.org/) v19.1.0
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) v3.4.17
  - **ユーティリティ**: tailwind-merge v3.2.0, tailwindcss-animate v1.0.7
- **コンポーネント**:
  - [Radix UI](https://www.radix-ui.com/) - アクセシブルなUIプリミティブ
    - @radix-ui/react-dialog v1.1.11
    - @radix-ui/react-form v0.1.4
    - @radix-ui/react-label v2.1.4
    - @radix-ui/react-radio-group v1.3.4
    - @radix-ui/react-select v2.2.2
    - @radix-ui/react-slot v1.2.0
    - @radix-ui/react-tabs v1.1.9
  - [Lucide React](https://lucide.dev/) v0.503.0 - アイコンライブラリ
  - [Class Variance Authority](https://cva.style/docs) v0.7.1 - コンポーネントのスタイル管理
  - [Vaul](https://vaul.emilkowal.ski/) v1.1.2 - ドロワーコンポーネント

### バックエンド
- **BaaS**: [Supabase](https://supabase.io/) 
  - @supabase/auth-helpers-nextjs v0.10.0
  - @supabase/supabase-js v2.49.4
- **ORM**: [Prisma](https://www.prisma.io/) v6.6.0

### 開発ツール
- **フォーマッター & リンター**: [Biome](https://biomejs.dev/) v1.9.4 (schema v1.5.3)
- **フォームバリデーション**: 
  - [React Hook Form](https://react-hook-form.com/) v7.56.1
  - [Zod](https://github.com/colinhacks/zod) v3.24.3
  - [@hookform/resolvers](https://github.com/react-hook-form/resolvers) v5.0.1
- **ユーティリティ**: [UUID](https://github.com/uuidjs/uuid) v11.1.0

### テスト
- **テストフレームワーク**: [Jest](https://jestjs.io/) v29.7.0
- **テストライブラリ**:
  - [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) v15.0.0
  - [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) v6.3.0
  - [@testing-library/user-event](https://testing-library.com/docs/user-event/intro/) v14.5.2
  - [jest-environment-jsdom](https://jestjs.io/docs/environment-variables) v29.7.0

### CI/CD
- **継続的インテグレーション**: [GitHub Actions](https://github.com/features/actions)

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

`.env.local` ファイルをプロジェクトのルートに作成し、以下の環境変数を設定してください：

```
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# オプション: Prisma/データベース設定
# DATABASE_URL=your_database_url_here
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

## 🛡️ コード品質

このプロジェクトでは高品質なコードを維持するために以下のツールを使用しています：

- **Biome**: 高速なLinterとFormatterを使用して一貫したコードスタイルを適用
- **TypeScript**: 静的型チェックによりバグの早期発見
- **Jest**: 自動テストによる機能の信頼性確保
- **GitHub Actions**: 継続的インテグレーションによる品質の自動チェック

## 🔮 将来の計画

- **ユーザー認証**: マルチユーザー対応とプロフィール管理の強化
- **クラウド同期**: 複数デバイス間でのデータ同期機能の完全実装
- **詳細統計**: 高度なフィルタリングとグラフ表示
- **API対応**: 外部サービスとの連携
- **ソーシャル機能**: フレンドとの対戦記録の共有

## ⚖️ ライセンス

[MIT](https://choosealicense.com/licenses/mit/) ライセンスの下で配布されています。

---

**注意**: このプロジェクトは開発中であり、機能やUIは予告なく変更される場合があります。