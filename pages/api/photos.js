import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    for (const key in files) {
      await saveFile(files[key]);
    }
    return res.status(201).send("");
  });
};

const deleteAll = async (req, res) => {
  let files = fs.readdirSync("./public/images/");
  files.forEach(async (file) => {
    await deleteFile(file);
  });
  return res.status(201).send("");
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/images/${file.name}`, data);
  fs.unlinkSync(file.path);
  return;
};

const deleteFile = async (file) => {
  fs.unlinkSync(`./public/images/${file}`);
  return;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  switch (req.method) {
    case "POST":
      return post(req, res);
    case "PUT":
      return console.log("PUT");
    case "DELETE":
      return deleteAll(req, res);
    case "GET":
      return console.log("GET");

    default:
      res.status(404).send("");
  }
};
