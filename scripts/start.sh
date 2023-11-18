#!/bin/bash

nohup python3 -m uvicorn backend.api:app --reload > /dev/null 2>&1 &
echo "start backend"
cd client && nohup npm run prod > /dev/null 2>&1 &
echo "start client"