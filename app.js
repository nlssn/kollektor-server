/* Import required packages */
const express = require('express');
const bodyParser = require('body-parser');
const moongoose = require('mongoose');
const cors = require('cors');

const multer = require('multer');
const fileFilter = (req, file, cb) => {
   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
   } else {
      cb(null, false);
   }
};
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './public/images');
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname)
   }
});
const upload = multer({storage: storage, fileFilter: fileFilter});

/* Connect to database */
moongoose.connect('mongodb+srv://tempUser:1234@cluster0.jntci.mongodb.net/records_db?retryWrites=true&w=majority', {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
   useFindAndModify: false
}, () => {
   console.log("Ansluten till databas")
});

/* Import schemas */
const Records = require('./app/models/records.js');

/* Create new express instance */
const app = express();

/* Set headers */
app.use(cors());

/* Body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false }));

/* Make images folder public/static */
app.use('/public/images', express.static('public/images'));

/* Define REST routes */
/* -- Get all Records */
app.get('/api/records', (req, res) => {
   Records.find((err, records) => {
      if(err) {
         res.send(err);
      } else {
         res.json(records);
      }
   });
});

/* -- Get single post */
app.get('/api/records/:id', (req, res) => {
   let id = req.params.id;

   Records.findOne({
      _id: id
   }, (err, record) => {
      if(err) {
         res.send(err);
      } else {
         res.send(record)
      }
      
   });
});

/* -- Create a post */
// Upload.single() is middleware available trough multer
// It allows ONE file to be uploaded and parsed
// It runs before my own function.
app.post('/api/records', upload.single('image'), (req, res) => {
   let record = new Records();

   record.artist = req.body.artist;
   record.title = req.body.title;
   record.year = req.body.year;
   record.owned = req.body.owned;
   record.score = req.body.score;

   if(req.file != undefined) {
      record.image = 'public/images/' + req.file.filename;
   } else {
      record.image = 'public/images/no-image.jpg';
   }

   record.save((err, record) => {
      if(err) {
         res.send(err);
      } else {
         res.send(record);
      }
   });
});

/* -- Remove a post */
app.delete('/api/records/:id', (req, res) => {
   let id = req.params.id;
   
   Records.deleteOne({
      _id: id
   }, (err) => {
      if(err) {
         res.send(err);
      } else {
         res.send({ "message": "Raderade skiva med ID " + id });
      }
   });
});

/* -- Update a post */
app.put('/api/records/:id', upload.single('image'), (req, res) => {
   let id = req.params.id;
   let info = {
      artist: req.body.artist,
      title: req.body.title,
      year: req.body.year,
      owned: req.body.owned,
      score: req.body.score,
   }

   if(req.file != undefined) {
      info['image'] = 'public/images/' + req.file.filename
   }

   // new:true makes sure that we return the updated version of the record
   Records.findByIdAndUpdate(id, info, { new: true }, (err, record) => {
      if(err) {
         res.send(err)
      } else {
         res.send(record)
      }
   });
});

/* Start the server on the specified port */
const port = 5000;
app.listen(port, () => {
   console.log(`Server är startad på port ${port}`);
});