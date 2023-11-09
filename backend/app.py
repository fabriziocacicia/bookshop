import os
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS
from mongoquery import MongoQuery

MONGODB_URI = os.environ.get("MONGODB_ENDPOINT")

app = Flask(__name__)
app.config["MONGO_URI"] = MONGODB_URI
mongo = PyMongo(app)
db = mongo.db

keys = ['_id', 'index', 'title', 'author', 'year', 'price']
queryfier = MongoQuery(keys, 'books')

CORS(app)

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
            inserted_id=str(insertOneResult.inserted_id)
    ), 200
    
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
    query = request.get_json(force=True, silent=True)
    
    sort_by = request.args.get('sort', '_id')
    order = int(request.args.get('ord', 1))
    
    books = db.books.find(query).sort(sort_by, order)
    data = []
    
    for book in books:
        book['_id'] = str(book['_id'])
        data.append(book)
    
    return jsonify(
        books=data
    ), 200


@app.route('/book/<book_id>', methods=['PUT'])
def updateBook(book_id):
    changes = request.get_json()

    book_object_id = ObjectId(book_id)
    
    result = db.books.update_one({'_id': book_object_id}, {'$set': changes})
    
    if result.matched_count == 0:
        return jsonify(
            status=False,
            message='Item not found'
        ), 404
    
    updated_book = db.books.find_one({'_id': book_object_id})
    updated_book['_id'] = str(updated_book['_id'])
    

    return jsonify(
        status=True,
        message='Book updated successfully',
        updated_book=updated_book,
    ), 200
    
    
@app.route('/book/<book_id>', methods=['DELETE'])
def deleteBook(book_id):
    book_object_id = ObjectId(book_id)
    
    result = db.books.delete_one({'_id': book_object_id})
    if result.deleted_count == 0:
        return jsonify(
            status='Error',
            message='Book not found'
        ), 404
    
    return jsonify(
        status='OK',
        message='Book deleted successfully',
        deleted_book_id=book_id
    ), 200
    
def _preprocess_ai_generated_query(query: str) -> str:
    query = query.split('}, {')[0]
    query += "})"
    
    return query

def _execute_ai_generated_query(query: str) -> []:
    local_vars = {}
    global_vars = {}
    global_vars['db'] = db
    line = 'result = db.books.find({"year": {"$gt": 100}, "year": {"$lt": 1900}})'
    line = 'result = {}'.format(query)
    exec(line, global_vars, local_vars)
    books = local_vars.get('result')
    
    return books
    
@app.route('/aisearch', methods=['POST'])
def aiSearch():
    data = request.get_json(force=True)
    
    query = queryfier.generate_query('''{}'''.format(data['query']))
    query = _preprocess_ai_generated_query(query)

    books = _execute_ai_generated_query(query)
    data = []
    
    if books is not None:
        for book in books:
            if '_id' in book:
                book['_id'] = str(book['_id'])
            data.append(book)
    
    return jsonify(
        books=data,
        query=query
    ), 200

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5123))
    app.run(debug=True, host='0.0.0.0', port=port)