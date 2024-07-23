//Clase Trasporte
class Trasporte {

    static id = 0
    
    constructor (transporteString, agencia, valor, fechaIda, origen, destino, horario){
        //funcion agregada por localstorage para conservar que el id de transporte sea unico en la lista
        let maximo = 0
        listaTransporte.lista.forEach(trasporte =>{
            
            if(maximo <= parseInt(trasporte.id)){
                maximo=parseInt(trasporte.id)
            }

        })
        this.id         = maximo +1
        this.tipo       =   transporteString
        this.agencia    =   capitalizar(agencia)
        this.valor      =   valor
        this.fechaIda   =   fechaIda
        this.origen     =   capitalizar(origen)
        this.destino    =   capitalizar(destino)
        this.horario    =   horario

        
        
    }

    
}

//Clase Restaurant
class Resturant {

    static id = 0

    constructor(nombre, fecha, direccion, valor, ciudad){
        //funcion agregada por localstorage para conservar que el id de restaurant sea unico en la lista
        let maximo = 0
        listaRestaurant.lista.forEach(trasporte =>{
            
            if(maximo <= parseInt(trasporte.id)){
                maximo=parseInt(trasporte.id)
            }            

        })
        this.id         = maximo +1
        this.nombre     =   capitalizar(nombre)
        this.fecha      =   fecha
        this.direccion  =   direccion
        this.valor      =   valor
        this.ciudad     =   capitalizar(ciudad)

        

    }

}

//Clase Hospedaje
class Hospedaje {

    static id = 0

    constructor(hospedajeString, nombre, entrada, salida, valor, direccion, ciudad){
        //funcion agregada por localstorage para conservar que el id de hospedaje sea unico en la lista
        let maximo = 0
        listaHospedaje.lista.forEach(trasporte =>{
            
            if(maximo <= parseInt(trasporte.id)){
                maximo=parseInt(trasporte.id)
            }

        })
        this.id         = maximo +1
        this.tipo       =   hospedajeString
        this.nombre     =   capitalizar(nombre)
        this.entrada    =   entrada
        this.salida     =   salida
        this.valor      =   valor
        this.direccion  =   direccion
        this.ciudad     =   capitalizar(ciudad)

        

    }

}

//listas
class Lista{

    constructor(){
        this.lista  =   []
    }

    agregarElemento(elemento, tipoLista){
        //agrega elemento a la lista
        this.lista.push(elemento)
        //limpia la lista que esta en localStorage y carga la lista con el nuevo elemento
        switch(tipoLista){
            case "transporte":
                localStorage.removeItem("listaTransporte")
                localStorage.setItem("listaTransporte", JSON.stringify(this.lista))
                break;
            case "hospedaje":
                localStorage.removeItem("listaHospedaje")
                localStorage.setItem("listaHospedaje", JSON.stringify(this.lista))
                break;
            default:
                localStorage.removeItem("listaRestaurant")
                localStorage.setItem("listaRestaurant", JSON.stringify(this.lista))
                break;
        }
        
    }

    eliminaElemento(numero, tipoLista){
        //elimina el elemento y carga la lista en el localStorage sin el elemento

        this.lista.splice(numero,1)
        switch(tipoLista){
            case "transporte":
                localStorage.removeItem("listaTransporte")
                localStorage.setItem("listaTransporte", JSON.stringify(this.lista))
                resumenCostos()
                break;
            case "hospedaje":
                localStorage.removeItem("listaHospedaje")
                localStorage.setItem("listaHospedaje", JSON.stringify(this.lista))
                resumenCostos()
                break;
            default:
                localStorage.removeItem("listaRestaurant")
                localStorage.setItem("listaRestaurant", JSON.stringify(this.lista))
                resumenCostos()
                break;
        }
    }

    recuperaLocalStorage(tipoLista){
        //recupera listas del localStorage y las asigna dependiendo si es la de transporte hospedaje o resturant
        let listaRecuperada =[]
        switch(tipoLista){
            case "transporte":
                listaRecuperada = JSON.parse(localStorage.getItem("listaTransporte"))
                this.lista=listaRecuperada
                break;
            case "hospedaje":
                listaRecuperada = JSON.parse(localStorage.getItem("listaHospedaje"))
                this.lista=listaRecuperada
                break;
            default:
                listaRecuperada = JSON.parse(localStorage.getItem("listaRestaurant"))
                this.lista=listaRecuperada
                break;
        }

    }

    
}
//crea listas
const listaTransporte = new Lista()
const listaHospedaje = new Lista()
const listaRestaurant = new Lista()



//agrega un Transporte al final de la lista
const agregaTransporte = () => {

    let tipoTransporte = parseInt(document.getElementById("trans-tipo").value)
    let transporteString = ''
    if ( tipoTransporte>=1 && tipoTransporte<= 5 ){

        switch(tipoTransporte){
            case 1:
                transporteString = 'Avión'
                break;
            case 2:
                transporteString = 'Tren'
                break;
            case 3:
                transporteString = 'Barco'
                break;
            case 4:
                transporteString = 'Automovil'
                break;
            default:
                transporteString = 'Otro'
                break;
        }

        let agencia
        let valor
        if (transporteString == 'Automovil'){

            agencia= 'Particular'
            valor = document.getElementById("trans-valor").value


        }else {

            agencia = document.getElementById("trans-agencia").value
            valor = document.getElementById("trans-valor").value
        }
    
        
        let fechaIda    = document.getElementById("trans-fecha-ida").value  //prompt('Ingrese Fecha de Ida')
        let origen      = document.getElementById("trans-origen").value    //prompt('Ingrese Origen')
        let destino     = document.getElementById("trans-destino").value   //prompt('Ingrese Destino')
        let Horario     = document.getElementById("trans-horario").value   //prompt('Ingrese Horario')

        if (agencia!='' && valor!='' && fechaIda!='' && origen!='' && destino!='' && Horario!=''){


            const transporte = new Trasporte(transporteString, agencia, valor, fechaIda, origen, destino, Horario)

            listaTransporte.agregarElemento(transporte,'transporte')
        }

    }     
    limpiarCampos("transporte")
    resumenCostos()
 

}




