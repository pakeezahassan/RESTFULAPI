const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
let books = [
	{ id: 101, title: "Pride and Prejudice", author: "Jane Austen" },
	{ id: 102, title: "The Catcher in the Rye", author: "J.D. Salinger" },
	{ id: 103, title: "Animal Farm", author: "George Orwell" },
	{ id: 104, title: "Brave New World", author: "Aldous Huxley" },
];
app.get("/books", (req, res) => {
	res.json(books);
});
app.get("/books/:id", (req, res) => {
	const book = books.find((book) => book.id === parseInt(req.params.id));
	if (!book) {
		return res.status(404).json({ message: "Book not found" });
	}
	res.json(book);
});
app.post("/books", (req, res) => {
	const { title, author } = req.body;
	const newBook = { id: books.length + 1, title, author };
	books.push(newBook);
	res.status(201).json(newBook);
});
app.put("/books/:id", (req, res) => {
	const { id } = req.params;
	const { title, author } = req.body;
	const bookIndex = books.findIndex((book) => book.id === parseInt(id));
	if (bookIndex === -1) {
		return res.status(404).json({ message: "Book not found" });
	}
	books[bookIndex] = { ...books[bookIndex], title, author };
	res.json(books[bookIndex]);
});
app.delete("/books/:id", (req, res) => {
	const { id } = req.params;
	const bookIndex = books.findIndex((book) => book.id === parseInt(id));
	if (bookIndex === -1) {
		return res.status(404).json({ message: "Book not found" });
	}
	const deletedBook = books.splice(bookIndex, 1)[0];
	res.json({ message: "Book deleted", deletedBook });
});
app.listen(PORT, () => {
	console.log(`http://localhost: ${PORT}/books is ready`);
});
