from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/MyDatabase"
mongo = PyMongo(app)

CORS(app)

# Asumiendo por ej que la coleccion en la db se llama "puntos"
db = mongo.db.puntos

@app.route('/puntos/', methods= ['GET'])
def get_puntos():
    ''' Retorna todos los puntos desde la DB. Sus coordenadas '''

    puntos= []
    for doc in db.find():
        puntos.append({
            '_id': str(ObjectId(doc['_id'])),
            'x': doc['x'],
            'y': doc['y']
        })

    return jsonify(puntos)


@app.route('/puntos/<id>', methods=['GET'])
def get_punto(id_punto):
    ''' Retorna la informacion del punto especifico de id = <id>, desde la db '''

    punto = db.find_one({'_id': ObjectId(id_punto)})
    #print(punto)
    return jsonify({
    '_id': str(ObjectId(punto['_id'])),
    'title': punto['title'],
    'texto': punto['texto'],
    'x': punto['x'],
    'y': punto['y']
    })


## testing & development end-points

@app.route('/test')
def test():
    ''' test route '''

    return {
        'id': 1,
        'name': 'Que se cho loco'
    }, 200

@app.route('/add_point', methods=['POST'])
def add_point():
    ''' add a point to online mongoDB cluster '''
    mongo.db.Files.insert_one({
            # "name": name,
            # "online": False
        }
    )

    return 'Recibido'
