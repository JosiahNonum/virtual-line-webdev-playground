import queue
import json
from flask import Flask, request, jsonify

app = Flask(__name__)


q = queue.Queue()

def add_ticket(request):
    name = request.form.get('studentName')
    department = request.form.get('department')
    id = request.form.get('studentID')
    q.put({"name":name, "department":department, "id":id})
    return "The ticket has been added."

def print_ticket(request):
    x = q.get()
    json_string = json.dumps(x)
    return "The ticket has been popped" + json_string


@app.route('/', methods=['GET', 'POST'])
def handle_requests():
    if request.method == 'GET':
        # Handle GET request
        return 'This is a GET request.'
    elif request.method == 'POST':
        # Handle POST request
        type = request.form.get('type')
        # Process the data
        result = process_data(request, type)
        return jsonify({'result': result})

def process_data(request, type):    
    if (type == "print"):        
        x = print_ticket(request)
        return x
    elif (type == "add"):
        x = add_ticket(request)       
        return x
    else:
        return "bad boys, bad boys..." 
    

if __name__ == '__main__':
    app.debug = True  # Enable debug mode
    app.run()




