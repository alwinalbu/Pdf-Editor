const express = require('express');
const db = require('./config/db'); 
const cors= require('cors');
const cookieParser= require('cookie-parser');
const userRoutes = require('./routes/userRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [process.env.CLIENT_URL];
const clientUrl = process.env.CLIENT_URL;

console.log(`Client URL: ${clientUrl}`);

const corsOptions = {
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));

app.use('/', userRoutes); 


db().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