//agrega un Hospedaje al final de la lista
const agregaHospedaje = () => {

    let tipoHospedaje = parseInt(document.getElementById("hosp-tipo").value)
    //parseInt(prompt('Ingresa una opcioón de transporte \n 1.-Hotel \n 2.-Hostal \n 3.-Otro'))
    let hospedajeString = ''
    if ( tipoHospedaje>=1 && tipoHospedaje<= 3 ){

        switch(tipoHospedaje){
            case 1:
                hospedajeString = 'Hotel'
                break;
            case 2:
                hospedajeString = 'Hostal'
                break;
            default:
                hospedajeString = 'Otro'
                break;
        }

        let nombre= document.getElementById("hosp-nombre").value    //prompt('Ingrese Nombre del lugar')
        let entrada= document.getElementById("hosp-entrada").value   //prompt('Ingrese Fecha de Ingreso')
        let salida= document.getElementById("hosp-salida").value    //prompt('Ingrese Fecha de Salida')
        let valor= document.getElementById("hosp-valor").value     //prompt('Ingrese Valor')
        let direccion= document.getElementById("hosp-direccion").value //prompt('Ingrese dirección')
        let ciudad= document.getElementById("hosp-ciudad").value    //prompt('Ingrese ciudad')

        if (nombre!='' && entrada!='' && salida!='' && valor!=''){

            const hospedaje = new Hospedaje(hospedajeString, nombre, entrada, salida, valor, direccion, ciudad)
            listaHospedaje.agregarElemento(hospedaje,'hospedaje')
        }         

    }     
    limpiarCampos("hospedaje")
    resumenCostos()
 

}

//agrega un restaurant al final de la lista
const agregaRestaurant = () => {

    let nombre= document.getElementById("rest-nombre").value
    let fecha= document.getElementById("rest-fecha-reserva").value
    let direccion= document.getElementById("rest-direccion").value
    let ciudad= document.getElementById("rest-ciudad").value
    let valor= document.getElementById("rest-valor-aprox").value
    if ( nombre!= '' && fecha!= '' && direccion!= '' && valor!= '' ){

        const restaurant = new Resturant(nombre, fecha, direccion, valor, ciudad)
        listaRestaurant.agregarElemento(restaurant,'restaurant')

    } 
    limpiarCampos("restaurant")
    resumenCostos()


}

