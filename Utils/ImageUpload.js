const catchAsync = require("../Utils/catchAsync.js");
const AppError = require("../Utils/AppError");
const multer = require("multer");

//Image Upload
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/api/image");
//   },
//   filename: (req, file, cb) => {
  
//       const ext = file.mimetype.split("/")[1];
//     cb(null, `img-${Date.now()}.${ext}`); 
//     }
//   },
// );

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits:{fileSize:2*1024*1024}
// });

// //audio upload
// const multerDocStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/api/doc");
//   },
//   filename: (req, file, cb) => {
//       const ext = file.mimetype.split("/")[1];
//     cb(null, `media-${Date.now()}.${ext}`); 
//     }
//   },
// );
// const multerDocFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("pdf")) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an pdf! Please upload only pdf file.', 400), false);
//   }
// };

// const uploadDocs= multer({
//   storage: multerDocStorage,
//   fileFilter: multerDocFilter,
//   limits:{fileSize:2*1024*1024}
// });
// /*
const multerViStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname==="image"){
      cb(null, "public/api/image");
     }
     if(file.fieldname==="pdf"){
      cb(null, "public/api/doc");
     }
  },
  filename: (req, file, cb) => {
    if(file.fieldname==="image"){ 
      const ext = file.mimetype.split("/")[1];
    cb(null, `img-${file.originalname.split('.')[0]}.${ext}`); 
    }
    if(file.fieldname==="pdf"){ 
      const ext = file.mimetype.split("/")[1];
    cb(null, `doc-${file.fieldname.split(".")[0]}.${ext}`); 
    }
   
  },
});
const multerViFilter = (req, file, cb) => {
  if(file.fieldname==="image"){ 
if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only image.", 400), false);
  }
  }
  if(file.fieldname==="pdf"){ 
    console.log(file.mimetype);
    if (file.mimetype.startsWith("application/pdf")) {
      cb(null, true);
    } else {
      cb(new Error("Not a pdf! Please upload only pdf file.", 400), false);
    }
  }
  
};
const uploadVi = multer({
  storage: multerViStorage,
  fileFilter: multerViFilter,
  limits:{fileSize:2*1024*1024}
});

exports.uploadTrain = uploadVi.fields([{name:'image',maxCount: 5},{name:'pdf',maxCount: 5}]);

// exports.uploadImage = upload.single("image");
// exports.uploadAudio = uploadMedia.single("media");