/** funciones para validar campos */
const valorTransporteForm = document.getElementById('trans-valor')
const labValorTransporteForm = document.getElementById('trans-lab-valor')

const revisaValor = (inputForm, labelform) =>{
    // Crear el mensaje de advertencia
    if (inputForm.value < 0){
        labelform.innerHTML = "El valor no puede ser negativo"
        labelform.style.color = '#ff0022'
        inputForm.style.borderBlockColor = '#ff0022'
        inputForm.style.boxShadow = '0 0 5px #ff0022'
        return false
    }else{
        labelform.innerHTML = "Valor:"
        labelform.style.color = 'black'
        inputForm.style.borderBlockColor = '#007bff'
        inputForm.style.boxShadow = '0 0 5px #007bff'
        return true        
        
    }


}

valorTransporteForm.onkeyup = () =>{

    revisaValor(valorTransporteForm, labValorTransporteForm)

}

valorTransporteForm.onblur = (event) =>{
    if (!revisaValor(valorTransporteForm, labValorTransporteForm)) {
        // Detener el evento de perder el foco
        event.preventDefault();
        // Reenfocar el campo
        valorTransporteForm.focus();
    }
    
}

const valorHospForm = document.getElementById('hosp-valor')
const labValorHospForm = document.getElementById('hosp-lab-valor')

valorHospForm.onkeyup = () =>{

    revisaValor(valorHospForm, labValorHospForm)

}

valorHospForm.onblur = (event) =>{
    if (!revisaValor(valorHospForm, labValorHospForm)) {
        // Detener el evento de perder el foco
        event.preventDefault();
        // Reenfocar el campo
        valorHospForm.focus();
    }
    
}

const valorRestForm = document.getElementById('rest-valor-aprox')
const labValorRestForm = document.getElementById('rest-lab-valor')

valorRestForm.onkeyup = () =>{

    revisaValor(valorRestForm, labValorRestForm)

}

valorRestForm.onblur = (event) =>{
    if (!revisaValor(valorRestForm, labValorRestForm)) {
        // Detener el evento de perder el foco
        event.preventDefault();
        // Reenfocar el campo
        valorRestForm.focus();
    }
    
}


const fechaEntradaHospedajeForm = document.getElementById("hosp-entrada")
const fechaEntradaHospLabelForm = document.getElementById("hosp-label-entrada")
const fechaSalidaHospedajeForm = document.getElementById("hosp-salida")
const fechaSalidaHospLabelForm = document.getElementById("hosp-label-salida")


fechaEntradaHospedajeForm.onchange = () =>{

    revisaFechaEntrada(fechaEntradaHospedajeForm,fechaEntradaHospLabelForm)

}

fechaEntradaHospedajeForm.onblur = (event) => {
    if (!revisaFechaEntrada(fechaEntradaHospedajeForm, fechaEntradaHospLabelForm)) {
        // Detener el evento de perder el foco
        event.preventDefault();
        // Reenfocar el campo
        fechaEntradaHospedajeForm.focus();
    }
}


const revisaFechaEntrada = (inputForm, labelform) =>{
    let ahora = Date.now()
    let fechaActual = new Date(ahora);
    fechaActual.setHours(0, 0, 0, 0);
    //console.log('Fecha actual:', fechaActual.toISOString()); 
    let inputDateValue = inputForm.value;
    let [year, month, day] = inputDateValue.split('-').map(Number);
    let inputDate = new Date(year, month - 1, day);
    inputDate.setHours(0, 0, 0, 0);
   // console.log('Fecha del input:', inputDate.toISOString());


    if(inputDate.getTime() >= fechaActual.getTime()){
        labelform.innerHTML = "Fecha Entrada:"
        labelform.style.color = 'black'
        inputForm.style.borderBlockColor = '#007bff'
        inputForm.style.boxShadow = '0 0 5px #007bff'
        if(fechaEntradaHospedajeForm.value !=""){
            fechaSalidaHospLabelForm.innerHTML = "Fecha Salida:"
            fechaSalidaHospLabelForm.style.color = 'black'
            fechaSalidaHospedajeForm.style.borderBlockColor = '#007bff'
            fechaSalidaHospedajeForm.style.boxShadow = '0 0 5px #007bff'
        }
        return true 
    }else{
        labelform.innerHTML = "La fecha debe ser desde hoy en adelante:"
        labelform.style.color = '#ff0022'
        inputForm.style.borderBlockColor = '#ff0022'
        inputForm.style.boxShadow = '0 0 5px #ff0022'
        return false    
    }

}


