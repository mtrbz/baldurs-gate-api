package sptech.school.baldursGateAPI;

import java.time.LocalDate;
import java.util.List;

public class Personagem {
    private Integer id;
    private String nome;
    private String classe;
    private Integer nivel;
    private String raca;
    private Integer forca;
    private Integer dex;
    private Integer con;
    private Integer inte;
    private Integer sab;
    private Integer car;
    private LocalDate dataCriacao;
    private List<String> party;

    public Personagem() {
    }

    public Personagem(Integer id, String nome, String classe, Integer nivel, String raca, Integer forca, Integer dex, Integer con, Integer inte, Integer sab, Integer car, LocalDate dataCriacao, List<String> party) {
        this.id = id;
        this.nome = nome;
        this.classe = classe;
        this.nivel = nivel;
        this.raca = raca;
        this.forca = forca;
        this.dex = dex;
        this.con = con;
        this.inte = inte;
        this.sab = sab;
        this.car = car;
        this.dataCriacao = dataCriacao;
        this.party = party;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getClasse() {
        return classe;
    }

    public void setClasse(String classe) {
        this.classe = classe;
    }

    public Integer getNivel() {
        return nivel;
    }

    public void setNivel(Integer nivel) {
        this.nivel = nivel;
    }

    public String getRaca() {
        return raca;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }

    public Integer getForca() {
        return forca;
    }

    public void setForca(Integer forca) {
        this.forca = forca;
    }

    public Integer getDex() {
        return dex;
    }

    public void setDex(Integer dex) {
        this.dex = dex;
    }

    public Integer getCon() {
        return con;
    }

    public void setCon(Integer con) {
        this.con = con;
    }

    public Integer getInte() {
        return inte;
    }

    public void setInte(Integer inte) {
        this.inte = inte;
    }

    public Integer getSab() {
        return sab;
    }

    public void setSab(Integer sab) {
        this.sab = sab;
    }

    public Integer getCar() {
        return car;
    }

    public void setCar(Integer car) {
        this.car = car;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public List<String> getParty() {
        return party;
    }

    public void setParty(List<String> party) {
        this.party = party;
    }
}
