import multer from "multer";
import path from "path";


const storageConfig = multer.diskStorage({    
    destination: (req, file, next)=> {
        next(null, "uploads/");
    },
    filename: (req, file, next)=> {
        next(null, `${Date.now()} -${path.extname(file.originalname)}`);
    },
});

const uploader = multer({ storage: storageConfig });

export default uploader;