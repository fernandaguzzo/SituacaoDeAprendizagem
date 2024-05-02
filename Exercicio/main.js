let listaDePatrimonios = [];

const form = document.getElementById("form-patrimonios");
const patrimonioInput = document.getElementById("receber-patrimonio");
const ulPatrimonios = document.getElementById("lista-de-patrimonios");
const ulPatrimoniosVerificados = document.getElementById("patrimonios-verificados");
const listaRecuperada = localStorage.getItem('listaDePatrimonios');

function atualizaLocalStorage(){
    localStorage.setItem('listaDePatrimonios', JSON.stringify(listaDePatrimonios));
}

if (listaRecuperada){
    listaDePatrimonios = JSON.parse(listaRecuperada);
    mostrarPatrimonio();
} else {
    listaDePatrimonios = [];
}

form.addEventListener("submit", function (evento){
    evento.preventDefault();
    salvarPatrimonio();
    mostrarPatrimonio();
    patrimonioInput.focus();
})

function salvarPatrimonio(){
    const patrimonioItem = patrimonioInput.value;
    const checarDuplicado = listaDePatrimonios.some((elemento) => elemento.valor.toUpperCase() === patrimonioItem.toUpperCase());
    patrimonioInput.value = '';

    if (checarDuplicado){
        alert("Patrimônio já existe!");
    } else {
        listaDePatrimonios.push({
            valor: patrimonioItem,
            checar: false
        });
    }
}

function mostrarPatrimonio(){
    ulPatrimonios.innerHTML = '';
    ulPatrimoniosVerificados.innerHTML = '';
    
    listaDePatrimonios.forEach((elemento,index) => {
        if(elemento.checar){
            ulPatrimoniosVerificados.innerHTML += `
            <li class="patrimonio-verificado" is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />
                    <input type="text" class="in-size-5" value="${elemento.valor}"></input>
                </div>
                <div>
                    <i class= "fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `;
        } else {
            ulPatrimonios.innerHTML += `
            <li class="patrimonio" is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="in-size-5" value="${elemento.valor}"></input>
                </div>
                <div>
                    <i class= "fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `;
        }
    });

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');
    inputsCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDePatrimonios[valorDoElemento].checar = evento.target.checked;
            mostrarPatrimonio();
        });
    });

    const deletarObjetos = document.querySelectorAll(".deletar");
    deletarObjetos.forEach(i => {
        i.addEventListener('click', (evento) => {
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDePatrimonios.splice(valorDoElemento,1);
            mostrarPatrimonio();
        });
    });

    atualizaLocalStorage();
}