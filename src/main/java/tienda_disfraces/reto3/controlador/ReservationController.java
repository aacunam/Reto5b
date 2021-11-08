package tienda_disfraces.reto3.controlador; //web

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

import tienda_disfraces.reto3.modelo.Reservation;
import tienda_disfraces.reto3.reports.CountClient;
import tienda_disfraces.reto3.reports.ReservationStatus;
import tienda_disfraces.reto3.service.ReservationService;

/**
 *
 * @author Armando acuña
 */
@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getAll(){ return reservationService.getAll();}

    @GetMapping("/{id}")
    public Optional<Reservation> getCategory(@PathVariable("id") int id){return reservationService.getReservation(id);}

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    private Reservation save(@RequestBody Reservation reservation){return reservationService.save(reservation);}

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation reservation){return reservationService.update(reservation);}

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Boolean delete(@PathVariable("id") int id){return reservationService.deleteReservation(id);}

    @GetMapping("/report-status")
    public ReservationStatus getReservationsStatusReport(){
        return reservationService.getReservationStatusReport();
    }

    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getReservationReportDate(@PathVariable("dateOne") String dateOne, @PathVariable("dateTwo") String dateTwo){
        return reservationService.getReservationPeriod(dateOne,dateTwo);
    }

    @GetMapping("/report-clients")
    public List<CountClient> getClients(){
        return reservationService.getTopClients();
    }
}
