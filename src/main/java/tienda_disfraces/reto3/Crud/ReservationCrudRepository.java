package tienda_disfraces.reto3.Crud;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import tienda_disfraces.reto3.modelo.Reservation;

import java.util.Date;
import java.util.List;

/**
 * @author ARMANDO ACUÑA
 */
public interface ReservationCrudRepository extends CrudRepository <Reservation,Integer>{
    public List<Reservation> findAllByStatus(String status);
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore (Date dateOne,Date dateTwo);
    @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c group by c.client order by COUNT(c.client)DESC")
    public List<Object[]>   countTotalReservationByClient ();
}

