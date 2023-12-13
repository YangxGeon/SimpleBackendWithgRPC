# SimpleBackendWithgRPC
- SimpleBackendWithgRPC는  HTTP와 gRPC를 통해 통신합니다.
- 클라이언트는 사용자의 요청을 처리하고, 이를 HTTP 요청으로 변환하여 REST API 서버에 보냅니다.
- REST API 서버는 클라이언트의 HTTP 요청을 받아 처리하고, 이를 gRPC 요청으로 변환하여 gRPC 서버에 보냅니다.
- gRPC 서버는 이 요청을 받아 처리하고, 이를 SQL 쿼리로 변환하여 MySQL 데이터베이스에 보냅니다.
- REST API (client.j 와 api_server.js)
- gRPC (api_server.js와 service.py)
- MySQL을 선택한 이유는 도서 정보가 정형화된 데이터로 구성되어 있기 때문
