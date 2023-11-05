import os
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

MONGODB_URI = os.environ.get("MONGODB_ENDPOINT")

app = Flask(__name__)
app.config["MONGO_URI"] = MONGODB_URI
mongo = PyMongo(app)

@app.route('/')
def index():
    return jsonify(
        status=True,
        message='Welcome to the Book Store!'
    )

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5123))
    app.run(debug=True, host='0.0.0.0', port=port)