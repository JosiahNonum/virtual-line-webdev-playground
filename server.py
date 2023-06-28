import queue
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

q = queue.Queue()

def add_ticket(request):
    name = request.form.get('studentName')
    department = request.form.get('department')
    id = request.form.get('studentID')
    q.put({"name":name, "department":department, "id":id})
    return "The ticket has been added."

def print_ticket(request):
    if  q.empty():
        return "There is no Ticket"
    else:    
        return q.get()


@app.route('/', methods=['GET', 'POST'])
def handle_requests():
    if request.method == 'GET':
        z = print_ticket(request)
        return jsonify({'result': z})
    elif request.method == 'POST':
        # Handle POST request
        type = request.form.get('type')
        # Process the data
        result = process_data(request, type)
        return jsonify(result)
#{'result': result}
def process_data(request, type):    
    if (type == "print"):        
        return print_ticket(request)
    elif (type == "add"):
        return add_ticket(request)      
    else:
        return "bad boys, bad boys..." 
    

if __name__ == '__main__':
    app.debug = True  # Enable debug mode
    app.run()




