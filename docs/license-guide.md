# ライセンスおよびコピーライト表記ガイド

本ドキュメントは、BVCP プロジェクトにおけるライセンスおよびコピーライト表記の方針を定義する。

---

## 1. 採用ライセンス

**Apache License, Version 2.0**

本プロジェクトのすべてのソースコード、仕様書、設計書は Apache License 2.0 に基づいて公開する。

---

## 2. コピーライト表記

```
Copyright 2025 Yorikawa Aise
```

- 著作権者名は「Yorikawa Aise」と明記する
- 将来コントリビュータが増えた場合も、コピーライト表記は維持する
- コントリビュータは Apache License 2.0 の条項に基づき、自動的にライセンス付与される

---

## 3. LICENSE ファイル

リポジトリルートに `LICENSE` ファイルを配置する。

- Apache License 2.0 の全文を記載
- Appendix セクションに本プロジェクトのコピーライト表記を含める

---

## 4. ソースコードヘッダ

すべてのソースコードファイルの冒頭に、以下のライセンスヘッダを記載する。

### Rust (`*.rs`)

```rust
// Copyright 2025 Yorikawa Aise
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
```

### TypeScript / JavaScript (`*.ts`, `*.tsx`, `*.js`, `*.jsx`)

```typescript
// Copyright 2025 Yorikawa Aise
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
```

### CSS (`*.css`)

```css
/*
 * Copyright 2025 Yorikawa Aise
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```

### HTML (`*.html`)

```html
<!--
  Copyright 2025 Yorikawa Aise

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
```

---

## 5. ドキュメント（Markdown）

仕様書・設計書・ガイド等の Markdown ファイルには、明示的なライセンスヘッダは不要とする。

- `LICENSE` ファイルがリポジトリ全体に適用される
- 必要に応じて、ドキュメント末尾に以下を記載してもよい：

```markdown
---
*本ドキュメントは Apache License 2.0 に基づいて公開されています。*
```

---

## 6. 対象外のファイル

以下のファイルは Apache License 2.0 の対象外とする：

- ロゴ・アイコン等の画像ファイル（別途ライセンス表記が必要な場合がある）
- サードパーティ製ライブラリ（それぞれのライセンスに従う）
- 自動生成ファイル（`node_modules/`, `target/`, `dist/` 等）

---

## 7. Apache License 2.0 を採用した理由

### 7.1 商用利用・SaaS 化への対応

Apache License 2.0 は商用利用を明確に許可しており、将来的な SaaS 化やビジネス展開を妨げない。

### 7.2 特許条項の明確化

Apache License 2.0 は明確な特許付与条項を含んでおり、コントリビュータからの暗黙の特許ライセンスが付与される。これにより、特許訴訟リスクを軽減できる。

### 7.3 エンタープライズ互換性

Apache License 2.0 は企業での採用実績が豊富であり、エンタープライズ環境での利用障壁が低い。多くの企業で許可されているオープンソースライセンスのリストに含まれている。

### 7.4 コントリビューション管理

Apache License 2.0 は、コントリビューションが自動的に同一ライセンスで提供されることを明確に定義している。これにより、ライセンス管理の複雑さを軽減できる。

### 7.5 MIT / BSD との比較

| 観点 | MIT | Apache-2.0 |
|------|-----|-----------|
| 商用利用 | ◎ | ◎ |
| 特許付与 | なし | **あり** |
| 変更明示義務 | なし | あり |
| 帰属表示 | 必要 | 必要 |
| エンタープライズ互換 | ○ | ◎ |

MIT ライセンスはシンプルだが、特許条項がない。BVCP は技術的に新規性のある実装を含む可能性があるため、特許条項を含む Apache-2.0 を採用した。

---

## 8. 参考資料

- [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [Choose an open source license](https://choosealicense.com/)
- [SPDX License List](https://spdx.org/licenses/)

---

*本ドキュメントは Apache License 2.0 に基づいて公開されています。*
