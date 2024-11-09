# マニュアル

## 個別インストール

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
npm install lucide-react
npm install react-hot-toast
npm install react-hook-form @hookform/resolvers zod
```

## プロジェクト全体の設定

以下ファイルを修正すること。

-   src/app/page.tsx
-   src/app/layout.tsx
-   src/app/globals.css

## ESLintの設定

`.eslintrc.json`を修正すること。

## Prettierの設定

`.prettierrc`を作成し、以下の内容を追加する。

```json
{
    "semi": true,
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 100,
    "tabWidth": 4
}
```
