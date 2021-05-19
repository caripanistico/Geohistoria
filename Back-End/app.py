from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/MyDatabase"
mongo = PyMongo(app)
CORS(app)

@app.route("/")
def home_page():
    return render_template("index.html", name=None)

@app.route("/user/<name>")
def show_user(name):
    user = mongo.db.Files.find_one_or_404({"name": name})

    return render_template("index.html", name=user["name"], online=user["online"])

@app.route("/register/<name>", methods=['POST'])
def register_user(name):
    user = mongo.db.Files.insert_one({
            "name": name,
            "online": False
        }
    )
    return 'Recibido'


@app.route('/test')
def test():
    ''' test route '''

    return {
        'id': 1,
        'name': 'Que se cho loco'
    }, 200


# Asumiendo por ej que la coleccion en la db se llama "puntos"
db = mongo.db.puntos

# Retorna todos los puntos desde la DB. Sus coordenadas
@app.route('/puntos/', methods= ['GET'])
def getPuntos():
    puntos= []
    for doc in db.find():
        puntos.append({
            '_id': str(ObjectId(doc['_id'])),
            'x': doc['x'],
            'y': doc['y']
        })
    return jsonify(puntos)

# Retorna la informacion del punto especifico de id = <id>, desde la db
@app.route('/puntos/<id>', methods=['GET'])
def getPunto(id):
  punto = db.find_one({'_id': ObjectId(id)})
  #print(punto)
  return jsonify({
      '_id': str(ObjectId(punto['_id'])),
      'title': punto['title'],
      'texto': punto['texto'],
      'x': punto['x'],
      'y': punto['y']
  })
