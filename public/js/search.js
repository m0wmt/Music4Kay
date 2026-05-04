// Define the API URL
const apiUrl = 'http://localhost:3010/api/';
const xhttpr = new XMLHttpRequest();

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById('songTitle');
    const button = document.getElementById('searchButton');

    // Detect when user presses Enter
    textarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            button.click();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById('artistName');
    const button = document.getElementById('searchButton');

    // Detect when user presses Enter
    textarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            button.click();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById('bandName');
    const button = document.getElementById('searchButton');

    // Detect when user presses Enter
    textarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            button.click();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById('composerName');
    const button = document.getElementById('searchButton');

    // Detect when user presses Enter
    textarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            button.click();
        }
    });
});

async function search(event) {
    var book = document.getElementById("bookTitle").value;
    var music = document.getElementById("songTitle").value;
    var artist = document.getElementById("artistName").value;
    var band = document.getElementById("bandName").value;
    var composer = document.getElementById("composerName").value;

    event.preventDefault();

    if (book.length > 0) {
        try {
            const response = await fetch(apiUrl + 'v1/book/title/' + book);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            //printSearchResults(result, "book", book);

            if (result.length == 0) { // no results
                document.getElementById("no-matches").innerHTML = "No books found for title: " + book;
                document.getElementById("tablebody").innerHTML = "";
                document.getElementById("resultLen").innerHTML = "Music Search Results";
            } else {
              //  Insert data from the database
              let tabledata = "";
              result.map(
                  (values) => {tabledata += `<tr>
                <td><a href="edit.html?book_id=${values.book_id}&song_id=${values.song_id}&artist_id=${values.artist_id}&band_id=${values.band_id}"><img src="images/music.png" width:25px;/></a>${values.booktitle}
                    <td>${values.songtitle}</td>
                    <td>${values.artistname == undefined ? "" : values.artistname}</td>
                    <td>${values.bandname == undefined ? "" : values.bandname}</td>
                    <td>${values.composername == undefined ? "" : values.composername}</td>
                    </tr>`});
              //                    <td><a href="edit.html?id=${values.song_id}"><img src="images/music.png" width:
              //                    25px;/></a>${values.booktitle}</td>
            //   <td>${values.booktitle} </td>

              document.getElementById("tablebody").innerHTML = tabledata;
              document.getElementById("no-matches").innerHTML = "";
              document.getElementById("resultLen").innerHTML = "Music Search Results (" + result.length + ")";
            }
        } catch (error) {
            console.error(error);
        }
    } else if (music.length > 0) {
        try {
            const response = await fetch(apiUrl + 'v1/music/song/' + music);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            //console.log(result.length);
            printSearchResults(result, "title", music);
            // if (result.length == 0) { // no results
            //   document.getElementById("no-matches").innerHTML = "No music found for title: " + music;
            //   document.getElementById("tablebody").innerHTML = "";
            //   document.getElementById("resultLen").innerHTML = "Music Search Results";
            // } else {
            //   //  Insert data from the database in to our table
            //   let tabledata = "";
            //   result.map((values) => {tabledata += `<tr>
            //         <td>${values.booktitle}</td>
            //         <td>${values.songtitle}</td>
            //         <td>${values.artistname == undefined ? "" : values.artistname}</td>
            //         <td>${values.bandname == undefined ? "" : values.bandname}</td>
            //         <td>${values.composername == undefined ? "" : values.composername}</td>
            //         </tr>`});

            //   document.getElementById("tablebody").innerHTML = tabledata;
            //   document.getElementById("no-matches").innerHTML = "";
            //   document.getElementById("resultLen").innerHTML = "Music Search Results (" + result.length + ")";
            // }
        } catch (error) {
            console.error(error);
        }
    } else if (artist.length > 0) {
        try {
            const response = await fetch(apiUrl + 'v1/music/artist/' + artist);
            
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            printSearchResults(result, "artist", artist);
            // if (result.length == 0) { // no results
            //   document.getElementById("no-matches").innerHTML = "No music found for artist: " + artist;
            //   document.getElementById("tablebody").innerHTML = "";
            //   document.getElementById("resultLen").innerHTML = "Music Search Results";
            // } else {
            //   //  Insert data from the database in to our table
            //   let tabledata = "";
            //   result.map((values) => {tabledata += `<tr>
            //         <td>${values.booktitle}</td>
            //         <td>${values.songtitle}</td>
            //         <td>${values.artistname == undefined ? "" : values.artistname}</td>
            //         <td>${values.bandname == undefined ? "" : values.bandname}</td>
            //         <td>${values.composername == undefined ? "" : values.composername}</td>
            //         </tr>`});

            //   document.getElementById("tablebody").innerHTML = tabledata;
            //   document.getElementById("no-matches").innerHTML = "";
            //   document.getElementById("resultLen").innerHTML = "Music Search Results (" + result.length + ")";
            // }
        } catch (error) {
            console.error(error);
        }
    } else if (band.length > 0) {
        try {
            const response = await fetch(apiUrl + 'v1/music/band/' + band);
             
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            printSearchResults(result, "band", band);
            // if (result.length == 0) { // no results
            //   document.getElementById("no-matches").innerHTML = "No music found for band: " + band;
            //   document.getElementById("tablebody").innerHTML = "";
            //   document.getElementById("resultLen").innerHTML = "Music Search Results";
            // } else {
            //   //  Insert data from the database in to our table
            //   let tabledata = "";
            //   result.map((values) => {tabledata += `<tr>
            //         <td>${values.booktitle}</td>
            //         <td>${values.songtitle}</td>
            //         <td>${values.artistname == undefined ? "" : values.artistname}</td>
            //         <td>${values.bandname == undefined ? "" : values.bandname}</td>
            //         <td>${values.composername == undefined ? "" : values.composername}</td>
            //         </tr>`});

            //   document.getElementById("tablebody").innerHTML = tabledata;
            //   document.getElementById("no-matches").innerHTML = "";
            //   document.getElementById("resultLen").innerHTML = "Music Search Results (" + result.length + ")";
            // }
        } catch (error) {
            console.error(error);
        }
    } else if (composer.length > 0) {
        try {
            const response = await fetch(apiUrl + 'v1/music/composer/' + composer);
            
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            printSearchResults(result, "composer", composer);

            // if (result.length == 0) {   // no results
            //     document.getElementById("no-matches").innerHTML = "No music found for composer: " + composer;
            //     document.getElementById("tablebody").innerHTML = "";
            //     document.getElementById("resultLen").innerHTML = "Music Search Results";
            // } else {
            //   //  Insert data from the database in to our table
            //   let tabledata = "";
            //   result.map((values) => {tabledata += `<tr>
            //         <td>${values.booktitle}</td>
            //         <td>${values.songtitle}</td>
            //         <td>${values.artistname == undefined ? "" : values.artistname}</td>
            //         <td>${values.bandname == undefined ? "" : values.bandname}</td>
            //         <td>${values.composername == undefined ? "" : values.composername}</td>
            //         </tr>`});

            //   document.getElementById("tablebody").innerHTML = tabledata;
            //   document.getElementById("no-matches").innerHTML = "";
            //   document.getElementById("resultLen").innerHTML = "Music Search Results (" + result.length + ")";
            // }
        } catch (error) {
            console.error(error);
        }
    } else {
        document.getElementById("tablebody").innerHTML = "";
        document.getElementById("no-matches").innerHTML = "";
        document.getElementById("resultLen").innerHTML = "Music Search Results";
    }
}

