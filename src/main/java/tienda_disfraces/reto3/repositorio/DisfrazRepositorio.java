package tienda_disfraces.reto3.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import tienda_disfraces.reto3.modelo.Costume;
import tienda_disfraces.reto3.repositorio.Crud.DisfrazCrudRepositorio;

@Repository
public class DisfrazRepositorio {

    @Autowired
    private DisfrazCrudRepositorio disfrazCrudRepositorio;

    public List<Costume> getAll(){
        return(List<Costume>) disfrazCrudRepositorio.findAll();

    }

    public Optional<Costume> getDisfraz(int id){
        return disfrazCrudRepositorio.findById(id);
    }

    public Costume save(Costume disfraz){
        return disfrazCrudRepositorio.save(disfraz);
    }

    public void delete(Costume disfraz){
        disfrazCrudRepositorio.delete(disfraz);
    }

}
