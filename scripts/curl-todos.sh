#!/bin/bash
# GET /api/todos を呼んで、ステータスと中身を表示する（npm run dev を動かした状態で実行）
curl -s -i http://localhost:3000/api/todos
echo
