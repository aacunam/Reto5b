package tienda_disfraces.reto3.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import tienda_disfraces.reto3.repositorio.Crud.CategoriaCrudRepositorio;
import tienda_disfraces.reto3.modelo.Categoria;

/**
 * @autor Gladys Leticia Ramirez Torres
 */
@Repository
public class CategoriaRepositorio {
    @Autowired
    private CategoriaCrudRepositorio categoriaCrudRepositorio;

    public List<Categoria> getAll(){
        return (List<Categoria>) categoriaCrudRepositorio.findAll();
    }

    public Optional<Categoria>getCategoria(int id){
        return categoriaCrudRepositorio.findById(id);
    }

    public Categoria save(Categoria categoria){
        return categoriaCrudRepositorio.save(categoria);
    }

    public void delete(Categoria categoria){
        categoriaCrudRepositorio.delete(categoria);
    }
}
