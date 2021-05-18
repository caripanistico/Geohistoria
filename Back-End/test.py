from flask import Flask, render_template
from flask_pymongo import PyMongo
from flask_cors import CORS

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

db = mongo.db.puntos

"""
# Ingresa datos a la db. insert() retorna la id que mongo le asigna
db.insert({
    'name': 'Titulo Punto 3',
    'x':'345',
    'y':'345',
    'img':'Ruta Imagen 3',
    'info':'Texto Con Info 1'
})
"""

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


#Hola