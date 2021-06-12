from flask import Flask, current_app

app = Flask(__name__)

@app.route('/')
def home():
    return current_app.send_static_file('home.html')

@app.route('/timeline_slider.js')
def js_serve1():
    return current_app.send_static_file('timeline_slider.js')

@app.route('/react_example.js')
def js_serve2():
    return current_app.send_static_file('react_example.js')

if __name__ == "__main__":
    app.run(debug=True)
