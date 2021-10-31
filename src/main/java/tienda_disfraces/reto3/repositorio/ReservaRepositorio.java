package tienda_disfraces.reto3.repositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import tienda_disfraces.reto3.modelo.Reserva;
import tienda_disfraces.reto3.repositorio.Crud.ReservaCrudRepositorio;

@Repository
public class ReservaRepositorio {

    @Autowired
    private ReservaCrudRepositorio reservaCrudRepositorio;

    public List<Reserva> getAll() {
        return (List<Reserva>) reservaCrudRepositorio.findAll();
    }

    public Optional<Reserva> getReserva(int id) {
        return reservaCrudRepositorio.findById(id);
    }

    public Reserva save(Reserva reserva) {
        return reservaCrudRepositorio.save(reserva);
    }

    public void delete(Reserva p) {
        reservaCrudRepositorio.delete(p);
    }

}
