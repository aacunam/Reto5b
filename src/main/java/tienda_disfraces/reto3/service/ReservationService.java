package tienda_disfraces.reto3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tienda_disfraces.reto3.modelo.Reservation;
import tienda_disfraces.reto3.reports.CountClient;
import tienda_disfraces.reto3.reports.ReservationStatus;
import tienda_disfraces.reto3.repositorio.ReservationRepository;

import java.util.List;
import java.util.Optional;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 * @author ARMANDO ACUÑA
 */

/**
 * Servicio para la Reservación
 */
@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    /**
     * obtener todos
     * 
     * @return
     */
    public List<Reservation> getAll() {
        return reservationRepository.getAll();
    }

    /**
     * obtener Reserva
     * 
     * @param reservationId
     * @return
     */
    public Optional<Reservation> getReservation(int reservationId) {
        return reservationRepository.getReservation(reservationId);
    }

    /**
     * Reserva
     * 
     * @param reservation
     * @return
     */
    public Reservation save(Reservation reservation) {
        if (reservation.getIdReservation() == null) {
            return reservationRepository.save(reservation);
        } else {
            // Optional<Reserva> raux =
            // reservaRepositorio.getReserva(reservation.getIdReservation());
            // if (raux.isEmpty()) {
            return reservationRepository.save(reservation);
            /*
             * } else { return reservation; }
             */
        }
    }

    /**
     * Update
     * 
     * @param reserva
     * @return
     */
    public Reservation update(Reservation reserva) {
        if (reserva.getIdReservation() != null) {
            Optional<Reservation> exx = reservationRepository.getReservation(reserva.getIdReservation());
            // if (!e.isEmpty()) {

            if (reserva.getStartDate() != null) {
                exx.get().setStartDate(reserva.getStartDate());
            }
            if (reserva.getDevolutionDate() != null) {
                exx.get().setDevolutionDate(reserva.getDevolutionDate());
            }
            if (reserva.getStatus() != null) {
                exx.get().setStatus(reserva.getStatus());
            }
            reservationRepository.save(exx.get());
            return exx.get();
            /*
             * } else { return reserva; }
             */
        } else {
            return reserva;
        }
    }

    /**
     * Delete reserva Reserva
     * 
     * @param reservationId
     * @return
     */
    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReservation(reservationId).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    /**
     * getReservationStatusReport
     * 
     * @return
     */

    public ReservationStatus getReservationStatusReport() {
        List<Reservation> completed = reservationRepository.getReservationByStatus("completed");
        List<Reservation> cancelled = reservationRepository.getReservationByStatus("cancelled");
        return new ReservationStatus(completed.size(), cancelled.size());
    }

    /**
     * getReservationStatusReport
     * 
     * @param dateOne
     * @param dateTwo
     * @return
     */
    public List<Reservation> getReservationPeriod(String dateOne, String dateTwo) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date startDate = dateFormat.parse(dateOne);
            Date endDate = dateFormat.parse(dateTwo);
            if (startDate.before(endDate)) {
                return reservationRepository.getReservationPeriod(startDate, endDate);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }

    /**
     * getTopClients
     * 
     * @return
     */
    public List<CountClient> getTopClients() {
        return reservationRepository.getTopClient();
    }

}
