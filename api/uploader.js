export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      status: false,
      message: "Method harus POST"
    });
  }

  var fs = require("fs");
  var path = require("path");
  var formidable = require("formidable");
  var crypto = require("crypto");

  var uploadDir = path.join(process.cwd(), "files");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  var form = new formidable.IncomingForm({
    uploadDir: uploadDir,
    keepExtensions: true,
    multiples: false
  });

  form.parse(req, function (err, fields, files) {

    if (err) {
      return res.status(500).json({
        status: false,
        message: "Upload gagal"
      });
    }

    var file = files.file;

    if (!file) {
      return res.status(400).json({
        status: false,
        message: "File tidak ditemukan"
      });
    }

    var ext = path.extname(file.originalFilename);
    var randomName = crypto.randomBytes(8).toString("hex") + ext;
    var newPath = path.join(uploadDir, randomName);

    fs.renameSync(file.filepath, newPath);

    return res.status(200).json({
      status: true,
      creator: "saurus",
      result: "https://saurushoting.my.id/files/" + randomName
    });

  });
}
