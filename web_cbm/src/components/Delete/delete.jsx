import React, { useEffect, useState } from 'react';
import "./index.css"
//Get and Delete
function Delete() {
    const [occ, setOcc] = useState([]);

    useEffect(() => {
        fetchOcorrencias();
    }, []);

    function fetchOcorrencias() {
        fetch('http://localhost:3001/ocorrencia', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then((data) => {
            setOcc(data);
        })
        .catch(erro => console.error('Erro ao buscar dados:', erro));
    }

    function deleteOccurrence(id) {
        fetch(`http://localhost:3001/ocorrencia/${id}`, {
            method: 'DELETE',
        })
        .then(result => result.json())
        .then((data) => {
            console.log(data); 
            fetchOcorrencias();
        })
        .catch(erro => console.error('Erro ao excluir ocorrência:', erro));
    }

    return (
        <section className="list">
            <h1>Deletar</h1>
            <div>
                <table>
                    <thead>
                        <tr className="firstLine">
                            <th>DATA/HORA</th>
                            <th>NATUREZA</th>
                            <th>GRUPO</th>
                            <th>SUBGRUPO</th>
                            <th>BAIRRO</th>
                            <th>LAGRADOURO</th>
                            <th>ID</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {occ.map(ocorrencia => (
                            <tr key={ocorrencia.id} className="line">
                                <td>{ocorrencia.dateTime}</td>
                                <td>{ocorrencia.natureza}</td>
                                <td>{ocorrencia.grupo}</td>
                                <td>{ocorrencia.subgrupo}</td>
                                <td>{ocorrencia.bairro}</td>
                                <td>{ocorrencia.logradouro}</td>
                                <td>{ocorrencia.id}</td>
                                <td><button onClick={() => deleteOccurrence(ocorrencia.id)}>Excluir</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Delete;
