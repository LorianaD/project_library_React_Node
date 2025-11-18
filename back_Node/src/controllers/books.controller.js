const multer = require('multer');
const db = require('../models');
const Books = db.Books;
const Type = db.Type;
const {storage} = require('../middlewares/UploadFile');

///////////////////////////////////////////////////////////////////////////////
//////////////////////////// LISTE DES LIVRES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

exports.booksList = async (req, res) =>{

    try {
        const books = await Books.findAll({
            order: [["title", "ASC"]], 
            include: [{ model: Type, as: 'type', 
            attributes: ['id', 'name'] }]
        });

        res.status(200).json({
            success: true,
            message: 'liste des livres',
            data: books
        })
    } catch(error) {
        console.error('erreur sur la getBooks', error);
        res.status(500).json({
            success: false,
            message: "erreur sur la getBooks",
            data: null
        })
    }
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////// SHOW D'UN LIVRE //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

exports.show = async (req, res) =>{

    try {

        const id = Number(req.params.id);

        const typeId = {include: [{
            model: Type,
            as: 'type',
            attributes: ['id', 'name']
        }]};

        const book = await Books.findByPk(id, typeId);

        if (!book) {
            res.status(404).json({
                success: false,
                message: 'livre non trouvé',
                data: null
            })
        }

        res.status(200).json({
            success: true,
            message: 'livre trouvé',
            data: book
        })
        
    } catch(error) {
        console.error('erreur sur la get book by id', error);
        res.status(500).json({
            success: false,
            message:'erreur sur la get book by id',
            data: null
        })
    }

}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////// CREER UN NOVEAU LIVRE ////////////////////////////
///////////////////////////////////////////////////////////////////////////////

exports.create = async (req, res) => {

    try {

        // on récupère les données saisie dans le body
        const {title, author, available, type_id} = req.body;

        // on vérifie que le titre et l'auteur sont bien saisie
        if(!title || !author) {
            return res.status(400).json({
                success: false,
                message: "le titre et l'auteur sont obligatoire",
                data: null
            })
        };

        // const type = await Type.findByPk(type_id);

        // if (!type) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "type inexistant",
        //         data: null,
        //     });        
        // }

        // if (!req.file) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Aucun fichier reçu',
        //         data:null
        //     });
        // }

        const isAvalable = available === 'boolean' ? available : true;

        const newBook = await Books.create({
            title: title.trim(),
            author: author.trim(),
            available: isAvalable,
            // image: req.file.filename,
            // type_id
        });

        res.status(200).json({
            success: true,
            message: 'livre créé',
            data: newBook
        })

    } catch (error) {

        console.error('erreur sur la create', error);
        res.status(500).json({
            success: false,
            message:'erreur sur la create',
            data: null
        })

    }
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////// MODIFIER UN NOVEAU LIVRE /////////////////////////
///////////////////////////////////////////////////////////////////////////////

exports.update = async (req, res) => {
    
    try {
        const id = Number(req.params.id);
        const {title, author} = req.body;
        const book = await Books.findByPk(id);
        if(!book){
            res.status(404).json({
                success: false,
                message: 'produit non trouvé',
                data: null
            })            
        }

        book.title = title;
        book.author = author;

        await book.save();

        res.status(200).json({
            success: true,
            message: "produit modifié",
            data: book
        })        
    } catch (error) {
        console.error('erreur sur updateProduct', error);
        res.status(500).json({
            success: false,
            message:"erreur sur la modification du produit",
            data: null
        })      
    }
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////// SUPPRIMER UN NOVEAU LIVRE ////////////////////////
///////////////////////////////////////////////////////////////////////////////

exports.delete = async (req, res) =>{
    try {
        const id = Number(req.params.id);

        // recherche du produit en db
        const book = await Books.findByPk(id);
        
        if(!book){
            res.status(404).json({
                success: false,
                message: 'produit non trouvé',
                data: null
            })            
        }

        await book.destroy();

        res.status(204).json({
            success: true,
            message: 'le produit a été suprimé avec succes',
            data: null
        })

    } catch (error) {
        console.error('erreur sur delete', error);
        res.status(500).json({
            success: false,
            message:"erreur sur la suppresion du produit",
            data: null
        })        
    }
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////////////// AJOUTER UNE IMAGE ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

exports.uploadCover = async (req, res) => {
    try {

        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                success : false,
                message: "id incorect",
                data: null
            })
        }

        const book = await Books.findByPk(id);
        
        if (!book) {
            return res.status(400).json({
                success : false,
                message: "livre introuvable",
                data: null
            })            
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "aucun fichier envoyé",
                data: null
            })
        }

        // generer l'url de l'image
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        
        // ajouter la logique pour envoyer l'information en dbb (le fichier )
        // const cover = req.body;
        book.cover = imageUrl;
        await book.save();      

        return res.status(200).json({
            success: true,
            message: "upload cover ok",
            data: {
                bookId: book.id,
                filename: req.file.filename,
                url: imageUrl
            }
        })

    } catch (error) {
        console.error('erreur sur delete', error);
        res.status(500).json({
            success: false,
            message:"erreur sur la suppresion du produit",
            data: null
        }) 
    }
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////// TEST DU CONTROLLER ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////

exports.test = (req, res) =>{
    console.log('route test de mon controller books');
    res.send('route test de mon controller books');
}
