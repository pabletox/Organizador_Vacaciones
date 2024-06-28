alert('¿Preparado para organizar tu viaje?')
const mensajePrincipal = 'Ingresa una opción \n 1.-Organizar Viaje \n 2.-Obtener Resumen y Costos \n 3.-Eliminar Item \n 4.-Salir' 
const mensajeOrganizacion = 'Ingresa una opción \n 1.-Ingresar Transporte \n 2.-Ingresar Hospedaje \n 3.-Ingresar restaurant \n 4.-Volver al Menú Principal'
const mensajeEliminacion = 'Ingresa una opción \n 1.-Eliminar un Viaje \n 2.-Eliminar un Hospedaje \n 3.-Eliminar un Resturant \n 4.-Salir' 
const listaTransporte = []
const listaHospedaje = []
const listaRestaurant = []
let opcionPrincipal = parseInt(prompt(mensajePrincipal))


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

const eliminacionItem = () =>{

    let opcionEliminar = parseInt(prompt(mensajeEliminacion))

    while (opcionEliminar !=4){

        switch(opcionEliminar){
            case 1:
                //eliminaTransporte()
                break;
            case 2:
                //eliminaHospedaje()
                break;
            case 3:
                //eliminaRestaurant()
                break;
            default:
                alert('Opción no valida')
                break;
        }

        opcionEliminar = parseInt(prompt(mensajeEliminacion))
    }

}








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
            alert('Se llamara a opcion de eliminacion')
            break;
        default:
            alert('Opción no valida')
            break;
                
    }

    opcionPrincipal = parseInt(prompt(mensajePrincipal))
}


