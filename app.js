const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const admin = require("./routes/admin");
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require("connect-flash");
const app = express();
const port = 8081;

require("./models/postagem");
const Postagem = mongoose.model("postagens");

require("./models/categoria");
const Categoria = mongoose.model("categorias");

const usuarios = require("./routes/usuario");

const passport = require('passport');
require('./config/auth')(passport);
// Configurações:

// Sessão
app.use(session({
    secret: "cursonode",
    resave: true,
    saveUninitialized: true
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handlebars
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado ao MongoDB...");
}).catch((err) => {
    console.log("Erro ao conectar ao MongoDB: " + err);
});


// Public
app.use(express.static(path.join(__dirname, "public")));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Rotas
app.get('/', (req, res) => {
    Postagem.find().lean().populate("categoria").sort({ data: "desc" }).then((postagens) => {
        res.render("index", { postagens: postagens });
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno");
        res.redirect("/404");
    });
});

app.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({ slug: req.params.slug }).lean().then((postagem) => {
        if (postagem) {
            res.render("postagem/index", { postagem: postagem });
        } else {
            req.flash("error_msg", "Esta postagem não existe");
            res.redirect("/");
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno");
        res.redirect("/");
    });
});

app.get("/categorias", (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render("categorias/index", { categorias: categorias });
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao listar as categorias");
        res.redirect("/");
    });
});

app.get("/categorias/:slug", (req, res) => {
    Categoria.findOne({ slug: req.params.slug }).lean().then((categoria) => {
        if (categoria) {
            Postagem.find({ categoria: categoria._id }).lean().then((postagens) => {
                res.render("categorias/postagens", { postagens: postagens, categoria: categoria });
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao listar os posts");
                res.redirect("/");
            });
        } else {
            req.flash("error_msg", "Esta categoria não existe");
            res.redirect("/");
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao carregar a página desta categoria");
        res.redirect("/");
    });
})

app.get('/404', (req, res) => {
    res.send('Erro 404!');
});

app.get('/posts', (req, res) => {
    res.send('Lista de posts');
});

app.use('/admin', admin);
app.use('/usuarios', usuarios);
// Outros
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});