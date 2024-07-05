alert('¿Preparado para organizar tu viaje?')
const mensajePrincipal = 'Ingresa una opción \n 1.-Organizar Viaje \n 2.-Obtener Resumen y Costos \n 3.-Eliminar Item \n 4.-Salir' 
const mensajeOrganizacion = 'Ingresa una opción \n 1.-Ingresar Transporte \n 2.-Ingresar Hospedaje \n 3.-Ingresar restaurant \n 4.-Volver al Menú Principal'
const mensajeEliminacion = 'Ingresa una opción \n 1.-Eliminar un Transporte \n 2.-Eliminar un Hospedaje \n 3.-Eliminar un Resturant \n 4.-Salir' 
let opcionPrincipal = parseInt(prompt(mensajePrincipal))


//Clase Trasporte
class Trasporte {

    static id = 0
    
    constructor (transporteString, agencia, valor, fechaIda, origen, destino, horario){
        this.id         =   ++Trasporte.id
        this.tipo       =   transporteString
        this.agencia    =   agencia
        this.valor      =   valor
        this.fechaIda   =   fechaIda
        this.origen     =   origen
        this.destino    =   destino
        this.horario    =   horario
    }
}

//Clase Restaurant
class Resturant {

    static id = 0

    constructor(nombre, fecha, direccion, valor, ciudad){

        this.id         =   ++Resturant.id
        this.nombre     =   nombre
        this.fecha      =   fecha
        this.direccion  =   direccion
        this.valor      =   valor
        this.ciudad     =   ciudad

    }

}

//Clase Hospedaje
class Hospedaje {

    static id = 0

    constructor(hospedajeString, nombre, entrada, salida, valor, direccion, ciudad){

        this.id         =   ++Hospedaje.id
        this.tipo       =   hospedajeString
        this.nombre     =   nombre
        this.entrada    =   entrada
        this.salida     =   salida
        this.valor      =   valor
        this.direccion  =   direccion
        this.ciudad     =   ciudad

    }

}

//listas
class Lista{

    constructor(){
        this.lista  =   []
    }

    agregarElemento(elemento){
        this.lista.push(elemento)
    }

    eliminaElemento(numero){
        this.lista.splice(numero,1)
    }

}

const listaTransporte = new Lista()
const listaHospedaje = new Lista()
const listaRestaurant = new Lista()


//menu para agregar un transporte hospedaje o Restaurantt
const menuOrganizacion = () => {
    let opcionOrganizacion = parseInt(prompt(mensajeOrganizacion))

    while (opcionOrganizacion !=4){

        switch(opcionOrganizacion){
            case 1:
                agregaTransporte()
                break;
            case 2:
                agregaHospedaje()
                break;
            case 3:
                agregaRestaurant()
                break;
            default:
                alert('Opción no valida')
                break;
        }

        opcionOrganizacion = parseInt(prompt(mensajeOrganizacion))
    }
}


//agrega un Transporte al final de la lista
const agregaTransporte = () => {

    let tipoTransporte = parseInt(prompt('Ingresa una opcioón de transporte \n 1.-Avión \n 2.-Tren \n 3.-Barco \n 4.-Automovil \n 5.-Otro'))
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
            valor= prompt('Ingrese Valor Aprox gastos (bencina, peajes, etc)')

        }else {

            agencia= prompt('Ingrese Agencia')
            valor= prompt('Ingrese Valor de pasaje')

        }
        
        let fechaIda= prompt('Ingrese Fecha de Ida')
        let origen= prompt('Ingrese Origen')
        let destino= prompt('Ingrese Destino')
        let Horario= prompt('Ingrese Horario')

        if (agencia!='' && valor!='' && fechaIda!='' && origen!='' && destino!=''){

            const transporte = new Trasporte(transporteString, agencia, valor, fechaIda, origen, destino, Horario)

            listaTransporte.agregarElemento(transporte)
        }else {

            alert('Se ha ingresado un valor vacio, se redirigira al Menu principal')

        }

    }     

 

}




