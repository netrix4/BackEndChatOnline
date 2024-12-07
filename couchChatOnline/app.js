// function (doc) {
//     emit(doc._id, {name:doc.name, email:doc.email, address: doc.address, rev:doc.rev})
// }

// para el doc que tiene:
// "value":{
//     "name": "akjshdasd",
//     "email":"",
//     "address":{
//         "street":"",
//         "city": "",
//         "state":""
//     }
//     "rev":""
// }

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const NodeCouchDb = require("node-couchdb");

const couch = new NodeCouchDb(
  // {
  //   auth: {
  //     user: "olan",
  //     password: "olan11",
  //   },
  // },
  {
    host: "10.4.8.44",
    protocol: "http",
    port: "5984",
    auth: {
      user: "olan",
      password: "olan11",
    },
  }
);

// const dbname = "chatonline";
const dbname = "chatonlineprofiles";
// const viewUrl = "_design/all_customers/_view/all";

// const viewUrl = "_design/all_chats/_view/all";
const viewUrl = "_design/all_chatprofiles/_view/all";

//Creo que tambien podria ser:
// const viewUrl = "http://olan:olan11@127.0.0.1:5984/chatonline/";

console.log(couch);

couch.listDatabases().then(function (dbs) {
  console.log(dbs);
  console.log("temp");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  //   res.render("index");
  couch.get(dbname, viewUrl).then(
    function (data, headers, status) {
      console.log(data);
      // console.log(data.data.rows);       //esto esta amarrado a la vista de couch db
      res.render("index", {
        // customers: data.data.rows,
      });
    },
    function (err) {
      res.send(err);
    }
  );
});
app.listen(3000, function () {
  console.log("Server started for couchdb on port 3000");
});
