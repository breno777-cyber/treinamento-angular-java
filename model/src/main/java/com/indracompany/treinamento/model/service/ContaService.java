package com.indracompany.treinamento.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.DepositoDTO;
import com.indracompany.treinamento.model.dto.SaqueDTO;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Operacao;
import com.indracompany.treinamento.model.repository.ContaRepository;


@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository>{

	  

	
	@Autowired
	private ContaRepository contaRepository;
	@Autowired
	private OperacaoService operacaoService;
	
	public Double consultarSaldo(String agencia, String numero) {
		
		Conta conta = contaRepository.findByAgenciaAndNumero(agencia, numero);
		return conta.getSaldo();
		
	}
	
	public void depositar (DepositoDTO dto) {
		Conta contas = this.consultarConta(dto.getAgencia(), dto.getNumeroConta());
		contas.setSaldo(dto.getValor() + contas.getSaldo());
		super.salvar(contas);
		Operacao operacao = new Operacao();
		operacao.setConta(contas);
		operacao.setTpOperacao("D".charAt(0));
		operacao.setValor(dto.getValor());
		operacao.setObservacao(null);
		operacaoService.salvar(operacao);
		
	}
	
	public void sacar (SaqueDTO saque) {
		Conta contas = this.consultarConta(saque.getAgencia(), saque.getNumeroConta());
		if (contas.getSaldo() < saque.getValor()) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INEXISTENTE);
		}
		contas.setSaldo(contas.getSaldo() - saque.getValor());
		super.salvar(contas);
		Operacao operacao = new Operacao();
		operacao.setConta(contas);
		operacao.setTpOperacao("S".charAt(0));
		operacao.setValor(saque.getValor());
		operacao.setObservacao(null);
		operacaoService.salvar(operacao);
	}
	
	public Conta consultarConta(String agencia, String numeroConta) {
		Conta c = contaRepository.findByAgenciaAndNumero(agencia, numeroConta);
		if (c == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		return c;
	}
//	public List<Conta> consultarContasClientes(String cpf){
//		List<Conta> listConta = contaRepository.findByClienteCpf(cpf);
//		return listConta;
//	}
	
	
	
	
	
}
