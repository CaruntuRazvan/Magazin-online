
DROP TYPE IF EXISTS categorii_manusi;
DROP TYPE IF EXISTS branduri_manusi;

CREATE TYPE categorii_manusi AS ENUM('Adulti', 'Juniori');
CREATE TYPE branduri_manusi AS ENUM('Adidas', 'Nike','Puma','ONE','Reusch');

CREATE TABLE IF NOT EXISTS manusi (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   nr_culori INT NOT NULL CHECK (nr_culori>=0), 
   categorie categorii_manusi DEFAULT 'Adulti', 
   brand branduri_manusi DEFAULT 'Adidas',
   marimi VARCHAR [],
   culori VARCHAR [],
   imagine VARCHAR(300),
   cod_produs VARCHAR(30),
   finger_protection BOOLEAN NOT NULL DEFAULT TRUE,
   data_adaugare TIMESTAMP DEFAULT current_timestamp   
);

INSERT into manusi (nume,descriere,pret,nr_culori ,categorie, brand, marimi, culori,cod_produs ,finger_protection, imagine) VALUES 
('Adidas Predator Pro', 'Adidas intensifică atmosfera pentru finalul sezonului de fotbal: Prezentăm noul pachet Heatspawn, care prezintă o combinație de culori îndrăzneață și revigorată, Team Solar Orange/Core Black.', 623 , 3, 'Adulti', 'Adidas', '{"7","7.5","8","8.5","9","9.5","10","10.5","11"}' ,'{"alb","negru","portocaliu"}','HN5572', True, 'adidasPredatorPro.jpg'),

('Adidas Predator Pro Night Strike', 'Noul an înseamnă un nou Predator, Adidas a reîmprospătat mănușa extrem de populară Predator Pro cu o înfățișare complet nouă.', 508 , 1, 'Adulti', 'Adidas', '{"7","7.5","8","8.5","9","9.5","10","10.5","11"}' ,'{"negru"}','HN3347', True, 'adidasPredatorProNightStrike.jpg'),

('Adidas Predator Pro Edge', 'Complet nou pentru anul 2022, a sosit adidas Predator EDGE, echipat cu o învelitoare de silicon complet nouă pe partea din spate a mâinii și o potrivire îmbunătățită.', 400, 3, 'Adulti', 'Adidas', '{"7","8","8.5","9"}' ,'{"alb","albastru","rosu"}','H62415', True, 'adidasPredatorProEdge.jpg'),

('Adidas Predator Pro JR', 'Țintă precisă pentru lovituri punctuale și manipulare impecabilă a mingii în mănușile fără curele adidas Predator pe care le poartă jucătorii profesioniști de fotbal.', 480, 2, 'Juniori', 'Adidas', '{"5","5.5","6","6.5"}' ,'{"negru","mov"}','HN5570J', True, 'adidasPredatorProJR.jpg'),

('Adidas Training JR', 'Descoperă o nouă dimensiune a agilității. Create special pentru juniori, aceste mănuși de portar adidas X GL te mențin rapid datorită unui design ușor și aerodinamic.', 480, 2, 'Juniori', 'Adidas', '{"5","6.5"}' ,'{"alb","roz"}','HN3346', False, 'adidasTrainingJR.jpg'),

('Nike Vapor Grip 3 RS PROMO', 'Modelele profesionale în ediție limitată, create pentru portarii sponsoriți de Nike precum Alisson Becker, Thibaut Courtois și Jack Butland, sunt acum disponibile și pentru tine.', 640 , 2, 'Adulti', 'Nike', '{"6","8","9","10","11"}' ,'{"alb","albastru"}','DM4010101', True, 'NikeVaporGrip3.jpg'),

('Nike Mercurial Touch Elite', 'Modelele profesionale în ediție limitată, create pentru portarii sponsoriți de Nike precum Alisson Becker, Thibaut Courtois și Jack Butland, sunt acum disponibile și pentru tine.', 750 , 3, 'Adulti', 'Nike', '{"7","8","9","10","11"}' ,'{"alb","albastru","rosu"}','DC1980101', True, 'NikeMercurialTouchElite.jpg'),

('Nike Phantom Elite', 'Modelele profesionale în ediție limitată, create pentru portarii sponsoriți de Nike precum Alisson Becker, Thibaut Courtois și Jack Butland, sunt acum disponibile și pentru tine.', 332 , 3, 'Adulti', 'Nike', '{"7","9","11"}' ,'{"negru","verde","albastru"}','CN6724702', False, 'NikePhantomElite.jpg'),

('Nike Match Junior', 'Toți aleg Nike.', 90 , 2, 'Juniori', 'Nike', '{"3","4","5"}' ,'{"negru","alb"}','CQ7795010', False, 'NikeMatchJunior.jpg'),

('Puma FUTURE Pro Hybrid TRICKS x EURO 2016', 'Sărbătorește 75 de ani de PUMA cu o reinterpretare unică a mănușilor de portar Tricks din EURO 2016, care au avut culoarea Ravishing Pink / Fast Yellow și au strălucit pe cel mai mare scenariu din lume în Franța, în 2016.', 522 , 3, 'Adulti', 'Puma', '{"7","7.5","8","8.5","9","9.5","10","10.5","11"}' ,'{"roz","galben","galben"}','04185201', True, 'PumaFutureProHybrid.jpg'),

('Puma FUTURE Pro Hybrid EDERSON', 'Această mănușă este realizată conform specificațiilor exacte ale portarului brazilian Ederson.', 490 , 3, 'Adulti', 'Puma', '{"7","8","8.5","9","9.5","11"}','{"alb","portocaliu","albastru"}','04184201', True, 'PumaFutureProEderson.jpg'),

