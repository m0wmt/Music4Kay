// Define the API URL
const apiUrl = 'http://localhost:3010/api/';
const xhttpr = new XMLHttpRequest();
const container = document.getElementById('musicContainer');

var touched = false;

// To fix Safari in iOS on a tablet not firing on touch events, no
// idea how this fixes it but it was suggested online!
container.addEventListener('touchstart', () => {});
container.addEventListener('touchend', () => {});
container.addEventListener('touchcancel', () => {});
container.addEventListener('touchmove', () => {});

// Detect touchend for touch devices
submitBtn.addEventListener('touchend', function(event) {
    event.preventDefault();

    if (!touched) {
        touched = true;
        updateItem(event);
    }
});

cancelBtn.addEventListener('touchend', function(event) {
  event.preventDefault();

  if (!touched) {
    touched = true;
    cancelUpdate(event);
  }
});

document.addEventListener("DOMContentLoaded", function () {
    const titleArea = document.getElementById('bookTitle');
    const musicArea = document.getElementById('musicTitle');
    const artistArea = document.getElementById("artistName");
    var bandArea = document.getElementById("bandName");
    var composerArea = document.getElementById("composerName");

    // Detect when user presses Enter and move cursor
    titleArea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("musicTitle").focus();
        }
    });

    // Detect when user presses Enter and move cursor
    musicArea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("artistName").focus();
        }
    });

    // Detect when user presses Enter and move cursor
    artistArea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("bandName").focus();
        }
    });

    // Detect when user presses Enter and move cursor
    bandArea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("composerName").focus();
        }
    });

    // Detect when user presses Enter in composer and do nothing
    composerArea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
});

submitBtn.addEventListener('click', function(event) {
    if (!touched) updateItem(event);
        touched = false; // reset after handling
});

cancelBtn.addEventListener('click', function(event) {
  if (!touched)
    cancelUpdate(event);
  touched = false; // reset after handling
});

function cancelUpdate() {
    touched = false; // reset 

    window.history.back();
}

window.onload = (event) => {
    // const params = new URLSearchParams(window.location.search);
    // console.log(params);
    // var book_id = GetURLParameter('book_id');
    // console.log(book_id);
    // var song_id = GetURLParameter('song_id');
    // console.log(song_id);
    // var artist_id = GetURLParameter('artist_id');
    // console.log(artist_id);
    // var band_id = GetURLParameter('band_id');
    // console.log(band_id);

    //get all details for item to edit
    retrieveItemToEdit();
};

async function retrieveItemToEdit() {
    const song_id = GetURLParameter('song_id');

    if (song_id > 0) {
        try {
            const response = await fetch(apiUrl + 'v1/music/songid/' + song_id);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();

            if (result.length == 0) { // no results
                // msg to user
            } else {
                //  Insert data from the database
                console.log(result);
                document.getElementById("bookTitle").value = result[0].booktitle,
                document.getElementById("musicTitle").value = result[0].songtitle,
                document.getElementById("artistName").value = result[0].artistname == "" ? "" : result[0].artistname,
                document.getElementById("bandName").value = value = result[0].bandname == "" ? "" : result[0].bandname,
                document.getElementById("composerName").value = result[0].composername == "" ? "" : result[0].composername
            }
        } catch (error) {
            console.error(error);
        }
    }
};

fetch("./footer.html ")
    .then(response => {return response.text()})
    .then(data => { document.querySelector("footer").innerHTML = data; });

async function updateItem(event) {
    event.preventDefault();

    var book = titleCase(document.getElementById("bookTitle").value);
    var music = titleCase(document.getElementById("musicTitle").value);
    var artist = titleCase(document.getElementById("artistName").value);
    var band = titleCase(document.getElementById("bandName").value);
    var composer = titleCase(document.getElementById("composerName").value);

    var dataValidated = false;

    // reset touched event
    touched = false;

    window.history.back();

    // // Clear message area
    // document.getElementById("msg").textContent=``;

    // // Check data has been entered, done at the back end but good to do it here as well
    // if (book.length > 0 && music.length > 0) {
    //     if (artist.length > 0)
    //         dataValidated = true;
    //     if (band.length > 0)
    //         dataValidated = true;
    //     if (composer.length > 0)
    //         dataValidated = true;

    //     if(dataValidated == false) {
    //         document.getElementById("msg").textContent='Error: Must provide an Artist, Band or
    //         Composer'; document.getElementById("artistName").focus();
    //     }
    // } else {
    //     document.getElementById("msg").textContent='Error: Must provide a Book Title and a Music Title'
    //     document.getElementById("bookTitle").focus();
    // }

    // if (dataValidated == true) {
    //     document.getElementById("msg").textContent='Attempting to write to the database';

    //     try {
    //         const response = await fetch(apiUrl + 'v1/music', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json; charset=UTF-8'
    //             },
    //             body: JSON.stringify({
    //                 book:book,
    //                 music:music,
    //                 artist:artist,
    //                 band:band,
    //                 composer:composer
    //             }),
    //         });

    //         if (!response.ok) {
    //         document.getElementById("msg").textContent=response;
    //             if (response.status == 300) {
    //                 document.getElementById("msg").textContent=`Insert Error: Must provide a book title
    //                 and a music title!`;
    //             } else if (response.status == 301) {
    //                 document.getElementById("msg").textContent=`Insert Error: Must provide an artist,
    //                 band or composer!`;
    //             }

    //             throw new Error(`Response status: ${response.status}`);
    //         }

    //         document.getElementById("msg").textContent=`Insert Status: ${response.statusText}`;
    //     } catch (error) {
    //         document.getElementById("msg").textContent=`Error: ${error.message}`;
    //         console.error(error);
    //     }

    //     // Clear everything except book title, assuming next song will be from the same book
    //     document.getElementById("musicTitle").value='';
    //     document.getElementById("artistName").value='';
    //     document.getElementById("bandName").value='';
    //     document.getElementById("composerName").value='';
    //     // Set focus to next music title
    //     document.getElementById("musicTitle").focus();
    // } 
}

// Set the first letter of each word to an uppper case letter
function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // Do not need to check if it is larger than splitStr length, as for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join(' '); 
}

// Call example
//var tech = GetURLParameter('technology');
//var blog = GetURLParameter('blog');
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}