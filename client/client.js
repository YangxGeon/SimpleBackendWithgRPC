const axios = require('axios');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function listBooks() {
    axios.get('http://localhost:50051/books')
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        readline.close();
    });
}

function searchBooks(title) {
    axios.get(`http://localhost:50051/books/search?title=${title}`)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        readline.close();
    });
}

function addBook(title, author, published_year) {
    axios.post('http://localhost:50051/books', {
        title: title,
        author: author,
        published_year: published_year
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        readline.close();
    });
}

function deleteBook(id) {
    axios.delete(`http://localhost:50051/books/${id}`)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        readline.close();
    });
}

function updateBook(id, title) {
    axios.put(`http://localhost:50051/books/${id}`, {
        title: title
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        readline.close();
    });
}

function updateAuthor(id, author) {
    axios.patch(`http://localhost:50051/books/${id}`, {
        author: author
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        readline.close();
    });
}

function updateYear(id, published_year) {
    axios.put(`http://localhost:50051/books/update/year`, { id: id, published_year: published_year })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        readline.close();
    });
}


function searchBooksByYear(year) {
    axios.get(`http://localhost:50051/books/search/year?year=${year}`)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        readline.close();
    });
}


function searchBooksByAuthor(author) {
    axios.get(`http://localhost:50051/books/search/author?author=${author}`)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        readline.close();
    });
}



function deleteAllBooks() {
    axios.delete('http://localhost:50051/books')
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        readline.close();
    });
}


readline.question('1. 전체 도서 조회, 2. 도서 이름 검색, 3. 도서 추가, 4. 도서 삭제, 5. 도서 제목 변경, 6. 작가 수정, 7. 도서 출판년도 변경, 8. 출판년도 검색 9. 작가 검색, 10. 전체 도서 삭제: ', num => {
    if (num == '1') {
        listBooks();
    } else if (num == '2') {
        readline.question('검색하고 싶은 책의 이름을 입력하세요: ', title => {
            searchBooks(title);
        });
    } else if (num == '3') {
        readline.question('추가하고 싶은 책의 제목을 입력하세요: ', title => {
            readline.question('추가하고 싶은 책의 작가를 입력하세요: ', author => {
                readline.question('추가하고 싶은 책의 출판년도를 입력하세요: ', published_year => {
                    addBook(title, author, published_year);
                });
            });
        });
    } else if( num == '4') {
        readline.question('삭제하고 싶은 책의 ID를 입력하세요: ', id => {
            deleteBook(id);
        });
    } else if (num == '5') {
        readline.question('제목을 수정하고 싶은 책의 ID를 입력하세요: ', id => {
            readline.question('새로운 제목을 입력하세요: ', title => {
                updateBook(id, title);
            });
        });
    } else if (num == '6') {
        readline.question('작가를 수정하고 싶은 책의 ID를 입력하세요: ', id => {
            readline.question('새로운 작가 이름을 입력하세요: ', author => {
                updateAuthor(id, author);
            });
        });
    } else if (num == '7') {
        readline.question('출판년도를 수정하고 싶은 책의 ID를 입력하세요: ', id => {
            readline.question('새로운 출판년도를 입력하세요: ', published_year => {
                updateYear(id, published_year);
            });
        });
    } else if (num == '8') {
        readline.question('검색하고 싶은 출판년도를 입력하세요: ', year => {
            searchBooksByYear(year);
        });
    }else if (num == '9') {
        readline.question('검색하고 싶은 작가의 이름을 입력하세요: ', author => {
            searchBooksByAuthor(author);
        });
    }else if (num == '10') {
        deleteAllBooks();
    }else {
        console.log('올바른 번호를 입력해주세요.');
        readline.close();
    }
});
