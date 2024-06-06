import React, { useState } from 'react';
import "./index.css";

function Form() {
  const [formData, setFormData] = useState({
    descricao: '',
    natureza: '',
    grupo: '',
    subgrupo: '',
    bairro: '',
    logradouro:'',
    dateTime: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/ocorrencias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      alert('Ocorrência registrada com sucesso!');
      setFormData({
        descricao: '',
        natureza: '',
        grupo: '',
        subgrupo: '',
        bairro: '',
        logradouro:'',
        dateTime: ''
      }); 
    })
    .catch(error => {
      console.error('Erro ao registrar ocorrência:', error);
      alert('Ocorreu um erro ao registrar a ocorrência. Por favor, tente novamente.');
    });
  };

  return (
    <section className="registerContainer">
      <h1>REGISTRAR OCORRÊNCIA</h1>
      <div className="containerForm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="bairro">Bairro</label>
          <input type="text" name="bairro" id="bairro" placeholder="Digite o bairro..." value={formData.bairro} onChange={handleChange}/>
          <label htmlFor="grupo">Grupo</label>
          <input type="text" name="grupo" id="grupo" placeholder="Digite o grupo..." value={formData.grupo} onChange={handleChange}/>
          <label htmlFor="descricao">Descrição</label>
          <input type="text" name="descricao" id="descricao" placeholder="Digite a descrição..." value={formData.descricao} onChange={handleChange}/>

          <label htmlFor="datetime">Selecione a data e hora:</label>
          <input type="datetime-local" id="datetime" name="dateTime" value={formData.dateTime} onChange={handleChange}/>
          <label htmlFor="natureza">Natureza</label>
          <input type="text" name="natureza" id="natureza" placeholder="Digite a natureza..." value={formData.natureza} onChange={handleChange}/>
          <label htmlFor="logradouro">Logradouro</label>
          <input type="text" name="logradouro" id="logradouro" placeholder="Digite o logradouro..." value={formData.logradouro} onChange={handleChange}/>
          <label htmlFor="subgrupo">SubGrupo</label>
          <input type="text" name="subgrupo" id="subgrupo" placeholder="Digite o SubGrupo..." value={formData.subgrupo} onChange={handleChange} />

          <button type="submit" data-button>
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Form;
