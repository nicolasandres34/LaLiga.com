function getFetch2() {

    const url1 = "https://api.football-data.org/v2/competitions/2015/matches"

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
        // console.log(data)

        quitarEspiner()


        let partidos = data.matches

        tabla(partidos)

        let buscar = document.getElementById("buscador")
        buscar.addEventListener("keyup", () => {

            let tablaDePartidos = document.getElementById("tbody")
            tablaDePartidos.innerHTML = ""

            datosFiltrados(partidos)

        })

    }).catch(err => {
        alert("ERROR, Por favor vuelva a cargar la pagina")
    })

}

getFetch2()

function tabla(dePartidos) {

    let cuerpoTabla = document.getElementById("tbody")

    for (let i = 0; i < dePartidos.length; i++) {
        const tr = document.createElement("tr")

        let resultados = dePartidos[i].score.fullTime.homeTeam + "-" + dePartidos[i].score.fullTime.awayTeam;
        if (resultados === "null-null") {
            resultados = "Por jugar"
        } else {
            resultados.textContent = dePartidos[i].score.fullTime.homeTeam + "-" + dePartidos[i].score.fullTime.awayTeam;
        }

        let imgEqLocal = document.createElement("img")
        imgEqLocal.setAttribute("src", "https://crests.football-data.org/" + dePartidos[i].homeTeam.id + ".svg")
        imgEqLocal.classList.add("imagen")

        let imgEqVisita = document.createElement("img")
        imgEqVisita.setAttribute("src", "https://crests.football-data.org/" + dePartidos[i].awayTeam.id + ".svg")
        imgEqVisita.classList.add("imagen")

        let nomEqLocal = document.createElement("p")
        nomEqLocal.innerHTML = dePartidos[i].homeTeam.name;

        let nomEqVisita = document.createElement("p")
        nomEqVisita.innerHTML = dePartidos[i].awayTeam.name;

        let jornada = document.createElement("p")
        jornada.innerHTML = dePartidos[i].matchday;

        let fecha = document.createElement("p")
        fecha.innerHTML = dePartidos[i].utcDate;

        let datosPartido = [jornada, imgEqLocal, nomEqLocal, resultados, nomEqVisita, imgEqVisita, fecha]

        for (let x = 0; x < datosPartido.length; x++) {
            const td = document.createElement("td")
            td.append(datosPartido[x]);
            tr.appendChild(td)
        }
        cuerpoTabla.appendChild(tr)
    }
}


function datosFiltrados(partidos) {
    let datoInput = document.getElementById("buscador").value

    let arrayFiltrada = partidos.filter((p) => {
        if (p.homeTeam.name.toLowerCase().includes(datoInput.toLowerCase()) || p.awayTeam.name.toLowerCase().includes(datoInput.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    })

    tabla(arrayFiltrada)
}

function mostrarEspiner() {
    document.getElementById("spinner").style.visibility = "visible";
}

function quitarEspiner(){
    document.getElementById("spinner").style.display = "none";
}