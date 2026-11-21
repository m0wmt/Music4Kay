# Music4Kay

This project was created to store the title/band/artist/composer of all the sheet music that Kay owns so that she can find it quickly instead of having to look at every book to find it.

This is a simple node application using an MySQL database to store the data which runs on a Raspberry Pi.

The code was written using VSCode as the IDE.

The node application is run via systemctl (/lib/systemd/service/music4kay.service) so that it restarts on a restart of the Pi.