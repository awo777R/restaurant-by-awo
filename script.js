const NUM_MESAS = 8;
let mesas = [];
let reservas = [];

function init(){
  const select = document.getElementById("mesaSelect");

  for(let i=1; i<=NUM_MESAS; i++){
    mesas.push({ num:i });
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = "Mesa " + i;
    select.appendChild(opt);
  }

  renderMesas();
  renderReservas();
}

// Mostrar mesas dinámicamente según fecha/hora seleccionados
function renderMesas(){
  const grid = document.getElementById("gridMesas");
  grid.innerHTML = "";

  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  mesas.forEach(m => {
    let div = document.createElement("div");
    div.className = "mesa";

    // Estado dinámico
    let reservada = reservas.find(r => r.mesa === m.num && r.fecha === fecha && r.hora === hora);

    if(reservada){
      div.classList.add("reservada");
      div.textContent = `Mesa ${m.num}\n(Reservada)`;
    } else {
      div.classList.add("disponible");
      div.textContent = `Mesa ${m.num}\n(Disponible)`;
    }

    grid.appendChild(div);
  });
}

function renderReservas(){
  const lista = document.getElementById("listaReservas");
  lista.innerHTML = "";

  reservas.forEach((r, index) => {
    let li = document.createElement("li");
    li.innerHTML = `<b>${r.nombre}</b> - Mesa ${r.mesa} - ${r.personas} personas - ${r.fecha} ${r.hora}
      <div class="acciones">
        <button class="btn-danger" onclick="cancelarReserva(${index})">Cancelar</button>
      </div>`;
    lista.appendChild(li);
  });
}

function crearReserva(){
  const nombre = document.getElementById("nombre").value.trim();
  const personas = parseInt(document.getElementById("personas").value);
  const mesa = parseInt(document.getElementById("mesaSelect").value);
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  if(!nombre || !fecha || !hora){
    alert("Completa todos los datos");
    return;
  }

  // Verificar si ya existe reserva en esa fecha/hora/mesa
  let existente = reservas.find(r => r.mesa === mesa && r.fecha === fecha && r.hora === hora);
  if(existente){
    alert("Esa mesa ya está reservada en esa fecha y hora.");
    return;
  }

  reservas.push({ nombre, personas, mesa, fecha, hora });

  renderMesas();
  renderReservas();
  document.getElementById("formReserva").reset();
}

function cancelarReserva(index){
  reservas.splice(index, 1);
  renderMesas();
  renderReservas();
}

init();
