const express = require('express');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const bodyParser = require('body-parser');

const app = express();
const port = 50051;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let packageDefinition = protoLoader.loadSync(__dirname + '/../service/books.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

let books_proto = grpc.loadPackageDefinition(packageDefinition).books;

let client = new books_proto.BookService('localhost:50052',
    grpc.credentials.createInsecure());

app.get('/books', (req, res) => {
    client.list({}, (err, books) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(books);
        }
    });
});

app.get('/books/search', (req, res) => {
    let title = req.query.title;
    client.search({title: title}, (err, books) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(books);
        }
    });
});

app.post('/books', (req, res) => {
    let book = {
        title: req.body.title,
        author: req.body.author,
        published_year: req.body.published_year
    };
    client.addBook(book, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.delete('/books/:id', (req, res) => {
    let bookId = req.params.id;
    client.deleteBook({id: bookId}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.put('/books/:id', (req, res) => {
    let bookId = req.params.id;
    let newTitle = req.body.title;
    client.updateBook({id: bookId, title: newTitle}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.put('/books/update/year', (req, res) => {
    let id = req.body.id;
    let published_year = req.body.published_year;
    client.updateYear({id: id, published_year: published_year}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});


app.patch('/books/:id/', (req, res) => {
    let bookId = req.params.id;
    let newYear = req.body.published_year;
    client.updateYear({id: bookId, published_year: newYear}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/books/search/year', (req, res) => {
    let year = req.query.year;
    client.searchBooksByYear({year: year}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});


app.get('/books/search/author', (req, res) => {
    let authorName = req.query.author;
    client.searchBooksByAuthor({author: authorName}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});



app.delete('/books', (req, res) => {
    client.deleteAllBooks({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
