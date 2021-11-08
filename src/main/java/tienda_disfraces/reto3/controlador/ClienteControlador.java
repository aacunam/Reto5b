package tienda_disfraces.reto3.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import tienda_disfraces.reto3.modelo.Cliente;
import tienda_disfraces.reto3.service.ClienteServicios;

/**
 *
 * @author Armando acuña
 */
@RestController
@RequestMapping("/api/Client")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class ClienteControlador {
    @Autowired
    private ClienteServicios servicio;

    @GetMapping("/all")
    public List<Cliente> getClients() {
        return servicio.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> getClient(@PathVariable("id") int clientId) {
        return servicio.getClient(clientId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente save(@RequestBody Cliente client) {
        return servicio.save(client);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente update(@RequestBody Cliente client) {
        return servicio.update(client);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int clientId) {
        return servicio.deleteClient(clientId);
    }
}
