import React from 'react';

const Relatorio = ({ alunosComDesempenhoAlto, alunosComBaixaFrequencia }) => {
  return (
    <div className="relatorios">
      <h3>Alunos com Desempenho Alto: </h3>
      <ul>
        {alunosComDesempenhoAlto().map((aluno, index) => (
          <li key={index}>{aluno.nome}</li>
        ))}
      </ul>
      <h3>Alunos com Baixa Frequência: </h3>
      <ul>
        {alunosComBaixaFrequencia().map((aluno, index) => (
          <li key={index}>{aluno.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Relatorio;
