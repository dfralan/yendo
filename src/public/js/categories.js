const categories = {
  "categorias": [
    {
      "codigo": "000",
      "nombre": "Consumidor",
      "descripcion": "Usuario final."
    },
    {
      "codigo": "007",
      "nombre": "Envíos",
      "descripcion": "Servicios de entrega de paquetes y documentos, mensajería, cadetería"
    },
    {
      "codigo": "001",
      "nombre": "Cerrajería",
      "descripcion": "Servicios de cerrajería para apertura de puertas, cambio de cerraduras, duplicado de llaves, etc."
    },
    {
      "codigo": "002",
      "nombre": "Instalación de aire acondicionado",
      "descripcion": "Servicios de instalación, mantenimiento y reparación de sistemas de aire acondicionado."
    },
    {
      "codigo": "003",
      "nombre": "Jardinería",
      "descripcion": "Servicios de diseño de jardines, mantenimiento de áreas verdes, poda de árboles, entre otros."
    },
    {
      "codigo": "004",
      "nombre": "Limpieza del hogar",
      "descripcion": "Servicios de limpieza y organización de hogares, incluyendo limpieza profunda, limpieza regular y limpieza de ventanas."
    },
    {
      "codigo": "005",
      "nombre": "Fontanería",
      "descripcion": "Servicios de reparación, instalación y mantenimiento de sistemas de plomería y agua."
    },
    {
      "codigo": "006",
      "nombre": "Electricidad",
      "descripcion": "Instalación, reparación y mantenimiento de sistemas eléctricos en hogares y oficinas."
    },
    {
      "codigo": "008",
      "nombre": "Reparaciones domésticas",
      "descripcion": "Servicios de reparación y mantenimiento de electrodomésticos, muebles, pintura, carpintería, entre otros."
    },
    {
      "codigo": "009",
      "nombre": "Mudanzas",
      "descripcion": "Ayuda en el embalaje, transporte y descarga de muebles y pertenencias durante una mudanza, fletes, fletería."
    },
    {
      "codigo": "010",
      "nombre": "Servicios de belleza",
      "descripcion": "Servicios de peluquería, maquillaje, manicura, pedicura y cuidado personal a domicilio."
    },
    {
      "codigo": "011",
      "nombre": "Servicios de tutoría",
      "descripcion": "Clases particulares, apoyo escolar y tutorías en diferentes materias y niveles educativos."
    },
    {
      "codigo": "012",
      "nombre": "Servicios de traducción",
      "descripcion": "Traducción de documentos, interpretación en reuniones y asistencia en la comunicación multilingüe."
    },
    {
      "codigo": "013",
      "nombre": "Diseño gráfico y desarrollo web",
      "descripcion": "Servicios de diseño gráfico, creación de logotipos, diseño de sitios web y desarrollo de aplicaciones móviles."
    },
    {
      "codigo": "014",
      "nombre": "Organización de eventos",
      "descripcion": "Planificación y organización de eventos, como fiestas de cumpleaños, bodas, conferencias y reuniones corporativas."
    },
    {
      "codigo": "015",
      "nombre": "Traslado de pasajeros",
      "descripcion": "Servicio de traslado de pasajeros, viajes, media distancia."
    },
    {
      "codigo": "016",
      "nombre": "Producto",
      "descripcion": "Articulos"
    },
    {
      "codigo": "017",
      "nombre": "Paseador de perros",
      "descripcion": "Perros paseo"
    },
    {
      "codigo": "018",
      "nombre": "Resto",
      "descripcion": "Local Gastronómico"
    },
    {
      "codigo": "018",
      "nombre": "Hotel",
      "descripcion": "Complejo hotelero"
    }
  ]
}

const vehicleKind = {
  "vehicleKind": [
    {
      "codigo": "000",
      "nombre": "Ninguno",
    },
    {
      "codigo": "001",
      "nombre": "Bicicleta",
    },
    {
      "codigo": "002",
      "nombre": "Monopatín Electrico",
    },
    {
      "codigo": "003",
      "nombre": "Moto",
    },
    {
      "codigo": "004",
      "nombre": "Auto",
    },
    {
      "codigo": "005",
      "nombre": "Utilitario",
    },
    {
      "codigo": "006",
      "nombre": "Camioneta",
    },
    {
      "codigo": "007",
      "nombre": "Van",
    },
    {
      "codigo": "008",
      "nombre": "Colectivo",
    },
    {
      "codigo": "009",
      "nombre": "Camión",
    },
  ]
}

var categoriesN = 0

function foreach(categories, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }

  let html = '';
  categories.categorias.forEach(category => {

  categoriesN ++

  console.log(categoriesN)

    if (category.codigo === "000") {return}
    const categoryHTML = `

    
      <small style="border-width: 1px ;border-color: #03825a; color: #039768;" class="no-wrap font-500 decoration-none padded-wide color-black rounded-s border-solid s-padded-wide bg-none">
        ${category.nombre}
      </small>
    `;

    if (categoriesN > 6) {return} else {
      html += categoryHTML;
    }
    
  });

  container.innerHTML = html;
}

// Usage
foreach(categories, 'categoryPillsContainer');


  
