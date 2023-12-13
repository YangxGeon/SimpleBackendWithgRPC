import grpc
from concurrent import futures
import time
import pymysql

import books_pb2
import books_pb2_grpc

class BookServiceServicer(books_pb2_grpc.BookServiceServicer):

    def List(self, request, context):
        # Connect to the database
        connection = pymysql.connect(host='localhost',
                                     user='root',
                                     password='password',
                                     db='library',
                                     charset='utf8mb4',
                                     cursorclass=pymysql.cursors.DictCursor)
        try:
            with connection.cursor() as cursor:
                # Query the database
                sql = "SELECT * FROM books"
                cursor.execute(sql)
                result = cursor.fetchall()

                # Convert the result to a list of books
                books = []
                for row in result:
                    book = books_pb2.Book(id=row['id'], title=row['title'], 
                                          author=row['author'], published_year=row['published_year'])
                    books.append(book)

                # Return the list of books
                return books_pb2.BookList(books=books)

        finally:
            connection.close()

    def Search(self, request, context):
        # Connect to the database
        connection = pymysql.connect(host='localhost',
                                     user='root',
                                     password='password',
                                     db='library',
                                     charset='utf8mb4',
                                     cursorclass=pymysql.cursors.DictCursor)

        try:
            with connection.cursor() as cursor:
                # Query the database
                sql = "SELECT * FROM books WHERE title LIKE %s"
                cursor.execute(sql, ('%' + request.title + '%',))
                result = cursor.fetchall()

                # Convert the result to a list of books
                books = []
                for row in result:
                    book = books_pb2.Book(id=row['id'], title=row['title'], 
                                          author=row['author'], published_year=row['published_year'])
                    books.append(book)

                # Return the list of books
                return books_pb2.BookList(books=books)

        finally:
            connection.close()

    def AddBook(self, request, context):
        connection = pymysql.connect(host='localhost',
                                     user='root',
                                     password='password',
                                     db='library',
                                     charset='utf8mb4',
                                     cursorclass=pymysql.cursors.DictCursor)
        try:
            with connection.cursor() as cursor:
                sql = "INSERT INTO books (title, author, published_year) VALUES (%s, %s, %s)"
                cursor.execute(sql, (request.title, request.author, request.published_year))
                connection.commit()
        finally:
            connection.close()
        return books_pb2.AddResponse(result="Book added successfully")

    def DeleteBook(self, request, context):
        connection = pymysql.connect(host='localhost',
                                     user='root',
                                     password='password',
                                     db='library',
                                     charset='utf8mb4',
                                     cursorclass=pymysql.cursors.DictCursor)
        try:
            with connection.cursor() as cursor:
                sql = "DELETE FROM books WHERE id = %s"
                cursor.execute(sql, (request.id,))
                connection.commit()
        finally:
            connection.close()
        return books_pb2.DeleteResponse(result="Book deleted successfully")
    
    def UpdateBook(self, request, context):
        # 데이터베이스에 연결
        connection = pymysql.connect(host='localhost',
                                     user='root',
                                     password='password',
                                     db='library',
                                     charset='utf8mb4',
                                     cursorclass=pymysql.cursors.DictCursor)
        try:
            with connection.cursor() as cursor:
                # 데이터베이스에서 책 제목 수정
                sql = "UPDATE books SET title = %s WHERE id = %s"
                cursor.execute(sql, (request.title, request.id))
                connection.commit()
        finally:
            connection.close()
        return books_pb2.UpdateResponse(result="Book updated successfully")
    
    def UpdateAuthor(self, request, context):
    # 데이터베이스에 연결
        connection = pymysql.connect(host='localhost',
                                     user='root',
                                    password='password',
                                    db='library',
                                    charset='utf8mb4',
                                    cursorclass=pymysql.cursors.DictCursor)
        try:
            with connection.cursor() as cursor:
            # 데이터베이스에서 책의 작가 수정
                sql = "UPDATE books SET author = %s WHERE id = %s"
                cursor.execute(sql, (request.author, request.id))
                connection.commit()
        finally:
            connection.close()
        return books_pb2.UpdateResponse(result="Book author updated successfully")

    def UpdateYear(self, request, context):
    # 데이터베이스에 연결
        connection = pymysql.connect(host='localhost',
                                     user='root',
                                     password='password',
                                     db='library',
                                     charset='utf8mb4',
                                     cursorclass=pymysql.cursors.DictCursor)
        try:
            with connection.cursor() as cursor:
                # 데이터베이스에서 도서의 출판년도 수정
                sql = "UPDATE books SET published_year = %s WHERE id = %s"
                cursor.execute(sql, (request.published_year, request.id))
                connection.commit()
        finally:
            connection.close()

        # 수정 결과 메시지 반환
        return books_pb2.UpdateYearResponse(result="Book updated successfully.")

    
    def SearchBooksByYear(self, request, context):
    # 데이터베이스에 연결
        connection = pymysql.connect(host='localhost',
                                     user='root',
                                     password='password',
                                     db='library',
                                     charset='utf8mb4',
                                     cursorclass=pymysql.cursors.DictCursor)
        try:
            with connection.cursor() as cursor:
                # 데이터베이스에서 출판년도로 도서 검색
                sql = "SELECT * FROM books WHERE published_year = %s"
                cursor.execute(sql, (request.year,))
                result = cursor.fetchall()
        finally:
            connection.close()

        # 검색 결과를 SearchBooksByYearResponse 형태로 변환
        return books_pb2.SearchBooksByYearResponse(books=[books_pb2.Book(id=row['id'], title=row['title'], author=row['author'], published_year=row['published_year']) for row in result])
    
    def SearchBooksByAuthor(self, request, context):
        # 데이터베이스에 연결
        connection = pymysql.connect(host='localhost',
                                    user='root',
                                    password='password',
                                    db='library',
                                    charset='utf8mb4',
                                    cursorclass=pymysql.cursors.DictCursor)
        try:
            with connection.cursor() as cursor:
                # 데이터베이스에서 작가 이름으로 도서 검색
                sql = "SELECT * FROM books WHERE author = %s"
                cursor.execute(sql, (request.author,))
                result = cursor.fetchall()
        finally:
            connection.close()

        # 검색 결과를 SearchBooksByAuthorResponse 형태로 변환
        return books_pb2.SearchBooksByAuthorResponse(books=[books_pb2.Book(id=row['id'], title=row['title'], author=row['author'], published_year=row['published_year']) for row in result])


    
    def DeleteAllBooks(self, request, context):
    # 데이터베이스에 연결
        connection = pymysql.connect(host='localhost',
                                     user='root',
                                     password='password',
                                     db='library',
                                     charset='utf8mb4',
                                     cursorclass=pymysql.cursors.DictCursor)
        try:
            with connection.cursor() as cursor:
            # 데이터베이스에서 전체 도서 삭제
                sql = "DELETE FROM books"
                cursor.execute(sql)
                connection.commit()
        finally:
            connection.close()
        return books_pb2.DeleteAllBooksResponse(result="All books deleted successfully")


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    books_pb2_grpc.add_BookServiceServicer_to_server(
        BookServiceServicer(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
