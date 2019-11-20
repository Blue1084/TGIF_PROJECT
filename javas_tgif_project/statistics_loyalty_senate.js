let statistics = {
    mr: 0,
    md: 0,
    mi: 0,
    avr: 0,
    avd: 0,
    avi: 0,
    lowerpercent: [],
    higherpercent: [],

}

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
        method: "Get",
        headers: {
            "X-API-KEY": "dCpvKNKoJwqTIfHErrWzFSIUakuG3ZaTbcLxbu8k"
        }
    })
    .then(function (response) {
        return response.json()
        // return es para retornar la informacion de la sedunda promesa

    })
    .then(function (data) {
        data.results[0].members
        filtermembers(data.results[0].members);
        averagemisedvotes(data.results[0].members);
        averagemisedv(data.results[0].members);
        sumartotalvotes(data.results[0].members);
        tablecreate(statistics);
        createsecondtable(statistics.higherpercent);
        createthirdtable(statistics.lowerpercent); 
        loader();
        


        




    })
    .catch(function (error) {
        console.log(error);


    })


function filtermembers(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].party === "R") {
            statistics.mr++;
            statistics.avr = statistics.avr + array[i].votes_with_party_pct;


        }
        if (array[i].party === "D") {
            statistics.md++;
            statistics.avd += array[i].votes_with_party_pct;
            //   el "+=" le dice que a lo que ya tenemos (statistics.avd) le añada lo que viene despues del igual.
        }
        if (array[i].party === "I") {
            statistics.mi++;
            statistics.avi += array[i].votes_with_party_pct;
        }








    }


    statistics.avr = statistics.avr / statistics.mr;
    statistics.avd = statistics.avd / statistics.md;
    statistics.avi = statistics.avi / statistics.mi;

    statistics.avr = Math.round(statistics.avr);
    statistics.avd = Math.round(statistics.avd);
    statistics.avi = Math.round(statistics.avi);

    if (statistics.mi === 0) {
        statistics.avi = 0;

    }




    console.log(statistics.mr, statistics.avr);
    console.log(statistics.md, statistics.avd);
    console.log(statistics.mi, statistics.avi);







}



function sortednumber(a, b) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
        return 1;
    }
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
        return -1;
    }
    return 0;
}

function averagemisedvotes(array) {
    let sorted = array.sort(sortednumber).slice();
    console.log(sorted.map(m => m.votes_with_party_pct));


    for (let i = 0; i < sorted.length; i++) {
        if (i <= sorted.length * 0.1) {

            statistics.higherpercent.push(array[i]);

        } else {
            if (sorted[i].votes_with_party_pct == sorted[i + 1].votes_with_party_pct) {
                statistics.higherpercent.push(sorted[i + 1]);
                
            } else {
                break
            }
        }
    }

}


function sortednum(a, b) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
        return -1;
    }
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
        return 1;
    }
    return 0;
}

function averagemisedv(array) {
    let secondsorted = Array.from(array.sort(sortednum));
    console.log(secondsorted.map(m => m.votes_with_party_pct));


    for (let i = 0; i < secondsorted.length; i++) {
        if (i <= secondsorted.length * 0.1) {

            statistics.lowerpercent.push(array[i]);

        } else {
            if (secondsorted[i].votes_with_party_pct == secondsorted[i + 1].votes_with_party_pct) {
                statistics.lowerpercent.push(secondsorted[i + 1]);
                
            } else {
                break
            }
        }
    }


}

let totalvotes = 0;

function sumartotalvotes(array) {

    for (let i = 0; i < array.length; i++) {



        totalvotes += array[i].votes_with_party_pct;



    }

    totalvotes = totalvotes / array.length;

    totalvotes = Math.round(totalvotes);

}
sumartotalvotes(data.results[0].members);




function tablecreate(array) {

    let inserttable = document.getElementById("firsttable");

    let trprimero = document.createElement("tr");
    let democratas = document.createElement("td");
    let celdad = document.createElement("td");
    let votesd = document.createElement("td");
    let trsegundo = document.createElement("tr");
    let republicanos = document.createElement("td");
    let celdar = document.createElement("td");
    let votesr = document.createElement("td");
    let trtercero = document.createElement("tr");
    let independientes = document.createElement("td");
    let celdai = document.createElement("td");
    let votesi = document.createElement("td");
    let trcuarto = document.createElement("tr");
    let total = document.createElement("td");
    let celdatotal = document.createElement("td");
    let votestotal = document.createElement("td");
   

    democratas.innerHTML = "Democrats";
    celdad.innerHTML = statistics.md;
    votesd.innerHTML = statistics.avd;
    republicanos.innerHTML = "Republicans";
    celdar.innerHTML = statistics.mr;
    votesr.innerHTML = statistics.avr;
    independientes.innerHTML = "Independents";
    celdai.innerHTML = statistics.mi;
    votesi.innerHTML = statistics.avi;
    total.innerHTML = "Total"
    celdatotal.innerHTML = statistics.md + statistics.mr + statistics.mi;
    

    

    votestotal.innerHTML = totalvotes;








    trprimero.append(democratas, celdad, votesd);
    trsegundo.append(republicanos, celdar, votesr);
    trtercero.append(independientes, celdai, votesi);
    trcuarto.append(total, celdatotal, votestotal);
    inserttable.append(trprimero, trsegundo, trtercero, trcuarto);

    




}


function createsecondtable(array) {

    let insertsecondtable = document.getElementById('secondtable');
    for (let i = 0; i < array.length; i++) {
        let tr = document.createElement("tr");
        let celdaname = document.createElement("td");
        let celdanumber = document.createElement("td");
        let celdavotes = document.createElement("td");
        let link = document.createElement("a");
        link.innerHTML = (array[i].first_name || "") + " " + (array[i].middle_name || "") + " " + (array[i].last_name || "");
        link.setAttribute("href", array[i].url);

        celdaname.append(link);
        celdanumber.innerHTML = (array[i].missed_votes);
        celdavotes.innerHTML = (array[i].votes_with_party_pct);

        tr.append(celdaname, celdanumber, celdavotes);
        insertsecondtable.append(tr);

    }

}


function createthirdtable(array) {

    let insertthirdtable = document.getElementById('thirdtable');
    for (let i = 0; i < array.length; i++) {
        let tr = document.createElement("tr");
        let celdaname = document.createElement("td");
        let celdanumber = document.createElement("td");
        let celdavotes = document.createElement("td");
        let link = document.createElement("a");
        link.innerHTML = (array[i].first_name || "") + " " + (array[i].middle_name || "") + " " + (array[i].last_name || "")
        link.setAttribute("href", array[i].url);

        celdaname.append(link);
        celdanumber.innerHTML = (array[i].missed_votes);
        celdavotes.innerHTML = (array[i].votes_with_party_pct);

        tr.append(celdaname, celdanumber, celdavotes);
        insertthirdtable.append(tr);

    }

}
function loader() {
    document.getElementById("loading").style.display = "none";



}
