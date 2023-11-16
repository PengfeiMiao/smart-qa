# Smart QA Project
## backend
 - python3
 - fastAPI
 - openAI
## client
 - node16
 - React18
 - chakra-ui
 - webpack
## Quick Start
   1. prepare postgres as database
   2. prepare nginx to support stream response
   3. start services as below:
```shell
# start backend
pip install -r backend/requirements.txt
python3 -m uvicorn backend.api:app --reload
# start client
cd client
npm install
npm run dev
```