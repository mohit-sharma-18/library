
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

// Display constructor

function Display() {

}

// Add methods to display prototype ( here we make functions)

Display.prototype.add = function (book) {
    console.log('Adding');
    let tableBody = document.getElementById('tableBody');
    let string = `<tr>
                      <td>${book.name}</td>
                     <td>${book.author}</td>
                     <td>${book.type}</td>
                 </tr>`;

    tableBody.innerHTML += string;

    // implementing the clear function
    Display.prototype.clear = function () {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
}
// implementing the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                 <strong>Messge:</strong> ${displayMessage}
                                     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                     </button>
                          </div>`;

    setTimeout(function () {
        message.innerHTML = '';
    }, 2000);
}


let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', function (e) {

    let bookName = document.getElementById('bookName');
    let author = document.getElementById('author');
    let myBook = localStorage.getItem('myBook');
    if (myBook == null) {
        myBookObj = [];
    }
    else {
        myBookObj = JSON.parse(myBook);
    }
    let myObject = {
        Name: bookName.value,
        Author: author.value
    }
    myBookObj.push(myObject);
    localStorage.setItem('myBook', JSON.stringify(myBookObj));
    console.log(myBookObj);

});



function libraryFormSubmit(e) {

    console.log('Your form has been summited succesfully');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let designing = document.getElementById('designing');
    let programming = document.getElementById('programming');
    let animation = document.getElementById('animation');

    if (designing.checked) {
        type = designing.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (animation.checked) {
        type = animation.value;
    }

    // here we add methods of functions which we create upper 
    let book = new Book(name, author, type);
    console.log(book);
    // to show value to display
    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        // to clear added data from text boxes
        display.clear();
        display.show('success', 'Your book has been successfully added');
    }
    else {
        display.show('danger', 'Sorry you cannot add this book');
    }
    e.preventDefault();
}