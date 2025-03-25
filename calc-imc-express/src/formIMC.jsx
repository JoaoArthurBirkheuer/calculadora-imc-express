import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormIMC() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar dados antes de enviar
    if (!name || !height || !weight || isNaN(height) || isNaN(weight)
    || height <= 0 || weight <= 0) {
      setError("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setError(null);

    fetch("http://localhost:3002/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, height: Number(height), weight: Number(weight) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "IMC adicionado com sucesso") {
          if (window.confirm("IMC adicionado! Deseja inserir outro?")) {
            setName("");
            setHeight("");
            setWeight("");
          } else {
            navigate("/");
          }
        } else {
          setError(data.msg || "Erro desconhecido. Tente novamente.");
        }
      })
      .catch(() => setError("Erro na comunicação com o servidor."));
  };

  const handleGoToHistory = () => {
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Adicionar Novo IMC</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Altura (m)</label>
          <input
            className="form-control"
            type="number"
            step="0.01"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Peso (kg)</label>
          <input
            className="form-control"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Calcular IMC
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleGoToHistory}
          >
            Voltar ao Histórico
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormIMC;
