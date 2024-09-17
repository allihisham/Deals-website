const express = require('express');
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const cors = require('cors');
const fs = require('fs');
const cache = require('memory-cache');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const fetchDataWithRetry = async (sheets, spreadsheetId, range, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
            return response.data.values;
        } catch (error) {
            if (error.code === 429 && i < retries - 1) {
                console.warn(`Quota exceeded, retrying in ${delay} ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
            } else {
                throw error;
            }
        }
    }
};

app.get('/api/data', async (req, res) => {
    try {
        const keyFile = 'C:/Users/ali/Downloads/upbeat-fountain-434315-s0-92e34956f80b.json';
        const key = JSON.parse(fs.readFileSync(keyFile, 'utf8'));

        const auth = new JWT({
            email: key.client_email,
            key: key.private_key,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Check cache first
        const cachedData = cache.get('allData');
        if (cachedData) {
            return res.json(cachedData);
        }

        // Get the list of all sheet names
        const spreadsheet = await sheets.spreadsheets.get({
            spreadsheetId: '1Alo0VxibhtVwNsT7Wp2q3tHQExXzLbdojicxoiCMFPQ',
        });

        const sheetNames = spreadsheet.data.sheets.map(sheet => sheet.properties.title);

        // Fetch data from each sheet with retry logic
        const allData = await Promise.all(sheetNames.map(async sheetName => {
            const range = `${sheetName}!A1:Z`;
            const data = await fetchDataWithRetry(sheets, '1Alo0VxibhtVwNsT7Wp2q3tHQExXzLbdojicxoiCMFPQ', range);
            return { sheetName, data };
        }));

        // Store data in cache
        cache.put('allData', allData, 3600000); // Cache for 1 hour

        res.json(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
