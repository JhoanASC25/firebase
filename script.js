/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();
/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */

const messageDiv = document.getElementById('all-messages');
const username = document.getElementById('username');
const message = document.getElementById('message');
const submitButton = document.getElementById('send-btn')

const email = document.getElementById('email')



submitButton.onclick = updateDB;

/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */

function updateDB(event) {
  event.preventDefault()

  if(username.value == ''){
    alert('please insert a username')
  }else{
    const date = new Date();
    let dateString = '' + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
     let timeString = ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    
    let data = {
    "username" : username.value,
    "email":email.value,
    "message": message.value,
    "time" : timeString,
    "date": dateString
    }

  console.log(data)

  database.push(data);

  message.value = "";
  }
 
  // Prevent default refresh
  // Create data object
  // console.log the object
  // GET *PUSH* PUT DELETE
  // Write to our database
  // Reset message
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
database.on('child_added', addMessageToBoard);



/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 *
 */

function addMessageToBoard(rowData) {
  let data = rowData.val();
  console.log(data)
  
  let singleMessage = makeSingleMessageHTML(data.username, data.message, data.email, data.date, data.time)

  messageDiv.appendChild(singleMessage);

  // Store the value of rowData inside object named 'data'
  // console.log data
  // Create a variable named singleMessage
  // that stores function call for makeSingleMessageHTML()
  // Append the new message HTML element to allMessages
}

/**
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 *
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - returns the parent div
 */

function makeSingleMessageHTML(usernameTxt, emailTxt, messageTxt, dateTxt, timeTxt ) {
  // Create Parent Div
  let parentDiv = document.createElement('div');
  // Add Class name .single-message
  parentDiv.className = 'single-message';
  // Create Username P Tag
  let usernameP = document.createElement('p')
  usernameP.innerHTML = usernameTxt
  usernameP.className = 'single-message-username'
  // Append username
  parentDiv.append(usernameP);
  // Create message P Tag
  let messageP = document.createElement('p');
  messageP.innerHTML = messageTxt;;
  parentDiv.append(messageP);
  // create email
  let emailp = document.createElement('p');
  emailp.innerHTML = emailTxt;
  parentDiv.append(emailp);
  //date
    let date = document.createElement('p');
  date.innerHTML = dateTxt;
  parentDiv.append(dateTxt);
  //Time
  let time = document.createElement('p');
  time.innerHTML = timeTxt;
  parentDiv.append(timeTxt);
  // Return Parent Div
  return parentDiv;
}
/*
function datetime(date, time){
    //use old parent div in makeSingleMessageHTML
    let date = 
}
*/
/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */
