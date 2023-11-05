import os
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

MONGODB_URI = os.environ.get("MONGODB_ENDPOINT")

app = Flask(__name__)
app.config["MONGO_URI"] = MONGODB_URI
mongo = PyMongo(app)
db = mongo.db


@app.route('/')
def index():
    return jsonify(
        status=True,
        message='Welcome to the Book Store!'
    )
    
@app.route('/book', methods=['POST'])
def createBook():
    data = request.get_json(force=True)

    book = {
        'title': data['title'],
        'author': data['author'],
        'year': data['year'],
        'price': data['price'],
    }
    
    insertOneResult = db.books.insert_one(book)
    
    return jsonify(
            status=True,
            inserted_id=str(insertOneResult.inserted_id)
    )
    
@app.route('/book/<book_id>', methods=['GET'])
def getBookById(book_id):
    book = db.books.find_one_or_404(ObjectId(book_id))
    
    book['_id'] = str(book['_id'])

    return jsonify(
        status=True,
        data=book
    )
        
@app.route('/books', methods=['GET'])
def getBooks():
    books = db.books.find()
    data = []
    
    for book in books:
        item = {
            '_id': str(book['_id']),
            'title': book['title'],
            'author': book['author'],
            'year': book['year'],
            'price': book['price'],
        }
        data.append(item)
    
    return jsonify(
        status=True,
        data=data
    )

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5123))
    app.run(debug=True, host='0.0.0.0', port=port)