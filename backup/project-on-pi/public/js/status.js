// Define the API URL
const apiUrl = 'http://localhost:3010/api/';

const xhttpr = new XMLHttpRequest();

async function status(event) {
    event.preventDefault();

    try {
        const response = await fetch(apiUrl + 'v1/status');
        
        // XMLHttpRequst
        xhttpr.withCredentials = true;

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        console.log(result);

        //  Insert data from the database in to our table
        let tabledata = "";
        result.map((values)=>{
            tabledata += `
            <tr>
                <th><img src="images/music.png" /></th>
                <th scope="row">Books</th>
                <td>${values.books}</td>
            </tr>
                <th><img src="images/music.png" /></th>
                <th scope="row">Music</th>
                <td>${values.songs}</td>
            </tr>
                <th><img src="images/music.png" /></th>
                <th scope="row">Artists</th>
                <td>${values.artists}</td>
            </tr>
            <tr>
                <th><img src="images/music.png" /></th>
                <th scope="row">Bands</th>
                <td>${values.bands}</td>
            </tr>`
        });
        document.getElementById("tablebody").innerHTML=tabledata;

        let dbsize = "";
        result.map((values)=>{
            dbsize += `Database Size: ${values.dbsize} Mbytes`;
        });
        document.getElementById("dbsize").innerHTML=dbsize;

        let lastbackup = "";
        result.map((values)=>{
            lastbackup += `Database Was Last Backed Up On: ${values.backup}`;
        });

        document.getElementById("lastbackup").innerHTML=lastbackup;
    } catch (error) {
        console.error(error);
    }
}