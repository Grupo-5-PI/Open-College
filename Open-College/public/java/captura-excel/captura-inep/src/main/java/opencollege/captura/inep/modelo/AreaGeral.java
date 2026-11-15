package opencollege.captura.inep.modelo;

import java.util.Objects;

public class AreaGeral{

	private Integer idAreaGeral;
	private String nome;

	public AreaGeral(Integer idAreaGeral, String nome) {
		this.idAreaGeral = idAreaGeral;
		this.nome = nome;
	}

	@Override
	public boolean equals(Object o){
		if(o == null || this.getClass != o.getClass())
			return false;
		if(this == o)
			return true;
		AreaGeral that = (AreaGeral) o;
		return Objects.equals(this.idAreaGeral, that.idAreaGeral);
	}

	@Override
	public int hashCode() {
		return Objects.hash(idAreaGeral);
	}

}