const express = require('express');
//const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const foodAPI = require('./src/api/foodAPI');
const categoryAPI = require('./src/api/categoryAPI');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8087;
//const MONGODB_URI = process.env.MONGODB_URI;

/*mongoose.connect(MONGODB_URI, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}, (error) => {
    if(error){
    console.log('Database error', error.message);
}
}); */

//mongoose.connection.once('open', () => {
   // console.log('Database synced');
//});

app.route('/').get((req, res) => {
    res.send('Product Management');
});

app.use('/food', foodAPI());

app.use('/category', categoryAPI());

app.listen(PORT, ()=>{
    console.log(`Server up and running on PORT ${PORT}`);
});
