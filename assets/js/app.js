const projectsData = [
    {
        id: 1,
        title: "Inscryption",
        image: "./assets/img/Inscryption.jpg",
        shortDescription: "Un roguelike de cartas con terror psicológico y una historia totalmente impredecible.",
        fullDescription: "Inscryption es un siniestro roguelike de cartas que mezcla elementos de escape room y terror psicológico. Desarrollado por Daniel Mullins Games, el juego te sumerge en una cabaña oscura donde un misterioso personaje te obliga a jugar un juego de cartas con apuestas mortales. Con múltiples actos y giros argumentales sorprendentes, Inscryption redefine lo que significa un juego de cartas.",
        link: "https://www.inscryption.com"
    },
    {
        id: 2,
        title: "Ultrakill",
        image: "./assets/img/Ultrakill.jpg",
        shortDescription: "Un juego de acción y disparos con un toque gore. Muy entretenido y frenético.",
        fullDescription: "Ultrakill es un shooter de acción rápido y sangriento que combina el estilo de juegos clásicos como Quake con mecánicas modernas. Desarrollado por Arsi 'Hakita' Patala, el juego se centra en el movimiento fluido, el combate intenso y un sistema de puntuación que recompensa la agresividad y la variedad. Con una estética retro y una banda sonora electrónica pulsante, Ultrakill es una experiencia adictiva para los amantes de los shooters.",
        link: "https://ultrakill.fandom.com/wiki/Home"
    },
    {
        id: 3,
        title: "Hollow Knight",
        image: "./assets/img/HollowKnight.jpg",
        shortDescription: "Un metroidvania muy original con personajes memorables y un mundo increíble.",
        fullDescription: "Hollow Knight es un aclamado metroidvania desarrollado por Team Cherry. Explora las vastas y interconectadas ruinas del reino de Hallownest, descubre secretos antiguos, enfréntate a criaturas corrompidas y mejora tus habilidades en este mundo de insectos y héroes. Con su hermosa estética dibujada a mano, su profunda narrativa y su desafiante jugabilidad, Hollow Knight se ha convertido en un referente del género.",
        link: "https://www.hollowknight.com"
    },
    {
        id: 4,
        title: "Outer Wilds",
        image: "./assets/img/OuterWilds.jpeg",
        shortDescription: "Un juego de exploración del espacio con una historia y forma de contarla magistral.",
        fullDescription: "Outer Wilds es un juego de exploración espacial donde encarnas a un astronauta en su primer lanzamiento, atrapado en un bucle temporal de 22 minutos. Explora un sistema solar en constante evolución, descubre los secretos de una antigua civilización y desentraña los misterios del universo antes de que todo se repita. Desarrollado por Mobius Digital, este juego ofrece una experiencia narrativa única donde el conocimiento es tu principal progreso.",
        link: "https://www.mobiusdigitalgames.com/outer-wilds.html"
    },
    {
        id: 5,
        title: "Clover Pit",
        image: "./assets/img/CloverPit.webp",
        shortDescription: "Un roguelike de apuestas misterioso y muy gratificante de jugar.",
        fullDescription: "Clover Pit es un intrigante roguelike que combina elementos de juego de cartas, apuestas y misterio. Desarrollado por Panik Arcade, el juego te sumerge en un mundo underground donde cada decisión cuenta y la suerte puede cambiar en un instante. Con su estética única y mecánicas innovadoras, Clover Pit ofrece una experiencia de juego que recompensa la estrategia y la audacia.",
        link: "https://www.panikarcade.games"
    },
    {
        id: 6,
        title: "Undertale",
        image: "./assets/img/undertale.webp",
        shortDescription: "Un RPG muy original y con varias maneras de jugarlo que cambian la experiencia por completo",
        fullDescription: "Undertale es un RPG único desarrollado por Toby Fox donde puedes elegir no matar a nadie. Caído al subsuelo, un reino habitado por monstruos, debes encontrar tu camino de regreso a la superficie. Con su sistema de combate innovador, sus memorables personajes y su banda sonora excepcional, Undertale desafía las convenciones del género y te permite vivir una experiencia personalizada según tus decisiones.",
        link: "https://undertale.com"
    }
];

// Inicialización cuando el documento esté listo
$(document).ready(function() {
    showSection('inicio');
    loadProjects(projectsData);
    setupNavigation();
    setupSearch();
    setupContactForm();
});

// Función para mostrar/ocultar secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    $('.content-section').removeClass('active');
    // Mostrar la sección seleccionada
    $(`#${sectionId}`).addClass('active');
    // Actualizar URL
    window.location.hash = sectionId;
}

// Configurar navegación
function setupNavigation() {
    // Navegación por enlaces
    $('a[data-section]').on('click', function(e) {
        e.preventDefault();
        const sectionId = $(this).data('section');
        showSection(sectionId);
    });
    
    // Navegación por hash en la URL
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        showSection(sectionId);
    }
}

// Cargar proyectos en la sección correspondiente
function loadProjects(projects) {
    const container = $('#projects-container');
    container.empty();
    
    projects.forEach(project => {
        const projectCard = `
            <div class="col-md-4 project-card" data-project-id="${project.id}">
                <div class="card h-100">
                    <img src="${project.image}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text short-description">${project.shortDescription}</p>
                        <div class="full-description" style="display: none;">
                            <p>${project.fullDescription}</p>
                            <a href="${project.link}" class="btn btn-outline-primary" target="_blank">Más Información</a>
                        </div>
                        <button class="btn btn-primary toggle-description">Ver más</button>
                    </div>
                </div>
            </div>
        `;
        container.append(projectCard);
    });
    
    // Configurar eventos para mostrar/ocultar descripciones
    $('.toggle-description').on('click', function() {
        const cardBody = $(this).closest('.card-body');
        const shortDescription = cardBody.find('.short-description');
        const fullDescription = cardBody.find('.full-description');
        
        if (fullDescription.is(':visible')) {
            fullDescription.hide();
            shortDescription.show();
            $(this).text('Ver más');
        } else {
            shortDescription.hide();
            fullDescription.show();
            $(this).text('Ver menos');
        }
    });
}

// Configurar búsqueda
function setupSearch() {
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        const searchTerm = $('#search-input').val().toLowerCase().trim();
        
        // Si está en la sección de proyectos, filtrar proyectos
        if ($('#proyectos').hasClass('active')) {
            filterProjects(searchTerm);
        } else {
            // Si no está en proyectos, ir a proyectos y luego filtrar
            showSection('proyectos');
            // Esperar a que se carguen los proyectos y luego filtrar
            setTimeout(() => {
                filterProjects(searchTerm);
            }, 100);
        }
    });
}

// Filtrar proyectos según término de búsqueda
function filterProjects(searchTerm) {
    if (!searchTerm) {
        // Si no hay término de búsqueda, mostrar todos los proyectos
        $('.project-card').show();
        return;
    }
    
    $('.project-card').each(function() {
        const card = $(this);
        const title = card.find('.card-title').text().toLowerCase();
        const description = card.find('.short-description').text().toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.show();
        } else {
            card.hide();
        }
    });
}

// Configurar formulario de contacto
function setupContactForm() {
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!name || !email || !subject || !message) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un email válido.');
            return;
        }
        
        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        modal.show();
        
        $('#contact-form')[0].reset();
    });
}