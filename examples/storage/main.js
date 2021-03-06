var {Book, Author} = require('./model');
var {redirectTo, jsonResponse, xmlResponse} = require("stick/helpers");

var app = exports.app = require('stick').Application();
app.configure("params", "method", "render", "route");
app.render.base(module.resolve("skins"));
app.render.helpers("ringo/skin/macros", "ringo/skin/filters");

// the main action is invoked for http://localhost:8080/
// this also shows simple skin rendering
app.get("/", function(req) {
    return app.render('index.html', {
        title: 'Storage',
        books: Book.all(),
        action: app.base + "/"
    });
});

app.post("/", function(req) {
    var author = new Author({name: req.params.author});
    var book = new Book({author: author, title: req.params.title});
    author.books = [book];
    // author is saved transitively
    // author.save();
    book.save();
    return redirectTo(req.scriptName + req.pathInfo);
});

app.get("/edit/:id", function(req, id) {
    var book = Book.get(id);
    return app.render('edit.html', {
        title: 'Storage',
        book: book,
        action: app.base + "/" + id
    });
});

app.put("/:id", function(req, id) {
    var book = Book.get(id);
    var author = book.author;
    author.name = req.params.author;
    book.title = req.params.title;
    author.save();
    book.save();
    return redirectTo(app.base);
});

app.get("/remove/:id", function(req, id) {
    var book = Book.get(id);
    return app.render('remove.html', {
        title: 'Storage',
        book: book,
        action: app.base + "/" + id
    });
});

app.del("/:id", function(req, id) {
    var book = Book.get(id);
    // no cascading delete
    book.author.remove();
    book.remove();
    return redirectTo(app.base);
});

// Simple RESTful API example.
app.get("/books/:id.:format", function (req, id, format) {
    if (!/^[0-9a-z]+$/.test(id) || !/^(json|xml)$/.test(format)) { // Validate URI.
        throw new Error('Invalid request; check URI.');
    }
    var book = Book.get(id); // Figure out response.
    if (!book) {
        throw {notfound: true};
    }
    return format == 'json' ?
            jsonResponse({author: book.author.name, title: book.title}) :
            xmlResponse(<book>
                            <author>{book.author.name}</author>
                            <title>{book.title}</title>
                        </book>);
});

// start server if run as main script
if (require.main === module) {
    require("stick/server").main(module.id);
}
