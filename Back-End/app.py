from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)

from db import get_db # esto debe ir aqui, para evitar un import circular

# necesario por politicas de navegadores!
CORS(app)

@app.route('/puntos', methods= ['GET'])
def get_puntos():
    ''' Retorna todos los puntos por comuna. Sus coordenadas '''

    comuna = request.args.get('commune')
    db = get_db()

    puntos = []
    for punto in db.find({'comuna': comuna}):
        try:
            puntos.append({
                '_id': str( ObjectId(punto['_id'])),
                'title': punto['title'],
                'x': punto['x'],
                'y': punto['y'],
            })
        except:
            pass

    return jsonify(puntos)


@app.route('/puntos/data', methods=['GET'])
def get_punto():
    ''' Retorna la informacion del punto especifico de id = <id>, desde la db '''

    id_punto = request.args.get('id_punto')

    db = get_db()
    punto = db.find_one({'_id': ObjectId(id_punto)})

    return jsonify({
        '_id': str(ObjectId(punto['_id'])),
        'title': punto['title'],
        'texto': punto['text'],
        'x': punto['x'],
        'y': punto['y']
    })



### === testing & development end-points === ###

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

    db = get_db()
    data = request.json
    db.insert_one(data) # ojo: este insert modifica el objeto "data"

    # cambia la clase a str para que pueda ser enviado por json
    data['_id'] = str(data['_id'])

    return data, 200
