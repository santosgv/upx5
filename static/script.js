// Exemplo de inicialização de lista de ferramentas
const tools = [];

// Função para exibir a lista de ferramentas
function displayTools() {
  const toolList = document.getElementById("toolList");
  toolList.innerHTML = "";

  tools.forEach((tool) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `<b>ID:</b> ${tool.id} | <b>Tipo:</b> ${tool.type} | <b>Fabricante:</b> ${tool.manufacturer} | <b>Data Aquisição:</b> ${tool.acquisitionDate} | <b>Data Última Calibração:</b> ${tool.lastCalibrationDate} | <b>Data Próxima Calibração:</b> ${tool.nextCalibrationDate} | <b>Garantia:</b> ${tool.warranty}`;
    toolList.appendChild(listItem);
  });
}

// Adicionar evento de submissão do formulário para cadastrar nova ferramenta
document
  .getElementById("addToolForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obter os valores dos campos do formulário
    const type = document.getElementById("type").value;
    const manufacturer = document.getElementById("manufacturer").value;
    const acquisitionDate = document.getElementById("acquisitionDate").value;
    const lastCalibrationDate = document.getElementById(
      "lastCalibrationDate"
    ).value;
    const nextCalibrationDate = document.getElementById(
      "nextCalibrationDate"
    ).value;
    const warranty = document.getElementById("warranty").value;

    // Validar se todos os campos estão preenchidos
    if (
      !type ||
      !manufacturer ||
      !acquisitionDate ||
      !lastCalibrationDate ||
      !nextCalibrationDate ||
      !warranty
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Criar um novo objeto de ferramenta
    const newTool = {
      id: tools.length + 1, // ID único (por enquanto apenas um incremento)
      type: type,
      manufacturer: manufacturer,
      acquisitionDate: acquisitionDate,
      lastCalibrationDate: lastCalibrationDate,
      nextCalibrationDate: nextCalibrationDate,
      warranty: warranty,
    };

    // Adicionar a nova ferramenta à lista e exibir a lista atualizada
    tools.push(newTool);
    displayTools();

    // Limpar os campos do formulário
    document.getElementById("addToolForm").reset();

    // Fechar o modal
    $("#addToolModal").modal("hide");
  });

// Adicionar evento de clique para excluir ferramenta
document.getElementById("toolList").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-tool")) {
    const toolId = parseInt(event.target.dataset.toolId);
    deleteTool(toolId);
  }
});

// Função para excluir ferramenta
function deleteTool(toolId) {
  const index = tools.findIndex((tool) => tool.id === toolId);
  if (index !== -1) {
    tools.splice(index, 1);
    displayTools();
  }
}

// ... (código anterior permanece inalterado) ...

// Adicionar evento de clique para o botão de pesquisa
document.getElementById("searchButton").addEventListener("click", function () {
  const searchId = parseInt(document.getElementById("searchTool").value);

  // Validar se o ID é um número válido
  if (isNaN(searchId)) {
    alert("Por favor, insira um ID válido para pesquisar.");
    return;
  }

  // Buscar a ferramenta pelo ID
  const foundTool = tools.find((tool) => tool.id === searchId);

  // Exibir a ferramenta encontrada ou uma mensagem de não encontrado
  if (foundTool) {
    displayToolDetails(foundTool); // Exibir detalhes da ferramenta no modal
  } else {
    alert("Ferramenta não encontrada.");
  }
});

// Função para exibir detalhes da ferramenta no modal
function displayToolDetails(tool) {
  const toolDetailsBody = document.getElementById("toolDetailsBody");
  toolDetailsBody.innerHTML = "";

  // Adicionar detalhes da ferramenta ao modal
  const detailsList = document.createElement("ul");
  detailsList.className = "list-group";
  detailsList.innerHTML = `<li class="list-group-item"><b>ID:</b> ${tool.id}</li>
                             <li class="list-group-item"><b>Tipo:</b> ${tool.type}</li>
                             <li class="list-group-item"><b>Fabricante:</b> ${tool.manufacturer}</li>
                             <li class="list-group-item"><b>Data Aquisição:</b> ${tool.acquisitionDate}</li>
                             <li class="list-group-item"><b>Data Última Calibração:</b> ${tool.lastCalibrationDate}</li>
                             <li class="list-group-item"><b>Data Próxima Calibração:</b> ${tool.nextCalibrationDate}</li>
                             <li class="list-group-item"><b>Garantia:</b> ${tool.warranty}</li>`;

  // Adicionar botão de fechar ao modal
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "btn btn-secondary";
  closeButton.setAttribute("data-dismiss", "modal");
  closeButton.textContent = "Fechar";

  // Adicionar detalhes e botão de fechar ao corpo do modal
  toolDetailsBody.appendChild(detailsList);
  toolDetailsBody.appendChild(closeButton);

  // Abrir o modal
  $("#toolDetailsModal").modal("show");
}

// ... (código anterior permanece inalterado) ...

// Adicionar evento de clique para excluir ferramenta
document.getElementById("toolList").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-tool")) {
    const toolId = parseInt(event.target.dataset.toolId);
    deleteTool(toolId);
  }
});

// Função para excluir ferramenta
function deleteTool(toolId) {
  const index = tools.findIndex((tool) => tool.id === toolId);
  if (index !== -1) {
    tools.splice(index, 1);
    displayTools();
  }
}

// ... (código anterior permanece inalterado) ...

// Função para criar um elemento de botão de exclusão
function createDeleteButton(toolId) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn", "btn-danger", "delete-tool");
  button.dataset.toolId = toolId;
  button.textContent = "Excluir";
  return button;
}

// Função para exibir a lista de ferramentas
function displayTools(toolsToDisplay = tools) {
  const toolList = document.getElementById("toolList");
  toolList.innerHTML = "";

  toolsToDisplay.forEach((tool) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `<b>ID:</b> ${tool.id} | <b>Tipo:</b> ${tool.type} | <b>Fabricante:</b> ${tool.manufacturer} | <b>Data Aquisição:</b> ${tool.acquisitionDate} | <b>Data Última Calibração:</b> ${tool.lastCalibrationDate} | <b>Data Próxima Calibração:</b> ${tool.nextCalibrationDate} | <b>Garantia:</b> ${tool.warranty}`;

    // Adiciona o botão de exclusão
    listItem.appendChild(createDeleteButton(tool.id));

    toolList.appendChild(listItem);
  });
}

// ... (código anterior permanece inalterado) ...

// Exemplo de chamada para exibir a lista de ferramentas ao carregar a página
displayTools();
