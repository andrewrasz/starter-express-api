const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Middleware to enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/getTweet', async (req, res) => {
    const username = req.query.username;
    const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAAnjfQEAAAAAxz09uNFwhX%2BPiAPGMg0syQJkNEY%3DbD52dZiV0I5ZnT5mmgEGzWi0kGmvOpWViVwYxk6G4zcV5vMvsO'; // Replace with your actual Twitter Bearer Token

    try {
        const response = await fetch(`https://api.twitter.com/2/tweets?tweet.fields=text&user.fields=description&expansions=author_id&usernames=${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + (process.env.PORT || 3000));
});
