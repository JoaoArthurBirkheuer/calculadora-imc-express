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

const getPersonInfo = (request,response) => {
    const { name, height, weight } = request.body
    response.status(200).json({
        "name" : "nn",
        "height" : "n",
        "weight" : "weight"
    })
}

const test = (request, response) => {
    response.status(200).json({
        "IMC" : calculateIMC(1.77,66)
    })
}

/*const retrieveCalculations(request, response) => {
    let listIMC = [{}]
}

const removeCalculationById(request, response) => {

}*/

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

    return `IMC: ${imc.toFixed(2)} - ${classification}`;
};

console.log(calculateIMC(1.75, 70)); // IMC: 22.86 - Peso normal
console.log(calculateIMC(1.60, 90)); // IMC: 35.16 - Obesidade Grau 2
console.log(calculateIMC("a", 70));  // Valores inválidos!


app.route("/").get(test)

app.listen(3002, () => {
    console.log('Servidor rodando na porta 3002')
})
