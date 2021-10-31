package tienda_disfraces.reto3.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import tienda_disfraces.reto3.modelo.Costume;
import tienda_disfraces.reto3.servicios.DisfrazServicios;

@RestController
@RequestMapping("/api/Costume")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class DisfrazControlador {

    @Autowired
    private DisfrazServicios disfrazServicios;

    @GetMapping("/all")
    public List<Costume> getDisfraz() {
        return disfrazServicios.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Costume> getDisfraz(@PathVariable("id") int id) {
        return disfrazServicios.getDisfraz(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Costume save(@RequestBody Costume disfraz) {
        return disfrazServicios.save(disfraz);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Costume update(@RequestBody Costume disfraz) {
        return disfrazServicios.update(disfraz);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deletePapeleria(@PathVariable("id") int id) {
        return disfrazServicios.deleteDisfraz(id);
    }

}
