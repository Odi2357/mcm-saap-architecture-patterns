import json

from flask import Flask, request, Response, jsonify

app = Flask(__name__)

patterns = []


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/patterns', methods=['GET'])
def get_patterns():
    return jsonify(patterns)


@app.route('/add-pattern', methods=['POST'])
def add_pattern():
    read_data = json.loads(request.data)

    if read_data:
        print(read_data)
        patterns.append(read_data)

        return jsonify({'success': 'data was successfully added!'})
    return jsonify({'error': 'data could not be added!'})


if __name__ == '__main__':
    app.run()
