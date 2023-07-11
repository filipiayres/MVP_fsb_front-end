/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/pacientes';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.pacientes.forEach(item => insertList(item.nome, item.CPF, item.comorbidade))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um paciente na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputNome, inputCPF, inputComorbidade) => {
    const formData = new FormData();
    formData.append('nome', inputNome);
    formData.append('CPF', inputCPF);
    formData.append('comorbidade', inputComorbidade);
  
    let url = 'http://127.0.0.1:5000/paciente';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada paciente da lista
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para remover um paciente da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza que deseja remover esse paciente?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Paciente removido")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um paciente da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/paciente?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo paciente com nome completo, CPF e comorbidade 
    --------------------------------------------------------------------------------------
  */
  const newPaciente = () => {
    let inputNome = document.getElementById("newNome").value;
    let inputCPF = document.getElementById("newCPF").value;
    let inputComorbidade = document.getElementById("newComorbidade").value;
  
    if (inputNome === '') {
      alert("Escreva o nome do paciente.");
    } else if (inputCPF == null || inputCPF == ""){
      alert("O CPF deve ser informado. Deve conter apenas números");
    } else if (inputCPF.length >= 12){
      alert("O número do CPF digitado está muito LONGO. Verifique os números digitados.");
    } else if (inputCPF.length < 10){
      alert("O número do CPF digitado está muito CURTO. Verifique os números digitados."); 
    } else if (inputComorbidade == ''){
      alert("A comorbidade dever ser preenchida.");
    } else {
      insertList(inputNome, inputCPF, inputComorbidade)
      postItem(inputNome, inputCPF, inputComorbidade)
      alert("Paciente adicionado com sucesso.")
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir paciente na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (nameNome_Completo, CPF, Comorbidade) => {
    var item = [nameNome_Completo, CPF, Comorbidade]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newNome").value = "";
    document.getElementById("newCPF").value = "";
    document.getElementById("newComorbidade").value = "";
  
    removeElement()
  }