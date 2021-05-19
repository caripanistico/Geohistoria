from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/MyDatabase"
mongo = PyMongo(app)

CORS(app)

db = mongo.db.puntos

@app.route("/register/<name>", methods=['POST'])
def register_user(name):
    user = mongo.db.Files.insert_one({
            "name": name,
            "online": False
        }
    )
    return 'Recibido'

@app.route('/puntos/', methods= ['GET'])
def getPuntos():
    puntos= []
    for doc in db.find():
        puntos.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'x': doc['x'],
            'y': doc['y']
        })
    return jsonify(puntos)


@app.route('/puntos/<id>', methods=['GET'])
def getPunto(id):
  punto = db.find_one({'_id': ObjectId(id)})
  print(punto)
  return jsonify({
      '_id': str(ObjectId(punto['_id'])),
      'name': punto['name'],
      'img': punto['img'],
      'info': punto['info']
  })


## testing end-points

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

