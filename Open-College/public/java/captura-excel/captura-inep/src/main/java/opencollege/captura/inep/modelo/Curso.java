package opencollege.captura.inep.modelo;

import java.util.Objects;

public class Curso{

	private Integer idCurso;
	private String nome;
	private String formacao;
	private Integer idAreaGeral;

	public Curso(Integer idCurso, String nome, String formacao, Integer idAreaGeral) {
		this.idCurso = idCurso;
		this.nome = nome;
		this.formacao = formacao;
		this.idAreaGeral = idAreaGeral;
	}

	@Override
	public boolean equals(Object o){
		if(o == null || this.getClass != o.getClass)
			return false;
		if(this == o)
			return true;
		Curso that = (Curso) o;
		return Objects.equals(this.idCurso, that.idCurso);
	}

	@Override
	public int hashCode(){
		return Objects.hash(idCurso);
	}

}