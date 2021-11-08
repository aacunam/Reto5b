package tienda_disfraces.reto3.reports;

import tienda_disfraces.reto3.modelo.Cliente;
/**
 * @author ARMANDO ACUÑA
 */
public class CountClient {
    private Long total;
    private Cliente client;

    public CountClient() {
    }

    public CountClient(Long total, Cliente client) {
        this.total = total;
        this.client = client;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Cliente getClient() {
        return client;
    }

    public void setClient(Cliente client) {
        this.client = client;
    }
}
