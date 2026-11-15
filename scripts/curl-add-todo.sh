#!/bin/bash
# POST /api/todos でTODOを1件追加し、そのあと一覧を取得する
# 使い方: bash scripts/curl-add-todo.sh 牛乳を買う
title="${1:-牛乳を買う}"
echo "--- 追加（POST）"
curl -s -i -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"$title\"}"
echo
echo "--- 一覧（GET）"
curl -s http://localhost:3000/api/todos
echo
