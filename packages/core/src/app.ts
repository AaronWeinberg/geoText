// TODO: open google doc
import * as fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import { Auth, google } from 'googleapis';
import * as readline from 'readline';

const SCOPES = ['https://www.googleapis.com/auth/documents'];
const TOKEN_PATH = '../../token.json';

// Load client secrets from a local file.
fs.readFile('../../oauth2.keys.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  const credentials = JSON.parse(content.toString());
  const { client_secret, client_id, redirect_uris } = credentials.installed;

  // Authorize a client with credentials, then call the Google Docs API.
  const oauth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oauth2Client);
    oauth2Client.setCredentials(JSON.parse(token.toString()));
    listFiles(oauth2Client);
  });
});

function getNewToken(oauth2Client: OAuth2Client) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oauth2Client.setCredentials(token!);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      listFiles(oauth2Client);
    });
  });
}

async function listFiles(auth: Auth.OAuth2Client) {
  const docs = google.docs({ version: 'v1', auth });
  const res = await docs.documents.get({
    documentId: '1XPbMENiP5bWP_cbqc0bEWbq78vmUf-rWQ6aB6FVZJyc',
  });
  console.log(res.data);
}


// TODO: parse doc into url list
// TODO: crawl urls from list
// TODO: save text from urls into new doc
// TODO: overwrite doc with same name in destination directory
// TODO: if successful, remove url from google doc