//muestra el resumen del viaje en alert y consola
const resumenCostos = () =>{

    let valorTransporte = 0
    let valorHospedaje = 0
    let valorRestaurants = 0
    let valorTotal = 0

    
    let contenedorPrincipal = document.getElementById("contenedorPrincipal")
    let existeTablaTransporte = document.getElementById("results-table-transport")
    if (existeTablaTransporte){
        existeTablaTransporte.remove()
        document.getElementById("valorTotalTrans").remove()
        document.getElementById("tituloListaTransporte").remove()
        
    }
    if (listaTransporte.lista.length > 0){
        

        //textoTransporte.className = "total-label-text";
        //se inicia la tabla y encabezados
        //si la tabla existe la quita y genera denuevo
        
        
        let textoTransporte = document.createElement("span")
        textoTransporte.id = 'tituloListaTransporte'
        textoTransporte.textContent = `Lista de Transporte`
        textoTransporte.className = "total-value-container"
        contenedorPrincipal.append(textoTransporte)

        let tablaTrasnporte = document.createElement("table")
        tablaTrasnporte.id = 'results-table-transport'
        tablaTrasnporte.classList.add('results-table')
        let thead = document.createElement('thead')
        let headerRow = document.createElement('tr')
        let headers = ['Transporte', 'Agencia', 'Fecha Ida', 'Origen', 'Destino', 'Horario', 'Valor', 'Eliminar']
        headers.forEach(headerText => {
            let th = document.createElement('th')
            th.textContent = headerText
            headerRow.appendChild(th)
        });
        thead.appendChild(headerRow)
        tablaTrasnporte.appendChild(thead)
        let tbody = document.createElement('tbody')
        tablaTrasnporte.appendChild(tbody)
        
        contenedorPrincipal.appendChild(tablaTrasnporte)

        //se llena la tabla de transporte
        listaTransporte.lista.forEach(trasporte => {
            //inicia la fila
            let row = document.createElement('tr')

            valorTransporte = valorTransporte + parseFloat(trasporte.valor)
            //genera las celdas y las agrega a la fila
            /*let cellId = document.createElement('td')
            cellId.textContent = parseInt(trasporte.id)
            row.appendChild(cellId)*/
            let cellTipo = document.createElement('td')
            cellTipo.textContent = trasporte.tipo
            row.appendChild(cellTipo)
            let cellAgencia = document.createElement('td')
            cellAgencia.textContent = trasporte.agencia
            row.appendChild(cellAgencia)
            let cellFechaIda = document.createElement('td')
            cellFechaIda.textContent = trasporte.fechaIda
            row.appendChild(cellFechaIda)
            let cellOrigen = document.createElement('td')
            cellOrigen.textContent = trasporte.origen
            row.appendChild(cellOrigen)
            let cellDestino = document.createElement('td')
            cellDestino.textContent = trasporte.destino
            row.appendChild(cellDestino)
            let cellHorario = document.createElement('td')
            cellHorario.textContent = trasporte.horario
            row.appendChild(cellHorario)
            let cellValor = document.createElement('td')
            cellValor.textContent = trasporte.valor
            row.appendChild(cellValor)
            let cellElimina = document.createElement('td')
                let btnEliminar = document.createElement('button')
                btnEliminar.textContent='Eliminar'
                btnEliminar.className='btn-eliminar'
                btnEliminar.value=`transporte-${trasporte.id}`
                cellElimina.append(btnEliminar)
            row.appendChild(cellElimina)
            //agrega la fila a la tabla
            document.querySelector('#results-table-transport tbody').appendChild(row)
            
        })
        agregaEliminarTabla('','')
        creaValoresTotales(contenedorPrincipal, 'Transporte', contenedorPrincipal.querySelector(".results-table-transport"), valorTransporte,'valorTransText', 'valorTotalTrans', 'total-value-container')
    }/*else{
        if (existeTablaTransporte){
            existeTablaTransporte.remove()
            document.getElementById("valorTotalTrans").remove()
            
        }
    }*///fin length transporte
    //fin tabla tranbsporte

    let existeTablaHospedaje = document.getElementById("results-table-hospedaje")
    if (existeTablaHospedaje){
        existeTablaHospedaje.remove()
        document.getElementById("valorTotalHosp").remove()
        document.getElementById("tituloListaHospedaje").remove()
    }
    if(listaHospedaje.lista.length > 0){
        //se inicia la tabla y encabezados
        //si la tabla existe la quita y genera denuevo
        
        
        let textoHospedaje = document.createElement("span")
        textoHospedaje.id = 'tituloListaHospedaje'
        textoHospedaje.textContent = `Lista de Hospedaje`
        textoHospedaje.className = "total-value-container"
        contenedorPrincipal.append(textoHospedaje)

        let tablaHospedaje = document.createElement("table")
        tablaHospedaje.id = 'results-table-hospedaje'
        tablaHospedaje.classList.add('results-table')
        let theadHosp = document.createElement('thead')
        let headerRowHosp = document.createElement('tr')
        let headersHosp = ['Tipo', 'Nombre', 'Dirección', 'Ciudad', 'Entrada', 'Salida', 'Valor', 'Eliminar']
        headersHosp.forEach(headerText => {
            let th = document.createElement('th')
            th.textContent = headerText
            headerRowHosp.appendChild(th)
        });
        theadHosp.appendChild(headerRowHosp)
        tablaHospedaje.appendChild(theadHosp)
        let tbodyHosp = document.createElement('tbody')
        tablaHospedaje.appendChild(tbodyHosp)
        contenedorPrincipal.appendChild(tablaHospedaje)


        listaHospedaje.lista.forEach(hospedaje => {
            
            //inicia la fila
            let row = document.createElement('tr')

            valorHospedaje = valorHospedaje + parseFloat(hospedaje.valor)
            //genera las celdas y las agrega a la fila
           /* let cellId = document.createElement('td')
            cellId.textContent = parseInt(hospedaje.id)
            row.appendChild(cellId)*/
            let cellTipo = document.createElement('td')
            cellTipo.textContent = hospedaje.tipo 
            row.appendChild(cellTipo)
            let cellNombre = document.createElement('td')
            cellNombre.textContent = hospedaje.nombre
            row.appendChild(cellNombre)
            let cellDireccion = document.createElement('td')
            cellDireccion.textContent = hospedaje.direccion
            row.appendChild(cellDireccion)
            let cellCiudad = document.createElement('td')
            cellCiudad.textContent = hospedaje.ciudad 
            row.appendChild(cellCiudad)
            let cellEntrada = document.createElement('td')
            cellEntrada.textContent = hospedaje.entrada
            row.appendChild(cellEntrada)
            let cellSalida = document.createElement('td')
            cellSalida.textContent = hospedaje.salida
            row.appendChild(cellSalida)
            let cellValor = document.createElement('td')
            cellValor.textContent = hospedaje.valor
            row.appendChild(cellValor)
            let cellElimina = document.createElement('td')
                let btnEliminar = document.createElement('button')
                btnEliminar.textContent='Eliminar'
                btnEliminar.className='btn-eliminar'
                btnEliminar.value=`hospedaje-${hospedaje.id}`
                cellElimina.append(btnEliminar)
            row.appendChild(cellElimina)
            //agrega la fila a la tabla
            document.querySelector('#results-table-hospedaje tbody').appendChild(row)

            

        })
        agregaEliminarTabla('','')
        creaValoresTotales(contenedorPrincipal, 'Hospedaje', contenedorPrincipal.querySelector(".results-table-hospedaje"), valorHospedaje,'valorHospText', 'valorTotalHosp', 'total-value-container')
    }/*else{
        
        if (existeTablaHospedaje){
            existeTablaHospedaje.remove()
            document.getElementById("valorTotalHosp").remove()
        }
    }*/
    
    //fin length transporte

    let existeTablaRestaurant = document.getElementById("results-table-restaurant")
    if (existeTablaRestaurant){
        existeTablaRestaurant.remove()
        document.getElementById("valorTotalRest").remove()
        document.getElementById("tituloListaRestaurant").remove()
    }
    if (listaRestaurant.lista.length > 0){
        //se inicia la tabla y encabezados
        //si la tabla existe la quita y genera denuevo
        

        let textoRestaurant = document.createElement("span")
        textoRestaurant.id = 'tituloListaRestaurant'
        textoRestaurant.textContent = `Lista de Restaurant`
        textoRestaurant.className = "total-value-container"
        contenedorPrincipal.append(textoRestaurant)

        let tablaRestaurant = document.createElement("table")
        tablaRestaurant.id = 'results-table-restaurant'
        tablaRestaurant.classList.add('results-table')
        let theadRest = document.createElement('thead')
        let headerRowRest = document.createElement('tr')
        let headersRest = ['Nombre', 'Fecha', 'Dirección', 'Ciudad', 'Valor', 'Eliminar']
        headersRest.forEach(headerText => {
            let th = document.createElement('th')
            th.textContent = headerText
            headerRowRest.appendChild(th)
        });
        theadRest.appendChild(headerRowRest)
        tablaRestaurant.appendChild(theadRest)
        let tbodyRest = document.createElement('tbody')
        tablaRestaurant.appendChild(tbodyRest)
        contenedorPrincipal.appendChild(tablaRestaurant)

        listaRestaurant.lista.forEach(restaurant => {

            //inicia la fila
            let row = document.createElement('tr')

            valorRestaurants = valorRestaurants + parseFloat(restaurant.valor)
            //genera las celdas y las agrega a la fila
          /*  let cellId = document.createElement('td')
            cellId.textContent = parseInt(restaurant.id)
            row.appendChild(cellId)*/
            let cellNombre = document.createElement('td')
            cellNombre.textContent = restaurant.nombre
            row.appendChild(cellNombre)
            let cellFecha = document.createElement('td')
            cellFecha.textContent = restaurant.fecha
            row.appendChild(cellFecha)
            let cellDireccion = document.createElement('td')
            cellDireccion.textContent = restaurant.direccion
            row.appendChild(cellDireccion)
            let cellCiudad = document.createElement('td')
            cellCiudad.textContent = restaurant.ciudad
            row.appendChild(cellCiudad)
            let cellEntrada = document.createElement('td')
            cellEntrada.textContent = restaurant.valor
            row.appendChild(cellEntrada)
            let cellElimina = document.createElement('td')
                let btnEliminar = document.createElement('button')
                btnEliminar.textContent='Eliminar'
                btnEliminar.className='btn-eliminar'
                btnEliminar.value=`restaurant-${restaurant.id}`
                cellElimina.append(btnEliminar)
            row.appendChild(cellElimina)
            //agrega la fila a la tabla
            document.querySelector('#results-table-restaurant tbody').appendChild(row)


        })

        agregaEliminarTabla('','')
        creaValoresTotales(contenedorPrincipal, 'Restaurant', contenedorPrincipal.querySelector(".results-table-restaurant"), valorRestaurants, 'valorRestText', 'valorTotalRest', 'total-value-container')


    }/*else{
        if (existeTablaRestaurant){
            existeTablaRestaurant.remove()
            document.getElementById("valorTotalRest").remove()
        }
    }*/
    //fin if para ver si hay elementos en lista de restaurants


    valorTotal = valorTransporte + valorHospedaje + valorRestaurants
//crea el valor total del viaje y lo agrega sobre todas las tablas
    if(!document.getElementById("valorTotal")){
        let textContainer = document.createElement("div")
        textContainer.id = "valorTotal"
        textContainer.className = "top-text-container"

        let labelElement = document.createElement("span")
        labelElement.textContent = "Valor Actual del viaje: "
        labelElement.className = "label-text"

        let textElement = document.createElement("span")
        textElement.id= "valorTotalText"
        textElement.textContent = valorTotal
        textElement.className = "value-text"

        textContainer.appendChild(labelElement)
        textContainer.appendChild(textElement)

        let container = document.getElementById("contendorForm")
        container.insertBefore(textContainer, container.firstChild)
    }else{
        document.getElementById("valorTotalText").textContent= valorTotal
    }



}



