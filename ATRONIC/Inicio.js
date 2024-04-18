const nuevaTransaccionForm = document.getElementById('nueva-transaccion');
const listaTransacciones = document.getElementById('lista-transacciones');
const presupuestoMensualInput = document.getElementById('presupuesto-mensual');
const presupuestoRestanteSpan = document.getElementById('restante');

let presupuestoMensual = 0;
let gastosTotales = 0;

// Event listener para agregar transacciones
nuevaTransaccionForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const fecha = document.getElementById('fecha').value;
  const tipo = document.getElementById('tipo').value;
  const descripcion = document.getElementById('descripcion').value;
  const cantidad = parseFloat(document.getElementById('cantidad').value);

  agregarTransaccion(fecha, tipo, descripcion, cantidad);
  nuevaTransaccionForm.reset();
});

// Función para agregar transacción y actualizar total de gastos
function agregarTransaccion(fecha, tipo, descripcion, cantidad) {
  const nuevaFila = listaTransacciones.tBodies[0].insertRow();
  
  nuevaFila.insertCell().textContent = fecha;
  nuevaFila.insertCell().textContent = tipo;
  nuevaFila.insertCell().textContent = descripcion;
  nuevaFila.insertCell().textContent = cantidad;

  if (tipo === 'gasto') {
    gastosTotales += cantidad;
  } else {
    gastosTotales -= cantidad; // Esto reduce el gasto total si es un ingreso
  }

  calcularPresupuestoRestante();
}

// Event listener para actualizar el presupuesto mensual
presupuestoMensualInput.addEventListener('input', function() {
  presupuestoMensual = parseFloat(presupuestoMensualInput.value);
  calcularPresupuestoRestante();
});

// Función para calcular y mostrar el presupuesto restante
function calcularPresupuestoRestante() {
  const presupuestoRestante = presupuestoMensual - gastosTotales;
  presupuestoRestanteSpan.textContent = presupuestoRestante.toFixed(2);
}

function genPDF() {
  // Seleccionar el elemento que contiene el contenido que deseas convertir a PDF
  var element = document.querySelector('.contenedor');

  // Opciones de configuración para la generación de PDF
  var opt = {
      margin:       1,
      filename:     'Informe_Transacciones.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'pt', format: 'letter', orientation: 'portrait' }
  };

  // Convierte el contenido HTML a PDF utilizando html2pdf
  html2pdf().from(element).set(opt).save();

}