fechaSalidaHospedajeForm.onchange = () =>{

    revisaFechaSalida(fechaSalidaHospedajeForm,fechaSalidaHospLabelForm)

}

fechaSalidaHospedajeForm.onblur = (event) => {
    if (!revisaFechaSalida(fechaSalidaHospedajeForm, fechaSalidaHospLabelForm)) {
        // Detener el evento de perder el foco
        event.preventDefault();
        // Reenfocar el campo
        if(fechaEntradaHospedajeForm.value ==""){
            fechaSalidaHospedajeForm.value=""
            fechaEntradaHospedajeForm.focus();
        }else{
            
            fechaSalidaHospedajeForm.focus();
        }
    }
}

const revisaFechaSalida = (inputForm, labelform) =>{
    
   
   if(fechaEntradaHospedajeForm.value ==""){
        labelform.innerHTML = "La fecha de Entrada debe ser llenada:"
        labelform.style.color = '#ff0022'
        inputForm.style.borderBlockColor = '#ff0022'
        inputForm.style.boxShadow = '0 0 5px #ff0022'
        return false   
   }else{
        labelform.innerHTML = "Fecha Salida:"
        labelform.style.color = 'black'
        inputForm.style.borderBlockColor = '#007bff'
        inputForm.style.boxShadow = '0 0 5px #007bff'
   }

   let inputDateValueFin = inputForm.value;
   let [yearFin, monthFin, dayFin] = inputDateValueFin.split('-').map(Number);
   let inputDateFin = new Date(yearFin, monthFin - 1, dayFin);
   inputDateFin.setHours(0, 0, 0, 0);
   //console.log('Fecha actual:', fechaActual.toISOString()); 
   let inputDateValue = fechaEntradaHospedajeForm.value;
   let [year, month, day] = inputDateValue.split('-').map(Number);
   let inputDate = new Date(year, month - 1, day);
   inputDate.setHours(0, 0, 0, 0);



    if(inputDate.getTime() <= inputDateFin.getTime()){
        labelform.innerHTML = "Fecha Salida:"
        labelform.style.color = 'black'
        inputForm.style.borderBlockColor = '#007bff'
        inputForm.style.boxShadow = '0 0 5px #007bff'
        return true 
    }else{
        labelform.innerHTML = "La fecha debe ser Mayoro igual que la de Entrada:"
        labelform.style.color = '#ff0022'
        inputForm.style.borderBlockColor = '#ff0022'
        inputForm.style.boxShadow = '0 0 5px #ff0022'
        return false    
    }

}





const fechaTransForm = document.getElementById("trans-fecha-ida")
const fechaTransLabelForm = document.getElementById("trans-label-fecha")



fechaTransForm.onchange = () =>{
    console.log(fechaTransLabelForm)
    revisaFechaTransporte(fechaTransForm,fechaTransLabelForm)

}

fechaTransForm.onblur = (event) => {
    if (!revisaFechaTransporte(fechaTransForm, fechaTransLabelForm)) {
        // Detener el evento de perder el foco
        event.preventDefault();
        // Reenfocar el campo
        fechaTransForm.focus();
    }
}


