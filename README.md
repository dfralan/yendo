Read [](file:///Users/a/dev/yendo/src/public/js/app.js)

Read [](file:///Users/a/dev/yendo/partner/index.html#1-1), lines 1 to 80

Read [](file:///Users/a/dev/yendo/index.html#1-1), lines 1 to 100

Read [](file:///Users/a/dev/yendo/src/public/js/matcher.js)

Read [](file:///Users/a/dev/yendo/src/public/js/utilities.js)

Read [](file:///Users/a/dev/yendo/src/public/js/yendoComposer.js#1-1), lines 1 to 80

Listo, acá va el **abstract** de cómo funcionaba Yendo:

---

## **YENDO - Plataforma de Delivery & Tareas Descentralizada**

### **Arquitectura General**
Era un **marketplace descentralizado** para conectar:
- 🚚 **Repartidores** (Delivery Users) - Ubicados por ciudad/provincia
- 🏪 **Negocios Partners** - Restaurantes/locales gastronómicos  
- 👥 **Clientes** - Usuarios que piden entregas/servicios

---

### **Módulos Principales**

**1. CORE - Datos Estáticos**
- `usersAR.js` → Base de datos de repartidores con ID, username, rating, ciudad, estado
- `citiesAR.js` → Catálogo de provincias y ciudades de Argentina
- `categories.js` → Categorías de productos/servicios

**2. FRONT-END (SPA Components)**
- **Navbar/Menu** - Navegación principal
- **Hero Popular** - Landing con actividades/tasks populares
- **Navigator** - Tablero principal
- **Task Wrap** - Listado de tareas/deliveries
- **Footer** - Pie de página

**3. LÓGICA DE NEGOCIOS**
- matcher.js → Motorizador de matching (repartidor ↔ pedido)
- `coordinator.js` → Coordinación de entregas
- yendoComposer.js → Sistema de órdenes con validaciones:
  - Dirección retiro/entrega
  - Flags: urgente, frágil, frío, efectivo
  - Rating de repartidores

**4. PARTNER PORTAL** (partner)
- `menu.html` - Gestión de menú
- `cart.html` - Carrito de pedidos
- Templates de diseño: arq, classy, ramen, vintage
- `partnersAR.js` - Data de partners

**5. UTILIDADES**
- `predictiveCity.js` → Autocompletar ciudades
- `getgeo.js` → Geolocalización
- `record.js` → Logging de eventos
- `rating.js` → Sistema de ratings
- `loginForm.js` → Autenticación básica
- `loom.js` + `loomTranslations.js` → i18n & componentes dinámicos

---

### **Flujo Principal**
1. User ve orden → Matcher busca repartidores disponibles en esa ciudad
2. Repartidor acepta → Coordinator maneja estado
3. Order tiene tags (urgente, frío, etc) que afectan matching
4. QR generado para tracking
5. Rating actualizado post-entrega

### **Tech Stack**
- **Frontend**: Vanilla JS, Bootstrap, jQuery
- **CSS**: Dinámico (arq.css, classy.css, etc)
- **Data**: Arrays en JS (usersAR, citiesAR)
- **Features**: QR codes, geolocation, service workers

---

Básicamente era un **Uber meets local commerce** para Argentina con enfoque en delivery. 🚀