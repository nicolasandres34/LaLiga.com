function getFetch() {
    const url1 = "https://api.football-data.org/v2/competitions/2014/standings"

    mostrarEspiner()

    fetch(url1, {
        method: "GET",
        headers: {
            "X-Auth-Token": "8117824b1108420d80f4b6555e8f2510"
        }
    }).then(response => {    
        // console.log(response)
        if (response.ok) {
            return response.json();
        }

    }).then(data => {

        quitarEspiner()
        // console.log(data)
        let equipos = data.standings[0].table;

        tabla2(equipos)

    }).catch(err => {
        alert("ERROR, Por favor vuelva a cargar la pagina")
    })

}

getFetch()

function tabla2(clasif) {

    let cuerpotabla2 = document.getElementById("tbody2")

    for (let i = 0; i < clasif.length; i++) {
        const tr = document.createElement("tr")

        let equipoImg = document.createElement("img");
        equipoImg.setAttribute("src", clasif[i].team.crestUrl);
        equipoImg.classList.add("imagen");

        let equipo = document.createElement("p")
        equipo.innerHTML = clasif[i].team.name;

        let posicion = document.createElement("p")
        posicion.innerHTML = clasif[i].position;

        let pj = document.createElement("p")
        pj.innerHTML = clasif[i].playedGames;

        let v = document.createElement("p")
        v.innerHTML = clasif[i].won;

        let e = document.createElement("p")
        e.innerHTML = clasif[i].draw;

        let d = document.createElement("p")
        d.innerHTML = clasif[i].lost;

        let gf = document.createElement("p")
        gf.innerHTML = clasif[i].goalsFor;

        let gc = document.createElement("p")
        gc.innerHTML = clasif[i].goalsAgainst;

        let dg = document.createElement("p")
        dg.innerHTML = clasif[i].goalDifference;

        let pts = document.createElement("p")
        pts.innerHTML = clasif[i].points;

        // console.log(equipo);
        // console.log(posicion);
        // console.log(pj);
        // console.log(v);
        // console.log(e);
        // console.log(d);
        // console.log(gf);
        // console.log(gc);
        // console.log(dg);
        // console.log(pts);

        let datosP = [posicion, equipoImg, equipo, pj, v, e, d, gf, gc, dg, pts]

        for (let y = 0; y < datosP.length; y++) {
            const td = document.createElement("td")
            td.append(datosP[y]);
            tr.appendChild(td)

        }

        cuerpotabla2.appendChild(tr)

    }

}

function mostrarEspiner() {
    document.getElementById("spinner").style.visibility = "visible";
}

function quitarEspiner(){
    document.getElementById("spinner").style.display = "none";
}

// tabla2(posiciones.standings[0].table)