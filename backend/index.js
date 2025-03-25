const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/**
 * a. Um método que recebe um objeto JSON com o nome, altura e peso de
uma pessoa, e retorna o valor do IMC e sua classificação juntamente
os dados recebidos. Este método também deve armazenar em
uma lista no servidor do serviço os cálculos já realizados.
b. Um método que retorna uma lista com todos os cálculos do IMC já
realizados.
c. Um método que recebe um índice de um cálculo já realizado e o
remove da lista
 */
const calculateIMC = (height, weight) => {
    let heightN = Number(height);
    let weightN = Number(weight);
    let imc = weightN / (heightN * heightN);

    if (isNaN(imc) || !isFinite(imc)) {
        return "Valores inválidos!";
    }

    let classification = "";
    
    if (imc < 18.5) {
        classification = "Abaixo do peso";
    } else if (imc < 24.9) {
        classification = "Peso normal";
    } else if (imc < 29.9) {
        classification = "Sobrepeso";
    } else if (imc < 34.9) {
        classification = "Obesidade Grau 1";
    } else if (imc < 39.9) {
        classification = "Obesidade Grau 2";
    } else {
        classification = "Obesidade Grau 3 (Mórbida)";
    }

    return { imc: imc.toFixed(2), classification };
};

let dataIMC = [
    { 
        name: "João Arthur", 
        height: "1.85", 
        weight: "75", 
        imc: calculateIMC(1.85, 75).imc, 
        classification: calculateIMC(1.85, 75).classification 
    },
    { 
        name: "Maria Fernanda", 
        height: "1.60", 
        weight: "90", 
        imc: calculateIMC(1.60, 90).imc, 
        classification: calculateIMC(1.60, 90).classification 
    },
    { 
        name: "Carlos Eduardo", 
        height: "1.75", 
        weight: "68", 
        imc: calculateIMC(1.75, 68).imc, 
        classification: calculateIMC(1.75, 68).classification 
    },
    { 
        name: "Ana Beatriz", 
        height: "1.70", 
        weight: "50", 
        imc: calculateIMC(1.70, 50).imc, 
        classification: calculateIMC(1.70, 50).classification 
    },
    { 
        name: "Roberto Lima", 
        height: "1.80", 
        weight: "110", 
        imc: calculateIMC(1.80, 110).imc, 
        classification: calculateIMC(1.80, 110).classification 
    }
];



const isConvertibleToDouble = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

// AUXILIARY METHODS ABOVE

// #######################

// REST METHODS BELOW

const addInfo = (request, response) => {
    const { name, height, weight } = request.body;

    if (!name || !isConvertibleToDouble(height) || height <= 0 || !isConvertibleToDouble(weight) || weight <= 0)
        return response.status(400).json({ msg: "Dados inválidos" });

    const imcData = calculateIMC(height, weight);

    const newEntry = {
        name,
        height,
        weight,
        imc: imcData.imc,
        classification: imcData.classification
    };

    dataIMC.push(newEntry);

    return response.status(201).json({
        msg: "IMC adicionado com sucesso",
        data: newEntry
    });
};

const getInfo = (request, response) => {
    response.status(200).json(dataIMC)
}

const deleteInfo = (request, response) => {
    const index = parseInt(request.params.index);

    if (isNaN(index) || index < 0 || index >= dataIMC.length) {
        return response.status(404).json({ msg: "Índice não encontrado" });
    }

    const removedEntry = dataIMC.splice(index, 1)[0];

    return response.status(200).json({
        msg: "IMC removido com sucesso",
        data: removedEntry
    });
};

app.route("/calculate").post(addInfo)
app.route("/history").get(getInfo)
app.route("/delete/:index").delete(deleteInfo)

app.listen(3002, () => {
    console.log('Servidor rodando na porta 3002')
})
