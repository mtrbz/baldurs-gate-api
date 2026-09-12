package sptech.school.baldursGateAPI;

public class Party {
    private Integer id;
    private Integer idPersonagem;
    private Integer idCompanheiro;

    public Party() {
    }

    public Party(Integer id, Integer idPersonagem, Integer idCompanheiro) {
        this.id = id;
        this.idPersonagem = idPersonagem;
        this.idCompanheiro = idCompanheiro;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdPersonagem() {
        return idPersonagem;
    }

    public void setIdPersonagem(Integer idPersonagem) {
        this.idPersonagem = idPersonagem;
    }

    public Integer getIdCompanheiro() {
        return idCompanheiro;
    }

    public void setIdCompanheiro(Integer idCompanheiro) {
        this.idCompanheiro = idCompanheiro;
    }
}
