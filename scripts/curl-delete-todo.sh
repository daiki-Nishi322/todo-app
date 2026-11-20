#!/bin/bash
# 使い方：bash scripts/curl-delete-todo.sh 3   （id=3 を削除する）
ID=${1:-3}
echo "=== DELETE /api/todos/$ID"
curl -s -i -X DELETE "http://localhost:3000/api/todos/$ID"
echo; echo "=== GET /api/todos"
curl -s http://localhost:3000/api/todos; echo
