from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)

from db import get_db # esto debe ir aqui, para evitar un import circular

# necesario por politicas de navegadores!
CORS(app)

@app.route('/puntos', methods= ['GET'])
def get_puntos():
    ''' Retorna todos los puntos por comuna. Sus coordenadas '''

    commune = request.args.get('commune')
    db = get_db()

    puntos = []
    for punto in db.find({'commune': commune}):
        try:
            puntos.append({
                '_id': str( ObjectId(punto['_id'])),
                'title': punto['title'],
                'texto': punto['texto'],
                'year': punto['year'],
                'x': punto['x'],
                'y': punto['y'],
                'imagenes': punto['imagenes']
            })

        except:
            pass

    return jsonify(puntos)


@app.route('/imagen')
def get_imagen():
    ''' Retorna una imagen '''

    filename = request.args.get('filename')

    return send_file(f"static/images/{filename}", mimetype='image/gif')


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


# http://127.0.0.1:5000/date-range?commune=concepcion&date1=1900&date2=1930
@app.route('/date-range', methods=['GET'])
def in_range():
    """Retorna los puntos por comuna, filtrados por el rango de fechas"""
    
    commune = request.args.get('commune')
    date1 = int(request.args.get('date1'))
    date2 = int(request.args.get('date2'))
    db = get_db()
    
    # $gte : greater than or equal.  $lte: less than or equal.
    filtered = db.find({ 
        '$and':[
            {'commune': commune },
            {'year': {'$gte': date1}},
            {'year': {'$lte': date2}}   
        ]
    })
    
    points = []
    for point in filtered:
        try:
            points.append({
                '_id': str( ObjectId(point['_id'])),
                'title': point['title'],
                'texto': point['texto'],
                'year': point['year'],
                'x': point['x'],
                'y': point['y'],
                'imagenes': point['imagenes']
            })
        except:
            pass
   
    return jsonify(points)
    
    
# @app.route('/puntos/data', methods=['GET'])
# def get_punto():
#     ''' Retorna la informacion del punto especifico de id = <id>, desde la db '''

#     id_punto = request.args.get('id_punto')

#     db = get_db()
#     punto = db.find_one({'_id': ObjectId(id_punto)})

#     return jsonify({
#         '_id': str(ObjectId(punto['_id'])),
#         'title': punto['title'],
#         'texto': punto['text'],
#         'x': punto['x'],
#         'y': punto['y']
#     })
@app.route('/commune', methods=['GET'])
def cuantas_comunas():
    """Retorna la cantidad de comunas que hay, para su uso en el filtro de comunas"""
    db = get_db()
    commune = db.distinct('commune')
    return jsonify(commune)