('Puma ULTRA Grip 1 Hybrid Pro', 'Linia noastră ULTRA este proiectată să îndeplinească și să depășească fiecare nevoie a portarului modern.', 280 , 2, 'Adulti', 'Puma', '{"7","9.5","11"}' ,'{"gri","portocaliu"}','04178605', True, 'PumaUltraGrip1.jpg'),

('Puma FUTURE Match NC Junior', 'Un model cu o valoare fantastică și un confort suprem.', 150 , 2, 'Juniori', 'Puma', '{"4","5","6"}' ,'{"negru","alb"}','04184403J', False, 'PumaFutureMatchJR.jpg'),

('Puma ULTRA PROTECT 3 JUNIOR', 'O mănușă de protecție pentru juniori de înaltă calitate, care prezintă protecție pentru degete PFP (Puma Finger Protection) ușoară și flexibilă.', 155 , 3, 'Juniori', 'Puma', '{"5","6"}' ,'{"portocaliu","alb","negru"}','04182005', True, 'PumaUltraProtectJR.jpg'),

('ONE GEO 3.0 Amethyst', 'Construit de la zero pentru portarul de astăzi, GEO 3.0 este cea mai ergonomică, ușoară și elitistă mănușă pe care am creat-o până acum.', 330 , 2, 'Adulti', 'ONE', '{"7","7.5","8","8.5","9","9.5","10","10.5","11"}' ,'{"negru","mov"}','GLV-GEO3-A', True, 'ONEGeoAmethyst.jpg'),

('ONE APEX Pro King', 'Trei lei pe mănuși. Trei lansări în ediție limitată.', 350 , 2, 'Adulti', 'ONE', '{"7.5","8","8.5","9.5","10","10.5","11"}' ,'{"alb","rosu"}','APEX-KING', True, 'ONEApexPro.jpg'),

('ONE APEX Surge', 'Seria APEX întruchipează tot ceea ce reprezintă numele său.', 240 , 2, 'Adulti', 'ONE', '{"7.5","8.5","9.5","10","11"}' ,'{"albastru","negru"}','GLV-APEX-SUR', True, 'ONEApexSurge.jpg'),

('ONE SLYR Pure Junior', 'Junior SLYR Pure combină cele mai bune elemente de flexibilitate, amortizare și design pentru a oferi unul dintre cele mai bune modele ale noastre până în prezent.', 160 , 1, 'Juniori', 'ONE', '{"5","6"}' ,'{"alb"}','GLV-SLYR-PURE', True, 'ONEPureJR.jpg'),

('ONE SLYR Aurora Junior', 'Junior SLYR Pure combină cele mai bune elemente de flexibilitate, amortizare și design pentru a oferi unul dintre cele mai bune modele ale noastre până în prezent.', 160 , 2, 'Juniori', 'ONE', '{"4","5","6"}' ,'{"negru","turcoaz"}','GLV-SLYR-AURORA', True, 'ONEAuroraJR.jpg'),

('ONE GEO 3.0 Switch Junior', 'Latexul prezent pe GEO 3.0 Switch este latexul nostru dovedit de calitate profesională, utilizat de toți profesioniștii noștri, inclusiv în Premier League.', 240 , 2, 'Juniori', 'ONE', '{"4","5","6"}' ,'{"alb","verde"}','GLV-GEO3-SJ', True, 'ONEGeoJR.jpg'),

('Reusch Attrakt Fusion Strapless AdaptiveFlex', 'Sistemul Attrakt Fusion Strapless AdaptiveFlex garantează o aderență de neegalat și o rezistență superioară la abraziune în toate condițiile meteorologice și pe orice suprafață de teren.', 710 , 2, 'Adulti', 'Reusch', '{"7.5","8","8.5","9.5","10","10.5","11","12"}' ,'{"portocaliu","albastru"}','53709794024', True, 'ReuschAttracktFusion.jpg'),

('Reusch Attrakt Aqua Windproof Ortho-Tec', 'Un stil perfect pentru condiții reci, vântoase și umede.', 850 , 1, 'Adulti', 'Reusch', '{"7.5","8","8.5","9.5","10","10.5","11","12"}' ,'{"albastru"}','53704584433', True, 'ReuschAttraktAqua.jpg'),

('Reusch Pure Contact Fusion', 'Potrivirea ca a doua piele, ușurința și aderența sunt esența liniei Pure Contact.', 600 , 3, 'Adulti', 'Reusch', '{"7.5","8","10","10.5","11"}' ,'{"verde","portocaliu","negru"}','53709005444', True, 'ReuschPureContactFusion.jpg'),

('Reusch Attrakt Gold X Junior', 'Mănușa Attrakt Gold X Junior cu designul Cupei Mondiale oferă o aderență și lipici de neegalat datorită latexului Gold X.', 360 , 2, 'Juniori', 'Reusch', '{"5","5.5","6","6.5","7"}' ,'{"verde","portocaliu"}','53720555555', True, 'ReuschAttraktJR.jpg'),

('Reusch Pure Contact Infinity Junior', 'Combinația dintre ușurință, potrivire ca a doua piele, durabilitate și aderență asigură cele mai bune performanțe pe gazonul artificial.', 270 , 2, 'Juniori', 'Reusch', '{"5","5.5","6","6.5","7"}' ,'{"gri","negru"}','53727007700', False, 'ReuschPureContactJR.jpg');
