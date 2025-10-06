const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://gigaAdmin:2qzdMuaROdibHlSX@Module-6-Tutorial.u8mybx9.mongodb.net/?retryWrites=true&w=majority&appName=Module-6-Tutorial", {
    useNewUrlParser: true,
})

module.exports = mongoose;