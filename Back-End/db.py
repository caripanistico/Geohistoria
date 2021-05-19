from flask_pymongo import PyMongo
from app import app # local module

def get_db():
    ''' get an instance of the puntos db '''

    # online database cluster
    app.config["MONGO_URI"] = "mongodb+srv://root:root@cluster0.s605p.mongodb.net/database0?retryWrites=true&w=majority"
    mongo = PyMongo(app)

    # get a puntos db instance
    db = mongo.db.puntos

    return db
