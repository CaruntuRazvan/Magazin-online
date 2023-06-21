const { dir } = require("console");
const express = require ("express");
const fs = require ("fs");
const { dirname } = require("path");
const path = require("path");
const sharp = require("sharp");
const sass = require("sass");
const {Client} = require ("pg");

var client= new Client({database:"proiect",
        user:"razvan",
        password:"razvan",
        host:"localhost",
        port:5432});
client.connect();

client.query("select * from incercare", function(err, rez){
    console.log("Eroare BD",err);
 
    console.log("Rezultat BD",rez.rows);
});

const obGlobal={
    obErori:null,
    obImagini:null,
    folderScss:path.join(__dirname, "Resurse/SCSS"),
    folderCss:path.join(__dirname, "Resurse/CSS"),
    folderBackup:path.join(__dirname,"backup"),
    optiuniMeniu:[]
}

client.query("select * from unnest(enum_range(null::categorii_manusi))",function(err,rezCategorii){
    if(err){
        console.log(err);
    }
    else{
        obGlobal.optiuniMeniu=rezCategorii.rows;
    }
});    


app = express();
console.log("Folder proiect",__dirname);
console.log("Nume fisier",__filename);
console.log("Director de lucru",process.cwd());

vectorFoldere=["temp", "temp1", "backup"]
for (let folder of vectorFoldere){
    //let caleFolder=__dirname+"/"+folder;
    let caleFolder=path.join(__dirname, folder)
    if (! fs.existsSync(caleFolder)){
        fs.mkdirSync(caleFolder);
    }

}

function compileazaScss(caleScss,caleCss){
    
    if(!caleCss){
     ///   let vectorCale=caleScss.split("\\");//caracter special
     ///   let numeFisExt=vectorCale[vectorCale.length-1];
        let numeFisExt=path.basename(caleScss);
        let numeFis=numeFisExt.split(".")[0];
        caleCss=numeFis+".css";
    }

    if (!path.isAbsolute(caleScss))
        caleScss=path.join(obGlobal.folderScss,caleScss);
    if (!path.isAbsolute(caleCss))
        caleCss=path.join(obGlobal.folderCss,caleCss);
    //avem cai absolute in caleScss si caleCss

   /// let vectorCale=caleCss.split("\\");
   /// let numeFisCss=vectorCale[vectorCale.length-1];
    let caleResBackup=path.join(obGlobal.folderBackup,"Resurse/CSS");
    if(!fs.existsSync(caleResBackup))
        fs.mkdirSync(caleResBackup, {recursive:true});
    let numeFisCss=path.basename(caleCss);
    if (fs.existsSync(caleCss)){
        fs.copyFileSync(caleCss, path.join(obGlobal.folderBackup,"Resurse/CSS",numeFisCss));    
    }
    rez=sass.compile(caleScss, {"sourceMap":true});
    fs.writeFileSync(caleCss,rez.css)
    console.log("Compilare SCSS",rez);
}
//compileazaScss("a.scss");

vFisiere=fs.readdirSync(obGlobal.folderScss);
for ( let numeFis of vFisiere){
    if(path.extname(numeFis)==".scss"){
        compileazaScss(numeFis);
    }
}

fs.watch(obGlobal.folderScss,function(eveniment,numeFis){
    //console.log(eveniment,numeFis);
    if (eveniment=="change" || eveniment=="rename"){
        let caleCompleta=path.join(obGlobal.folderScss, numeFis);
        if (fs.existsSync(caleCompleta)){
            compileazaScss(caleCompleta);
        }
    }
})

app.set("view engine","ejs");

