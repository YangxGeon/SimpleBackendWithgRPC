# SimpleBackendWithgRPC
- SimpleBackendWithgRPC는  HTTP와 gRPC를 통해 통신합니다.
- 클라이언트는 사용자의 요청을 처리하고, 이를 HTTP 요청으로 변환하여 REST API 서버에 보냅니다. (axios)
- REST API 서버는 클라이언트의 HTTP 요청을 받아 처리하고, 이를 gRPC 요청으로 변환하여 gRPC 서버에 보냅니다. (express) (grpc)
- gRPC 서버는 이 요청을 받아 처리하고, 이를 SQL 쿼리로 변환하여 MySQL 데이터베이스에 보냅니다. (grpcio) (pymysql)
- REST API (client.j 와 api_server.js)
- gRPC (api_server.js와 service.py)
- MySQL을 선택한 이유는 도서 정보가 정형화된 데이터로 구성되어 있기 때문

python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. books.proto

sudo apt update
sudo apt install git
git clone https://github.com/YangxGeon/SimpleBackendWithgRPC.git
npm install 
pip install -r requirements.txt
node api_server.js
python3 service.py

초기 데이터베이스 생성문
sudo apt install mysql-server

CREATE DATABASE IF NOT EXISTS library;

USE library;

mysql -u root -p

CREATE TABLE IF NOT EXISTS Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(50) NOT NULL,
    published_year INT
);

