# Spotify DJ Planner

Provided with a Spotify playlist ID and a `./metadata.json` file (for dedications and notes), an archive file (`.zip`) is outputted to the `./playlists` directory.

## Example Output

![Example output](https://github.com/VitruvianTech/spotify-dj-planner/blob/master/example.png)

## Instructions

`CLIENT_ID=<SPOTIFY_CLIENT_ID> CLIENT_SECRET=<SPOTIFY_CLIENT_SECRET> node index.js <SPOTIFY_PLAYLIST_ID>`

_Note: Use a `./.env` file to store Spotify env vars for app credentials._

Example `./metadata.json` (playlist IDs, with metadata keyed off/cross-referenced with metadata by each track ID):
```
{
    "dedications": {
        "3TnGTHXwmjU5TXsyheHstQ": {
            "3qLEJWPDvlgJM2eOXGBPbw": [{ "name": "Theresa", "relation": "Older sister of groom" }, { "name": "Jessica", "relation": "Younger sister of groom" }],
            "1ju7EsSGvRybSNEsRvc7qY": [{ "name": "Matt Barry", "relation": "Friend", "details": "Groomsman" }]
        }
    },
    "notes": {
        "3TnGTHXwmjU5TXsyheHstQ": {
            "6lanRgr6wXibZr8KgzXxBl": "Val and Pete wedding song",
            "1ju7EsSGvRybSNEsRvc7qY": "Do not announce dedication"
        }
    }
}
```