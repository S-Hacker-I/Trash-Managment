const mongoose = require('mongoose');
require('dotenv').config();
const Trash = require ('./models/Trash');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const mocktrashdata = [
    {
        trash_id:"TRASH001",
        level:75,
        latitude:2.0469,
        longitude:45.3182
    },
    {
        trash_id:"TRASH002",
        level:40,
        latitude:2.0502,
        longitude:45.3221,
    },
    {
        trash_id:"TRASH003",
        level:90,
        latitude:2.0420,
        longitude:45.3050,
    },
    {
        trash_id:"TRASH004",
        level:20,
        latitude:2.0580,
        longitude:45.3305,
    },
    {
        trash_id:"TRASH005",
        level:65,
        latitude:2.0488,
        longitude:45.3129,
    }
];

async function insertmocktrashdata() {
    try {
        await Trash.insertMany(mocktrashdata);
        console.log('success') 
    } catch (err) {
        console.log('failed');
    }
    
}
insertmocktrashdata();