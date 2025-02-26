const express = require('express');
const urlRoute = require('./routes/url');
const staticRoutes = require("./routes/staticRoute.js");
const coookeParser = require('cookie-parser');
const { redirectToLoggedInUserOnly, checkAuth } = require('./middleware/auth.js');
const { connectMongoDB } = require('./connection');
const cors = require('cors'); 
const URL = require('./model/url.js');  // Correct model import
const path = require('path');
const userRoute = require('./routes/user.js')
const app = express();
const port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(coookeParser());
app.use(express.static('public'));
connectMongoDB('mongodb://localhost:27017/URLShortner02')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB not connected to the server:', err));

app.set('view engine', "ejs");
app.set('views', path.resolve('./views'));

app.get('/analytics/:shortId', async (req, res) => {
    const shortid = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId: shortid },  
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true }  // Ensures you get the updated document
        );
        if (entry) {
            return res.redirect(entry.redirectURL);
        } else {
            return res.status(404).send('Short URL not found');
        }
    } catch (error) {
        return res.status(500).send('Error updating visit history');
    }
});

app.use('/url', redirectToLoggedInUserOnly, urlRoute); //URL Route
app.use("/user", userRoute); // USER Route
app.use('/', checkAuth, staticRoutes); // Move this last

app.listen(port, () => console.log(`Server started at port: ${port}`));