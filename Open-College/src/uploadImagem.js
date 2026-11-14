const multer = require("multer");
const path = require("path");
const {randomUUID} = require("crypto");

const storage = multer.diskStorage({

    destination: function  (req, file, cb) {
        const caminho = path.resolve(
            __dirname,
            "../uploads/usuarios"
        );
        
        
        cb(null, caminho);
    },


filename: function(req,file,cb){
    const tipoArquivo = path.extname(file.originalname);
    const nomeArquivo = randomUUID() + tipoArquivo;

    cb(null, nomeArquivo);
}

});

const fileFilter = (req,file,cb) =>{

    const tiposPermitidos = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if(tiposPermitidos.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error("Formato de imagem nao permitido"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits:{
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;