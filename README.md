# TODOアプリ

## 作るもの
作業漏れが多い作業者があらゆる作業を忘れないようにタスクを追加していくため


## 機能
<!-- できること。箇条書きで4つくらい -->
- タスクの一覧
- タスク追加、完了
- タスク削除
- タスク重要度づけ（完成後に追加）

## 構成
| 部分 | 使うもの | 役割 |
|---|---|---|
| 画面 | Next.js / React | 画面表示 |
| API | Route Handler | 画面操作に応じてバックエンドからDB操作 |
| データベース | PostgreSQL | タスク一覧を保管|
| 公開 | Vercel | 誰でも触れるようにする |

## API
| メソッド | URL | 何をする |
|---|---|---|
| GET | /api/todos | タスクを取得 |
| POST | /api/todos | タスクを追加 |
| PATCH | /api/todos/[id] | 指定したタスクを書き換える（完了にする） |
| DELETE | /api/todos/[id] | 指定したタスクを削除 |

## データの流れ（TODOを追加するとき）
<!-- 「追加」ボタンを押してから、一覧に表示されるまで。矢印で書く -->
追加ボタン押下 → useMutation → POST /api/todos（route.ts）→ DBに保存 → 成功を返す
→ onSuccess で取り直し → GET /api/todos（route.ts）→ DBから一覧を読む → useQuery が受け取り、一覧を表示


## データベースに保存するもの（予想でOK）
<!-- TODO 1件に、どんな情報が必要か -->
- id：タスクの番号（DBが自動で付ける）
- title：やることの文字
- completed：完了したかどうか（true / false）
- createdAt：作った日時（DBが自動で付ける）
