# Task Glance Public MVP

**作成日:** 2026-06-27  
**目的:** 外出先閲覧用の公開候補ファイルセットを、GitHub Pagesで表示できる形にする。

---

## 1. このリポジトリの役割

このリポジトリは、Task Glanceの公開用ファイルだけを置くための専用リポジトリです。

内部管理用の `ai-project-memory` 本体は公開対象にしません。

---

## 2. ファイル構成

```text
index.html
style.css
app.js
data.json
README.md
```

公開用はMarkdownではなく、HTML/CSS/JS/data.jsonの静的Web画面として表示します。

---

## 3. 公開用データの方針

`data.json` には、公開しても問題ない抽象化済みデータだけを入れます。

入れないもの:

```text
個人情報
Secrets/APIキー/token
具体URL
非公開アカウント名
アフィリエイト案件名
詳細KPI
未公開投稿本文全文
```

---

## 4. 次の作業

```text
GitHub Pagesを有効化する
iPhoneのモバイル通信で表示確認する
iPhoneホーム画面へ追加する
```
