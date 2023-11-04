db = db.getSiblingDB("bookstore_db");

db.createCollection("books", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          title: "Book Object Validation",
          required: ["title", "author", "year", "price"],
          properties: {
             title: {
                bsonType: "string",
                description: "The title of the book"
             },
             author: {
                bsonType: "string",
                description: "The author of the book"
             },
             year: {
                bsonType: "int",
                minimum: 0,
                maximum: 2023,
                description: "The year in which the book has been published"
             },
             price: {
                bsonType: [ "double", "int" ],
                minimum: 0.0,
                description: "The price of the book in euros"
             }
          }
       }
    }
 } )
