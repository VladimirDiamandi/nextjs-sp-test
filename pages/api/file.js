import fs from "fs";

export const config = {
  api: {
    bodyParser: true,
  },
};

let info = require("./data.json");

const put = async (req, res) => {
  const reqBody = JSON.parse(req.body);
  if (reqBody.title) {
    info.title = reqBody.title;
  } else if (reqBody.description) {
    info.description = reqBody.description;
  }
  changeJSON();
  return res.status(201).send("");
};

const changeJSON = async () => {
  fs.writeFileSync(
    "pages/api/data.json",
    JSON.stringify(info, null, 4),
    function (err) {
      if (err) throw err;
      console.log("complete");
    }
  );

  return;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  switch (req.method) {
    case "POST":
      return console.log("POST");
    case "PUT":
      return put(req, res);
    case "DELETE":
      return console.log("DELETE");
    case "GET":
      return console.log("GET");

    default:
      res.status(404).send("");
  }
};
