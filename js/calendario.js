let listaRecuperadaTransporte =[]
listaRecuperadaTransporte = JSON.parse(localStorage.getItem("listaTransporte"))
let listaRecuperadaHospedaje =[]
listaRecuperadaHospedaje = JSON.parse(localStorage.getItem("listaHospedaje"))
let listaRecuperadaRestaurant =[]
listaRecuperadaRestaurant = JSON.parse(localStorage.getItem("listaRestaurant"))

const creaListaCalendario = () => {

    let listaCalendario =[]

    try{

        if(listaRecuperadaTransporte.length>0){
            listaRecuperadaTransporte.forEach((transporte)=>{
              let evento = {
                              title: `Viaje a ${transporte.destino} en agencia ${transporte.agencia}`,
                              start: `${transporte.fechaIda}T${transporte.horario}`,
                              end: `${transporte.fechaIda}T${transporte.horario}`,
                              description: `Viaje programado a ${transporte.destino} en agencia ${transporte.agencia}`,
                              backgroundColor: ['brown']
      
      
                          }
              listaCalendario.push(evento)
      
          })
        }else{
          throw new Error("no hay objetos")
        }

    }catch(err){
        
    }  
   
    

    try{

      if(listaRecuperadaHospedaje.length>0){
          listaRecuperadaHospedaje.forEach((hospedaje)=>{
            let evento = {
                            title: `Reserva en ${hospedaje.nombre} en ${hospedaje.ciudad}`,
                            start: `${hospedaje.entrada}T14:00:00`,
                            end: `${hospedaje.entrada}T14:00:00`,
                            description: `Reserva en ${hospedaje.nombre} en ${hospedaje.ciudad}, direccion: ${hospedaje.direccion}`,
                            backgroundColor: ['blue']


                        }
            listaCalendario.push(evento)


          })
      }else{
        throw new Error("no hay objetos")
      }

    }catch(err){

    }
    
    try{

      if(listaRecuperadaRestaurant.length>0){
          listaRecuperadaRestaurant.forEach((restaurant)=>{
          let evento = {
                          title: `Reserva de comida en ${restaurant.nombre} en ${restaurant.ciudad}`,
                          start: `${restaurant.fecha}T${restaurant.horario}`,
                          end: `${restaurant.fecha}T${restaurant.horario}`,
                          description: `Reserva de comida en ${restaurant.nombre} en ${restaurant.ciudad} direccion: ${restaurant.direccion}`,
                          backgroundColor: ['green']
      
      
                      }
          listaCalendario.push(evento)
      
        })
      }else{
        throw new Error("no hay objetos")
      }

    }catch(err){
        
    }  

  

    return listaCalendario

}


const creaCalendario = () =>{
   // creaListaCalendario()
    const calendarEl = document.getElementById('calendario');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: '2024-08-08',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: creaListaCalendario()
      });

    calendar.render();



}

creaCalendario()


const btnIcs = document.getElementById("btnIcs")
btnIcs.onclick = () => {
    
    let cal = ics()
    let listaCalendario = creaListaCalendario()
    listaCalendario.forEach ((evento)  =>{
      cal.addEvent(evento.title, evento.description,'', evento.start,evento.end)
    })
    cal.download('eventos')

}