const revisaFechaTransporte = (inputForm, labelform) =>{
    let ahora = Date.now()
    let fechaActual = new Date(ahora);
    fechaActual.setHours(0, 0, 0, 0);
  //  console.log('Fecha actual:', fechaActual.toISOString()); 
    let inputDateValue = inputForm.value;
    let [year, month, day] = inputDateValue.split('-').map(Number);
    let inputDate = new Date(year, month - 1, day);
    inputDate.setHours(0, 0, 0, 0);
   // console.log('Fecha del input:', inputDate.toISOString());


    if(inputDate.getTime() >= fechaActual.getTime()){
        labelform.innerHTML = "Fecha de ida:"
        labelform.style.color = 'black'
        inputForm.style.borderBlockColor = '#007bff'
        inputForm.style.boxShadow = '0 0 5px #007bff'
        return true 
    }else{
        labelform.innerHTML = "La fecha debe ser desde hoy en adelante:"
        labelform.style.color = '#ff0022'
        inputForm.style.borderBlockColor = '#ff0022'
        inputForm.style.boxShadow = '0 0 5px #ff0022'
        return false    
    }

}



const fechaRestForm = document.getElementById("rest-fecha-reserva")
const fechaRestLabelForm = document.getElementById("rest-label-fecha")



fechaRestForm.onchange = () =>{
    console.log(fechaTransLabelForm)
    revisaFechaRestaurant(fechaRestForm,fechaRestLabelForm)

}

fechaRestForm.onblur = (event) => {
    if (!revisaFechaRestaurant(fechaRestForm, fechaRestLabelForm)) {
        // Detener el evento de perder el foco
        event.preventDefault();
        // Reenfocar el campo
        fechaRestForm.focus();
    }
}


const revisaFechaRestaurant = (inputForm, labelform) =>{
    let ahora = Date.now()
    let fechaActual = new Date(ahora);
    fechaActual.setHours(0, 0, 0, 0);
  //  console.log('Fecha actual:', fechaActual.toISOString()); 
    let inputDateValue = inputForm.value;
    let [year, month, day] = inputDateValue.split('-').map(Number);
    let inputDate = new Date(year, month - 1, day);
    inputDate.setHours(0, 0, 0, 0);
   // console.log('Fecha del input:', inputDate.toISOString());


    if(inputDate.getTime() >= fechaActual.getTime()){
        labelform.innerHTML = "Fecha Reserva:"
        labelform.style.color = 'black'
        inputForm.style.borderBlockColor = '#007bff'
        inputForm.style.boxShadow = '0 0 5px #007bff'
        return true 
    }else{
        labelform.innerHTML = "La fecha debe ser desde hoy en adelante:"
        labelform.style.color = '#ff0022'
        inputForm.style.borderBlockColor = '#ff0022'
        inputForm.style.boxShadow = '0 0 5px #ff0022'
        return false    
    }

}





const mensajeFormVacio = () =>{
    // Crear el div para el modal
    let botondivFormVacio = document.createElement('div')
    botondivFormVacio.id = 'divFormVacio'
    botondivFormVacio.className = 'modal-FormVacio hidden-FormVacio'

    // Crear el div para el contenido del modal
    let FormVacioContent = document.createElement('div')
    FormVacioContent.className = 'modal-content-FormVacio'

    // Crear el párrafo con el mensaje
    let message = document.createElement('p')
    message.textContent = 'Debe llenar todos los campos'

    // Crear el contenedor para los botones
    let FormVacioButtons = document.createElement('div')
    FormVacioButtons.className = 'modal-buttons-FormVacio'

    // Crear el botón de "Sí"
    let yesButton = document.createElement('button')
    yesButton.id = 'volver-button'
    yesButton.className = 'option-button-FormVacio'
    yesButton.textContent = 'Volver'

    // Añadir los botones al contenedor de botones
    FormVacioButtons.appendChild(yesButton);

    // Añadir el mensaje y el contenedor de botones al contenido del modal
    FormVacioContent.appendChild(message);
    FormVacioContent.appendChild(FormVacioButtons);

    // Añadir el contenido del modal al modal
    botondivFormVacio.appendChild(FormVacioContent);

    // Añadir el modal al cuerpo del documento
    document.body.appendChild(botondivFormVacio);

  //accion si se apreta boton de si
    const FormvVcioVolver = document.getElementById('volver-button')

    FormvVcioVolver.onclick = () =>{
        //si se elige conservar informacion anterior carga listas del localStorage, oculta ventana de mantener info y muestra botones
        document.getElementById('divFormVacio').remove()

    }
}