//agrega un Hospedaje al final de la lista
const agregaHospedaje = () => {

    let tipoHospedaje = parseInt(prompt('Ingresa una opcioón de transporte \n 1.-Hotel \n 2.-Hostal \n 3.-Otro'))
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

        let nombre= prompt('Ingrese Nombre del lugar')
        let entrada= prompt('Ingrese Fecha de Ingreso')
        let salida= prompt('Ingrese Fecha de Salida')
        let valor= prompt('Ingrese Valor')
        let direccion= prompt('Ingrese dirección')
        let ciudad= prompt('Ingrese ciudad')

        if (nombre!='' && entrada!='' && salida!='' && valor!=''){

            const hospedaje = new Hospedaje(hospedajeString, nombre, entrada, salida, valor, direccion, ciudad)
            listaHospedaje.agregarElemento(hospedaje)
        }else {

            alert('Se ha ingresado un valor vacio, se redirigira al Menu principal')

        }            

    }     

 

}

//agrega un restaurant al final de la lista
const agregaRestaurant = () => {

    let nombre= prompt('Ingrese Nombre del lugar')
    let fecha= prompt('Ingrese Fecha Reserva')
    let direccion= prompt('Ingrese Dirección')
    let ciudad= prompt('Ingrese ciudad')
    let valor= prompt('Ingrese Valor')
    if ( nombre!= '' && fecha!= '' && direccion!= '' && valor!= '' ){

        const restaurant = new Resturant(nombre, fecha, direccion, valor, ciudad)
        listaRestaurant.agregarElemento(restaurant)

    } else {
        alert('Se ha ingresado un valor vacio, se redirigira al Menu principal')
    }    



}

//muestra el resumen del viaje en alert y consola
const resumenCostos = () =>{

    let valorTransporte = 0
    let stringTransporte = 'id || tipo || agencia || valor || fechaIda || Horario || origen || destino \n'
    let valorHospedaje = 0
    let stringHospedaje = 'id || tipo || nombre || Dirección || Ciudad || entrada || salida || valor \n'
    let valorRestaurants = 0
    let stringRestaurants = 'id || nombre || fecha || direccion || ciudad || valor \n'
    let valorTotal = 0

    for (const trasporte of listaTransporte.lista){

        valorTransporte = valorTransporte + parseInt(trasporte.valor)
        stringTransporte = stringTransporte + (parseInt(trasporte.id)) +
                            ' || '+ trasporte.tipo +
                            ' || '+ trasporte.agencia +
                            ' || '+ trasporte.valor +
                            ' || '+ trasporte.fechaIda +
                            ' || '+ trasporte.horario +
                            ' || '+ trasporte.origen +
                            ' || '+ trasporte.destino + '\n'

    }
    

    for (const hospedaje of listaHospedaje.lista){

        valorHospedaje = valorHospedaje + parseInt(hospedaje.valor)
        stringHospedaje = stringHospedaje + (parseInt(hospedaje.id)) +
                            ' || '+ hospedaje.tipo +
                            ' || '+ hospedaje.nombre +
                            ' || '+ hospedaje.direccion +
                            ' || '+ hospedaje.ciudad +
                            ' || '+ hospedaje.entrada +
                            ' || '+ hospedaje.salida +
                            ' || '+ hospedaje.valor + '\n'

    }

    for (const restaurant of listaRestaurant.lista){

        valorRestaurants = valorRestaurants + parseInt(restaurant.valor)
        stringRestaurants = stringRestaurants + (parseInt(restaurant.id)) +
                            ' || '+ restaurant.nombre +
                            ' || '+ restaurant.fecha +
                            ' || '+ restaurant.direccion +
                            ' || '+ restaurant.ciudad +
                            ' || '+ restaurant.valor + '\n'

    }

    valorTotal = valorTransporte + valorHospedaje + valorRestaurants

    alert('Resumen Transportes \n' +stringTransporte + '\n' + 'Resumen Hospedaje \n' + stringHospedaje + '\n' + 'Resumen Restaurants \n' + stringRestaurants + '\n El Valor total del viaje es '+ valorTotal )
    console.log('Resumen de transportes')
    console.table(listaTransporte)
    console.log('Resumen de Hospedajes')
    console.table(listaHospedaje)
    console.log('Resumen de Restaurants')
    console.table(listaRestaurant)
    console.log('El Valor total del viaje es '+ valorTotal)

}

