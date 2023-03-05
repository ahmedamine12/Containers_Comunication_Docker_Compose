const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');

const url = process.env.DB_URL || 'mongodb://localhost:27017/mydatabase';

MongoClient.connect(url)
    .then((client) => {
        console.log('Connected successfully to server');
        const db = client.db('mydatabase');
        const collection = db.collection('mycollection');


        const insertFormData = (formData) => {
            console.log('Form data:', formData);
            collection.insertOne(formData, (err, result) => {
                if (err) {
                    console.log('Error inserting form data:', err);
                } else {
                    console.log('Form data inserted:', result);
                }
            });
        };


        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));

        app.post('/submit', (req, res) => {
            console.log('Form submitted');

            const formData = req.body;
            console.log('Form data received:', formData);
            insertFormData(formData);
            res.send('Form submitted successfully!');
        });

        app.listen(3001, () => {
            console.log('Server started on port 3001');
        });



    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });
