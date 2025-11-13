const app = require('./app');

require('dotenv').config();

const PORT = process.env.PORT;

if(!PORT) {
    console.log("PORT absent veuillez complter le fichier .env");

    process.exit(1);
    
}

app.listen(PORT, ()=>{
    console.log(`server lancé sur ${PORT}`);
})