//Menu que pregunta que se desea eliminar
const eliminacionItem = () =>{

    let opcionEliminar = parseInt(prompt(mensajeEliminacion))

    while (opcionEliminar !=4){

        switch(opcionEliminar){
            case 1:
                eliminaTransporte()
                break;
            case 2:
                eliminaHospedaje()
                break;
            case 3:
                eliminaRestaurant()
                break;
            default:
                alert('Opción no valida')
                break;
        }

        opcionEliminar = parseInt(prompt(mensajeEliminacion))
    }

}

//Muetra por prompt el listado de Transportes y si se ingresa un valor valido lo quitara
const eliminaTransporte = () =>{

    if (listaTransporte.lista.length != 0){
        let valorTransporte = 0
        let stringTransporte = 'Ingrese el id que desea eliminar \n id || tipo || agencia || valor || fechaIda || Horario || origen || destino \n'

        for (const trasporte of listaTransporte.lista){

            valorTransporte = valorTransporte + parseInt(trasporte.valor)
            stringTransporte = stringTransporte + (parseInt(trasporte.id)) +
                                ' || '+ trasporte.tipo +
                                ' || '+ trasporte.agencia +
                                ' || '+ trasporte.valor +
                                ' || '+ trasporte.fechaIda +
                                ' || '+ trasporte.horario +
                                ' || '+ trasporte.origen +
                                ' || '+ trasporte.destino + '\n'
    
        }


        let buscar = prompt(stringTransporte)
        let eliminar = listaTransporte.lista.findIndex(transporte => transporte.id == buscar)
        listaTransporte.eliminaElemento(eliminar)

    }else{
        alert('No se ha ingresado ningun Transporte')
    }

}



//Muetra por prompt el listado de Restaurants y si se ingresa un valor valido lo quitara
const eliminaRestaurant = () =>{

    if (listaRestaurant.length != 0){
        let valorRestaurants = 0
        let stringRestaurants = 'Ingrese el id que desea eliminar \n id || nombre || fecha || direccion || ciudad || valor \n'

        for (const restaurant of listaRestaurant.lista){

            valorRestaurants = valorRestaurants + parseInt(restaurant.valor)
            stringRestaurants = stringRestaurants + (parseInt(restaurant.id)) +
                                ' || '+ restaurant.nombre +
                                ' || '+ restaurant.fecha +
                                ' || '+ restaurant.direccion +
                                ' || '+ restaurant.ciudad +
                                ' || '+ restaurant.valor + '\n'
    
        }


        let buscar = prompt(stringRestaurants)
        let eliminar = listaRestaurant.lista.findIndex(restaurant => restaurant.id == buscar)
        listaRestaurant.eliminaElemento(eliminar)

    }else{
        alert('No se ha ingresado ningun Restaurant')
    }

}



//Muetra por prompt el listado de hospedajes y si se ingresa un valor valido lo quitara
const eliminaHospedaje = () =>{

    if (listaHospedaje.length != 0){
        let valorHospedaje = 0
        let stringHospedaje = 'Ingrese el id que desea eliminar \n id || tipo || nombre || Dirección || Ciudad || entrada || salida || valor \n'

        for (const hospedaje of listaHospedaje.lista){

            valorHospedaje = valorHospedaje + parseInt(hospedaje.valor)
            stringHospedaje = stringHospedaje + (parseInt(hospedaje.id)) +
                                ' || '+ hospedaje.tipo +
                                ' || '+ hospedaje.nombre +
                                ' || '+ hospedaje.direccion +
                                ' || '+ hospedaje.ciudad +
                                ' || '+ hospedaje.entrada +
                                ' || '+ hospedaje.salida +
                                ' || '+ hospedaje.valor + '\n'
    
        }


        let buscar = prompt(stringHospedaje)
        let eliminar = listaHospedaje.lista.findIndex(hospedaje => hospedaje.id == buscar)
        listaHospedaje.eliminaElemento(eliminar)

    }else{
        alert('No se ha ingresado ningun Hospedaje')
    }

}








//menu principal
while (opcionPrincipal !=4){

    switch(opcionPrincipal){
        case 1:
            menuOrganizacion()
            break;
        case 2:
            alert('Su Resumen aparecera en la siguiente ventana y tambien en la consola')
            resumenCostos()
            break;
        case 3:
            eliminacionItem()
            break;
        default:
            alert('Opción no valida')
            break;
                
    }

    opcionPrincipal = parseInt(prompt(mensajePrincipal))
}


