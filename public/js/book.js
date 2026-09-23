// Define the API URL
const apiUrl = 'http://localhost:3010/api/';
const xhttpr = new XMLHttpRequest();

async function books(event) {

    event.preventDefault();

    try {
        const response = await fetch(apiUrl + 'v1/book');
        
        // XMLHttpRequst
        xhttpr.withCredentials = true;

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        //console.log(result);
        if (result.length == 0) {   // no results
            document.getElementById("no-matches").innerHTML = "No music found for title: " + music;
            document.getElementById("tablebody").innerHTML = "";
        } else {

            //  Insert data from the database in to our table
            let tabledata = "";
            let counter = 1;
            result.map((values) => {
              tabledata += `
                <tr>
                    <td><a href="book-contents.html?booktitle=${values.booktitle}"><img src="images/music.png" width:25px; /></a>${values.booktitle}</td>
                </tr>`

              counter++;
            });

            //                 <td><a
            //                 href="edit.html?book_id=${values.book_id}&song_id=${values.song_id}&artist_id=${values.artist_id}&band_id=${values.band_id}"><img
            //                 src="images/music.png" width:25px;/></a>${values.booktitle}

            document.getElementById("no-matches").innerHTML = "";
            document.getElementById("tablebody").innerHTML = tabledata;
        }
    } catch (error) {
        console.error(error);
    }
}

async function contents(event) {
  const params = new URLSearchParams(window.location.search);
  const booktitle = params.get('booktitle');

  //console.log(params.get('booktitle'));
 

  event.preventDefault();

  try {
    const response = await fetch(apiUrl + 'v1/book/title/' + booktitle);

    // XMLHttpRequst
    xhttpr.withCredentials = true;

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    // console.log(result);
    if (result.length == 0) { // no results
      document.getElementById("no-matches").innerHTML = "No music found for book: " + booktitle;
      document.getElementById("tablebody").innerHTML = "";
    } else {

      //  Insert data from the database in to our table
      let tabledata = "";
      result.map((values) => {tabledata += `
                <tr>
                    <td><img src="images/music.png" width:25px; />&nbsp;${values.songtitle}</td>
                    <td>${values.artistname == undefined ? "" : values.artistname}</td>
                    <td>${values.bandname == undefined ? "" : values.bandname}</td>
                    <td>${values.composername == undefined ? "" : values.composername}</td>
                </tr>`});

      document.getElementById("no-matches").innerHTML = "";
      document.getElementById("tablebody").innerHTML = tabledata;
      document.getElementById("book-title").innerHTML = booktitle;
    }
  } catch (error) {
    console.error(error);
  }
}