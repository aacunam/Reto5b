package tienda_disfraces.reto3.controlador; //web

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tienda_disfraces.reto3.modelo.Reserva;
import tienda_disfraces.reto3.servicios.ReservaServicios;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class ReservaControlador {

    @Autowired
    private ReservaServicios reservaServicios;

    @GetMapping("/all")
    public List<Reserva> getReservas() {
        return reservaServicios.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Reserva> getReserva(@PathVariable("id") int reservationId) {
        return reservaServicios.getReserva(reservationId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reserva save(@RequestBody Reserva reserva) {
        return reservaServicios.save(reserva);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reserva update(@RequestBody Reserva reserva) {
        return reservaServicios.update(reserva);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int reservationId) {
        return reservaServicios.deleteReservation(reservationId);
    }

}
