// the ticket template
class Ticket{
  constructor(p_studentName, p_studentID, p_department)
  {
    this.studentName = p_studentName;
    this.studentID = p_studentID;
    this.department = p_department;
  }
}

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


function setValue(id, newValue) {
  document.getElementById(id).innerHTML = newValue;
}


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


// gives the next tickets info in a pop-up without destroying it
function peekTicket(){
  if (q.isEmpty){
    alert("There is no ticket to display.");
    return}
  
  let x = q.peek();
  alert(x.studentName + " " + x.studentID + " " + x.department);
}







