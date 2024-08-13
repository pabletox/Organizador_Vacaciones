//funcion que llama a agregar transporte

const transporteSubmit = document.getElementById("trans-enviar")
transporteSubmit.onclick = () => {

    if(document.getElementById('trans-tipo').value == '' ||
       document.getElementById('trans-agencia').value == '' ||
       document.getElementById('trans-valor').value == '' ||
       document.getElementById('trans-fecha-ida').value == '' ||
       document.getElementById('trans-origen').value == '' ||
       document.getElementById('trans-destino').value == '' ||
       document.getElementById('trans-horario').value == '' ){

        mensajeFormVacio()

    }else{
        agregaTransporte()
        formTransporte.style.display="none"
    }
    
 

}



//funcion que llama a agregar hospedaje
const hospedajeSubmit = document.getElementById("hosp-enviar")
hospedajeSubmit.onclick = () => {

    if(document.getElementById('hosp-tipo').value == '' ||
       document.getElementById('hosp-nombre').value == '' ||
       document.getElementById('hosp-entrada').value == '' ||
       document.getElementById('hosp-salida').value == '' ||
       document.getElementById('hosp-valor').value == '' ||
       document.getElementById('hosp-direccion').value == '' ||
       document.getElementById('hosp-ciudad').value == '' ){

        mensajeFormVacio()

    }else{

    agregaHospedaje()
    formHospedaje.style.display="none"
    }

}




//funcion que llama a agregar Restaurant
const restaurantSubmit = document.getElementById("rest-enviar")
restaurantSubmit.onclick = () => {

    if(document.getElementById('rest-nombre').value == '' ||
       document.getElementById('rest-fecha-reserva').value == '' ||
       document.getElementById('rest-horario').value == '' ||
       document.getElementById('rest-direccion').value == '' ||
       document.getElementById('rest-valor-aprox').value == '' ||
       document.getElementById('rest-ciudad').value == '' ){
        mensajeFormVacio()

    }else{

    agregaRestaurant()
    formRestaurant.style.display="none"
    }

}

//fin agregar Restaurant



//cambia el texto del valor cuando se selecciona automovil en la lista
const tipoTransport = document.getElementById("trans-tipo")

tipoTransport.onchange = () => {

    if(tipoTransport.value ==4){
        document.getElementById("trans-lab-valor").innerText = "Valor Aprox gastos (bencina, peajes, etc):"
        document.getElementById("trans-agencia").style.display="none"
        document.getElementById("trans-lab-agencia").style.display="none"
    }else{
        document.getElementById("trans-lab-valor").innerText = "Valor:"
        document.getElementById("trans-agencia").style.display="block"
        document.getElementById("trans-lab-agencia").style.display="block"
    }
}

//fin del cambio de texto de automovil


//cuando se preciona el boton de ver/ocultar detalle (el ocultar detalle deja los valores sumados de las tablas)
botonResumen.onclick = () => {
    //oculta los form  que pudieran estar activos

    ocultaTodo('total') 

}





//manejo de formularios oculta y muestra los que correspondan con los clicks
let onOfTransForm = 0
botonTransporte.onclick = () => {
    
     if(onOfTransForm==0){
        formTransporte.style.display="block"
        formHospedaje.style.display="none"
        formRestaurant.style.display="none"
        onOfTransForm = 1
        onOfHospForm = 0
        onOfRestForm = 0
        limpiarCampos("restaurant")
        limpiarCampos("hospedaje")
    }else{
        formTransporte.style.display="none"
        formHospedaje.style.display="none"
        formRestaurant.style.display="none"
        onOfTransForm = 0
        onOfHospForm = 0
        onOfRestForm = 0
        limpiarCampos("transporte")
    }

}

let onOfHospForm = 0
botonHospedaje.onclick = () => {
    if(onOfHospForm==0){
        formHospedaje.style.display="block"
        formTransporte.style.display="none"
        formRestaurant.style.display="none"
        onOfHospForm=1
        onOfRestForm = 0
        onOfTransForm = 0
        limpiarCampos("restaurant")
        limpiarCampos("transporte")
    }else{
        formTransporte.style.display="none"
        formHospedaje.style.display="none"
        formRestaurant.style.display="none"
        onOfHospForm = 0
        onOfRestForm = 0
        onOfTransForm = 0
        limpiarCampos("hospedaje")
    }

}
let onOfRestForm = 0
botonRestaurant.onclick = () => {
    if(onOfRestForm==0){
        formRestaurant.style.display="block"
        formTransporte.style.display="none"
        formHospedaje.style.display="none"
        onOfRestForm=1
        onOfHospForm = 0
        onOfTransForm = 0
        limpiarCampos("hospedaje")
        limpiarCampos("transporte")
    }else{
        formTransporte.style.display="none"
        formHospedaje.style.display="none"
        formRestaurant.style.display="none"
        onOfRestForm = 0
        onOfHospForm = 0
        onOfTransForm = 0
        limpiarCampos("restaurant")
    }
}



//funcionalidad de los botones ocultar
transOcultar.onclick= () => {
    ocultarForm()

}

hospOcultar.onclick= () => {
    ocultarForm()

}

restOcultar.onclick= () => {
    ocultarForm()

}






//genera el resumen cuando se quiere filtrar

