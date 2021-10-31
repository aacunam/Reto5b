package tienda_disfraces.reto3.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import tienda_disfraces.reto3.repositorio.Crud.MensajeCrudRepositorio;
import tienda_disfraces.reto3.modelo.Mensaje;

/**
 * @autor Gladys Leticia Ramirez Torres
 */
@Repository
public class MensajeRepositorio {
    @Autowired
    private MensajeCrudRepositorio mensajeCrudRepositorio;

    public List<Mensaje> getAll(){
        return (List<Mensaje>) mensajeCrudRepositorio.findAll();
    }

    public Optional<Mensaje>getMensaje(int id){
        return mensajeCrudRepositorio.findById(id);
    }

    public Mensaje save(Mensaje mensaje){
        return mensajeCrudRepositorio.save(mensaje);
    }

    public void delete(Mensaje mensaje){
        mensajeCrudRepositorio.delete(mensaje);
    }
}
