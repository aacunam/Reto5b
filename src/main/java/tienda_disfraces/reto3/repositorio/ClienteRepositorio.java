package tienda_disfraces.reto3.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import tienda_disfraces.reto3.Crud.ClienteCrudRepositorio;
import tienda_disfraces.reto3.modelo.Cliente;

/**
 *
 * @author Armando acuña
 */
@Repository
public class ClienteRepositorio {
    @Autowired
    private ClienteCrudRepositorio clienteCrudRepositorio;

    public List<Cliente> getAll() {
        return (List<Cliente>) clienteCrudRepositorio.findAll();
    }

    public Optional<Cliente> getCliente(int id) {
        return clienteCrudRepositorio.findById(id);
    }

    public Cliente save(Cliente cliente) {
        return clienteCrudRepositorio.save(cliente);
    }

    public void delete(Cliente cliente) {
  //      crud1.delete(cliente);
        clienteCrudRepositorio.delete(cliente);
    }
}
