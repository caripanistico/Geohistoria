from flask import Flask
from flask_pymongo import PyMongo
from flask import render_template

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/MyDatabase"
mongo = PyMongo(app)

@app.route("/")
def home_page():
    return render_template("index.html",
        name=None)
@app.route("/user/<name>")
def show_user(name):
    user = mongo.db.Files.find_one_or_404({"name": name})
    return render_template("index.html", name=user["name"], online=user["online"])

## @app.route("/register/<name>")
## def register_name(name):
