import React, { useState, useEffect } from 'react';
import './App.css';
import Aluno from './components/Aluno';
import Relatorio from './components/Relatorio';

const disciplinas = ['Matemática', 'História', 'Geografia', 'Ciências', 'Português'];

const App = () => {
  const [alunos, setAlunos] = useState([]);
  const [alunoIndex, setAlunoIndex] = useState(0); 

  useEffect(() => {
    adicionarAluno(); 
  }, []); 

  const adicionarAluno = () => {
    const novoAluno = {
      id: Date.now(), 
      nome: '',
      notas: Array(5).fill(0),
      frequencia: 100,
    };
    setAlunos(prevAlunos => [...prevAlunos, novoAluno]);
  };

  const atualizarAluno = (index, novoAluno) => {
    setAlunos(prevAlunos => {
      const novosAlunos = [...prevAlunos];
      novosAlunos[index] = novoAluno;
      return novosAlunos;
    });
  };

  const calcularMediaTurma = () => {
    return disciplinas.map((_, i) => {
      const total = alunos.reduce((sum, aluno) => sum + aluno.notas[i], 0);
      return alunos.length > 0 ? (total / alunos.length).toFixed(2) : 0;
    });
  };

  const calcularFrequenciaGeral = () => {
    return alunos.map(aluno => ({
      nome: aluno.nome || 'Nome não informado', 
      frequencia: aluno.frequencia
    }));
  };

  const alunosComDesempenhoAlto = () => {
    const mediasTurma = calcularMediaTurma();
    return alunos.filter(aluno =>
      aluno.notas.every((nota, i) => nota > mediasTurma[i])
    );
  };

  const alunosComBaixaFrequencia = () => {
    return alunos.filter(aluno => aluno.frequencia < 75);
  };

  const mostrarProximoAluno = () => {
    setAlunoIndex((prevIndex) => (prevIndex + 1) % alunos.length); 
  };

  return (
    <div className="App">
      <h1>Sistema de Gestão de Alunos</h1>

      {alunos.length > 0 && (
        <Aluno
          key={alunos[alunoIndex].id} 
          aluno={alunos[alunoIndex]}
          index={alunoIndex}
          disciplinas={disciplinas}
          atualizarAluno={atualizarAluno}
        />
      )}
          <button onClick={adicionarAluno}>Adicionar Aluno</button>
          <button onClick={mostrarProximoAluno} disabled={alunos.length <= 1}>Próximo Aluno</button> 

      <h2>Médias da Turma</h2>
      <ul>
        {calcularMediaTurma().map((media, i) => (
          <li key={i}>{disciplinas[i]}: {media}</li>
        ))}
      </ul>

      <h2>Frequência dos Alunos</h2>
      <ul>
        {calcularFrequenciaGeral().map((item, i) => (
          <li key={i}>{item.nome}: {item.frequencia}%</li>
        ))}
      </ul>
  
      <Relatorio
        alunosComDesempenhoAlto={alunosComDesempenhoAlto}
        alunosComBaixaFrequencia={alunosComBaixaFrequencia}
      />
    </div>
  );
};
export default App;
