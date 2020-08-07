const express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      cookieParser = require('cookie-parser'),
      cors = require('cors'),
      config = require("./config/key");



mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(cors())

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
  }

const PORT = process.env.PORT || 5000

app.listen(PORT, function(){
    console.log(`Server is runnig on port ${PORT}`);
});