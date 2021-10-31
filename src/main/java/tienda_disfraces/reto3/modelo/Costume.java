package tienda_disfraces.reto3.modelo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author ARMANDO ACUÑA
 */

/**
 * entidad tabla en base de datos
 */
@Entity
@Table(name = "costume")
/**
 * clase y sus atributos
 */
public class Costume implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	/**
     * id de la tabla
     */

    private Integer id;
	/**
     * name
     */

    private String name;
	/**
     * brand
     */

    private String brand;
	/**
     * yaer
     */

    private Integer year;
	/**
     * description
     */

    private String description;

	/**
     * relacion con categoria
     */

    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnoreProperties("costumes")
    private Categoria category;
	
	/**
     * relacion con cliente
     */

    @OneToMany(cascade = { CascadeType.PERSIST }, mappedBy = "costume")
    @JsonIgnoreProperties({ "costume", "client" })
    private List<Mensaje> messages;
	/**
     * relacion con mensjaes
     */

    @OneToMany(cascade = { CascadeType.PERSIST }, mappedBy = "costume")
    @JsonIgnoreProperties({ "costume", "messages" })
    private List<Reserva> reservations;
	
	/**
     * obtener id
     * @return
     */

    public Integer getId() {
        return id;
    }
	/**
     * set id
     * @param id
     */

    public void setId(Integer id) {
        this.id = id;
    }
	/**
     * obtener name
     * @return
     */

    public String getName() {
        return name;
    }
	/**
     * set nombre
     * @param name
     */

    public void setName(String name) {
        this.name = name;
    }
	/**
     * obtener brand
     * @return
     */
    public String getBrand() {
        return brand;
    }
	/**
     * set nombre
     * @param brand
     */

    public void setBrand(String brand) {
        this.brand = brand;
    }
	/**
     * obtener year
     * @return
     */
    public Integer getYear() {
        return year;
    }
	/**
     * set nombre
     * @param year
     */

    public void setYear(Integer year) {
        this.year = year;
    }
	/**
     * obtener description
     * @return
     */
    public String getDescription() {
        return description;
    }
	/**
     * obtener description
     * @return
     */
    public void setDescription(String description) {
        this.description = description;
    }
	/**
     * obtener category
     * @return
     */
    public Categoria getCategory() {
        return category;
    }
	/**
     * obtener category
     * @return
     */
    public void setCategory(Categoria category) {
        this.category = category;
    }
	/**
     * obtener message
     * @return
     */
    public List<Mensaje> getMessages() {
        return messages;
    }
	/**
     * obtener message
     * @return
     */
    public void setMessages(List<Mensaje> messages) {
        this.messages = messages;
    }
	/**
     * obtener reservation
     * @return
     */
    public List<Reserva> getReservations() {
        return reservations;
    }
	/**
     * obtener reservation
     * @return
     */
    public void setReservations(List<Reserva> reservations) {
        this.reservations = reservations;
    }

}