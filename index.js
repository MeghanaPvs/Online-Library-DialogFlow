const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const {
    dialogflow,
    BasicCard,
    Image,
    Button,
    Suggestions,
    LinkOutSuggestion,
    Carousel,
    Table,
    List
} = require("actions-on-google");

const assistant = dialogflow({ debug: true });

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
 
assistant.intent("WelcomeBooksIntent", conv => {
    conv.ask('Hello, Welcome to Online Library. Would you like to see the books available?')
});

assistant.intent("BooksIntent", conv => {
    let wantedBook = conv.parameters.books;
    conv.ask(`Sure, your book details are ${wantedBook}`);
    conv.contexts.set('wantedBook',2,{wantedBook: `${wantedBook}`})
});

// assistant.intent("OrderPlacedIntent", conv => {
//     const contextVariable = conv.contexts.get('ordered_item');
//     console.log('[[[[[[Contexts',contextVariable)
//     const selectedItem = contextVariable.parameters.orderedItem
//     conv.ask(`Okay, your order of ${selectedItem} is taken. Enjoy your meal`);
// });

assistant.intent("BooksIntent", conv => {
    const bookname = conv.parameters.bookname;
    console.log('=====CONV',bookname)
    let bookName='';
    let bookID='';
    let bookAuthor='';
    const bookFirst='C';
    const bookSecond='C++';
    const bookThird='javascript';
    const bookFourth='python';
    const book =[
    {
    "name":"c",
    "id":101,
    "Author":"Dennies Ritchie"
},
{
    "name":"c++",
    "id":102,
    "Author":"Bjarne"
},
    {
        "name":"javascript",
        "id":103,
        "Author":"Brendan Eich"
    },
    {
         "name":"python",
         "id":104,
         "Author":"Orelly"
    }
];
    for (i = 0; i < book.length; i++) {
    if(bookname== book[i].name)
        {
             bookName = book[i].name
            bookID = book[i].id
             bookAuthor = book[i].Author
             console.log(`===============${bookName},${bookID},${ bookAuthor}`)
        }
      }
      conv.ask(`Book Details are: ${bookName},${bookID},${ bookAuthor}`)
});

// Main Route
app.post("/", assistant);

app.get("/", (req, res) => {
    res.send("server running");
});

app.listen(process.env.PORT || 5000, function () {
    console.log("Express app started on port 5000");
});



