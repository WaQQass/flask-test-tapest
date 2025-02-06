from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data')
def api_data():
    return jsonify({"message": "Hello from Flask API!"})

# No app.run() needed, Gunicorn will handle execution

