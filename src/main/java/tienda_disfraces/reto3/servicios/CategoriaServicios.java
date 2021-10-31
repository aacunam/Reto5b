package tienda_disfraces.reto3.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tienda_disfraces.reto3.modelo.Categoria;
import tienda_disfraces.reto3.repositorio.CategoriaRepositorio;

/**
 * @autor Gladys Leticia Ramirez Torres
 */
@Service
public class CategoriaServicios {
    @Autowired
    private CategoriaRepositorio categoriaRepositorio;

    public List<Categoria> getAll() {
        return categoriaRepositorio.getAll();
    }

    /**
     * Obtener categoria por id
     */
    public Optional<Categoria> getCategoria(int id) {
        return categoriaRepositorio.getCategoria(id);
    }

    /**
     * Creear una categoria
     */
    public Categoria save(Categoria categoria) {
        if (categoria.getId() == null) {
            return categoriaRepositorio.save(categoria);
        } else {
            // Optional<Categoria> paux =
            // categoriaRepositorio.getCategoria(categoria.getId());
            // if(paux.isEmpty()){
            return categoriaRepositorio.save(categoria);
            /*
             * }else{ return categoria; }
             */
        }
    }

    /**
     * Actualizar una categoria
     */
    public Categoria update(Categoria categoria) {
        if (categoria.getId() != null) {
            Optional<Categoria> g = categoriaRepositorio.getCategoria(categoria.getId());
            // if(!g.isEmpty()){
            if (categoria.getName() != null) {
                g.get().setName(categoria.getName());
            }
            if (categoria.getDescription() != null) {
                g.get().setDescription(categoria.getDescription());
            }
            return categoriaRepositorio.save(g.get());
            // }
        }
        return categoria;
    }

    /**
     * Borrar una categoria
     */
    public boolean deleteCategory(int id) {
        Boolean borrar = getCategoria(id).map(categoria -> {
            categoriaRepositorio.delete(categoria);
            return true;
        }).orElse(false);
        return borrar;
    }
}
