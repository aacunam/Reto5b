package tienda_disfraces.reto3.modelo;

import java.io.Serializable;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @autor Gladys Leticia Ramirez Torres
 *
 */
@Entity
@Table(name = "message")
public class Mensaje implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMessage;
    private String messageText;

    @ManyToOne
    @JoinColumn(name = "costumeid")
    @JsonIgnoreProperties({ "messages", "reservations" })
    private Costume costume;

    @ManyToOne
    @JoinColumn(name = "clientId")
    @JsonIgnoreProperties({ "messages", "reservations" })
    private Cliente client;

    public Integer getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(Integer idMessage) {
        this.idMessage = idMessage;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Costume getCostume() {
        return costume;
    }

    public void setCostume(Costume costume) {
        this.costume = costume;
    }

    public Cliente getClient() {
        return client;
    }

    public void setClient(Cliente client) {
        this.client = client;
    }

}
