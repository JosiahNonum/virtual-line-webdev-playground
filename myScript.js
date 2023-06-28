// the ticket template
class Ticket{
  constructor(p_studentName, p_studentID, p_department)
  {
    this.studentName = p_studentName;
    this.studentID = p_studentID;
    this.department = p_department;
  }
}

/*
// credit for this template goes to https://www.javascripttutorial.net/javascript-queue/
class Queue {
  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }
  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }
  peek() {
    return this.elements[this.head];
  }
  get length() {
    return this.tail - this.head;
  }
  get isEmpty() {
    return this.length === 0;
  }
}

//instantiating the queue object
let q = new Queue();





function ticketFactory(someForm){
var out = '';
    for (var i=0, el; el = someForm.elements[i]; i++) {
        if (el.name) {
            out += el.name + ' = ' + el.value + '\n';
        }
    }
 alert(out);
}


function makeTicket(someForm){
  let x = new Ticket(someForm.elements[0].value, someForm.elements[1].value, someForm.elements[2].value);
  q.enqueue(x);
  someForm.reset();
  alert("You Have Been Added to the Line");
}

// only here for test purposes
function makeTicketDeprecated(studentName, studentID, department){
  let x = new Ticket(studentName, studentID, department);
  q.enqueue(x);
  alert("You Have Been Added to the Line");
}


function printTicket(){
  if (q.isEmpty){
    alert("There is no ticket to display.");
    setValue("demo1", "");
    setValue("demo2", "");
    setValue("demo3", "");
    return}
  
  let x = q.dequeue();
  setValue("demo1", x.studentName);
  setValue("demo2", x.studentID);
  setValue("demo3", x.department);
}



function makeTicketLocal(someForm){
  let x = [someForm.elements[0].value, someForm.elements[1].value, someForm.elements[2].value];
  sessionStorage.setItem("name", x[0])
  sessionStorage.setItem("dept", x[1])
  sessionStorage.setItem("id", x[2])
  alert("You Have Been Added to the (local) Line");
}

function printTicketLocal(){
  setValue("demo1", sessionStorage.getItem("name") );
  setValue("demo2", sessionStorage.getItem("dept"));
  setValue("demo3", sessionStorage.getItem("id"));
  console.log("printed local ticket")
}


// server interactions area
function sendGetRequest() {
  fetch('/').then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
}

function sendPostRequest() {
  fetch('/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'data=Hello from JavaScript!',
  })
  .then(response => response.json())
  .then(data => {
      console.log(data.result);
      // Process the returned data as needed
  })
  .catch(error => console.error(error));

  function getTheTicket(){
  fetch('http://127.0.0.1:5000', {method: 'POST', mode: 'no-cors', body: 'type=print' })
  .then(response => response.json())
  .then(data => {
    setValue("demo1", data.name);
    setValue("demo2", data.dept);
    setValue("demo3", data.id);
    console.log("printed fetch ticket");
  })  
  .catch(error => console.error(error));
}

*/

// defining the path to the python server
let api_url = 'http://127.0.0.1:5000'


// getting the ticket at the front of the queue from the python server
async function getText(){
  const response = await fetch(api_url);
  let data = await response.json();
  console.log(data);
  if (data.result == "There is no Ticket"){
    alert("There is no ticket to display.");
    setValue("demo1", "");
    setValue("demo2", "");
    setValue("demo3", "");
    return}    
  setValue("demo1", data.result.name);
  setValue("demo2", data.result.department);
  setValue("demo3", data.result.id);
  console.log("printed fetch ticket");
}

// changes the content of a <p> tag
function setValue(id, newValue) {
  document.getElementById(id).innerHTML = newValue;
}


// gives the next tickets info in a pop-up without destroying it
async function peekTicket(){
  const response = await fetch(api_url, {method:"post"});
  let data = await response.json();
  console.log(data);

  

  if (data.result == "There is no Ticket"){
    alert("There is no ticket to display.");
    return}    
  alert(data.result.name + " " + data.result.id + " " + data.result.department);
}

