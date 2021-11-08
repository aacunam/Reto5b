package tienda_disfraces.reto3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tienda_disfraces.reto3.modelo.Cliente;
import tienda_disfraces.reto3.repositorio.ClienteRepositorio;

/**
 *
 * @author Armando acuña
 */
 

@Service
public class ClienteServicios {
    @Autowired
    private ClienteRepositorio metodosCrud;

    public List<Cliente> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Cliente> getClient(int clientId) {
        return metodosCrud.getCliente(clientId);
    }

    public Cliente save(Cliente client) {
        if (client.getIdClient() == null) {
            return metodosCrud.save(client);
        } else {
            // Optional<Cliente> e = metodosCrud.getCliente(client.getIdClient());
            // if (e.isEmpty()) {
            return metodosCrud.save(client);
            /*
             * } else { return client; }
             */
        }
    }

    public Cliente update(Cliente client) {
        if (client.getIdClient() != null) {
            Optional<Cliente> eeee = metodosCrud.getCliente(client.getIdClient());
            // if (!e.isEmpty()) {
            if (client.getName() != null) {
                eeee.get().setName(client.getName());
            }
            if (client.getAge() != null) {
                eeee.get().setAge(client.getAge());
            }
            if (client.getPassword() != null) {
                eeee.get().setPassword(client.getPassword());
            }
            metodosCrud.save(eeee.get());
            return eeee.get();
            /*
             * } else { return client; }
             */
        } else {
            return client;
        }
    }

    public boolean deleteClient(int clientId) {
        Boolean aBoolean = getClient(clientId).map(client -> {
            metodosCrud.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}
