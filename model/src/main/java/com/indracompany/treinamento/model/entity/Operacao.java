package com.indracompany.treinamento.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "operacoes")
@Data
@EqualsAndHashCode(callSuper = true)
public class Operacao extends GenericEntity<Long>{
	
	private static final long serialVersionUID = 7866711355069432058L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column( nullable = false)
	private LocalDateTime dataHora;
	
	//'C' para Credito e 'D' para Debito
	@Column(length = 1, nullable = false)
	private char tpOperacao;
	
	@Column(nullable = false)
	private Double valor;
	
	@Column(length = 100)
	private String observacao;
	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id")
	private Conta conta;

}
