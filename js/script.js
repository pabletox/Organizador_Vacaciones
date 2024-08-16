

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

    constructor(nombre, fecha, direccion, valor, ciudad, horario){
        //funcion agregada por localstorage para conservar que el id de restaurant sea unico en la lista
        let maximo = 0
        listaRestaurant.lista.forEach(restaurant =>{
            
            if(maximo <= parseInt(restaurant.id)){
                maximo=parseInt(restaurant.id)
            }            

        })
        this.id         = maximo +1
        this.nombre     =   capitalizar(nombre)
        this.fecha      =   fecha
        this.direccion  =   direccion
        this.valor      =   valor
        this.ciudad     =   capitalizar(ciudad)
        this.horario    =   horario

        

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
                return true
            case "hospedaje":
                localStorage.removeItem("listaHospedaje")
                localStorage.setItem("listaHospedaje", JSON.stringify(this.lista))
                return true
            case "restaurant":
                localStorage.removeItem("listaRestaurant")
                localStorage.setItem("listaRestaurant", JSON.stringify(this.lista))
                return true
            default:
                return false
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
                return true
            case "hospedaje":
                localStorage.removeItem("listaHospedaje")
                localStorage.setItem("listaHospedaje", JSON.stringify(this.lista))
                resumenCostos()
                return true
            case "restaurant":
                localStorage.removeItem("listaRestaurant")
                localStorage.setItem("listaRestaurant", JSON.stringify(this.lista))
                resumenCostos()
                return true
            default:
                return false
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
    
        
        let fechaIda    = document.getElementById("trans-fecha-ida").value  
        let origen      = document.getElementById("trans-origen").value    
        let destino     = document.getElementById("trans-destino").value   
        let Horario     = document.getElementById("trans-horario").value   

        if (agencia!='' && valor!='' && fechaIda!='' && origen!='' && destino!='' && Horario!=''){


            
            try{
                const transporte = new Trasporte(transporteString, agencia, valor, fechaIda, origen, destino, Horario)
                if(listaTransporte.agregarElemento(transporte,'transporte')){
                    Swal.fire({
                        title: 'Exito!',
                        text: 'Se ha agregado correctamente el transporte',
                        icon: 'success',
                        confirmButtonText: 'Continuar'
                    })
                }else {
                    throw new Error("No se pudo insertar el objeto")
                }
            } catch(err){
                Swal.fire({
                    title: 'Error!',
                    text: 'No Se ha agregado el transporte',
                    icon: 'error',
                    confirmButtonText: 'Continuar'
                })
            }
            
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

        let nombre= document.getElementById("hosp-nombre").value    
        let entrada= document.getElementById("hosp-entrada").value   
        let salida= document.getElementById("hosp-salida").value    
        let valor= document.getElementById("hosp-valor").value     
        let direccion= document.getElementById("hosp-direccion").value 
        let ciudad= document.getElementById("hosp-ciudad").value    

        if (nombre!='' && entrada!='' && salida!='' && valor!=''){

            try{
                const hospedaje = new Hospedaje(hospedajeString, nombre, entrada, salida, valor, direccion, ciudad)
                if(listaHospedaje.agregarElemento(hospedaje,'hospedaje')){
                    Swal.fire({
                        title: 'Exito!',
                        text: 'Se ha agregado correctamente el hospedaje',
                        icon: 'success',
                        confirmButtonText: 'Continuar'
                      })
                }else {
                    throw new Error("No se pudo insertar el objeto")
                }
            } catch(err){
                Swal.fire({
                    title: 'Error!',
                    text: 'No Se ha agregado el hospedaje',
                    icon: 'error',
                    confirmButtonText: 'Continuar'
                })
            }
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
    let horario = document.getElementById("rest-horario").value
    if ( nombre!= '' && fecha!= '' && direccion!= '' && valor!= '' ){

        try{
            const restaurant = new Resturant(nombre, fecha, direccion, valor, ciudad, horario)
            if(listaRestaurant.agregarElemento(restaurant,'restaurant')){
                Swal.fire({
                    title: 'Exito!',
                    text: 'Se ha agregado correctamente el Restaurant',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                  })
            }else {
                throw new Error("No se pudo insertar el objeto")
            }
        } catch(err){
            Swal.fire({
                title: 'Error!',
                text: 'No Se ha agregado el Restaurant',
                icon: 'error',
                confirmButtonText: 'Continuar'
            })
        }

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
        let headersRest = ['Nombre', 'Fecha', 'Horario', 'Dirección', 'Ciudad', 'Valor', 'Eliminar']
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
            let cellHorario = document.createElement('td')
            cellHorario.textContent = restaurant.horario
            row.appendChild(cellHorario)
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

    try{
        let eliminar = listaTransporte.lista.findIndex(transporte => transporte.id == idElimiar)
        if(listaTransporte.eliminaElemento(parseInt(eliminar),'transporte')){
            Swal.fire({
                title: 'Exito!',
                text: 'Se ha eliminado correctamente el transporte',
                icon: 'success',
                confirmButtonText: 'Continuar'
            })
        }else{
            throw new Error("No se pudo eliminar el objeto")
        }
    }catch {
        Swal.fire({
            title: 'Exito!',
            text: 'No Se pudo eliminar el transporte',
            icon: 'error',
            confirmButtonText: 'Continuar'
        })
    }
    //resumenCostos()

}



//Muetra elimina el elemento del que fue presionado el eliminar, se genero una funcion por cada uno
//por si en un futuro se requeire generar alguna logica en especifico
const eliminaRestaurant = (idElimiar) =>{

    try{
        let eliminar = listaRestaurant.lista.findIndex(restaurant => restaurant.id == idElimiar)
        if(listaRestaurant.eliminaElemento(parseInt(eliminar),'restaurant')){
            Swal.fire({
                title: 'Exito!',
                text: 'Se ha eliminado correctamente el restaurant',
                icon: 'success',
                confirmButtonText: 'Continuar'
              })
        }else{
            throw new Error("No se pudo eliminar el objeto")
        }
    }catch {
        Swal.fire({
            title: 'Exito!',
            text: 'No Se pudo eliminar el Restaurant',
            icon: 'error',
            confirmButtonText: 'Continuar'
        })
    }

}



//Muetra elimina el elemento del que fue presionado el eliminar, se genero una funcion por cada uno
//por si en un futuro se requeire generar alguna logica en especifico
const eliminaHospedaje = (idElimiar) =>{

    try{
        let eliminar = listaHospedaje.lista.findIndex(hospedaje => hospedaje.id == idElimiar)
        if(listaHospedaje.eliminaElemento(parseInt(eliminar),'hospedaje')){
            Swal.fire({
                title: 'Exito!',
                text: 'Se ha eliminado correctamente el hospedaje',
                icon: 'success',
                confirmButtonText: 'Continuar'
              })
        }else{
            throw new Error("No se pudo eliminar el objeto")
        }
    }catch {
        Swal.fire({
            title: 'Exito!',
            text: 'No Se pudo eliminar el hospedaje',
            icon: 'error',
            confirmButtonText: 'Continuar'
        })
    }

}










//variables de botones 
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





//funcion que oculta todos los form 
function ocultarForm(){
    formRestaurant.style.display="none"
    formTransporte.style.display="none"
    formHospedaje.style.display="none"
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

    console.log(localStorage.getItem("listaTransporte"))
    console.log(localStorage.getItem("listaHospedaje"))
    console.log(localStorage.getItem("listaRestaurant"))



    if (((localStorage.getItem("listaTransporte") !=null) && (localStorage.getItem("listaTransporte") !="[]")) ||
        ((localStorage.getItem("listaHospedaje") !=null) &&  (localStorage.getItem("listaHospedaje") !="[]")) ||
        ((localStorage.getItem("listaRestaurant") !=null) && (localStorage.getItem("listaRestaurant") !="[]")) ){

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
    }else{
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
        let headersRest = ['Nombre', 'Fecha', 'Horario', 'Dirección', 'Ciudad', 'Valor', 'Eliminar']
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
            let cellHorario = document.createElement('td')
            cellHorario.textContent = restaurant.horario
            row.appendChild(cellHorario)
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





//carga lista del form de transporte
const cargaListaFormTransp = () => {
    let selectTrans = document.getElementById('trans-tipo');

    fetch("./db/transportes.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(trans => {
            let opcion = document.createElement("option")
            opcion.textContent=trans.nombre
            opcion.value=trans.id

            selectTrans.appendChild(opcion)
        })
    })

}

//carga lista del form de hospedaje
const cargaListaFormHosp = () => {
    let selectHosp = document.getElementById('hosp-tipo');

    fetch("./db/hospedaje.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(hosp => {
            let opcion = document.createElement("option")
            opcion.textContent=hosp.nombre
            opcion.value=hosp.id

            selectHosp.appendChild(opcion)
        })
    })

}






