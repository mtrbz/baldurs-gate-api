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
    public ResponseEntity<List<Personagem>> listarPersonagens(){
        String sql = "SELECT * FROM personagem;";
        List<Personagem> personagens = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Personagem.class));
        return ResponseEntity.status(200).body(personagens);
    }

    @PostMapping
    public ResponseEntity<Personagem> criarPersonagem(@RequestBody Personagem personagem){
        String sql = """
                INSERT INTO personagem
                (nome, classe, raca, nivel, forca, dex, con, inte, sab, car, data_criacao)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """;

        jdbcTemplate.update(
                sql,
                personagem.getNome(),
                personagem.getClasse(),
                personagem.getRaca(),
                personagem.getNivel(),
                personagem.getForca(),
                personagem.getDex(),
                personagem.getCon(),
                personagem.getInte(),
                personagem.getSab(),
                personagem.getCar(),
                personagem.getDataCriacao()
        );

        return ResponseEntity.status(201).body(personagem);
    }
}
