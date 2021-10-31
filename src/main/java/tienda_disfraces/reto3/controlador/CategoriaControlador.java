package tienda_disfraces.reto3.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import tienda_disfraces.reto3.modelo.Categoria;
import tienda_disfraces.reto3.servicios.CategoriaServicios;

/**
 * @autor Gladys Leticia Ramirez Torres
 */
@RestController
@RequestMapping("/api/Category")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class CategoriaControlador {
    
    @Autowired
    private CategoriaServicios categoriaServicios;

    /**
     * Obtener todas las categorias de la base de datos
     */
    @GetMapping("/all")
    public List<Categoria> getCategorias(){
        return categoriaServicios.getAll();
    }

    /**
     * Obtener una categoria por id de la base de datos
     */
    @GetMapping("/{id}")
    public Optional<Categoria> getCategoria(@PathVariable("id") int id){
        return categoriaServicios.getCategoria(id);
    }

    /**
     * Crear una categoria en la base de datos
     */
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Categoria save(@RequestBody Categoria categoria){
        return categoriaServicios.save(categoria);
    }

    /**
     * Actualizar una categoria en la base de datos
     */
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Categoria update(@RequestBody Categoria categoria){
        return categoriaServicios.update(categoria);
    }

    /**
     * Borrar una categoria de la base de datos
     * @param id de la categoria que se va a borrar
     * @return true si borra exitosamente
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteCategoria(@PathVariable("id") int id){
        return categoriaServicios.deleteCategory(id);
    }
}
