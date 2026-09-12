package sptech.school.baldursGateAPI;

public class Companheiro {

    private Integer id;
    private String nome;
    private String classe;
    private String raca;

    public Companheiro() {
    }

    public Companheiro(Integer id, String nome, String classe, String raca) {
        this.id = id;
        this.nome = nome;
        this.classe = classe;
        this.raca = raca;
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

    public String getRaca() {
        return raca;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }
}