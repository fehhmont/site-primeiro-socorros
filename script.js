const chave_API = 'cfW2hxjMdh5JWqfCTcNuWWQkuKDhGjAoy50yLC9T';

function contarReacoes() {
    const reacaoBusca = document.getElementById('txtReacao').value;
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.innerHTML = '<p>Carregando...</p>';

    // URL para contar registros de reações específicas
    const url = `https://api.fda.gov/drug/event.json?search=patient.reaction.reactionmeddrapt:"${encodeURIComponent(reacaoBusca)}"&count=patient.reaction.reactionmeddrapt.exact`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        resultadoDiv.innerHTML = '';

        if (data.error) {
            resultadoDiv.innerHTML = '<p>Ocorreu um erro na busca. Verifique a reação inserida.</p>';
        } else if (data.results && data.results.length > 0) {
            const reacao = data.results[0].term;
            const ocorrencias = data.results[0].count;

            resultadoDiv.innerHTML += `<h2>Reação: ${reacao}</h2>
            <p>Ocorrências: ${ocorrencias}</p>`;
        } else {
            resultadoDiv.innerHTML = '<p>Nenhum registro encontrado para essa reação.</p>';
        }
    })
    .catch(error => {
        resultadoDiv.innerHTML = '<p>Ocorreu um erro. Tente novamente mais tarde.</p>';
        console.error('Erro:', error);
    });
}