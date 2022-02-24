| :exclamation:  Project is in pre-alpha stage. Seeking collaborators   |
|-----------------------------------------------------------------------|

# Clanboy

Clanboy is a clan management website initially designed for Hell Let Loose, can be adapted to any clan.

## Roadmap:
- Allow players to invite others to their squad 
- Allow players to rate squad leader / commander after end of match
- Tracking of player's attendance record
### Long-term plans
- Integration with bots/rcon for hell let loose server control
- Mini Stratsketch for strategic plans.

## Setup
after you clone the repo cd to the root directory and run:
```
npm ci
```
in a command prompt, followed by
```
npm run serve
```
This allows you to quickly see your changes in a dev environment.

### Compile and minify project for deployment
```
npm run build
```
*backend/* directory contains the express.js backend server that talks to a MongoDB. That server needs to be first of all configured with a mongodb connection string that you will place in an .env file alongside index.js. You can then run the back-end server with:
```
node server.js
```

Feel free to open an issue if you have any questions/issues and/or are interested in helping with development.
