package tienda_disfraces.reto3.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import tienda_disfraces.reto3.modelo.Mensaje;
import tienda_disfraces.reto3.servicios.MensajeServicios;

/**
 * @autor Gladys Leticia Ramirez Torres
 */
@RestController
@RequestMapping("/api/Message")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class MensajeControlador {
    
    @Autowired
    private MensajeServicios mensajeServicios;

    /**
     * Obtener todas las mensajes de la base de datos
     */
    @GetMapping("/all")
    public List<Mensaje> getMensajes(){
        return mensajeServicios.getAll();
    }

    /**
     * Obtener una mensaje por id de la base de datos
     */
    @GetMapping("/{id}")
    public Optional<Mensaje> getMensaje(@PathVariable("id") int id){
        return mensajeServicios.getMensaje(id);
    }

    /**
     * Crear una mensaje en la base de datos
     */
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Mensaje save(@RequestBody Mensaje mensaje){
        return mensajeServicios.save(mensaje);
    }

    /**
     * Actualizar una mensaje en la base de datos
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Mensaje update(@RequestBody Mensaje mensaje){
        return mensajeServicios.update(mensaje);
    }

    /**
     * Borrar una mensaje de la base de datos
     * @param id del mensaje que se va a borrar
     * @return true si borra exitosamente
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteMensaje(@PathVariable("id") int id){
        return mensajeServicios.deleteMensaje(id);
    }
    
}
