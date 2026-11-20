#!/bin/bash
# 使い方：bash scripts/curl-patch-todo.sh 2   （id=2 の完了を切り替える）
ID=${1:-1}
echo "=== PATCH /api/todos/$ID"
curl -s -i -X PATCH "http://localhost:3000/api/todos/$ID"
echo; echo "=== GET /api/todos"
curl -s http://localhost:3000/api/todos; echo
