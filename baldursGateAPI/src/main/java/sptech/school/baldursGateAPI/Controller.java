package sptech.school.baldursGateAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/personagens")

public class Controller {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public ResponseEntity<List<Personagem>> listarPersonagens(){
        String sql = "select * from personagem;";
        List<Personagem> personagens = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Personagem.class));
        return ResponseEntity.status(200).body(personagens);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Personagem> listarPersonagem(@PathVariable Integer id){
        String sql = "select * from personagem where id = ?;";
        List<Personagem> personagens = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Personagem.class), id);

        if (personagens.isEmpty()){
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(200).body(personagens.getFirst());
    }

    @PostMapping
    public ResponseEntity<Personagem> criarPersonagem(
            @RequestBody Personagem personagem) {

        String sql = """
            insert into personagem
            (nome, classe, raca, nivel, forca, dex, con, inte, sab, car, data_criacao)
            values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {

            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, personagem.getNome());
            ps.setString(2, personagem.getClasse());
            ps.setString(3, personagem.getRaca());
            ps.setInt(4, personagem.getNivel());
            ps.setInt(5, personagem.getForca());
            ps.setInt(6, personagem.getDex());
            ps.setInt(7, personagem.getCon());
            ps.setInt(8, personagem.getInte());
            ps.setInt(9, personagem.getSab());
            ps.setInt(10, personagem.getCar());
            ps.setObject(11, personagem.getDataCriacao());

            return ps;
        }, keyHolder);

        personagem.setId(keyHolder.getKey().intValue());

        return ResponseEntity.status(201).body(personagem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Personagem> editarAtributos(@PathVariable Integer id, @RequestBody Personagem personagem){
        String sql = """
                update personagem set
                forca = ?,
                dex = ?,
                con = ?,
                inte = ?,
                sab = ?,
                car = ?
                where id = ?
                """;

        jdbcTemplate.update(
                sql,
                personagem.getForca(),
                personagem.getDex(),
                personagem.getCon(),
                personagem.getInte(),
                personagem.getSab(),
                personagem.getCar(),
                id
        );
        return ResponseEntity.status(200).body(personagem);
    }

    @PostMapping("/{id}/party")
    public ResponseEntity<Party> criarParty(@PathVariable Integer id, @RequestBody Party party){
        String sql = "insert into party (personagem_id, companheiro_id) values (?, ?);";

        jdbcTemplate.update(sql, id, party.getIdCompanheiro());
        return ResponseEntity.status(201).body(party);
    }

    @PutMapping("/{id}/party/{idParty}")
    public ResponseEntity<Party> editarParty(@PathVariable Integer id, @PathVariable Integer idParty, @RequestBody Party party){
        String sql = """
                update party
                set companheiro_id = ?
                where id = ?
                and personagem_id = ?
                """;

        jdbcTemplate.update(
                sql,
                party.getIdCompanheiro(),
                idParty,
                id
        );
        return ResponseEntity.status(200).body(party);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPersonagem(@PathVariable Integer id){
        String sqlParty = "delete from party where personagem_id = ?";
        String sqlPersonagem = "delete from personagem where id = ?";

        jdbcTemplate.update(sqlParty, id);
        jdbcTemplate.update(sqlPersonagem, id);
        return ResponseEntity.status(204).build();
    }

    @GetMapping("/companheiros")
    public ResponseEntity<List<Companheiro>> listarCompanheiros() {

        String sql = "select * from companheiro;";

        List<Companheiro> companheiros = jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(Companheiro.class)
        );

        return ResponseEntity.status(200).body(companheiros);
    }

    @GetMapping("/{id}/party")
    public ResponseEntity<List<Companheiro>> listarParty(
            @PathVariable Integer id) {

        String sql = """
            select c.id, c.nome, c.classe, c.raca
            from companheiro c
            join party p on c.id = p.companheiro_id
            where p.personagem_id = ?
            """;

        List<Companheiro> companheiros = jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(Companheiro.class),
                id
        );

        return ResponseEntity.status(200).body(companheiros);
    }
}