botonResumenCiudad.onclick = () => {
    //obtiene las ciudad
    let ciudadMapTrans = listaTransporte.lista.map(item => item.destino)
    let ciudadMapHosp = listaHospedaje.lista.map(item => item.ciudad)
    let ciudadMapRest = listaRestaurant.lista.map(item => item.ciudad)
    //combina arreglos
    let arreglosCombinados = [...ciudadMapTrans,...ciudadMapHosp,...ciudadMapRest]
    //obtiene los unicos
    let ciudadUnicaComb = [...new Set(arreglosCombinados)]
    //orden de la lista
    ciudadUnicaComb.sort()

          // Crear el div para el cuadro de consulta
    let botonSelectCiudad = document.createElement('div')
    botonSelectCiudad.id = 'divConnSelectCiudad'
    botonSelectCiudad.className = 'modal-SelectCiudad hidden-SelectCiudad'

    // Crear el div para el contenido del cuadro de consulta
    let confirmSelectCiudad = document.createElement('div')
    confirmSelectCiudad.className = 'modal-content-SelectCiudad'

    // Crear el párrafo con el mensaje
    let messageSelect = document.createElement('p')
    messageSelect.textContent = 'Elija la ciudad de la que desea el resumen'
    
    //Genera el select
    let selectElement = document.createElement('select');
    selectElement.id  = 'ciudadElegida'
    selectElement.className = 'custom-select'
    for(ciudad of ciudadUnicaComb){
        const optionElement = document.createElement('option')
        optionElement.value = ciudad // valor de la opción
        optionElement.textContent = ciudad // texto visible de la opción
        selectElement.appendChild(optionElement)
    }


    // Crear el contenedor para los botones
    let confirmSelectButtons = document.createElement('div')
    confirmSelectButtons.className = 'modal-buttons-SelectCiudad'

    // Crear el botón de "Sí"
    let yesButtonSelect = document.createElement('button')
    yesButtonSelect.id = 'yes-button-Select'
    yesButtonSelect.className = 'option-button-SelectCiudad'
    yesButtonSelect.textContent = 'Continuar'

    // Crear el botón de "No"
    let noButtonSelect = document.createElement('button')
    noButtonSelect.id = 'no-button-Select'
    noButtonSelect.className = 'hide-button-SelectCiudad'
    noButtonSelect.textContent = 'Limpiar Ciudad'

    // Añadir los botones al contenedor de botones
    confirmSelectButtons.appendChild(yesButtonSelect)
    confirmSelectButtons.appendChild(noButtonSelect)

    // Añadir el mensaje el select y el contenedor de botones al contenido del cuadro de consulta
    confirmSelectCiudad.appendChild(messageSelect)
    confirmSelectCiudad.appendChild(selectElement)
    confirmSelectCiudad.appendChild(confirmSelectButtons)

    // Añadir el contenido del modal del cuadro de consulta
    botonSelectCiudad.appendChild(confirmSelectCiudad)

    // Añadir el del cuadro de consulta
    document.body.appendChild(botonSelectCiudad)

    //accion si se apreta boton de si
    const confirmaCiudadSi = document.getElementById('yes-button-Select')

    confirmaCiudadSi.onclick = () =>{
        //si se elige el registro se llamara a la funcion para que filtre y cree tablas personalizadas
        document.getElementById('divConnSelectCiudad').remove()
        eliminaTablasCiudad()
        /*oculta todo */

        //rescata si hay alguna tabla activa
        let listaSpan = document.querySelectorAll("table.results-table")
        let contActivos = 0
        for (span of listaSpan){
            //si hay alguna tabla activa la cuenta
            if( document.getElementById(span.id).style.display!="none" ){
                contActivos ++
            }
        }
        //si hay algo activo oculta todo para que se muestre solo lo filtrado
        if(  formTransporte.style.display !="none" 
            || formHospedaje.style.display!="none" 
            || formRestaurant.style.display!="none"
            || contActivos > 0){
            ocultaTodo('total') 
        }
        //despliega nuevas tablas
        resumenCostosCiudad(selectElement.value)


    }

    //accion si se apreta boton de no
    const confirmaCiudadNo = document.getElementById('no-button-Select')
    confirmaCiudadNo.onclick = () =>{
        //si se preciona no oculta ventana confirmacion
        eliminaTablasCiudad()
        document.getElementById('divConnSelectCiudad').remove()


    }

    

}




const botonPrincipal = document.getElementById("btnPrincipal")
botonPrincipal.onclick = () => {
    //oculta el boton principal
    botonPrincipal.style.display= "none"
    document.getElementById("textoBienvenida").style.display= "none"
    //obtiene listas del localStorage
    let existListaTransporte = localStorage.getItem("listaTransporte")
    let existListaHospedaje = localStorage.getItem("listaHospedaje")
    let existListaRestaurant = localStorage.getItem("listaRestaurant")
    //si hay listas en el localStorage despliega el mensaje para que decida si dese conservar lo ingresado
    if (existListaTransporte !=null || existListaHospedaje !=null || existListaRestaurant !=null ){
        conservarListas()
    }else{
        //si no hay nada despliega los botones para ingresar items
        let listaBotones = document.getElementsByClassName('option-button')
        for (const boton of listaBotones){
            boton.style.display='inline'
        }
    }
    cargaListaFormTransp()
    cargaListaFormHosp()

   // creaCalendario()
    
}

const botonCalendario = document.getElementById("btnCalendario")
botonCalendario.onclick = () =>{
    window.open('./calendario.html', '_blank');
}