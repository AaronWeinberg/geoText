import { authenticate } from '@google-cloud/local-auth';
import * as fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import { Auth, google } from 'googleapis';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import process from 'process';

// If modifying these scopes, delete token.json. The file token.json stores the user's access and refresh tokens, and is created automatically when the flow completes for the first time.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const coreRoot = path.resolve(__dirname, '../');
const files = fs.readdirSync(coreRoot);
const secretFile = files.find(
  file => file.startsWith('client_secret') && file.endsWith('.json')
);
if (!secretFile) {
  throw new Error('No Secret File');
}
const TOKEN_PATH = path.resolve(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.resolve(process.cwd(), secretFile);

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {OAuth2Client|null}
 */
const loadSavedCredentialsIfExist = () => {
  try {
    const content = fs.readFileSync(TOKEN_PATH);
    const credentials = JSON.parse(content.toString());
    return google.auth.fromJSON(credentials) as Auth.OAuth2Client;
  } catch (error) {
    return null;
  }
};

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {void|null}
 */
const saveCredentials = (client: OAuth2Client) => {
  try {
    const content = fs.readFileSync(CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    fs.writeFileSync(TOKEN_PATH, payload);
    return;
  } catch (error) {
    return null;
  }
};

/**
 * Load or request or authorization to call APIs.
 *
 * @return {client}
 */
const authorize = async () => {
  let client = loadSavedCredentialsIfExist();

  if (client) return client;

  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) saveCredentials(client);

  return client;
};

export const auth = await authorize();
