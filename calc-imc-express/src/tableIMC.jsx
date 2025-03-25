import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TableIMC() {
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false); // Estado para controlar a visibilidade da tabela
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3002/history")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setData(data);
      });
  }, []);

  const deleteIMC = (index) => {
    if (window.confirm("Tem certeza que deseja remover este IMC?")) {
      fetch(`http://localhost:3002/delete/${index}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          alert("IMC removido com sucesso!");
          setData((prev) => prev.filter((_, i) => i !== index));
        });
    }
  };

  const toggleTableVisibility = () => {
    setShowTable((prev) => !prev); // Alterna entre mostrar e esconder a tabela
  };

  return (
    <div className="container mt-4">
      <h2>Histórico de IMCs</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/add")}>
        Inserir novo IMC
      </button>

      {/* Botão para alternar a visibilidade da tabela */}
      <button
        className={`btn mb-3 ${showTable ? "btn-danger" : "btn-success"}`} // Altera a cor do botão
        onClick={toggleTableVisibility}
      >
        {showTable ? "Ocultar IMCs" : "IMCs"}
      </button>

      {/* Tabela exibida se o estado showTable for verdadeiro */}
      {showTable && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>IMC</th>
              <th>Classificação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.height}</td>
                <td>{item.weight}</td>
                <td>{item.imc}</td>
                <td>{item.classification}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteIMC(index)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableIMC;
