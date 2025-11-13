const db = require('../models');
const Books = db.books;

exports.booksList = async (req, res) =>{
    // console.log('test controller booksList');
    // res.json({
    //     message: 'test controller booksListe'
    // })

    try {
        const books = await Books.findAll();
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

exports.show = async (req, res) =>{
    // console.log('test controller show');
    // res.json({
    //     message: 'test controller show'
    // });

    try {

        const id = Number(req.params.id);
        const book = await Books.findByPk(id);
        // console.log(book);

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

exports.create = async (req, res) => {
    // console.log('test controller create');
    // res.json({
    //     message: 'test controller create'
    // });
    try {
        // console.log('bd', req.body);
        
        const {title, author, available} = req.body;

        if(!title || !author) {
            return res.status(400).json({
                success: false,
                message: "le titre et l'auteur sont obligatoire",
                data: null
            })
        };

        const newBook = await Books.create({
            title: title,
            author: author,
            available: available ?? true
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

exports.update = async (req, res) => {
    // console.log('test controller update');
    // res.json({
    //     message: 'test controller update'
    // });
    
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

exports.test = (req, res) =>{
    console.log('route test de mon controller books');
    res.send('route test de mon controller books');
}