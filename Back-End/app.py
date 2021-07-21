from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)

from db import get_db # esto debe ir aqui, para evitar un import circular

# necesario por politicas de navegadores!
CORS(app)

# Example: http://127.0.0.1:5000/date-range?commune=concepcion&date1=1900&date2=1930
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


@app.route('/add-point', methods=['POST'])
def add_point():
    ''' add a point to online mongoDB cluster '''
 
    # Receiving data
    title = request.form['title']
    texto = request.form['description']
    # year = int(request.form['year'])
    year = 2000
    commune = 'concepcion'
    x = float(request.form['lat'])
    y = float(request.form['lng'])


    imagenes = request.form['imagenes'].split(',')


    point = {
        'title': title,
        'texto': texto,
        'year': year,
        'x': x,
        'y': y,
        'commune': commune,
        'imagenes': imagenes
    }
    print(point)

    db = get_db()

    # All data is required
    if title and texto and year and x and y and imagenes:
        db.insert_one(point)
        response = jsonify({
            'message' : 'Punto creado exitosamente!'
        })
        response.status_code = 200
        return response

    else:
        response = jsonify({
            'message' : 'Error: Todos los campos son requeridos'
        })
        response.status_code = 400
        return response

@app.route('/commune', methods=['GET'])
def cuantas_comunas():
    """Retorna la cantidad de comunas que hay, para su uso en el filtro de comunas"""
    db = get_db()
    commune = db.distinct('commune')
    return jsonify(commune)


@app.route('/imagen')
def get_imagen():
    ''' Retorna una imagen '''

    filename = request.args.get('filename')

    return send_file(f"static/images/{filename}", mimetype='image/gif')


@app.route('/add-image', methods=['POST'])
def add_image():
    ''' guarda imagenes de un punto '''

    if len(request.files) == 0:
        return 'There is no images!', 400

    img_names = []
    for img in request.files.values():
        img.save(f'./static/images/{img.filename}')
        img_names.append(img.filename)

    return { 'imagenes': img_names }








### === testing & development end-points === ###

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