const creaValoresTotales =(contenedorPrincipal, tipoIngreso, contenedor, valor, idValue, idContainer,clasName) =>{

   
    const totalContainer = document.createElement("div")
    totalContainer.id = idContainer //containerId
    totalContainer.className = clasName//"total-value-container"

    // Crear el elemento del label para el valor total
    const totalLabel = document.createElement("span")
    totalLabel.textContent = `Valor ${tipoIngreso}:`
    totalLabel.className = "total-label-text"

    // Crear el elemento de texto para el valor total
    const totalValue = document.createElement("span")
    totalValue.id = idValue //valueId
    totalValue.textContent = valor
    totalValue.className = "total-value-text"

    // Añadir el label y el texto al contenedor del valor total
    totalContainer.appendChild(totalLabel)
    totalContainer.appendChild(totalValue)

    // Insertar el contenedor del valor total en el contenedor principal
    contenedorPrincipal.insertBefore(totalContainer, contenedor)


}



//Muetra elimina el elemento del que fue presionado el eliminar, se genero una funcion por cada uno
//por si en un futuro se requeire generar alguna logica en especifico
const eliminaTransporte = (idElimiar) =>{

    let eliminar = listaTransporte.lista.findIndex(transporte => transporte.id == idElimiar)
    listaTransporte.eliminaElemento(parseInt(eliminar),'transporte')
    //resumenCostos()

}



//Muetra elimina el elemento del que fue presionado el eliminar, se genero una funcion por cada uno
//por si en un futuro se requeire generar alguna logica en especifico
const eliminaRestaurant = (idElimiar) =>{

    
    let eliminar = listaRestaurant.lista.findIndex(restaurant => restaurant.id == idElimiar)
    listaRestaurant.eliminaElemento(parseInt(eliminar),'restaurant')
    //resumenCostos()

}



//Muetra elimina el elemento del que fue presionado el eliminar, se genero una funcion por cada uno
//por si en un futuro se requeire generar alguna logica en especifico
const eliminaHospedaje = (idElimiar) =>{


    let eliminar = listaHospedaje.lista.findIndex(hospedaje => hospedaje.id == idElimiar)
    listaHospedaje.eliminaElemento(parseInt(eliminar),'hospedaje')
    //resumenCostos()

}








//Eventos de la pagina para modificar el HTML

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
    
}

//variables de botones (Fui perdiendo un poco el control del orden con el crecimiento del codigo, perdon por eso)
const botonTransporte = document.getElementById("btnTransporte")
const formTransporte = document.getElementById("formTransporte")
const botonHospedaje = document.getElementById("btnHospedaje")
const formHospedaje = document.getElementById("formHospedaje")
const botonRestaurant = document.getElementById("btnRestaurant")
const formRestaurant = document.getElementById("formRestaurant")
const transOcultar = document.getElementById("trans-ocultar")
const hospOcultar = document.getElementById("hosp-ocultar")
const restOcultar = document.getElementById("rest-ocultar")
const botonResumen = document.getElementById("btnResumen")
const botonResumenCiudad = document.getElementById("btnResumenCiudad")

