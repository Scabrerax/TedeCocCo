const fs = require("fs");
const express = require("express");
const router = express.Router();
const shell = require("shelljs");

let objetos = [];
let lineas = [];

function crearArray(csvAsText) {
  let array = csvAsText.split(/\r?\n/);
  let array2 = [];
  for (let i = 0; i < array.length; i++) {
    let separado = array[i].split(",");
    array2.push(separado);
  }
  return array2;
}

function separar(array, objetos, lineas) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][9] === "Arrow") {
      lineas.push(array[i]);
    } else {
      if (array[i][1] === "Objeto") {
        array[i][10] = "1_" + array[i][10];
      }
      objetos.push(array[i]);
    }
  }
}

function sacarlineas(indice, lineas) {
  let lineasInd = [];
  for (let i = 0; i < lineas.length; i++) {
    if (lineas[i][6] === indice.toString()) {
      lineasInd.push(lineas[i][7]);
    }
  }

  return lineasInd;
}

function sacarComponentes(indice, objetos, listaLineas) {
  let resultado = [];
  let id = parseInt(objetos[parseInt(indice)][0]);

  if (
    objetos[id][10] === "select" ||
    objetos[id][10] === "radio" ||
    objetos[id][10] === "checkbox" ||
    objetos[id][10] === "text" ||
    objetos[id][10] === "email" ||
    objetos[id][10] === "password" ||
    objetos[id][10] === "textarea" ||
    objetos[id][10] === "date" ||
    objetos[id][10] === "number"
  ) {
    let nombreComponente = "";
    let hijos = [];
    let listaLineas1 = sacarlineas(id, listaLineas);
    for (let valor of listaLineas1) {
      hijos.push(sacarlineas(valor, listaLineas));
    }

    for (let i = 0; i < listaLineas1.length; i++) {
      let respuesta = nombreComponente + objetos[parseInt(listaLineas1[i])][10];
      for (let j = 0; j < hijos[i].length; j++) {
        respuesta += " " + objetos[parseInt(hijos[i][j])][10];
      }
      if (respuesta.length !== 0) {
        resultado.push(respuesta);
      } else {
        continue;
      }
    }

    return resultado;
  }

  let nombreComponente = objetos[id][10];
  let hijos = [];
  let listaLineas1 = sacarlineas(id, listaLineas);
  for (let valor of listaLineas1) {
    hijos.push(sacarlineas(valor, listaLineas));
  }

  let select = false;
  for (let i = 0; i < listaLineas1.length; i++) {
    let respuesta =
      nombreComponente + " " + objetos[parseInt(listaLineas1[i])][10];
    for (let j = 0; j < hijos[i].length; j++) {
      respuesta += " " + objetos[parseInt(hijos[i][j])][10];
      if (
        objetos[parseInt(hijos[i][j])][10] === "select" ||
        objetos[parseInt(hijos[i][j])][10] === "radio" ||
        objetos[parseInt(hijos[i][j])][10] === "checkbox" ||
        objetos[parseInt(hijos[i][j])][10] === "text" ||
        objetos[parseInt(hijos[i][j])][10] === "email" ||
        objetos[parseInt(hijos[i][j])][10] === "password" ||
        objetos[parseInt(hijos[i][j])][10] === "textarea" ||
        objetos[parseInt(hijos[i][j])][10] === "date" ||
        objetos[parseInt(hijos[i][j])][10] === "number"
      ) {
        select = true;
      }
    }
    if (respuesta.length !== 0) {
      resultado.push(respuesta);
    } else {
      continue;
    }
  }

  if (select === true) {
    let ubicacion = hijos[0][0];
    hijosSelect = sacarComponentes(parseInt(ubicacion), objetos, listaLineas);

    return [resultado + " " + hijosSelect];
  }

  return resultado;
}

function buscar(texto, array) {
  for (let i = 0; i < array.length; i++) {
    let fila = array[i][0].split(" ");
    if (fila[0] === texto) {
      return i;
    }
  }
}

function ordenar(array) {
  let ordenado = [];
  let principal = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i][0][0] === "1") {
      principal = i;
      break;
    }
  }
  let titulo = array[principal][0].split(" ");
  ordenado.push(titulo[0]);

  for (let i = 0; i < array[principal].length; i++) {
    let fila = array[principal][i].split(" ");
    if (
      fila[1] === "Tiene" ||
      fila[1] === "tiene" ||
      fila[1] === "regla" ||
      fila[1] === "Regla"
    ) {
      for (let j = 2; j < fila.length; j++) ordenado.push([fila[j]]);
    }
  }

  for (let i = 1; i < ordenado.length; i++) {
    let hijo = ordenado[i][0];

    let indice = buscar(hijo, array);
    for (let j = 0; j < array[indice].length; j++) {
      let subFila = array[indice][j].split(" ");
      if (
        subFila[1] === "Tiene" ||
        subFila[1] === "tiene" ||
        subFila[1] === "regla" ||
        subFila[1] === "Regla"
      ) {
        for (let k = 2; k < subFila.length; k++) {
          let nietos = subFila[k];
          let subIndice = buscar(nietos, array);
          ordenado[i].push(array[subIndice][0]);
          array[subIndice] = "None";
        }
      }
    }
    array[indice] = "None";
  }

  let tituloModificado = ordenado[0];
  let palabra = "";
  for (let i = 2; i < tituloModificado.length; i++) {
    palabra += tituloModificado[i];
  }
  ordenado[0] = palabra;

  return ordenado;
}

const parseCSV = (csvAsText) => {
  let archivo = crearArray(csvAsText);
  separar(archivo, objetos, lineas);

  let resultado = [];

  for (let valor of objetos) {
    if (valor[1] === "Objeto" || valor[1] === "Proceso") {
      let res = sacarComponentes(valor[0], objetos, lineas);
      if (res.length !== 0) {
        res[0] = res[0].replace(/,/g, " ");
        resultado.push(res);
      }
    }
  }

  return ordenar(resultado);
};

router.put("/", (req, res) => {
  const file = req.body.file;
  res.json({ response: "ERES LA VERGA" });
  const result = JSON.stringify(parseCSV(file));
  fs.writeFileSync("./App/src/config.json", result);
  shell.cd("./App");
  shell.exec("npm run start", { async: true });
});

module.exports = router;
