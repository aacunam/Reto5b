package tienda_disfraces.reto3.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tienda_disfraces.reto3.modelo.Reserva;
import tienda_disfraces.reto3.repositorio.ReservaRepositorio;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaServicios {

    @Autowired
    private ReservaRepositorio reservaRepositorio;

    public List<Reserva> getAll() {
        return reservaRepositorio.getAll();
    }

    public Optional<Reserva> getReserva(int reservationId) {
        return reservaRepositorio.getReserva(reservationId);
    }

    public Reserva save(Reserva reservation) {
        if (reservation.getIdReservation() == null) {
            return reservaRepositorio.save(reservation);
        } else {
            // Optional<Reserva> raux =
            // reservaRepositorio.getReserva(reservation.getIdReservation());
            // if (raux.isEmpty()) {
            return reservaRepositorio.save(reservation);
            /*
             * } else { return reservation; }
             */
        }
    }

    public Reserva update(Reserva reserva) {
        if (reserva.getIdReservation() != null) {
            Optional<Reserva> e = reservaRepositorio.getReserva(reserva.getIdReservation());
            // if (!e.isEmpty()) {

            if (reserva.getStartDate() != null) {
                e.get().setStartDate(reserva.getStartDate());
            }
            if (reserva.getDevolutionDate() != null) {
                e.get().setDevolutionDate(reserva.getDevolutionDate());
            }
            if (reserva.getStatus() != null) {
                e.get().setStatus(reserva.getStatus());
            }
            reservaRepositorio.save(e.get());
            return e.get();
            /*
             * } else { return reserva; }
             */
        } else {
            return reserva;
        }
    }

    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReserva(reservationId).map(reservation -> {
            reservaRepositorio.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