//cuando se preciona el boton de ver/ocultar detalle (el ocultar detalle deja los valores sumados de las tablas)
botonResumen.onclick = () => {
    //oculta los form  que pudieran estar activos

    ocultaTodo('total') 

}

const ocultaTodo = (tipo) =>{

    formTransporte.style.display="none"
    formHospedaje.style.display="none"
    formRestaurant.style.display="none"
    onOfRestForm = 0
    onOfHospForm = 0
    onOfTransForm = 0

    let tablasResumen 
    
    if(tipo=='total'){
        tablasResumen = document.querySelectorAll("table.results-table")
        listaSpan = document.querySelectorAll("span.total-value-container")
        for (span of listaSpan){
            document.getElementById(span.id).style.display="none"
        }
        listaSpan = document.querySelectorAll("div.total-value-container")
        for (span of listaSpan){
            document.getElementById(span.id).style.display="none"
        }

    }else{
        tablasResumen = document.querySelectorAll("table.results-table-ciudad")
        listaSpan = document.querySelectorAll("span.total-value-container-ciudad")
        for (span of listaSpan){
            document.getElementById(span.id).style.display="none"
        }
        listaSpan = document.querySelectorAll("div.total-value-container-ciudad")
        for (span of listaSpan){
            document.getElementById(span.id).style.display="none"
        }
        
    }
    

    


    let contador = 0
    //oculta las tablas
    for (tabla of tablasResumen){

        if(document.getElementById(tabla.id).style.display==="none"){
            contador ++
        }
        document.getElementById(tabla.id).style.display= "none"

    }
    
    //despliega las tablas
    if(contador == tablasResumen.length){
        for(tabla of tablasResumen){
            document.getElementById(tabla.id).style.display="table"

        }

        if(tipo=='total'){

            listaSpan = document.querySelectorAll("span.total-value-container")
            for (span of listaSpan){
                document.getElementById(span.id).style.display="flex"
            }
            listaSpan = document.querySelectorAll("div.total-value-container")
            for (span of listaSpan){
                document.getElementById(span.id).style.display="flex"
            }
        }else{

            listaSpan = document.querySelectorAll("span.total-value-container-ciudad")
            for (span of listaSpan){
                document.getElementById(span.id).style.display="flex"
            }
            listaSpan = document.querySelectorAll("div.total-value-container-ciudad")
            for (span of listaSpan){
                document.getElementById(span.id).style.display="flex"
            }
        }
    }

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
//funcion que oculta todos los form 
function ocultarForm(){
    formRestaurant.style.display="none"
    formTransporte.style.display="none"
    formHospedaje.style.display="none"
}

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

//fin agregar transporte

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

//fin agregar hospedaje


//funcion que llama a agregar Restaurant
const restaurantSubmit = document.getElementById("rest-enviar")
restaurantSubmit.onclick = () => {

    if(document.getElementById('rest-nombre').value == '' ||
       document.getElementById('rest-fecha-reserva').value == '' ||
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




//limpia campos de los forms
const limpiarCampos = (tipoItem) => {
 
    switch(tipoItem){
        case "transporte":
            document.getElementById("trans-agencia").value=""
            document.getElementById("trans-valor").value=""
            document.getElementById("trans-fecha-ida").value=""
            document.getElementById("trans-origen").value=""
            document.getElementById("trans-destino").value=""
            document.getElementById("trans-horario").value=""
            break;
        case "hospedaje":
            document.getElementById("hosp-nombre").value=""
            document.getElementById("hosp-entrada").value=""
            document.getElementById("hosp-salida").value=""
            document.getElementById("hosp-valor").value=""
            document.getElementById("hosp-direccion").value=""
            document.getElementById("hosp-ciudad").value=""
            break;
        default:
            document.getElementById("rest-nombre").value=""
            document.getElementById("rest-fecha-reserva").value=""
            document.getElementById("rest-direccion").value=""
            document.getElementById("rest-valor-aprox").value=""
            document.getElementById("rest-ciudad").value=""
            break;
                
    }

}

//ventana para preguntar si se quiere conservar la información ingresada o se quiere limpiar al recargar pagina
const conservarListas = () => {

    // Crear el div para el modal
    let botonConservaLista = document.createElement('div')
    botonConservaLista.id = 'divConservaLista'
    botonConservaLista.className = 'modal-conservarlista hidden-conservarlista'

    // Crear el div para el contenido del modal
    let conservaListaContent = document.createElement('div')
    conservaListaContent.className = 'modal-content-conservarlista'

    // Crear el párrafo con el mensaje
    let message = document.createElement('p')
    message.textContent = '¿Desea conservar los datos ingresados Anteriormente?'

    // Crear el contenedor para los botones
    let conservaListaButtons = document.createElement('div')
    conservaListaButtons.className = 'modal-buttons-conservarlista'

    // Crear el botón de "Sí"
    let yesButton = document.createElement('button')
    yesButton.id = 'yes-button'
    yesButton.className = 'option-button-conservarlista'
    yesButton.textContent = 'Sí'

    // Crear el botón de "No"
    let noButton = document.createElement('button')
    noButton.id = 'no-button'
    noButton.className = 'hide-button-conservarlista'
    noButton.textContent = 'No'

    // Añadir los botones al contenedor de botones
    conservaListaButtons.appendChild(yesButton);
    conservaListaButtons.appendChild(noButton);

    // Añadir el mensaje y el contenedor de botones al contenido del modal
    conservaListaContent.appendChild(message);
    conservaListaContent.appendChild(conservaListaButtons);

    // Añadir el contenido del modal al modal
    botonConservaLista.appendChild(conservaListaContent);

    // Añadir el modal al cuerpo del documento
    document.body.appendChild(botonConservaLista);

  //accion si se apreta boton de si
    const conservarListaSi = document.getElementById('yes-button')

    conservarListaSi.onclick = () =>{
        //si se elige conservar informacion anterior carga listas del localStorage, oculta ventana de mantener info y muestra botones
        if (localStorage.getItem("listaTransporte") !=null){
            listaTransporte.recuperaLocalStorage("transporte")
        }
        if (localStorage.getItem("listaHospedaje") !=null){
            listaHospedaje.recuperaLocalStorage("hospedaje")
        }
        if (localStorage.getItem("listaRestaurant") !=null){
            listaRestaurant.recuperaLocalStorage("restaurant")
        }
        document.getElementById('divConservaLista').style.display='none'
        let listaBotones = document.getElementsByClassName('option-button')
        for (const boton of listaBotones){
            boton.style.display='inline'
        }
        //carga tablas resumen de Costos
        resumenCostos()
    }

    //accion si se apreta boton de no
    const conservarListaNo = document.getElementById('no-button')
    conservarListaNo.onclick = () =>{
        //si se preciona no limpia el localStorage, oculta ventana de mantener info y muestra botones
        localStorage.clear() 
        document.getElementById('divConservaLista').style.display='none'
        let listaBotones = document.getElementsByClassName('option-button')
        for (const boton of listaBotones){
            boton.style.display='inline'
        }

    }

}


const agregaEliminarTabla = (filtro,ciudad) =>{

    addButton = document.querySelectorAll(".btn-eliminar")
    addButton.forEach(button =>{
        button.onclick = (e) => {
            let valorBoton = e.currentTarget.value
            let posGuion = valorBoton.indexOf('-')
            let tipoEliminacion = valorBoton.slice(0,posGuion)
            let idEliminar = valorBoton.slice(posGuion+1)
            confirmacioneliminacion(idEliminar,tipoEliminacion,filtro,ciudad)


        }
    })

    
}





/**botones para consultar si esta seguro de acciones */

//ventana para preguntar si se quiere conservar la información ingresada o se quiere limpiar al recargar pagina
const confirmacioneliminacion = (idEliminar, tipoEliminacion, filtro, ciudad) => {

    // Crear el div para el cuadro de eliminacion
    let botonConfirmElim = document.createElement('div')
    botonConfirmElim.id = 'divConnfirmaeliminacion'
    botonConfirmElim.className = 'modal-conservarlista hidden-conservarlista'

    // Crear el div para el contenido del cuadro de eliminacion
    let confirmEliminContent = document.createElement('div')
    confirmEliminContent.className = 'modal-content-conservarlista'

    // Crear el párrafo con el mensaje
    let messageElim = document.createElement('p')
    messageElim.textContent = '¿Esta seguro que desea eliminar el elemento?'

    // Crear el contenedor para los botones
    let confirmElimButtons = document.createElement('div')
    confirmElimButtons.className = 'modal-buttons-conservarlista'

    // Crear el botón de "Sí"
    let yesButtonElim = document.createElement('button')
    yesButtonElim.id = 'yes-button-elim'
    yesButtonElim.className = 'option-button-conservarlista'
    yesButtonElim.textContent = 'Sí'

    // Crear el botón de "No"
    let noButtonElim = document.createElement('button')
    noButtonElim.id = 'no-button-elim'
    noButtonElim.className = 'hide-button-conservarlista'
    noButtonElim.textContent = 'No'

    // Añadir los botones al contenedor de botones
    confirmElimButtons.appendChild(yesButtonElim)
    confirmElimButtons.appendChild(noButtonElim)

    // Añadir el mensaje y el contenedor de botones al contenido del cuadro de eliminacion
    confirmEliminContent.appendChild(messageElim)
    confirmEliminContent.appendChild(confirmElimButtons)

    // Añadir el contenido del modal del cuadro de eliminacion
    botonConfirmElim.appendChild(confirmEliminContent)

    // Añadir el del cuadro de eliminacion
    document.body.appendChild(botonConfirmElim)

  //accion si se apreta boton de si
    const elimDeListaSi = document.getElementById('yes-button-elim')

    elimDeListaSi.onclick = () =>{
        //si se elige elimina el registro
        document.getElementById('divConnfirmaeliminacion').remove()
        switch(tipoEliminacion){
            case "transporte":
                eliminaTransporte(idEliminar)
                break;
            case "hospedaje":
                eliminaHospedaje(idEliminar)
                break;
            default:
                eliminaRestaurant(idEliminar)
                break;
        }
        
        //recarga tablas resumen de Costos
        resumenCostos()
        eliminaTablasCiudad()
    }

    //accion si se apreta boton de no
    const conservarListaNo = document.getElementById('no-button-elim')
    conservarListaNo.onclick = () =>{
        //si se preciona no oculta ventana confirmacion
        document.getElementById('divConnfirmaeliminacion').remove()


    }

}

const eliminaTablasCiudad = () => {

    let existeTablaTransporte = document.getElementById("results-ciudad-table-transport")
    if (existeTablaTransporte){
        existeTablaTransporte.remove()
        document.getElementById("valorTotalTransCiudad").remove()
        document.getElementById("tituloListaTransporteCiudad").remove()
        
        
    }
    let existeTablaHospedaje = document.getElementById("results-ciudad-table-hospedaje")
    if (existeTablaHospedaje){
        existeTablaHospedaje.remove()
        document.getElementById("valorTotalHospCiudad").remove()
        document.getElementById("tituloListaHospedajeCiudad").remove()
    }
    let existeTablaRestaurant = document.getElementById("results-ciudad-table-restaurant")
    if (existeTablaRestaurant){
        existeTablaRestaurant.remove()
        document.getElementById("valorTotalRestCiudad").remove()
        document.getElementById("tituloListaRestaurantCiudad").remove()
    }

}

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





const resumenCostosCiudad = (ciudad) =>{

    let valorTransporte = 0
    let valorHospedaje = 0
    let valorRestaurants = 0
    let valorTotal = 0

    
    let contenedorPrincipal = document.getElementById("contenedorPrincipal")
    let existeTablaTransporte = document.getElementById("results-ciudad-table-transport")
    if (existeTablaTransporte){
        existeTablaTransporte.remove()
        document.getElementById("valorTotalTransCiudad").remove()
        document.getElementById("tituloListaTransporteCiudad").remove()
        
    }
    //se filtra la ciudad para crear la tabla
    listaTransCiudad =  listaTransporte.lista.filter( transport => transport.destino == ciudad)
    if (listaTransCiudad.length > 0){
        //se inicia la tabla y encabezados
        //si la tabla existe la quita y genera denuevo
        
        
        let textoTransporteCiudad = document.createElement("span")
        textoTransporteCiudad.id = 'tituloListaTransporteCiudad'
        textoTransporteCiudad.textContent = `Lista de Transporte de ${ciudad}`
        textoTransporteCiudad.className = "total-value-container-ciudad"
        contenedorPrincipal.append(textoTransporteCiudad)
        
        let tablaTrasnporte = document.createElement("table")
        tablaTrasnporte.id = 'results-ciudad-table-transport'
        tablaTrasnporte.classList.add('results-table-ciudad')
        let thead = document.createElement('thead')
        let headerRow = document.createElement('tr')
        let headers = ['Transporte', 'Agencia', 'Valor', 'Fecha Ida', 'Origen', 'Destino', 'Horario', 'Eliminar']
        headers.forEach(headerText => {
            let th = document.createElement('th')
            th.textContent = headerText
            headerRow.appendChild(th)
        });
        thead.appendChild(headerRow)
        tablaTrasnporte.appendChild(thead)
        let tbody = document.createElement('tbody')
        tablaTrasnporte.appendChild(tbody)
        contenedorPrincipal.appendChild(tablaTrasnporte)

        //se llena la tabla de transporte
        listaTransCiudad.forEach(trasporte => {
            //inicia la fila
            let row = document.createElement('tr')

            valorTransporte = valorTransporte + parseFloat(trasporte.valor)
            //genera las celdas y las agrega a la fila
          /*  let cellId = document.createElement('td')
            cellId.textContent = parseInt(trasporte.id)
            row.appendChild(cellId)*/
            let cellTipo = document.createElement('td')
            cellTipo.textContent = trasporte.tipo
            row.appendChild(cellTipo)
            let cellAgencia = document.createElement('td')
            cellAgencia.textContent = trasporte.agencia
            row.appendChild(cellAgencia)
            let cellValor = document.createElement('td')
            cellValor.textContent = trasporte.valor
            row.appendChild(cellValor)
            let cellFechaIda = document.createElement('td')
            cellFechaIda.textContent = trasporte.fechaIda
            row.appendChild(cellFechaIda)
            let cellOrigen = document.createElement('td')
            cellOrigen.textContent = trasporte.origen
            row.appendChild(cellOrigen)
            let cellDestino = document.createElement('td')
            cellDestino.textContent = trasporte.destino
            row.appendChild(cellDestino)
            let cellHorario = document.createElement('td')
            cellHorario.textContent = trasporte.horario
            row.appendChild(cellHorario)
            let cellElimina = document.createElement('td')
                let btnEliminar = document.createElement('button')
                btnEliminar.textContent='Eliminar'
                btnEliminar.className='btn-eliminar'
                btnEliminar.value=`transporte-${trasporte.id}`
                cellElimina.append(btnEliminar)
            row.appendChild(cellElimina)
            //agrega la fila a la tabla
            document.querySelector('#results-ciudad-table-transport tbody').appendChild(row)
            
        })
        agregaEliminarTabla('filtro', ciudad)
        creaValoresTotales(contenedorPrincipal, 'Transporte', contenedorPrincipal.querySelector(".results-ciudad-table-transport"), valorTransporte ,'valorTransCiudadText', 'valorTotalTransCiudad', 'total-value-container-ciudad')
    }///fin length transporte
    //fin tabla tranbsporte

    let existeTablaHospedaje = document.getElementById("results-ciudad-table-hospedaje")
    if (existeTablaHospedaje){
        existeTablaHospedaje.remove()
        document.getElementById("valorTotalHospCiudad").remove()
        document.getElementById("tituloListaHospedajeCiudad").remove()
    }
    //se filtra la ciudad para crear la tabla
    listaHospCiudad =  listaHospedaje.lista.filter( hospd => hospd.ciudad == ciudad)
    if(listaHospCiudad.length > 0){
        //se inicia la tabla y encabezados
        //si la tabla existe la quita y genera denuevo
        
        let textoHospedajeCiudad = document.createElement("span")
        textoHospedajeCiudad.id = 'tituloListaHospedajeCiudad'
        textoHospedajeCiudad.textContent = `Lista de Hospedaje de ${ciudad}`
        textoHospedajeCiudad.className = "total-value-container-ciudad"
        contenedorPrincipal.append(textoHospedajeCiudad)

        let tablaHospedaje = document.createElement("table")
        tablaHospedaje.id = 'results-ciudad-table-hospedaje'
        tablaHospedaje.classList.add('results-table-ciudad')
        let theadHosp = document.createElement('thead')
        let headerRowHosp = document.createElement('tr')
        let headersHosp = ['Tipo', 'Nombre', 'Dirección', 'Ciudad', 'Entrada', 'Salida', 'Valor', 'Eliminar']
        headersHosp.forEach(headerText => {
            let th = document.createElement('th')
            th.textContent = headerText
            headerRowHosp.appendChild(th)
        });
        theadHosp.appendChild(headerRowHosp)
        tablaHospedaje.appendChild(theadHosp)
        let tbodyHosp = document.createElement('tbody')
        tablaHospedaje.appendChild(tbodyHosp)
        contenedorPrincipal.appendChild(tablaHospedaje)

        
        listaHospCiudad.forEach(hospedaje => {
            
            //inicia la fila
            let row = document.createElement('tr')

            valorHospedaje = valorHospedaje + parseFloat(hospedaje.valor)
            //genera las celdas y las agrega a la fila
          /*  let cellId = document.createElement('td')
            cellId.textContent = parseInt(hospedaje.id)
            row.appendChild(cellId)*/
            let cellTipo = document.createElement('td')
            cellTipo.textContent = hospedaje.tipo 
            row.appendChild(cellTipo)
            let cellNombre = document.createElement('td')
            cellNombre.textContent = hospedaje.nombre
            row.appendChild(cellNombre)
            let cellDireccion = document.createElement('td')
            cellDireccion.textContent = hospedaje.direccion
            row.appendChild(cellDireccion)
            let cellCiudad = document.createElement('td')
            cellCiudad.textContent = hospedaje.ciudad 
            row.appendChild(cellCiudad)
            let cellEntrada = document.createElement('td')
            cellEntrada.textContent = hospedaje.entrada
            row.appendChild(cellEntrada)
            let cellSalida = document.createElement('td')
            cellSalida.textContent = hospedaje.salida
            row.appendChild(cellSalida)
            let cellValor = document.createElement('td')
            cellValor.textContent = hospedaje.valor
            row.appendChild(cellValor)
            let cellElimina = document.createElement('td')
                let btnEliminar = document.createElement('button')
                btnEliminar.textContent='Eliminar'
                btnEliminar.className='btn-eliminar'
                btnEliminar.value=`hospedaje-${hospedaje.id}`
                cellElimina.append(btnEliminar)
            row.appendChild(cellElimina)
            //agrega la fila a la tabla
            document.querySelector('#results-ciudad-table-hospedaje tbody').appendChild(row)

            

        })
        agregaEliminarTabla('filtro', ciudad)
        creaValoresTotales(contenedorPrincipal, 'Hospedaje', contenedorPrincipal.querySelector(".results-ciudad-table-hospedaje"), valorHospedaje,'valorHospCiudadText', 'valorTotalHospCiudad', 'total-value-container-ciudad')
    }
    
    //fin length transporte

    let existeTablaRestaurant = document.getElementById("results-ciudad-table-restaurant")
    if (existeTablaRestaurant){
        existeTablaRestaurant.remove()
        document.getElementById("valorTotalRestCiudad").remove()
        document.getElementById("tituloListaRestaurantCiudad").remove()
    }
    //se filtra la ciudad para crear la tabla
    listaRestCiudad =  listaRestaurant.lista.filter( Rest => Rest.ciudad == ciudad)
    if (listaRestCiudad.length > 0){
        //se inicia la tabla y encabezados
        //si la tabla existe la quita y genera denuevo
        
        
        let textoRestaurantCiudad = document.createElement("span")
        textoRestaurantCiudad.id = 'tituloListaRestaurantCiudad'
        textoRestaurantCiudad.textContent = `Lista de Restaurant de ${ciudad}`
        textoRestaurantCiudad.className = "total-value-container-ciudad"
        contenedorPrincipal.append(textoRestaurantCiudad)


        let tablaRestaurant = document.createElement("table")
        tablaRestaurant.id = 'results-ciudad-table-restaurant'
        tablaRestaurant.classList.add('results-table-ciudad')
        let theadRest = document.createElement('thead')
        let headerRowRest = document.createElement('tr')
        let headersRest = ['Nombre', 'Fecha', 'Dirección', 'Ciudad', 'Valor', 'Eliminar']
        headersRest.forEach(headerText => {
            let th = document.createElement('th')
            th.textContent = headerText
            headerRowRest.appendChild(th)
        });
        theadRest.appendChild(headerRowRest)
        tablaRestaurant.appendChild(theadRest)
        let tbodyRest = document.createElement('tbody')
        tablaRestaurant.appendChild(tbodyRest)
        contenedorPrincipal.appendChild(tablaRestaurant)

        listaRestCiudad.forEach(restaurant => {

            //inicia la fila
            let row = document.createElement('tr')

            valorRestaurants = valorRestaurants + parseFloat(restaurant.valor)
            //genera las celdas y las agrega a la fila
          /*  let cellId = document.createElement('td')
            cellId.textContent = parseInt(restaurant.id)
            row.appendChild(cellId)*/
            let cellNombre = document.createElement('td')
            cellNombre.textContent = restaurant.nombre
            row.appendChild(cellNombre)
            let cellFecha = document.createElement('td')
            cellFecha.textContent = restaurant.fecha
            row.appendChild(cellFecha)
            let cellDireccion = document.createElement('td')
            cellDireccion.textContent = restaurant.direccion
            row.appendChild(cellDireccion)
            let cellCiudad = document.createElement('td')
            cellCiudad.textContent = restaurant.ciudad
            row.appendChild(cellCiudad)
            let cellEntrada = document.createElement('td')
            cellEntrada.textContent = restaurant.valor
            row.appendChild(cellEntrada)
            let cellElimina = document.createElement('td')
                let btnEliminar = document.createElement('button')
                btnEliminar.textContent='Eliminar'
                btnEliminar.className='btn-eliminar'
                btnEliminar.value=`restaurant-${restaurant.id}`
                cellElimina.append(btnEliminar)
            row.appendChild(cellElimina)
            //agrega la fila a la tabla
            document.querySelector('#results-ciudad-table-restaurant tbody').appendChild(row)


        })

        agregaEliminarTabla('filtro', ciudad)
        creaValoresTotales(contenedorPrincipal, 'Restaurant', contenedorPrincipal.querySelector(".results-ciudad-table-restaurant"), valorRestaurants,'valorRestCiudadText', 'valorTotalRestCiudad', 'total-value-container-ciudad')


    }
    //fin if para ver si hay elementos en lista de restaurants


    valorTotal = valorTransporte + valorHospedaje + valorRestaurants



}


const capitalizar = (str) =>{
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

}




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