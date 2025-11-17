const multer = require('multer');
const path = require('path');

// faire la logique pour definr ou et comment va etre stocker l'image
const storage = multer.diskStorage({
    //le dossier de destination => uploads
    destination: (req, file, cb) => {
        //definir le dossier destination
        cb(null, 'uploads/');
    },

    // du nom du fichier
    filename: (req, file, cb) => {
        //get l'extension du fichier
        const ext = path.extname(file.originalname);
        //genere un nom unique pour les image, ajoute l'extension
        const filename = `book-${req.params.id}-${Date.now()}${ext}`;

        cb(null, filename);
    }
});

//le format/type du fichier
function fileFilter(req, file, cb) {
    //verifie le mimeType (type de fichier de l'image), si c'est une image laisse passer sinon traite l'erreur dans le else et ne laisse pas passer
    if(file.mimetype.startsWith('image/')) {
        cb(null, true);
    }else{
        cb(new Error('format image uniquement !'), false);
    }
}

//la taille du fichier ! ici limite la taille a 2 MO
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024,
    }
});

module.exports = upload;