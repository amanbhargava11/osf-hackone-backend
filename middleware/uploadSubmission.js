const multer =
  require("multer");

const path =
  require("path");

/* =========================
   STORAGE
========================= */

const storage =
  multer.diskStorage({

    destination:
      function (
        req,
        file,
        cb
      ) {

        cb(
          null,
          "uploads/submissions"
        );
      },

    filename:
      function (
        req,
        file,
        cb
      ) {

        const unique =
          Date.now() +
          "-" +
          Math.round(
            Math.random() * 1e9
          );

        cb(
          null,
          unique +
          path.extname(
            file.originalname
          )
        );
      },
  });

/* =========================
   FILE FILTER
========================= */

const fileFilter =
  (
    req,
    file,
    cb
  ) => {

    const allowed =
      [
        "application/vnd.ms-powerpoint",

        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];

    if (
      allowed.includes(
        file.mimetype
      )
    ) {

      cb(
        null,
        true
      );

    } else {

      cb(
        new Error(
          "Only PPT/PPTX files allowed"
        )
      );
    }
  };

/* =========================
   MULTER
========================= */

const upload =
  multer({

    storage,

    fileFilter,

    limits: {

      /* 10MB */

      fileSize:
        10 *
        1024 *
        1024,
    },
  });

module.exports =
  upload;