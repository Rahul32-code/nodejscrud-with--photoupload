import express from "express";
const app = express();
const port = 8080;
import con from "./config/connect.js";
// impot multer
import multer from "multer";

// confgration
 // set for the engine public
 app.use(express.static("./src/public"));
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', './src/views');

// for post data submit
app.use(express.urlencoded());
app.use(express.json());

//multer ye sbb route folder me bnega
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './src/public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

  const upload = multer({ storage})

//routing
app.get("/", (req, resp) => {
    // resp.send("hello");
    resp.render("index.ejs");
});
app.get("/add", (req, resp) => {
    // resp.send("hello");
    resp.render("add.ejs");
});
app.get("/update", (req, resp) => {
    // resp.send("hello");
    resp.render("update.ejs");
});
app.get("/delete", (req, resp) => {
    // resp.send("hello");
    resp.render("delete.ejs");
});
app.get("/view", (req, resp) => {
    // resp.send("hello");
    resp.render("view.ejs");
});
app.get("/search", (req, resp) => {
    // resp.send("hello");
    resp.render("search.ejs");
});
app.get("/upimage", (req, resp) => {
    // resp.send("hello");
    resp.render("imageup.ejs");
});


//connect db query
app.get('/addstuden', (req,resp) => {
    // resp.send(req.query)
    const {email, phone, pass} = req.query

    //sanitization xss..
    con.query("INSERT INTO test (email, phone, password) VALUES(?, ?, ?)",[email, phone, pass], (err, result) => {
        if(err){
            console.log('error');
        }
        // resp.send(result);
        resp.render('add', {mesg: true});
        console.log('data inserted');
    });

});

app.post('/searchstudent', (req, resp) => {
    // resp.send(req.body);
    const { phone }= req.query;
    con.query('SELECT * FROM test WHERE phhone = ?',[phone], (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log(result)
    });

});

//image upload
app.post('/upload', upload.single('profile'), (req, resp) => {
    console.log(req.query);
    console.log(req.file);

    return resp.redirect('/');
});
//example
// router.post('/api/webapi/admin/upiImage', adminController.middlewareAdminController, upload.single('image'), adminController.upiImage)


// create server
app.listen(port, (err) => {
    if(err){
        throw err;
    } else {
        console.log(`Connected success port: ${port}`);
    }
});