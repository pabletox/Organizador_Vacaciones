alert('¿Preparado para organizar tu viaje?')
const mensajePrincipal = 'Ingresa una opción \n 1.-Organizar Viaje \n 2.-Obtener Resumen y Costos \n 3.-Eliminar Item \n 4.-Salir' 
const mensajeOrganizacion = 'Ingresa una opción \n 1.-Ingresar Transporte \n 2.-Ingresar Hospedaje \n 3.-Ingresar restaurant \n 4.-Volver al Menú Principal'
const mensajeEliminacion = 'Ingresa una opción \n 1.-Eliminar un Transporte \n 2.-Eliminar un Hospedaje \n 3.-Eliminar un Resturant \n 4.-Salir' 
const listaTransporte = []
const listaHospedaje = []
const listaRestaurant = []
let opcionPrincipal = parseInt(prompt(mensajePrincipal))


//menu para agregar un transporte hospedaje o Restaurant
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

        let agencia= prompt('Ingrese Agencia')
        let valor= prompt('Ingrese Valor')
        let fechaIda= prompt('Ingrese Fecha de Ida')
        let origen= prompt('Ingrese Origen')
        let destino= prompt('Ingrese Destino')

        if (agencia!='' && valor!='' && fechaIda!='' && origen!='' && destino!=''){
            const transporte = {
                tipo: transporteString,
                agencia: agencia,
                valor: valor,
                fechaIda: fechaIda,
                origen: origen,
                destino: destino
            }

            listaTransporte.push(transporte)
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

        if (nombre!='' && entrada!='' && salida!='' && valor!=''){
            const hospedaje = {
                tipo: hospedajeString,
                nombre: nombre,
                entrada: entrada,
                salida: salida,
                valor: valor
            }

            listaHospedaje.push(hospedaje)
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
    let valor= prompt('Ingrese Valor')
    if ( nombre!= '' && fecha!= '' && direccion!= '' && valor!= '' ){

        const restaurant = {
            nombre: nombre,
            fecha: fecha,
            direccion: direccion,
            valor: valor
        }

        listaRestaurant.push(restaurant)

    } else {
        alert('Se ha ingresado un valor vacio, se redirigira al Menu principal')
    }    



}

//muestra el resumen del viaje en alert y consola
const resumenCostos = () =>{

    let valorTransporte = 0
    let stringTransporte = 'id || tipo || agencia || valor || fechaIda || origen || destino \n'
    let valorHospedaje = 0
    let stringHospedaje = 'id || tipo || nombre || entrada || salida || valor \n'
    let valorRestaurants = 0
    let stringRestaurants = 'id || nombre || fecha || direccion || valor \n'
    let valorTotal = 0

    for (let i =0 ; i<listaTransporte.length ; i++){
        
        valorTransporte = valorTransporte + parseInt(listaTransporte[i].valor)
        stringTransporte = stringTransporte + (parseInt(i)+1) +
                            ' || '+ listaTransporte[i].tipo +
                            ' || '+ listaTransporte[i].agencia +
                            ' || '+ listaTransporte[i].valor +
                            ' || '+ listaTransporte[i].fechaIda +
                            ' || '+ listaTransporte[i].origen +
                            ' || '+ listaTransporte[i].destino + '\n'

    }

    for (let i =0 ; i<listaHospedaje.length ; i++){
        
        valorHospedaje = valorHospedaje + parseInt(listaHospedaje[i].valor)
        stringHospedaje = stringHospedaje + (parseInt(i)+1) +
                            ' || '+ listaHospedaje[i].tipo +
                            ' || '+ listaHospedaje[i].nombre +
                            ' || '+ listaHospedaje[i].entrada +
                            ' || '+ listaHospedaje[i].salida +
                            ' || '+ listaHospedaje[i].valor + '\n'

    }

    for (let i =0 ; i<listaRestaurant.length ; i++){
        
        valorRestaurants = valorRestaurants + parseInt(listaRestaurant[i].valor)
        stringRestaurants = stringRestaurants + (parseInt(i)+1) +
                            ' || '+ listaRestaurant[i].nombre +
                            ' || '+ listaRestaurant[i].fecha +
                            ' || '+ listaRestaurant[i].direccion +
                            ' || '+ listaRestaurant[i].valor + '\n'

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

    if (listaTransporte.length != 0){
        let valorTransporte = 0
        let stringTransporte = 'Ingrese el id que desea eliminar \n id || tipo || agencia || valor || fechaIda || origen || destino \n'

        for (let i =0 ; i<listaTransporte.length ; i++){
            
            valorTransporte = valorTransporte + parseInt(listaTransporte[i].valor)
            stringTransporte = stringTransporte + (parseInt(i)) +
                                ' || '+ listaTransporte[i].tipo +
                                ' || '+ listaTransporte[i].agencia +
                                ' || '+ listaTransporte[i].valor +
                                ' || '+ listaTransporte[i].fechaIda +
                                ' || '+ listaTransporte[i].origen +
                                ' || '+ listaTransporte[i].destino + '\n'

        }

        //alert('Resumen Transportes \n' + stringTransporte )
        let eliminar = parseInt(prompt(stringTransporte))

        listaTransporte.splice(eliminar,1)

    }else{
        alert('No se ha ingresado ningun Hospedaje')
    }

}



//Muetra por prompt el listado de Restaurants y si se ingresa un valor valido lo quitara
const eliminaRestaurant = () =>{

    if (listaRestaurant.length != 0){
        let valorRestaurants = 0
        let stringRestaurants = 'Ingrese el id que desea eliminar \n id || nombre || fecha || direccion || valor \n'

        for (let i =0 ; i<listaRestaurant.length ; i++){
        
            valorRestaurants = valorRestaurants + parseInt(listaRestaurant[i].valor)
            stringRestaurants = stringRestaurants + (parseInt(i)) +
                                ' || '+ listaRestaurant[i].nombre +
                                ' || '+ listaRestaurant[i].fecha +
                                ' || '+ listaRestaurant[i].direccion +
                                ' || '+ listaRestaurant[i].valor + '\n'
    
        }

        //alert('Resumen Transportes \n' + stringTransporte )
        let eliminar = parseInt(prompt(stringRestaurants))

        listaRestaurant.splice(eliminar,1)

    }else{
        alert('No se ha ingresado ningun Restaurant')
    }

}



//Muetra por prompt el listado de hospedajes y si se ingresa un valor valido lo quitara
const eliminaHospedaje = () =>{

    if (listaHospedaje.length != 0){
        let valorHospedaje = 0
        let stringHospedaje = 'Ingrese el id que desea eliminar \n id || tipo || nombre || entrada || salida || valor \n'

        for (let i =0 ; i<listaHospedaje.length ; i++){
        
            valorHospedaje = valorHospedaje + parseInt(listaHospedaje[i].valor)
            stringHospedaje = stringHospedaje + (parseInt(i)) +
                                ' || '+ listaHospedaje[i].tipo +
                                ' || '+ listaHospedaje[i].nombre +
                                ' || '+ listaHospedaje[i].entrada +
                                ' || '+ listaHospedaje[i].salida +
                                ' || '+ listaHospedaje[i].valor + '\n'
    
        }

        //alert('Resumen Transportes \n' + stringTransporte )
        let eliminar = parseInt(prompt(stringHospedaje))

        listaHospedaje.splice(eliminar,1)

    }else{
        alert('No se ha ingresado ningun transporte')
    }

}








//menu principal
while (opcionPrincipal !=4){

    switch(opcionPrincipal){
        case 1:
            menuOrganizacion()
            break;
        case 2:
            alert('Su Resumen aparecera en la consola')
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


