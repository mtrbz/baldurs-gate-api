package sptech.school.baldursGateAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/personagens")

public class Controller {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    ResponseEntity<List<Personagem>> listarPersonagens(){
        String sql = "SELECT * FROM personagem;";
        List<Personagem> personagens = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>());
        return ResponseEntity.status(200).body(personagens);
    }

    @PostMapping
    ResponseEntity<Personagem> criarPersonagem(@RequestBody Personagem personagem){
        personagem.setId(contador++);
        personagens.add(personagem);
        return ResponseEntity.status(201).body(personagem);
    }
}
