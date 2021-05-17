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