app.use("/Resurse", express.static(path.join(__dirname, "Resurse")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use("/*",function(req,res,next){
    res.locals.optiuniMeniu=obGlobal.optiuniMeniu;
    next();
})


app.use(/^\/Resurse(\/[a-zA-Z0-9]*)*$/, function(req,res){
    afisareEroare(res,403);
});

app.get("/favicon.ico",function(req,res){
    res.sendFile(path.join(__dirname, "Resurse", "Imagini", "favicon.ico"));
})

app.get("/ceva",function(req,res){  
    res.send("Salut!");
})

app.get(["/index","/","/home"],function(req,res){  
    res.render("pagini/index", {ip: req.ip, a:10,imagini:obGlobal.obImagini.imagini});
})
//-------------------------------PRODUSE---------------------------------
app.get("/manusi", function(req, res) {
    //TO DO query pentru a selecta toate produsele
    //TO DO se adauaga filtrarea dupa tipul produsului
    client.query("select * from unnest(enum_range(null::branduri_manusi))", function(err, rezBrand) {
      let conditieWhere = "";
      if (req.query.categorie)
        conditieWhere = ` where categorie='${req.query.categorie}'`
  /////bonus(0.1p)
      client.query(`SELECT MIN(pret) AS minPret, MAX(pret) AS maxPret FROM manusi${conditieWhere}`, function(err, rezPret) {
        if (err) {
          console.log(err);
          afisareEroare(res, 2);
        } else {
          client.query("select * from manusi" + conditieWhere, function(err, rez) {
            console.log(300);
            if (err) {
              console.log(err);
              afisareEroare(res, 2);
            } else {
              console.log(rez);
              res.render("pagini/manusi", {
                manusi: rez.rows,
                optiuni: rezBrand.rows,
                minPret: rezPret.rows[0].minpret,
                maxPret: rezPret.rows[0].maxpret
              });
            }
          });
        }
      });
    });
  });
  
  


app.get("/manusa/:id",function(req, res){
    console.log(req.params);
   
    client.query( `select * from manusi where id=${req.params.id}`, function( err, rezultat){
        if(err){
            console.log(err);
            afisareEroare(res, 2);
        }
        else
            res.render("pagini/manusa", {prod:rezultat.rows[0]});
    });
});



//-------------------------------------------------------------------------

app.get("/*.ejs",function(req, res){
    afisareEroare(res,400);
})

app.get("/*",function(req, res){
    try{
        res.render("pagini"+req.url, function(err, rezRandare){
            if(err){
               // console.log(err);
                if(err.message.startsWith("Failed to lookup view"))
                //afisareEroare(res,{_identificator:404, _titlu:"ceva"});
                    afisareEroare(res,404, "Eroare 404!");
                else
                    afisareEroare(res);
            }
            else{
                console.log(rezRandare);
                res.send(rezRandare);
            }
        } );
    } catch(err){
        if(err.message.startsWith("Cannot find module"))
        //afisareEroare(res,{_identificator:404, _titlu:"ceva"});
            afisareEroare(res,404);
        else
            afisareEroare(res);
    }
})

function initializeazaErori(){
    var continut = fs.readFileSync(path.join(__dirname, "Resurse", "json", "erori.json")).toString("utf-8");
    
    obGlobal.obErori=JSON.parse(continut);
    let vErori=obGlobal.obErori.info_erori;

    for(let eroare of vErori){
        eroare.imagine="/"+obGlobal.obErori.cale_baza+"/"+eroare.imagine;
    }

}
initializeazaErori();



function initImagini(){
    var continut = fs.readFileSync(path.join(__dirname, "Resurse", "json", "galerie.json")).toString("utf-8");

    obGlobal.obImagini=JSON.parse(continut);
    let caleAbs=path.join(__dirname,obGlobal.obImagini.cale_galerie);
    let caleAbsMediu=path.join(__dirname,obGlobal.obImagini.cale_galerie, "mediu");//imagini medii
    let caleAbsMic=path.join(__dirname,obGlobal.obImagini.cale_galerie, "mic");//imagini mici
    if (!fs.existsSync(caleAbsMediu))
        fs.mkdirSync(caleAbsMediu);
    
    if (!fs.existsSync(caleAbsMic))
        fs.mkdirSync(caleAbsMic);
        
    let vImagini=obGlobal.obImagini.imagini;
    for(let imag of vImagini){
        [numeFis, ext]=imag.fisier.split(".");
        let caleFisAbs=path.join(caleAbs,imag.fisier);
        let caleFisMediuAbs=path.join(caleAbsMediu, numeFis+".webp");
        let caleFisMicAbs=path.join(caleAbsMic,numeFis+".webp");
        sharp(caleFisAbs).resize(700).toFile(caleFisMediuAbs);
        sharp(caleFisAbs).resize(400).toFile(caleFisMicAbs);

        imag.fisier_mic=path.join("/",obGlobal.obImagini.cale_galerie,"mic",numeFis+".webp" )
        imag.fisier_mediu=path.join("/", obGlobal.obImagini.cale_galerie, "mediu",numeFis+".webp" )

        imag.fisier="/"+obGlobal.obImagini.cale_galerie+"/"+imag.fisier;
    }
     

}
initImagini();


/*daca programul seteaza titlul , se ia titlul din argument
daca nu e setat, se ia cel din json
daca nu avem nici in json, se ia val default */
function afisareEroare(res, _identificator, _titlu="EROARE", _text, _imagine ){
    let vErori=obGlobal.obErori.info_erori;
    let eroare=vErori.find(function(elem) {return elem.identificator==_identificator;} )
    if(eroare){
        let titlu1= _titlu=="EROARE" ? (eroare.titlu || _titlu) : _titlu;
        let text1= _text || eroare.text;
        let imagine1= _imagine || eroare.imagine;
        if(eroare.status)
            res.status(eroare.identificator).render("pagini/eroare", {titlu:titlu1, text:text1, imagine:imagine1});
        else
            res.render("pagini/eroare", {titlu:titlu1, text:text1, imagine:imagine1});
    }
    else{
        let errDef=obGlobal.obErori.eroare_default;
        res.render("pagini/eroare", {titlu:errDef.titlu, text:errDef.text, imagine:obGlobal.obErori.cale_baza+"/"+errDef.imagine});
    }
    

}


app.listen(8080);
console.log("Serverul a pornit");
