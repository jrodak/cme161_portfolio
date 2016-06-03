from __future__ import division
import os, copy, json, collections
from flask import Flask, jsonify, request, send_from_directory, make_response
app = Flask(__name__, static_url_path='')

# get root
@app.route("/")
def index():
    return app.make_response(open('app/index.html').read())

# send assets (ex. assets/js/random_triangle_meshes/random_triangle_meshes.js)
# blocks other requests, so your directories won't get listed (ex. assets/js will return "not found")
@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('app/assets/', path)

@app.route('/boids/')
def send_assets_html():
    return app.make_response(open('app/assets/html/boids_threejs.html').read())


@app.route('/trellis/', methods=['GET'])
def get_trellis():
    with open('app/assets/data/trellis.json') as data_file:
        return json.dumps(json.load(data_file))

@app.route('/trellis/limit/<int:n_entries>/', methods=['GET'])
def get_trellis_limit(n_entries):
    with open('app/assets/data/trellis.json') as data_file:
        return json.dumps(json.load(data_file)[:n_entries])

def make_data_graph(data_list_in):
    idx = 0
    names = collections.OrderedDict()
    for e in data_list_in:
        to = e['to'][:7] # truncate
        fr = e['from'][:7]
        if to not in names:
            names[to] = idx
            idx += 1
        if fr not in names:
            names[fr] = idx
            idx += 1
    edges = [{
                "source": names[e['to'][:7]], 
                "target": names[e['from'][:7]], 
                "value": e['n'], 
                "tags":  [d['tag'] for d in e['data']] 
            } for e in data_list_in
        ]
    nodes = [{"name":n} for n in names.keys()]
    return { "nodes": nodes, "edges": edges }

@app.route('/graph/', methods=['GET'])
def get_graph():
    with open('app/assets/data/trellis.json') as data_file:
        return json.dumps(make_data_graph(json.load(data_file)))

@app.route('/graph/limit/<int:n_entries>/', methods=['GET'])
def get_graph_limit(n_entries):
    with open('app/assets/data/trellis.json') as data_file:
        return json.dumps(make_data_graph(json.load(data_file)[:n_entries]))

# routes for data for past visualizations

@app.route('/data/stocks/', methods=['GET'])
def get_stocks_raw():
    with open('app/assets/data/stocks.json') as data_file:
        return json.dumps(json.load(data_file))

@app.route('/data/stocks/<int:ref_index>/<int:start_index>/')
def get_stocks_start(ref_index, start_index):
    with open('app/assets/data/stocks.json') as data_file:
        raw_data = json.load(data_file)
        return convert_data(raw_data, ref_index, start_index, len(raw_data[0]))


@app.route('/data/stocks/<int:ref_index>/<int:start_index>/<int:end_index>/')
def get_stocks(ref_index, start_index, end_index):
    with open('app/assets/data/stocks.json') as data_file:
        raw_data = json.load(data_file)
        return convert_data(raw_data, ref_index, start_index, end_index)
        

def convert_data(raw_data, ref_index, start_index, end_index):
    converted_data = [
        [raw_data[0][0]],
        [raw_data[1][0]],
        [raw_data[2][0]],
    ]
    converted_data[0].extend(raw_data[0][start_index + 1: end_index])
    converted_data[1].extend(convert_to_percent_increase(raw_data[1][start_index + 1:end_index], raw_data[1][ref_index + 1]))
    converted_data[2].extend(convert_to_percent_increase(raw_data[2][start_index + 1:end_index], raw_data[2][ref_index + 1]))
    return json.dumps(converted_data)


@app.route('/data/donuts/')
def get_donuts():
    with open('app/assets/data/donuts.json') as data_file:
        return json.dumps(json.load(data_file))


def convert_to_percent_increase(raw_data, ref_value):
    return [(val / ref_value - 1) * 100 for val in raw_data]

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5050))
    app.run(host='0.0.0.0', port=port, debug=True)
# set debug=True if you want to have auto-reload on changes
# this is great for developing