const recetas = [
    {
        id: 1,
        nombre: "Tarta de Manzana",
        ingredientes: ["manzanas", "harina", "azúcar", "huevos", "mantequilla"],
        tiempoPreparacion: 60,
        dificultad: "media",
        img: "./assets/img/tarta-manzana.jpg"
    },
    {
        id: 2,
        nombre: "Ensalada César",
        ingredientes: ["lechuga", "pollo", "queso parmesano", "aderezo César", "crutones"],
        tiempoPreparacion: 20,
        dificultad: "fácil",
        img: "./assets/img/Ensalada-cesar.jpg"
    },
    {
        id: 3,
        nombre: "Paella Valenciana",
        ingredientes: ["arroz", "pollo", "conejo", "judías verdes", "garrofón", "azafrán"],
        tiempoPreparacion: 90,
        dificultad: "difícil",
        img: "./assets/img/paella-caracoles-m.jpg"
    },
    {
        id: 4,
        nombre: "Chorrillana",
        ingredientes: ["papas fritas", "carne de res", "cebolla", "huevos", "salchichas"],
        tiempoPreparacion: 45,
        dificultad: "fácil",
        img: "./assets/img/chorrillana.jpg"
    },
    {
        id: 5,
        nombre: "Ceviche Peruano",
        ingredientes: ["pescado blanco", "jugo de limón", "cebolla roja", "ají limo", "cilantro"],
        tiempoPreparacion: 30,
        dificultad: "media",
        img: "./assets/img/ceviche-peruano.jpg"
    },
    {
        id: 6,
        nombre: "Lomo a lo Pobre",
        ingredientes: ["lomo de res", "huevos", "papas fritas", "cebolla", "arroz"],
        tiempoPreparacion: 50,
        dificultad: "fácil",
        img: "./assets/img/lomo-a-lo-pobre.jpg"
    }
];

const divRecetas = document.getElementById('recetas');
const inputBusqueda = document.getElementById('validationinput1');
const btnBuscar = document.getElementById('buscarReceta');

btnBuscar.addEventListener('click', (e) => {
    e.preventDefault();

    const terminoBusqueda = inputBusqueda.value.trim();

    console.log('Término de búsqueda:', terminoBusqueda);
    let recetasFiltradas = [];
    if (terminoBusqueda === '') {
        recetasFiltradas = recetas;
    } else {
        recetasFiltradas = filtrarRecetasPorNombre(terminoBusqueda);
        if (recetasFiltradas.length === 0) {
            recetasFiltradas = filtrarRecetasPorIngrediente(terminoBusqueda);
        }
    }
    mostrarRecetas(recetasFiltradas);
});

function mostrarRecetas(recetas) {
    divRecetas.innerHTML = '';
    if (recetas.length === 0) {
        divRecetas.innerHTML = `
            <div class="col-sm-5 col-md-3 card text-start">
                <div class="card-body">
                    <p class="card-text">No se Encontraron resultados</p>
                </div>
            </div>`;
        return;
    }else{
        recetas.forEach(receta => {
        divRecetas.innerHTML += `
                    <div class="col-sm-5 col-lg-3 card text-start g-3 m-sm-3">
                        <img class="card-img-top" src="${receta.img}" alt="Title" />
                        <div class="card-body">
                            <h4 class="card-title">${receta.nombre}</h4>
                            <p class="card-text">Ingredientes:
                                <ul>
                                    <li>${receta.ingredientes.join('</li><li>')}</li>
                                </ul>
                                <a href="#" class="btn btn-primary">Ver Receta</a>
                            </p>
                        </div>
                    </div>`
        });
    }
}

function filtrarRecetasPorIngrediente(ingrediente) {
    return recetas.filter(receta => receta.ingredientes.some(ing => ing.toLowerCase().includes(ingrediente.toLowerCase())));
}

function filtrarRecetasPorNombre(nombre) {
    return recetas.filter(receta => receta.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

mostrarRecetas(recetas);

