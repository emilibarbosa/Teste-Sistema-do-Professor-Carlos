import React from 'react';

const Aluno = ({ aluno, index, disciplinas, atualizarAluno }) => {
  const handleChangeNome = (e) => {
    atualizarAluno(index, { ...aluno, nome: e.target.value });
  };

  const handleChangeNota = (e, i) => {
    const novaNota = parseFloat(e.target.value);
    if (novaNota >= 0 && novaNota <= 10) {
      const novasNotas = [...aluno.notas];
      novasNotas[i] = novaNota;
      atualizarAluno(index, { ...aluno, notas: novasNotas });
    }
  };

  const handleChangeFrequencia = (e) => {
    const novaFrequencia = parseFloat(e.target.value);
    if (novaFrequencia >= 0 && novaFrequencia <= 100) {
      atualizarAluno(index, { ...aluno, frequencia: novaFrequencia });
    }
  };

  return (
    <div className="aluno">
      <input
        type="text"
        value={aluno.nome}
        placeholder="Nome do Aluno"
        onChange={handleChangeNome}
        className="input-nome"
      />
      {disciplinas.map((disciplina, i) => (
        <div key={i} className="disciplina">
          <label>{disciplina}</label>
          <input
            type="number"
            value={aluno.notas[i]}
            onChange={(e) => handleChangeNota(e, i)}
            min="0"
            max="10"
            className={`input-nota ${aluno.notas[i] < 0 || aluno.notas[i] > 10 ? 'input-invalido' : ''}`}
          />
        </div>
      ))}
      <div className="frequencia">
        <label>Frequência (%)</label>
        <input
          type="number"
          value={aluno.frequencia}
          onChange={handleChangeFrequencia}
          min="0"
          max="100"
          className={`input-frequencia ${aluno.frequencia < 0 || aluno.frequencia > 100 ? 'input-invalido' : ''}`}
        />
      </div>
    </div>
  );
};

export default Aluno;
