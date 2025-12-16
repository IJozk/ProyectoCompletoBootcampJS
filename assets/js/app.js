const recetas = [
    {
        id: 1,
        nombre: "Tarta de Manzana",
        ingredientes: ["Manzanas", "Harina", "Azúcar", "Huevos", "Mantequilla"],
        tiempoPreparacion: 60,
        dificultad: "media",
        img: "./assets/img/tarta-manzana.jpg"
    },
    {
        id: 2,
        nombre: "Ensalada César",
        ingredientes: ["Lechuga", "Pollo", "Queso parmesano", "Aderezo César", "Crutones"],
        tiempoPreparacion: 20,
        dificultad: "fácil",
        img: "./assets/img/Ensalada-cesar.jpg"
    },
    {
        id: 3,
        nombre: "Paella Valenciana",
        ingredientes: ["Arroz", "Pollo", "Conejo", "Porotos verdes", "Garrofón", "Azafrán"],
        tiempoPreparacion: 90,
        dificultad: "difícil",
        img: "./assets/img/paella-caracoles-m.jpg"
    },
    {
        id: 4,
        nombre: "Chorrillana",
        ingredientes: ["Papas fritas", "Carne de res", "Cebolla", "Huevos", "Salchichas"],
        tiempoPreparacion: 45,
        dificultad: "fácil",
        img: "./assets/img/chorrillana.jpg"
    },
    {
        id: 5,
        nombre: "Ceviche Peruano",
        ingredientes: ["Pescado blanco", "Jugo de limón", "Cebolla roja", "Ají limo", "Cilantro"],
        tiempoPreparacion: 30,
        dificultad: "media",
        img: "./assets/img/ceviche-peruano.jpg"
    },
    {
        id: 6,
        nombre: "Lomo a lo Pobre",
        ingredientes: ["Lomo de res", "Huevos", "Papas fritas", "Cebolla", "Arroz"],
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

    const terminoBusqueda = inputBusqueda.value.trim().toLowerCase();

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
    divisionRecetasPaginacion(recetasFiltradas);
    mostrarRecetas(recetasPaginacion[paginaActual]);
});

function mostrarRecetas(recetas) {
    divRecetas.innerHTML = '';
    if (recetas.length === 0) {
        divRecetas.innerHTML = `
            <div class="alert alert-secondary" role="alert">
                No se encontraron recetas que coincidan con tu búsqueda.
            </div>`;
        return;
    }else {
        recetas.forEach(receta => {
        divRecetas.innerHTML += `
                    <div class="col-sm-5 col-lg-3 card text-start m-sm-3 p-0">
                        <img class="card-img-top" src="${receta.img}" alt="Title" />
                        <div class="card-body">
                            <h4 class="card-title">${receta.nombre}</h4>
                            <p class="card-text">Ingredientes:
                                <ul>
                                    <li>${receta.ingredientes.join('</li><li>')}</li>
                                </ul>
                                <a href="#" class="btn btn-outline-primary">Ver Receta</a>
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

const recetasPaginacion = [];

let paginaActual = 0;

const divisionRecetasPaginacion = (recetas) => {

    const divPaginacion = document.getElementById('paginacion');

    divPaginacion.innerHTML = `<li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" onclick="event.preventDefault(); cambiarPagina(${paginaActual !== 0 ? paginaActual - 1 : paginaActual})>Previous</a>
                                </li>`;

    for (let i = 0; i < recetas.length / 3 ; i++) {
        divPaginacion.innerHTML += `
            <li class="page-item"><a class="page-link" href="#" onclick="event.preventDefault(); cambiarPagina(${i})">${i + 1}</a></li>
        `;
        recetasPaginacion[i] = recetas.slice(3*i, i + 3*(i+1));
    }

    divPaginacion.innerHTML += `<li class="page-item">
                                    <a class="page-link" href="#" onclick="event.preventDefault(); cambiarPagina(${ paginaActual < recetasPaginacion.length ? paginaActual+1 : paginaActual})>Next</a>
                                </li>`
}

const cambiarPagina = (indicePagina) => {
    paginaActual = indicePagina;
    console.log('Página actual:', paginaActual);
    mostrarRecetas(recetasPaginacion[indicePagina]);
};

divisionRecetasPaginacion(recetas);
mostrarRecetas(recetasPaginacion[paginaActual]);