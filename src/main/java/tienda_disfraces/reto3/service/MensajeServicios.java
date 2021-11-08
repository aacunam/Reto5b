package tienda_disfraces.reto3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tienda_disfraces.reto3.modelo.Mensaje;
import tienda_disfraces.reto3.repositorio.MensajeRepositorio;

/**
 *
 * @author Armando acuña
 */
@Service
public class MensajeServicios {
    @Autowired
    private MensajeRepositorio mensajeRepositorio;
    
    public List<Mensaje> getAll(){
        return mensajeRepositorio.getAll();
    }

    /**
     * Obtener mensaje por id
     */
    public Optional<Mensaje> getMensaje(int id){
        return mensajeRepositorio.getMensaje(id);
    }

    /**
     * Crear una mensaje
     */
    public Mensaje save(Mensaje mensaje){
        if(mensaje.getIdMessage()==null){
            return mensajeRepositorio.save(mensaje);
        }else{
  //          Optional<Mensaje> paux=mensajeRepositorio.getMensaje(mensaje.getIdMessage());
 //           if(paux.isEmpty()){
                return mensajeRepositorio.save(mensaje);
 /*           }else{
                return mensaje;
            }*/
        }
    }

    /**
     * Actualizar un Mensaje
     */
    public Mensaje update(Mensaje mensaje){
        if(mensaje.getIdMessage()!=null){
            Optional<Mensaje>gg=mensajeRepositorio.getMensaje(mensaje.getIdMessage());
  //          if(!g.isEmpty()){
                if(mensaje.getMessageText()!=null){
                    gg.get().setMessageText(mensaje.getMessageText());
                }
                return mensajeRepositorio.save(gg.get());
 //           }
        }
        return mensaje;
    }

    /**
     * Borrar una mensaje
     */
    public boolean deleteMensaje(int id){
        Boolean borrar= getMensaje(id).map(mensaje -> {
            mensajeRepositorio.delete(mensaje);
            return true;
        }).orElse(false);
        return borrar;
    }
    
}
