var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

var mongo = require('mongoose');
const { Schema } = mongo;
mongo.connect('mongodb+srv://omer:Edelstein0497@cluster0.76qs4.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


// app.use(express.static(__dirname + '../public/index.html'));
app.use(express.json());

var LinkSchema = new Schema({
    origURL: String
});
var Link = mongo.model('Link', LinkSchema);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/', (req, res) => {
    console.log("In post");
    let origLink = req.body.origLink;
    var URLinstance = new Link({origURL: origLink});
    URLinstance.save().then(data => res.json("URL " + origLink + " Added! Shortened link is now localhost:3000/app/" + data.id)).catch(err => res.json("Error:" + err));
})

app.get('/app/:id', async (req, res) => {
    let searchedLink = await Link.findById(req.params.id);
    res.json({searchedLink});
})

app.listen(port);