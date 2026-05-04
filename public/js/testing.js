const apiUrl = 'http://localhost:3010/api/';
const xhttpr = new XMLHttpRequest();

// Event driven events
const submitBtn = document.getElementById('submitBtn');
const container = document.getElementById('container');

let touched = false;

container.addEventListener('touchstart', () => {});
container.addEventListener('touchend', () => {});
container.addEventListener('touchcancel', () => {});
container.addEventListener('touchmove', () => {});

// Detect touchend for touch devices
submitBtn.addEventListener('touchend', function(event) {
    event.preventDefault();

    document.getElementById("msg1").textContent=`touchend event`;

    if (!touched) {
        touched = true;
        handleSubmit(event);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const titlearea = document.getElementById('bookTitle');
    const musicarea = document.getElementById('musicTitle');

    // Detect when user presses Enter and do nothing for now
    titlearea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("musicTitle").focus();
        }
    });

    // Detect when user presses Enter and do nothing for now
    musicarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
});

submitBtn.addEventListener('click', function(event) {
    document.getElementById("msg1").textContent=`click event`;
    if (!touched) handleSubmit(event);
        touched = false; // reset after handling
});

// Function to handle submit button
function handleSubmit(event) {
    event.preventDefault();

    let book = titleCase(document.getElementById("bookTitle").value);
    let music = titleCase(document.getElementById("musicTitle").value);

    
    //let musicCase = uppercaseFirstLetter(music);
    //music.replace(/(?<=\()[a-z]/g, (match) => match.toUpperCase());

    // Clear result
    document.getElementById("msg2").textContent=``;
    document.getElementById("titleCase").textContent='';

    document.getElementById("msg2").textContent='Testing - submit button pressed';
    document.getElementById("titleCase").textContent=music;

    // Clear everything except book title, assuming next song will be from the same book
    document.getElementById("musicTitle").value='';
    // Set focus to next music title
    document.getElementById("musicTitle").focus();

    touched = false;

    getBookMusic(book);
};

// Set the first letter of each word to an uppper case letter
// This copes with letters after round brackets which appear
// in music titles in the books.
function uppercaseFirstLetter(str) {
    var text = str.replace(/(?<=\()[a-z]/g, (match) => match.toUpperCase());
    return text;
}

// Set the first letter of each word to an uppper case letter
function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // Do not need to check if it is larger than splitStr length, as for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
  
   // Return the joined string, check for round brackets first
   return uppercaseFirstLetter(splitStr.join(' '));
}

async function getBookMusic(bookTitle) {
    try {
        const response = await fetch(apiUrl + 'v1/book/title/' + bookTitle);
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        if (result.length == 0) {   // no results
            document.getElementById("no-matches").innerHTML = "No music found for book: " + bookTitle;
            document.getElementById("tablebody").innerHTML = "";
        } else {
            //  Insert data from the database
            let cardData = "";
            let counter = 0;
            result.map((values)=>{
                if (counter != 0 && counter % 3 == 0 ) {
                    cardData +='<p></p>'
                }
                
                cardData += `
                    <div class="col-sm-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${bookTitle}</h5>
                                <p class="card-text">Music Title: ${values.songtitle}</p>
                                <p class="card-text">Composer(s): ${values.composername}</p>
                                <a href="#" class="btn btn-primary">Edit</a>
                            </div>
                        </div>
                    </div>`;
                
                counter++;
            });

            cardData +='<p></p>';
            document.getElementById("cards").innerHTML = cardData;
        }
    } catch (error) {
        console.error(error);
    }
}