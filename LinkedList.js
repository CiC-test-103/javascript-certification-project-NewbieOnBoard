// Necessary Imports (you will need to use this)
const { Student } = require('./Student');
const fs = require("fs").promises;

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor(head, tail, length) {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;    //initial value is 0
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    let node = new Node(newStudent);    //create a new node
    if(!this.head){       //if it's empty
      this.head = node;   //this head is newStudent node
      this.tail = node;   //this tail is also newStudent node
      return;
    }
    else{
      this.tail.next = node;  //adds newStudent node after last node
      this.tail = node;   //the newStudent node become the last node
    }
    this.length++;     //update list length
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    if(!this.head){   //if it's empty, nothing to remove then
      return "No student to remove.";
    }
    if(this.head.data.getEmail() === email){    //Head node (very 1st one) was found the email to delete
      this.head = this.head.next;     //this email has been deleted then move to the next 
      if(!this.head){     //if after removed and become empty
        this.head = null;
        this.tail = null;
        return "No student data avaliable!";
      }
      this.length--;    //update list length
      return `The student: ${email} has been removed!`;
    }

    let current = this.head;    //Start from Head
    while(current.next){    //start with next from Head (Head is already checked) to check
      if(current.next.data.getEmail() === email){
        current.next = current.next.next;  //found email and deleted then move to the next
        if(!current.next){    //check if removed node is tail
          this.tail = current;    //update tail
        }
        this.length--;    //update list length
        return `The student: ${email} has been removed!`;
      }
      current = current.next;   //move to next node
    }
    return `No student was removed.`
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let current = this.head;

    if(!current){
      return `No student data avaliable!`;
    }

    while(current){   //loop starts until end to check if it matched
      if(current.data.getEmail() === email){    //if it found the student email
        return current.data;    //return to student data
      }
      current = current.next;   //move to next node
    }
    return -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    this.head = null;     //make it null which means empty
    this.tail = null;     //make it null which means empty
    this.length = 0;       // set to 0 which means empty in list
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    let studentList = [];
    let current = this.head;

    if(!current){
      return `No Student data to display!`;
    }

    while(current){
      studentList.push(current.data.getName());   //add student's name to the Student Array list
      current = current.next;     //move to next node
    }
    
    return studentList.join(", ");    //join is to combined elements into of Array ["JohnDoe", "JaneDoe"] into ["JohnDoe, JaneDoe"]
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO
    let studentList = [];
    let current = this.head;

    while(current){
      studentList.push(current.data);
      current = current.next;
    }

    studentList.sort((a, b) => a.getName().localeCompare(b.getName()));

    return studentList;   //return back to studentList Array
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    let studentSpecial = [];
    let sortStudent = this.#sortStudentsByName();

    for(let i = 0; i < sortStudent.length; i++){
      if(sortStudent[i].getSpecialization() === specialization){
        studentSpecial.push(sortStudent[i]);
      }
    }
    return studentSpecial;
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinAge(minAge) {
    // TODO
    let filterAge = [];
    let sortStudent = this.#sortStudentsByName();

    for(let i = 0; i < sortStudent.length; i++){
      if(sortStudent[i].getYear() >= minAge){
        filterAge.push(sortStudent[i]);
      }
    }
    return filterAge;
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
    let students = [];
    let current = this.head;

    while(current){
      students.push({
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization(),
      })
      current = current.next;
    }

    try{
      await fs.writeFile(fileName, JSON.stringify(students, null, 2));
      console.log(`Data is successfully saved to ${fileName}`);
    }
    catch(error){
      console.log("Error saving", error);
    }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    try{
      const data = await fs.readFile(fileName, "utf-8");
      const studentArray = JSON.parse(data);

      this.clearStudents();

      studentArray.forEach((studentData) => {
        const student = new Student(
          studentData.name,
          studentData.year,
          studentData.email,
          studentData.specialization
        );
        this.addStudent(student);
      })
      console.log(`${fileName} was loaded successfully.`);
    }
    catch(error){
      console.log("Error loading", error);
    }
  }
}

module.exports = { LinkedList }
