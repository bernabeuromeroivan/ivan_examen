const actividades = [
  { id: "yoga",     nombre: "Yoga Suave",         duracion: 60, intensidad: "Baja",  imagen: "img/yoga.svg" },
  { id: "spinning", nombre: "Spinning Intensivo", duracion: 45, intensidad: "Alta",  imagen: "img/spinning.svg" },
  { id: "crossfit", nombre: "CrossFit Funcional", duracion: 50, intensidad: "Alta",  imagen: "img/crossfit.svg" },
  { id: "pilates",  nombre: "Pilates Máquinas",   duracion: 55, intensidad: "Media", imagen: "img/pilates.svg" },
  { id: "zumba",    nombre: "Zumba Fitness",      duracion: 40, intensidad: "Media", imagen: "img/zumba.svg" }
];

const franjas = ["09:00", "11:00", "13:00", "17:00", "19:00"];
const reservas = [];

function buscarActividad(id) {
  for (let i = 0; i < actividades.length; i++) {
    if (actividades[i].id === id) {
      return actividades[i];
    }
  }
}

function mostrarActividades() {
  let html = "";
  for (let i = 0; i < actividades.length; i++) {
    let act = actividades[i];
    html += "<tr>";
    html += "  <td><img src='" + act.imagen + "' alt='" + act.nombre + "'></td>";
    html += "  <td>" + act.nombre + "</td>";
    html += "  <td>" + act.duracion + " min</td>";
    html += "  <td>" + act.intensidad + "</td>";
    html += "</tr>";
  }
  document.querySelector("#tablaActividades").innerHTML = html;
}

function rellenarSelectores() {
  let selAct = document.querySelector("#selActividad");
  for (let i = 0; i < actividades.length; i++) {
    selAct.innerHTML += "<option value='" + actividades[i].id + "'>" + actividades[i].nombre + "</option>";
  }

  let selPer = document.querySelector("#selPersonas");
  for (let i = 1; i <= 5; i++) {
    selPer.innerHTML += "<option value='" + i + "'>" + i + "</option>";
  }

  let selFra = document.querySelector("#selFranja");
  for (let i = 0; i < franjas.length; i++) {
    selFra.innerHTML += "<option value='" + franjas[i] + "'>" + franjas[i] + "</option>";
  }
}

function mostrarFranjas() {
  let contenedor = document.querySelector("#franjas");
  let html = "";

  for (let i = 0; i < franjas.length; i++) {
    let hora = franjas[i];
    let textoReservas = "";

    for (let j = 0; j < reservas.length; j++) {
      let r = reservas[j];
      if (r.franja === hora) {
        let act = buscarActividad(r.actividadId);
        let palabra = "personas";
        if (r.personas == 1) {
          palabra = "persona";
        }
        textoReservas += "<p>" + act.nombre + " — " + r.personas + " " + palabra + "</p>";
      }
    }

    if (textoReservas === "") {
      textoReservas = "<p>Sin reservas</p>";
    }

    html += "<div class='tarjeta' onclick='abrirModal(\"" + hora + "\")'>";
    html += "  <h3>" + hora + "</h3>";
    html +=    textoReservas;
    html += "</div>";
  }

  contenedor.innerHTML = html;
}

function abrirModal(hora) {
  document.querySelector("#modalTitulo").textContent = "Detalles de reservas para las " + hora;

  let filas = "";
  let totalMinutos = 0;

  for (let i = 0; i < reservas.length; i++) {
    let r = reservas[i];
    if (r.franja === hora) {
      let act = buscarActividad(r.actividadId);
      let carga = r.personas * act.duracion;
      totalMinutos += carga;

      filas += "<tr>";
      filas += "  <td>" + act.nombre + "</td>";
      filas += "  <td>" + r.personas + "</td>";
      filas += "  <td>" + act.duracion + "</td>";
      filas += "  <td>" + carga + "</td>";
      filas += "</tr>";
    }
  }

  if (filas === "") {
    filas = "<tr><td colspan='4'>Sin reservas</td></tr>";
  }

  document.querySelector("#modalFilas").innerHTML = filas;
  document.querySelector("#modalTotal").textContent = "Total: " + totalMinutos + " minutos";
  document.querySelector("#modal").style.display = "flex";
}

document.querySelector("#btnReservar").onclick = function () {
  let nuevaReserva = {
    actividadId: document.querySelector("#selActividad").value,
    personas: Number(document.querySelector("#selPersonas").value),
    franja: document.querySelector("#selFranja").value
  };
  reservas.push(nuevaReserva);
  mostrarFranjas();
};

document.querySelector("#btnToggle").onclick = function () {
  let izquierda = document.querySelector("#izquierda");
  if (izquierda.style.display === "none") {
    izquierda.style.display = "block";
  } else {
    izquierda.style.display = "none";
  }
};

document.querySelector("#btnCerrar").onclick = function () {
  document.querySelector("#modal").style.display = "none";
};

mostrarActividades();
rellenarSelectores();
mostrarFranjas();