const TEACHING_API_BAZA = "BGrabnar";
const SENSEI_RACUN = "0xDfD92a73546038623D66060EA987601f5E8b3294";

let SENSEI_BC_RPC_URL = "https://sensei.lavbic.net:8546";
let TEACHING_API_BASE_URL =
  "https://teaching.lavbic.net/api/OIS/baza/" + TEACHING_API_BAZA + "/podatki/";

/**
 * Generator podatkov za novega uporabnika, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati nov scenarij s specifičnimi
 * podatki, ki se nanašajo na scenarij.
 *
 * @param stScenarija zaporedna številka scenarija (1, 2 ali 3)
 * @return scenarijId generiranega scenarija
 */
function generirajScenarij(stScenarija) {
  scenarijId = "";

  // TODO: Potrebno implementirati

  return scenarijId;
}

// TODO: Tukaj implementirate funkcionalnosti, ki jo podpira vaša aplikacija4


function generirajID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}






function kreirajTekaca() {
  var ime = $("#imeUporabnika").val();
  var priimek = $("#priimekUporabnika").val();
  
  if (
    !ime ||
    !priimek ||
    
    ime.trim().length == 0 ||
    priimek.trim().length == 0
    
  ) {
    alert("Prosimo vnesite vse podatke");
    
  } else {

   
    var id = generirajID();
    
    var podatki = {
      ime: ime,
      priimek: priimek,
      
    };
    
    $.ajax({
      url: TEACHING_API_BASE_URL + "azuriraj?kljuc=" + id,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(podatki),
      success: function (data) {
        alert("dodan je bil uporabnik z ID: " + id);
        
      },
      error: function (err) {
        alert("ni delovalo");
      },
    });
  }
}



function preglejTekaca() {
  var idTekacka = $("#idTekacaa").val();
  if (!idTekacka || idTekacka.trim().length == 0) {
    alert("Ni vpisanega ID!");
  } else {
    $.ajax({
      url: TEACHING_API_BASE_URL + "vrni/" + idTekacka,
      type: "GET",
      success: function (podatki) {
       
        document.getElementById("imeTekaca").value=podatki.ime ;
        document.getElementById("priimekTekaca").value=podatki.priimek ;
        
           
            
        
      },
      error: function (err) {
       alert("server ni dostopen");
      },
    });
  }
}


var hiho = "b2707f0353dee042aa2ac472ec0d2b09";

function dodajSpecTeka() {
  var idd = $("#idUporabnika").val();
  var datumInUra = $("#daturmUra").val();
  var kraj = $("#kraj").val();
  var dolzina = $("#dolzina").val();
  var cas = $("#cas").val();
  var visinci = $("#visinci").val();
  var temperatura = $("#temp").val();
  

  if (
    !idd ||
    idd.trim().length == 0 ||
    !datumInUra ||
    datumInUra.trim().length == 0 ||
    !kraj ||
    kraj.trim().length == 0 ||
    !dolzina ||
    dolzina.trim().length == 0 ||
    !cas ||
    cas.trim().length == 0 ||
    !visinci ||
    visinci.trim().length == 0 ||
    !temperatura ||
    temperatura.trim().length == 0 
   
  ) {
    alert("Prosimo vnesite vse potrebne podatke");
  } else {
    var podatki = {
      datumInUra: datumInUra,
      kraj: kraj,
      dolzina: parseFloat(dolzina),
      cas: cas,
      visinci: parseInt(visinci),
      temperatura: parseInt(temperatura),
      
    };
    $.ajax({
      url:
        TEACHING_API_BASE_URL +
        "azuriraj?kljuc=" +
        idd +
        "|podatki" +
        "&elementTabele=true",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(podatki),
      success: function (odgovor) {
       alert("podatki o teku so bili dodani!");
      },
      error: function (err) {
        alert("podatki niso bili uspešno dodani");
      },
    });
  }
}



function dobiVreme(){
  

  var kraj = $("#kraj").val();

  if (
    !kraj ||
    kraj.trim().length == 0 ){

      alert("prosimo, vnesite kraj");
    }
    else{
      var haha;
      $.ajax({
        url:
        "https://api.openweathermap.org/data/2.5/weather?q="+kraj+"&appid="+ hiho
         + "&units=metric"




          ,
        type: "GET",
        success: function (podatki) {
         alert("podatki najdeni!");

        
          
            haha =  podatki.main.temp;
            

            let date = new Date()
              let day = date.getDate();
              let month = date.getMonth()+1;
              let year = date.getFullYear();
              let hours = date.getHours(); // => 9
               let minutes=  date.getMinutes(); // =>  30
                
            let fullDate = `${day}.${month}.${year} ${hours}:${minutes}`;
            alert(haha);
            document.getElementById("daturmUra").value= fullDate;
            document.getElementById("temp").value= haha;


        },
        error: function (err) {
          alert("ta kraj ne obstaja");
        },
      });



    }
}


function beriTeke() {
  var ide = $("#ide").val();
  var tip = document.querySelector('#temperatur').checked;


  if (!ide || ide.trim().length == 0) {
   alert("prosim vnesite podatke");
  } else {
    $.ajax({
      url: TEACHING_API_BASE_URL + "vrni/" + ide + "|" + "podatki",
      type: "GET",
      success: function (podatki) {
        podatki = podatki.filter((podatek) => {
          if (tip == true)
            return podatek.dolzina &&  podatek.cas && podatek.temperatura ;
          else 
            return podatek.dolzina && podatek.cas;
          
        });
        if (podatki.length > 0) {
          var hehk
          if(tip==true){
            hehk = "<th>Temperatura</th>";}
            else hehk="";
              
          var prikaz =
            "<table><tr><th>dolzina</th><th>cas</th>" +hehk + "</tr>";


          podatki.forEach((podatek) => {
           
            if(tip==true){
              var jao= "<td>" +
              
                 podatek.temperatura
               
              " " +
              "°C" +
              "</td></tr>";}
              else jao="";
           
           
            prikaz +=
              "<tr><td>" +
              podatek.dolzina +
              "</td><td>" + podatek.cas + "</td>" + jao ;
          });
          prikaz += "</table>";
          $("#filaj").html(prikaz);
        } else {
          $("#preberiMeritveVitalnihZnakovSporocilo").html(
            "<div class='alert alert-warning alert-dismissible fade show mt-3 mb-0'>" +
              "Ni podatkov!" +
              "<button type='button' class='btn-close' data-bs-dismiss='alert'></button>" +
              "</div>"
          );
        }
        $("#preberiMeritveVitalnihZnakovSporocilo").html("");
      },
      error: function (err) {
        $("#preberiMeritveVitalnihZnakovSporocilo").html(
          "<div class='alert alert-danger alert-dismissible fade show mt-3 mb-0'>" +
            "Napaka '" +
            JSON.parse(err.responseText).opis +
            "<button type='button' class='btn-close' data-bs-dismiss='alert'></button>" +
            "!</div>"
        );
      },
    });
  }
}


function test(){
var e = document.getElementById("prviii");
var strUser = e.value;
if(strUser==0) filaj1();
else if (strUser ==1) filaj2();
else if (strUser ==2) filaj3();
}

function filaj1(){

  
 
      document.getElementById("imeUporabnika").value="Ozbej";
      document.getElementById("priimekUporabnika").value= "Kranjc";


}




function filaj2(){

  document.getElementById("imeUporabnika").value="David";
  document.getElementById("priimekUporabnika").value= "Kralj";

}

function filaj3(){

  document.getElementById("imeUporabnika").value="Tine";
  document.getElementById("priimekUporabnika").value= "Smeh";


}