package tienda_disfraces.reto3.repositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import tienda_disfraces.reto3.Crud.ReservationCrudRepository;
import tienda_disfraces.reto3.modelo.Cliente;
import tienda_disfraces.reto3.modelo.Reservation;
import tienda_disfraces.reto3.reports.CountClient;

import java.util.List;
import java.util.Date;
import java.util.Optional;
import java.util.ArrayList;

/**
 *
 * @author Armando acuña
 */
@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll(){
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }

    public Reservation save(Reservation reservation){
        return reservationCrudRepository.save(reservation);
    }

    public void delete(Reservation reservation){reservationCrudRepository.delete(reservation);}

    public List<Reservation> getReservationByStatus(String status){
        return reservationCrudRepository.findAllByStatus(status);
    }

    public List<Reservation> getReservationPeriod(Date dateOne, Date dateTwo){
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(dateOne,dateTwo);
    }

    public List<CountClient> getTopClient(){
        List<CountClient> clientList = new ArrayList<>();
        List<Object[]> report = reservationCrudRepository.countTotalReservationByClient();
        for(int i=0;i<report.size();i++){
            clientList.add(new CountClient((Long) report.get(i)[1] ,(Cliente)report.get(i)[0]));
            }
        return clientList;
    }
}
