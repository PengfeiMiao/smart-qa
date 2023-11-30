# Smart QA Project
Which is used as a question bank for preparing AWS SAA exam initially, and next plan to extend the functions...
## Core Functions
 - Upload Questions downloaded from anywhere (WIP)
 - Search Questions with hidden Answers by keywords
 - Analysis Questions with assistance of OpenAI Chatgpt
 - Take note while scanning Questions
 - Tag the notes with manageable tags list

## Tech Stack
### backend
 - python3
 - fastAPI
 - postgres
 - openAI
### client
 - node16
 - React18
 - chakra-ui
 - antd
 - webpack

## Quick Start
1. prepare postgres instance as database
2. config required environments in backend/config
3. init database with the schema.sql in backend/resource/db folder
4. prepare nginx instance to support stream response
5. use nginx/nginx.conf as initial settings for nginx
6. start services as below:
```shell
# start backend
pip install -r backend/requirements.txt
python3 -m uvicorn backend.api:app --reload
# start client
cd client
npm install
npm run dev
```
which also can be executed conveniently in scripts folder