fetch("./footer.html")
    .then(response => {
        return response.text()
    })
    .then(data => { 
        document.querySelector("footer").innerHTML = data; 
    });

// Reset form
function resetForm() {
    // Just reloads the page for now, if we need something different do that here!
    
    // document.getElementById("musicTitle").value='';
    // document.getElementById("artistName").value='';
    // document.getElementById("bandName").value='';
    // document.getElementById("composerName").value='';
}

// Update the web page with the search results
function printSearchResults(result, searchFor, searchString) {
    if (result.length == 0) { // no results
        document.getElementById("no-matches").innerHTML = "No music found for " + searchFor + ": " + searchString;
        document.getElementById("tablebody").innerHTML = "";
        document.getElementById("resultLen").innerHTML = "Music Search Results";
    } else {
        //  Insert data from the database in to our table
        let tabledata = "";
        result.map((values) => {tabledata += `<tr>
                        <td>${values.booktitle}</td>
                        <td>${values.songtitle}</td>
                        <td>${values.artistname == undefined ? "" : values.artistname}</td>
                        <td>${values.bandname == undefined ? "" : values.bandname}</td>
                        <td>${values.composername == undefined ? "" : values.composername}</td>
                        </tr>`});

        document.getElementById("tablebody").innerHTML = tabledata;
        document.getElementById("no-matches").innerHTML = "";
        document.getElementById("resultLen").innerHTML = "Music Search Results (" + result.length + ")";
    }
}

function getBooks() {
    console.log("getBooks");

    xhttpr.open('GET', apiUrl+'books', true);

    xhttpr.send();

    xhttpr.onload = ()=> {
        if (xhttpr.status === 200) {
            const response = JSON.parse(xhttpr.response);
            // Process the response data here
            console.error('Success getting books');
        } else {
            // Handle error
            console.error('Error:');
        }
    };
}

function getSongs() {
    console.log("getSongs");

    xhttpr.open('GET', apiUrl+'songs', true);

    xhttpr.send();

    xhttpr.onload = ()=> {
        if (xhttpr.status === 200) {
            const response = JSON.parse(xhttpr.response);
            // Process the response data here
            console.log('Success getting songs');
        } else {
            // Handle error
            console.error('Error:');
        }
    };
}
