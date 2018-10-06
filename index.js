require('dotenv').config()

const fs = require('fs');
const csv = require('csv-export').export;
const Spotify = require('spotify-web-api-node');
const metadata = require('./metadata.json');
const playlist = process.argv[2];

const spotify = new Spotify({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

let length = 0;

spotify.clientCredentialsGrant().then(data => {
    spotify.setAccessToken(data.body.access_token);
    return spotify.getPlaylist(playlist).then(data => {
        const tracks = data.body.tracks.items.map(item => {
            const { id, uri, name, artists, album, duration_ms } = item.track;
            length += duration_ms;
            return {
                'Name': `"${name}"`,
                'Dedications': (metadata.dedications[playlist][id] || []).map(dedication => dedication.name).join('; '),
                'Dedication Details': `"${(metadata.dedications[playlist][id] || []).map(dedication => `${dedication.relation}${dedication.details ? ` - ${dedication.details}` : '' }`).join('; ')}"`,
                'Notes': `"${metadata.notes[playlist][id] || ''}"`,
                'Length': `${(duration_ms/60000).toFixed(2)}m`,
                'Artists': `"${artists.map(artist => artist.name).join('; ')}"`,
                'Album': `"${album.name}"`,
                'URI': uri
            }
        });

        // Add last record for aggregate playlist length (minutes)
        tracks.push({
            'Name': '',
            'Dedications': '',
            'Dedication Details': '',
            'Notes': '',
            'Length': `${(length/60000).toFixed(2)}m`,
            'Artists': '',
            'Album': '',
            'URI': ''
        });

        try {
            !fs.existsSync('./playlists') && fs.mkdirSync('./playlists');
            return csv(tracks, buffer => fs.writeFileSync(`./playlists/${data.body.owner.display_name} - ${data.body.name}.zip`, buffer));
        } catch (err) {
            console.error(err);
        }
    }, err => console.log('Something went wrong!', err));
}, err => console.log('Something went wrong when retrieving an access token', err));