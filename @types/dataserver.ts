import express from "express";
import { readFileSync, writeFileSync } from "fs";
import cookieparse from "cookie-parser";
import cors from "cors";
import { User } from "./@classes/type.js";
// import { error } from "console";
const app = express();
const port = 3001;

const corsOptions = {
  origin: ["http://192.168.1.8:3000", "http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable cookies and authentication headers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieparse());

app.post("/get/users", (req, res) => {
  // console.log()
  const receivedData = req.body;

  let status = 200,
    data = {};

  try {
    const json = readFileSync(`./data/users.json`, { encoding: "utf-8" });

    const dataa = JSON.parse(json);
    if (receivedData.data == "all") {
      // mess = "ok"
      status = 200;
      data = Object.keys(dataa).map((item) => dataa[item]);
    } else {
      // mess = "ok";
      status = dataa[receivedData.data] ? 404 : 200;
      data = [dataa[receivedData.data]];
    }
  } catch (e: any) {
    // mess = e;
    status = 400;
    data = { error: e.message };
  }

  // console.log(data)

  res.json({ status: status, data: data });
});

app.post("/post/users", (req, res) => {
  const receivedData = req.body;

  let status = 200,
    data = {};

  try {
    const json = readFileSync(`./data/users.json`, { encoding: "utf-8" });

    let data = JSON.parse(json);

    data[receivedData.data.username] = receivedData.data;

    writeFileSync(`./data/users.json`, JSON.stringify(data));

    // mess = "ok";
    status = 200;
    data = {};
  } catch (e: any) {
    // console.log(e : any)
    // mess = e;
    status = 400;
    data = { error: e.message };
  }

  res.json({ status: status, data: data });
});

app.post("/get/groups", (req, res) => {
  // console.log()
  const receivedData = req.body;

  let status = 200,
    data = {};

  try {
    const json = readFileSync(`./data/groups.json`, { encoding: "utf-8" });

    const dataa = JSON.parse(json);
    if (receivedData.data == "all") {
      // mess = "ok"
      status = 200;
      data = data = Object.keys(dataa).map((item) => dataa[item]);
    } else {
      // mess = "ok";
      status = dataa[receivedData.data] ? 404 : 200;
      data = [dataa[receivedData.data]];
    }
  } catch (e: any) {
    // mess = e;
    status = 400;
    data = { error: e.message };
  }

  res.json({ status: status, data: data });
});

app.post("/post/groups", (req, res) => {
  const receivedData = req.body;

  let status = 200,
    data = {};

  try {
    const json = readFileSync(`./data/groups.json`, { encoding: "utf-8" });

    let data = JSON.parse(json);

    data[receivedData.data.group] = receivedData.data;

    writeFileSync(`./data/groups.json`, JSON.stringify(data));

    // mess = "ok";
    status = 200;
    data = {};
  } catch (e: any) {
    // console.log(e : any)
    // mess = e;
    status = 400;
    data = { error: e.message };
  }

  res.json({ status: status, data: data });
});

app.post("/get/blogs", (req, res) => {
  // console.log()
  const receivedData = req.body;

  let status = 200,
    data = {};

  try {
    const json = readFileSync(`./data/blogs.json`, { encoding: "utf-8" });

    const dataa = JSON.parse(json);
    if (receivedData.data == "all") {
      // mess = "ok"
      status = 200;
      data = data = Object.keys(dataa).map((item) => dataa[item]);
    } else {
      // mess = "ok";
      // console.log(dataa)
      if (receivedData.data.id != undefined) {
        data = dataa[receivedData.data.id.split("_")[0]].filter(
          (item) => item.id == receivedData.data.id
        );
      } else {
        data = [dataa[receivedData.data.host]];
      }

      // console.log(data)
      status = dataa[receivedData.data] ? 404 : 200;
    }
  } catch (e: any) {
    // mess = e;
    status = 400;
    data = { error: e.message };
  }

  res.json({ status: status, data: data });
});

app.post("/post/blogs", (req, res) => {
  const receivedData = req.body;

  let status = 200,
    data: {} | undefined = {};

  try {
    const json = readFileSync(`./data/blogs.json`, { encoding: "utf-8" });

    let dataa = JSON.parse(json);

    console.log(
      dataa[receivedData.data.host].find(
        (item: any) => item.id == receivedData.data.id
      )
    );

    if (
      dataa[receivedData.data.host].find(
        (item: any) => item.id == receivedData.data.id
      ) != undefined
    ) {
      dataa[receivedData.data.host] = dataa[receivedData.data.host].map(
        (item: any) =>
          item.id == receivedData.data.id ? receivedData.data : item
      );
    } else {
      dataa[receivedData.data.host].push(receivedData.data);
    }

    console.log(dataa[receivedData.data.host]);

    writeFileSync(`./data/blogs.json`, JSON.stringify(dataa));

    // mess = "ok";
    status = 200;
    data = undefined;
  } catch (e: any) {
    // console.log(e : any)
    // mess = e;
    status = 400;
    data = { error: e.message };
  }

  res.json({ status: status, data: data });
});

app.post(
  "/data",
  /**
   *
   * @param {{body:{method:string , mode:string , data:string}}} req
   * @param {*} res
   */
  function (req, res) {
    const receivedData = req.body;
    let status = 200,
      data = {};
    try {
      const res =
        readFileSync(`./data/${receivedData.mode}.json`, {
          encoding: "utf-8",
        }) || "{}";
      const dataa = JSON.parse(res);

      if (receivedData.method == "get") {
        if (receivedData.data == "all") {
          data = dataa;
        } else {
          data = dataa.filter(
            (item: User) => item.username == receivedData.data
          );
        }
      } else {
      }
    } catch (e: any) {
      status = 400;
      data = { error: e.message };
    }

    res.json({ status: status, data: data });
  }
);

app.post("/api/data", (req, res) => {
  // method , mode , data
  const receivedData = req.body;
  let mess = "";
  let status = 200;
  let data = {};
  if (receivedData.data == undefined) {
    mess = "";
    status = 404;
    data = {};
  } else {
    try {
      if (receivedData.method != "get") {
        const temp =
          readFileSync(`./data/${receivedData.mode}.json`, {
            encoding: "utf-8",
          }) || "{}";

        const lmao = JSON.parse(temp);
        // lmao.push(receivedData.data)
        console.log(receivedData.data);

        if (receivedData.mode == "users") {
          lmao[receivedData.data.username] = receivedData.data;
        } else if (receivedData.mode == "groups") {
          lmao[receivedData.data.group] = receivedData.data;
        }
        writeFileSync(`./data/${receivedData.mode}.json`, JSON.stringify(lmao));
      } else {
        const temp = readFileSync(`./data/${receivedData.mode}.json`, {
          encoding: "utf-8",
        });
        status = 200;
        mess = "oke";
        data =
          receivedData.data != "all"
            ? JSON.parse(temp)[receivedData.data]
            : JSON.parse(temp);
        // res.json({ status: 200, mess: "ok", data: (receivedData.data != "all") ? JSON.parse(temp)[receivedData.data] : JSON.parse(temp) })
      }
      mess = "done";
    } catch (e: any) {
      data = {};
      status = 400;
      mess = e;
    }
  }

  res.json({ status: status, mess: mess, data: data });
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
