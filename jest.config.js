const nextJest = require('next/jest');

// Next.jsのJest設定を使用
const createJestConfig = nextJest({
  // テスト環境のNext.jsアプリケーションへのパスを指定
  dir: './',
});

// Jestへ渡すカスタム設定
const customJestConfig = {
  // テスト関連のファイルを配置するディレクトリを追加
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // テスト対象となるファイルのパターンを指定
  testMatch: ['**/__tests__/**/*.test.(js|jsx|ts|tsx)'],
  // テスト対象から除外するディレクトリを指定
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/app/generated/',
  ],
  // モジュールのモック設定
  moduleNameMapper: {
    // エイリアスのマッピング
    '^@/(.*)$': '<rootDir>/$1',
    // CSSや画像など、非JavaScriptファイルのモック
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  // テスト環境
  testEnvironment: 'node',
  // コードカバレッジ設定
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/app/generated/**',
  ],
  // カバレッジレポートの出力先
  coverageDirectory: 'coverage',
};

// createJestConfigを使用して、Next.jsの設定とカスタム設定をマージした設定を作成
module.exports = createJestConfig(customJestConfig);
