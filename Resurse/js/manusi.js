window.addEventListener("load",function(){
    document.getElementById("inp-pret").onchange=function(){
        document.getElementById("infoRange").innerHTML=`(${this.value})`;
    }

    document.getElementById("filtrare").onclick=function(){
        let val_nume=document.getElementById("inp-nume").value.toLowerCase();
        let val_culori;
        let gr_radio=document.getElementsByName("gr_rad");
        for(let r of gr_radio){
            if(r.checked){
                val_culori=r.value;
                break;
            }
        }
        let val_pret=document.getElementById("inp-pret").value;
        let val_brand=document.getElementById("inp-brand").value;

        let checkbox = document.getElementById("inp-protectie");
        let bifat = checkbox.checked;
              
        let val_marimi = document.getElementById("inp-marimi");

        let marimi_selectate = [];
        for (let option of val_marimi.selectedOptions) {
            marimi_selectate.push(option.value);
            console.log(option.value);
        }

            
        var produse=document.getElementsByClassName("produs");

        for (let prod of produse){
            prod.style.display="none";
            let nume=prod.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase();

            let cond1= nume.startsWith(val_nume);

            let cond2=true;
            if(val_culori!="toate")
            {
                [nra, nrb]=val_culori.split("-");
                nra=parseInt(nra);
                nrb=parseInt(nrb);
                let nr_culori=parseInt(prod.getElementsByClassName("val-culori")[0].innerHTML);
                cond2=(nra<nr_culori && nr_culori<=nrb);
            }
            pret=parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
            let cond3 = (val_pret<=pret);//val-pret=minim, pret este pretul preluat din produs
            let brand = prod.getElementsByClassName("val-brand")[0].innerHTML;
            let cond4 = (val_brand==brand || val_brand=="toate");

            let prod_cu_protectie = prod.getElementsByClassName("val-protectie")[0].innerHTML === "true";
            let cond5 = !bifat || (bifat && prod_cu_protectie);//testat


            let prod_marimi = prod.getElementsByClassName("val-marimi")[0].innerHTML;

            let prod_marimi_vector = prod_marimi.split(",").map(marimi => marimi.trim());
           
             let cond6 =(marimi_selectate.length == 0 || marimi_selectate.some(marimi => prod_marimi_vector.includes(marimi)));//materiale
           
            if(cond1 && cond2 && cond3 && cond4 && cond5 && cond6){
                prod.style.display="block";
              
            }
            
        }
       
    }
    document.getElementById("resetare").onclick=function(){
        var confirmare = confirm("Sigur doriti sa resetati filtrele?");
        if (confirmare){
            document.getElementById("inp-nume").value="";
            document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
            document.getElementById("inp-brand").value="toate";
            document.getElementById("i_rad4").checked = true;
            document.getElementById("inp-marimi").value = "";
            document.getElementById("inp-protectie").checked = false;

            var produse=document.getElementsByClassName("produs");
            for (let prod of produse){
                prod.style.display="block";
            }
        }
    }

    function sortare(semn) {
        var produse = document.getElementsByClassName("produs");
        var v_produse = Array.from(produse);

        v_produse.sort(function (a, b) {
            var pret_a = parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
            var pret_b = parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
            if (pret_a == pret_b) {
                var nume_a = a.getElementsByClassName("val-nume")[0].innerHTML;
                var nume_b = b.getElementsByClassName("val-nume")[0].innerHTML;
                return semn * nume_a.localeCompare(nume_b);
            }
            return semn * (pret_a - pret_b);
        })

        for (let prod of v_produse) {
            prod.parentElement.appendChild(prod);
        }

    }

    document.getElementById("sortCrescNume").onclick = function () {
        sortare(1);
    }
    document.getElementById("sortDescrescNume").onclick = function () {
        sortare(-1);
    }
    window.onkeydown=function(e){
        if(e.key=="c" && e.altKey==true){
            //ambele in acelasi timp
            if(document.getElementById("info-suma"))
                return;
            var produse=document.getElementsByClassName("produs");
            let suma=0;
            for (let prod of produse) {
                if(prod.style.display!="none"){
                    let pret=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
                    suma+=pret;
                }
            }

            let p = document.createElement("p");//"p"-vrem sa cream un paragraf p
            p.innerHTML=suma;
            
            p.id="info-suma";//ii dam un id ca sa putem afisa pt o sec si o singura data
            ps=document.getElementById("p-suma");
            container=ps.parentNode;
            frate=ps.nextElementSibling;
            container.insertBefore(p,frate);//punem dupa container p-nodul de inserat
            setTimeout(function(){
                let info = document.getElementById("info-suma");
                if(info)
                    info.remove();
            },2000);
        }
    }

});
