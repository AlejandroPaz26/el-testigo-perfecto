/**
 * ============================================================================
 * EL TESTIGO PERFECTO — Lógica Principal del Juego (juego.js)
 * Fase implementada: Fase de Observación (30 segundos por sala, sin retorno)
 * ============================================================================
 */

/* ----------------------------------------------------------------------------
 * 1. RESPALDO DE ÍNDICE DE CASOS Y EXPEDIENTES
 * Se utiliza únicamente si el navegador bloquea fetch() por abrir index.html
 * directamente con el protocolo file:// sin un servidor local.
 * ---------------------------------------------------------------------------- */
const RESPALDO_INDICE_CASOS = [
  {
    id: "caso1",
    titulo: "El Caso del Sr. Valdés",
    descripcion:
      "El empresario D. Héctor Valdés ha sido hallado sin vida en su mansión durante una noche de tormenta. Inspecciona el estudio y el vestíbulo para descubrir quién miente.",
    descripcionCorta:
      "El empresario D. Héctor Valdés ha sido hallado sin vida en su mansión durante una noche de tormenta. Inspecciona el estudio y el vestíbulo para descubrir quién miente.",
    ruta: "data/casos/caso1.json"
  },
  {
    id: "caso2",
    titulo: "El Robo del Zafiro Imperial",
    descripcion:
      "Durante la gala de medianoche en el Museo Real, el Zafiro Imperial desapareció tras un apagón de dos minutos. Examina la sala de exposiciones y el despacho de seguridad.",
    descripcionCorta:
      "Durante la gala de medianoche en el Museo Real, el Zafiro Imperial desapareció tras un apagón de dos minutos. Examina la sala de exposiciones y el despacho de seguridad.",
    ruta: "data/casos/caso2.json"
  }
];

const RESPALDO_CASO_1 = {
  id: "caso1",
  titulo: "El Caso del Sr. Valdés",
  subtitulo: "Misterio en la Mansión Valdés",
  descripcion:
    "El acaudalado empresario D. Héctor Valdés ha sido hallado sin vida en su mansión durante una noche de tormenta. Como inspector a cargo, dispones de exactamente 30 segundos por sala para observar la escena y registrar cada objeto antes de que la policía científica clausure las habitaciones.",
  tiempoPorSala: 30,
  salas: [
    {
      id: "estudio",
      nombre: "Estudio del Sr. Valdés",
      icono: "📚",
      descripcion:
        "El despacho privado donde fue hallado el Sr. Valdés. Huele a tabaco antiguo y té recién servido.",
      objetos: [
        { id: "reloj_roto", nombre: "Reloj de pared detenido a las 22:15", emoji: "🕙", imagen: "assets/objetos/reloj_roto.png", x: 18, y: 22 },
        { id: "ventana_cerrada", nombre: "Ventana cerrada con pestillo por dentro", emoji: "🪟", imagen: "assets/objetos/ventana_cerrada.png", x: 78, y: 24 },
        { id: "caja_fuerte", nombre: "Caja fuerte entreabierta y vacía", emoji: "🔓", imagen: "assets/objetos/caja_fuerte.png", x: 15, y: 58 },
        { id: "taza_te", nombre: "Taza de té con olor a almendras amargas", emoji: "🍵", imagen: "assets/objetos/taza_te.png", x: 46, y: 56 },
        { id: "testamento", nombre: "Nuevo testamento sin firmar sobre el escritorio", emoji: "📜", imagen: "assets/objetos/testamento.png", x: 62, y: 52 },
        { id: "cenicero_puro", nombre: "Cenicero con un habano a medio fumar", emoji: "🚬", imagen: "assets/objetos/cenicero_puro.png", x: 34, y: 64 },
        { id: "alfombra_manchada", nombre: "Alfombra persa con manchas de barro recientes", emoji: "🧶", imagen: "assets/objetos/alfombra_manchada.png", x: 52, y: 82 }
      ]
    },
    {
      id: "vestibulo",
      nombre: "Vestíbulo Principal",
      icono: "🏛️",
      descripcion:
        "La entrada principal de la mansión. Conduce directamente a la puerta exterior y a la escalera imperial.",
      objetos: [
        { id: "paraguas_mojado", nombre: "Paraguas negro goteando agua en el paragüero", emoji: "☂️", imagen: "assets/objetos/paraguas_mojado.png", x: 20, y: 68 },
        { id: "abrigo_seco", nombre: "Abrigo de la hija completamente seco en el perchero", emoji: "🧥", imagen: "assets/objetos/abrigo_seco.png", x: 82, y: 38 },
        { id: "libro_visitas", nombre: "Libro de visitas con firma del socio a las 21:50", emoji: "📖", imagen: "assets/objetos/libro_visitas.png", x: 35, y: 52 },
        { id: "telefono_cortado", nombre: "Teléfono fijo con el cable cortado con tijeras", emoji: "☎️", imagen: "assets/objetos/telefono_cortado.png", x: 68, y: 48 },
        { id: "huellas_barro", nombre: "Huellas de zapatos con barro rumbo al estudio", emoji: "👞", imagen: "assets/objetos/huellas_barro.png", x: 48, y: 80 },
        { id: "llave_maestra", nombre: "Llave maestra caída junto a la maceta", emoji: "🗝️", imagen: "assets/objetos/llave_maestra.png", x: 74, y: 76 }
      ]
    }
  ],
  sospechosos: [
    {
      id: "mayordomo",
      nombre: "Ramiro Montes (Mayordomo)",
      rol: "Mayordomo jefe de la mansión",
      emoji: "🤵",
      declaraciones: [
        {
          id: "dec_mayordomo_1",
          texto: "A las 22:00 le serví al señor una infusión de manzanilla pura sin ningún aroma extraño.",
          objetoContradice: "taza_te",
          explicacion: "En el escritorio del estudio había una taza de té con un intenso olor a almendras amargas (cianuro), no manzanilla pura."
        },
        {
          id: "dec_mayordomo_2",
          texto: "Antes de retirarme comprobé que la ventana del estudio estaba abierta de par en par para ventilar.",
          objetoContradice: "ventana_cerrada",
          explicacion: "La ventana del estudio se encontraba completamente cerrada y asegurada con el pestillo por dentro."
        },
        {
          id: "dec_mayordomo_3",
          texto: "He trabajado en esta casa durante más de veinte años sin una sola queja del Sr. Valdés.",
          objetoContradice: null,
          explicacion: "Esta afirmación es coherente; ningún objeto de la mansión contradice su antigüedad en el servicio."
        }
      ]
    },
    {
      id: "hija",
      nombre: "Elena Valdés (Hija)",
      rol: "Hija única y heredera legítima",
      emoji: "👩",
      declaraciones: [
        {
          id: "dec_hija_1",
          texto: "Acababa de entrar de la calle bajo el diluvio con mi abrigo puesto cuando escuché el alboroto.",
          objetoContradice: "abrigo_seco",
          explicacion: "El abrigo de la hija colgado en el perchero del vestíbulo estaba completamente seco pese a la tormenta exterior."
        },
        {
          id: "dec_hija_2",
          texto: "Mi padre estaba muy satisfecho con su viejo testamento y jamás pensó en redactar uno nuevo.",
          objetoContradice: "testamento",
          explicacion: "Sobre el escritorio del estudio reposaba un nuevo testamento recién redactado y aún sin firmar."
        },
        {
          id: "dec_hija_3",
          texto: "Sabía que mi padre guardaba documentos importantes en su despacho privado.",
          objetoContradice: null,
          explicacion: "Declaración coherente; es normal que conociera la existencia del despacho y no contradice ninguna pista física."
        }
      ]
    },
    {
      id: "socio",
      nombre: "Arturo Mendoza (Socio)",
      rol: "Socio de negocios de Inversiones Valdés",
      emoji: "🕵️‍♂️",
      declaraciones: [
        {
          id: "dec_socio_1",
          texto: "Solo pasé a saludar por la tarde y me marché antes de las 20:30 sin anotarme en el libro de entradas.",
          objetoContradice: "libro_visitas",
          explicacion: "El libro de visitas del vestíbulo registra claramente la firma del socio a las 21:50, poco antes del crimen."
        },
        {
          id: "dec_socio_2",
          texto: "En cuanto nos enteramos de la tragedia, llamé a la policía desde el teléfono fijo del vestíbulo.",
          objetoContradice: "telefono_cortado",
          explicacion: "Era imposible llamar desde el teléfono fijo del vestíbulo porque tenía el cable cortado con tijeras."
        },
        {
          id: "dec_socio_3",
          texto: "Tenía una reunión financiera programada con Héctor para el próximo lunes por la mañana.",
          objetoContradice: null,
          explicacion: "Declaración coherente; ningún objeto de las dos salas contradice su agenda de la próxima semana."
        }
      ]
    }
  ],
  senuelos: [
    { id: "senuelo_revolver", nombre: "Revólver de plata sobre la chimenea", emoji: "🔫", imagen: "assets/objetos/senuelo_revolver.png" },
    { id: "senuelo_copa_vino", nombre: "Copa de vino tinto derramada en el suelo", emoji: "🍷", imagen: "assets/objetos/senuelo_copa_vino.png" },
    { id: "senuelo_carta_chantaje", nombre: "Carta anónima de chantaje rota en pedazos", emoji: "✉️", imagen: "assets/objetos/senuelo_carta_chantaje.png" },
    { id: "senuelo_candelabro", nombre: "Candelabro de bronce abollado en la entrada", emoji: "🕯️", imagen: "assets/objetos/senuelo_candelabro.png" },
    { id: "senuelo_guantes", nombre: "Guantes de cuero negro junto a la escalera", emoji: "🧤", imagen: "assets/objetos/senuelo_guantes.png" },
    { id: "senuelo_frasco", nombre: "Frasco vacío de somníferos sobre el sillón", emoji: "💊", imagen: "assets/objetos/senuelo_frasco.png" }
  ],
  culpable: "socio",
  puntos: {
    deduccionCorrecta: 10,
    acusacionCorrecta: 30
  },
  solucion:
    "Arturo Mendoza (el Socio) llegó bajo la lluvia a las 21:50 (dejando su paraguas mojado, su firma en el libro de visitas y sus huellas de barro rumbo al estudio). Tras discutir con el Sr. Valdés por un desfalco financiero, vertió veneno con olor a almendras amargas en la taza de té a las 22:15, vació la caja fuerte usando la llave maestra que dejó caer al huir y cortó el cable del teléfono fijo del vestíbulo para retrasar el aviso a la policía."
};

const RESPALDO_CASO_2 = {
  id: "caso2",
  titulo: "El Robo del Zafiro Imperial",
  subtitulo: "Golpe Nocturno en el Museo Real",
  descripcion:
    "Durante la gala benéfica de medianoche, el legendario Zafiro Imperial desapareció de su vitrina blindada tras un apagón de dos minutos. Tienes 30 segundos por sala para inspeccionar la Sala de Exposiciones y el Despacho de Seguridad antes de que el museo sea desalojado.",
  tiempoPorSala: 30,
  salas: [
    {
      id: "estudio",
      nombre: "Sala de Exposiciones",
      icono: "💎",
      descripcion: "El salón principal donde se exhibía el Zafiro Imperial bajo medidas de alta seguridad.",
      objetos: [
        { id: "vitrina_intacta", nombre: "Vitrina abierta con llave magnética, sin cristales rotos", emoji: "🔲", imagen: "assets/objetos/vitrina_intacta.png", x: 50, y: 54 },
        { id: "camara_pintada", nombre: "Cámara de vigilancia rociada con pintura en aerosol negra", emoji: "📹", imagen: "assets/objetos/camara_pintada.png", x: 20, y: 20 },
        { id: "pañuelo_seda", nombre: "Pañuelo de seda con iniciales «C.V.» junto al pedestal", emoji: "🧣", imagen: "assets/objetos/pañuelo_seda.png", x: 58, y: 76 },
        { id: "conducto_sellado", nombre: "Rejilla de ventilación atornillada y cubierta de polvo", emoji: "🎛️", imagen: "assets/objetos/conducto_sellado.png", x: 80, y: 22 },
        { id: "copa_champan", nombre: "Copa de champán con carmín rojo en la mesa lateral", emoji: "🥂", imagen: "assets/objetos/copa_champan.png", x: 28, y: 62 },
        { id: "catalogo_subasta", nombre: "Catálogo de subasta clandestina con el zafiro marcado", emoji: "📑", imagen: "assets/objetos/catalogo_subasta.png", x: 74, y: 60 }
      ]
    },
    {
      id: "vestibulo",
      nombre: "Despacho de Seguridad",
      icono: "🖥️",
      descripcion: "El cuarto de control eléctrico y registro de tarjetas magnéticas del museo.",
      objetos: [
        { id: "fusibles_bajados", nombre: "Palanca del cuadro eléctrico bajada manualmente", emoji: "⚡", imagen: "assets/objetos/fusibles_bajados.png", x: 18, y: 36 },
        { id: "bote_aerosol", nombre: "Bote de pintura negra en aerosol oculto en la papelera", emoji: "🥫", imagen: "assets/objetos/bote_aerosol.png", x: 32, y: 78 },
        { id: "registro_tarjetas", nombre: "Monitor con uso de tarjeta de la Curadora a las 23:58", emoji: "💻", imagen: "assets/objetos/registro_tarjetas.png", x: 54, y: 48 },
        { id: "taza_cafe_frio", nombre: "Taza de café del guardia con restos de somnífero", emoji: "☕", imagen: "assets/objetos/taza_cafe_frio.png", x: 70, y: 54 },
        { id: "llavero_guardia", nombre: "Llavero del guardia colgado intacto en su gancho", emoji: "🔑", imagen: "assets/objetos/llavero_guardia.png", x: 82, y: 32 },
        { id: "maletin_doble_fondo", nombre: "Maletín de cuero de la Curadora con hueco acolchado", emoji: "💼", imagen: "assets/objetos/maletin_doble_fondo.png", x: 62, y: 80 }
      ]
    }
  ],
  sospechosos: [
    {
      id: "curadora",
      nombre: "Clara Valmont (Curadora)",
      rol: "Curadora jefe de la exposición",
      emoji: "👩‍💼",
      declaraciones: [
        {
          id: "dec_cur_1",
          texto: "Olvidé mi tarjeta magnética en casa y no abrí ninguna puerta ni vitrina en toda la noche.",
          objetoContradice: "registro_tarjetas",
          explicacion: "El monitor del Despacho de Seguridad registró el acceso con la tarjeta magnética de la Curadora a las 23:58."
        },
        {
          id: "dec_cur_2",
          texto: "El ladrón tuvo que romper el cristal blindado de la vitrina a martillazos durante el apagón.",
          objetoContradice: "vitrina_intacta",
          explicacion: "La vitrina no tenía ningún cristal roto; fue abierta limpiamente con una llave magnética autorizada."
        },
        {
          id: "dec_cur_3",
          texto: "Yo misma organicé la recepción de invitados en el salón principal al inicio de la velada.",
          objetoContradice: null,
          explicacion: "Declaración coherente; como curadora jefe era la anfitriona del evento y ninguna pista lo contradice."
        }
      ]
    },
    {
      id: "guardia",
      nombre: "Marcos Roca (Guardia)",
      rol: "Vigilante nocturno del museo",
      emoji: "👮",
      declaraciones: [
        {
          id: "dec_gua_1",
          texto: "El apagón se debió a una tormenta exterior; nadie tocó el cuadro eléctrico del despacho.",
          objetoContradice: "fusibles_bajados",
          explicacion: "La palanca del cuadro eléctrico en el Despacho de Seguridad había sido bajada manualmente desde dentro."
        },
        {
          id: "dec_gua_2",
          texto: "Las cámaras grabaron todo el salón sin interrupción porque tenían lentes limpias toda la noche.",
          objetoContradice: "camara_pintada",
          explicacion: "La cámara de vigilancia de la Sala de Exposiciones fue inutilizada con pintura negra en aerosol."
        },
        {
          id: "dec_gua_3",
          texto: "Me entró un sueño repentino después de beber mi café durante el turno de vigilancia.",
          objetoContradice: null,
          explicacion: "Declaración coherente; su taza de café efectivamente contenía restos de somnífero para dormirlo."
        }
      ]
    },
    {
      id: "coleccionista",
      nombre: "Víctor Sterling (Coleccionista)",
      rol: "Magnate e invitado de honor",
      emoji: "🎩",
      declaraciones: [
        {
          id: "dec_col_1",
          texto: "Vi claramente cómo un acróbata escapaba arrastrándose por el conducto de ventilación del techo.",
          objetoContradice: "conducto_sellado",
          explicacion: "La rejilla del conducto de ventilación estaba atornillada y cubierta de polvo antiguo; nadie pasó por allí."
        },
        {
          id: "dec_col_2",
          texto: "Jamás he visto un catálogo de subastas ilegales ni nadie planeaba vender el zafiro esta noche.",
          objetoContradice: "catalogo_subasta",
          explicacion: "En la Sala de Exposiciones había un catálogo de subasta clandestina con el Zafiro Imperial señalado."
        },
        {
          id: "dec_col_3",
          texto: "Asistí a la gala benéfica invitado por la directiva del Museo Real.",
          objetoContradice: null,
          explicacion: "Declaración coherente; ningún objeto de la escena desmiente su asistencia como invitado a la gala."
        }
      ]
    }
  ],
  senuelos: [
    { id: "senuelo_cuerda", nombre: "Cuerda de escalada colgando del tragaluz", emoji: "🪢", imagen: "assets/objetos/senuelo_cuerda.png" },
    { id: "senuelo_martillo", nombre: "Martillo de emergencia tirado junto al pedestal", emoji: "🔨", imagen: "assets/objetos/senuelo_martillo.png" },
    { id: "senuelo_mascara", nombre: "Máscara de terciopelo negro sobre el escritorio", emoji: "🎭", imagen: "assets/objetos/senuelo_mascara.png" },
    { id: "senuelo_linterna", nombre: "Linterna táctica encendida en el pasillo", emoji: "🔦", imagen: "assets/objetos/senuelo_linterna.png" }
  ],
  culpable: "curadora",
  puntos: {
    deduccionCorrecta: 10,
    acusacionCorrecta: 30
  },
  solucion:
    "Clara Valmont (la Curadora) puso somnífero en el café del guardia, roció la cámara con aerosol negro y bajó la palanca del cuadro eléctrico. A las 23:58 usó su propia tarjeta magnética para abrir la vitrina sin romper el cristal, dejó caer su pañuelo con las iniciales «C.V.» y ocultó el Zafiro Imperial en su maletín de doble fondo para venderlo en una subasta clandestina."
};

const RESPALDO_CASOS_MAPA = {
  caso1: RESPALDO_CASO_1,
  caso2: RESPALDO_CASO_2
};

/* ----------------------------------------------------------------------------
 * 2. ESTADO GLOBAL DEL JUEGO
 * ---------------------------------------------------------------------------- */
const estadoJuego = {
  indiceCasos: [],                   // Lista de casos cargada desde data/casos.json
  casoActualId: "caso1",             // ID del caso seleccionado actualmente
  caso: null,                        // Datos completos del caso activo
  tiempoMaximoSala: 30,              // Duración en segundos por cada sala (30s)
  salaActualId: null,                // ID de la sala que se está observando ahora
  salasCerradas: new Set(),          // Conjunto de IDs de salas ya clausuradas
  objetosVistosPorSala: {},          // Mapa: { idSala: Set(idObjeto) }
  segundosRestantes: 30,             // Contador del cronómetro activo
  intervaloTemporizador: null,       // Referencia al setInterval activo
  marcaFinTemporizador: null,        // Timestamp real para evitar desincronización por cambio de pestaña

  // Estado de Sprint 2: Declaraciones, Deducción y Acusación
  colaDeclaraciones: [],             // Lista secuencial de { sospechoso, declaracion }
  indiceDeclaracionActual: 0,        // Índice de la declaración actual en pantalla
  deduccionesCorrectas: 0,           // Cantidad de deducciones acertadas
  puntajeTotal: 0,                   // Puntaje total acumulado neto por el jugador
  declaracionRespondida: false,      // Evita responder dos veces la misma declaración

  // Estado de Sprint 3: Libreta de Repaso, Rangos y Robustez
  maxUsosLibretaRepaso: 3,           // Máximo de repasos permitidos en toda la partida
  usosLibretaRealizados: 0,          // Conteo de veces que se ha activado la libreta de repaso
  tiempoRepasoSegundos: 10,          // Duración exacta de la inspección visual (10s)
  marcaFinRepaso: null,              // Timestamp real para el temporizador de repaso
  intervaloRepaso: null,             // Referencia al timer activo del repaso
  puntosPorUsoLibreta: 5,            // Puntos descontados por cada uso de la libreta
  prefijoRecordLocalStorage: "el_testigo_perfecto_record_"
};

/* ----------------------------------------------------------------------------
 * 3. REFERENCIAS A ELEMENTOS DEL DOM
 * ---------------------------------------------------------------------------- */
const dom = {
  // Cabecera
  subtituloCaso: document.getElementById("subtitulo-caso"),
  insigniaFaseActual: document.getElementById("insignia-fase-actual"),
  estadoSalasGlobal: document.getElementById("estado-salas-global"),
  marcadorPuntos: document.getElementById("marcador-puntos"),
  btnAbrirAyuda: document.getElementById("btn-abrir-ayuda"),

  // Pantallas
  pantallaCasos: document.getElementById("pantalla-casos"),
  pantallaInicio: document.getElementById("pantalla-inicio"),
  pantallaObservacion: document.getElementById("pantalla-observacion"),
  pantallaDeclaraciones: document.getElementById("pantalla-declaraciones"),
  pantallaAcusacion: document.getElementById("pantalla-acusacion"),
  pantallaResumen: document.getElementById("pantalla-resumen"),

  // Elementos de la pantalla de selección de casos
  contenedorTarjetasCasos: document.getElementById("contenedor-tarjetas-casos"),

  // Elementos de la pantalla de inicio del caso
  tituloExpediente: document.getElementById("titulo-expediente"),
  descripcionExpediente: document.getElementById("descripcion-expediente"),
  textoRecordInicio: document.getElementById("texto-record-inicio"),
  btnVolverCasosInicio: document.getElementById("btn-volver-casos-inicio"),
  btnIniciarObservacion: document.getElementById("btn-iniciar-observacion"),

  // Elementos de la fase de observación
  selectorSalas: document.getElementById("selector-salas"),
  cajaTemporizador: document.getElementById("caja-temporizador"),
  tiempoRestante: document.getElementById("tiempo-restante"),
  barraTiempoRelleno: document.getElementById("barra-tiempo-relleno"),
  escenario2d: document.getElementById("escenario-2d"),
  decoradoNombreSala: document.getElementById("decorado-nombre-sala"),
  capaObjetos: document.getElementById("capa-objetos"),
  veloEscenario: document.getElementById("velo-escenario"),
  veloIcono: document.getElementById("velo-icono"),
  veloTitulo: document.getElementById("velo-titulo"),
  veloMensaje: document.getElementById("velo-mensaje"),
  visorObjetoTexto: document.getElementById("visor-objeto-texto"),

  // Libreta del detective (Fase de Observación)
  descripcionSalaActual: document.getElementById("descripcion-sala-actual"),
  contadorObjetosSala: document.getElementById("contador-objetos-sala"),
  listaObjetosDescubiertos: document.getElementById("lista-objetos-descubiertos"),

  // Elementos de la Fase de Declaraciones y Deducción (Sprint 2 y 3)
  tarjetaInterrogatorio: document.querySelector(".tarjeta-interrogatorio"),
  progresoDeclaracionTexto: document.getElementById("progreso-declaracion-texto"),
  barraProgresoDeclaracionesRelleno: document.getElementById("barra-progreso-declaraciones-relleno"),
  decSospechosoEmoji: document.getElementById("dec-sospechoso-emoji"),
  tituloDeclaraciones: document.getElementById("titulo-declaraciones"),
  decSospechosoRol: document.getElementById("dec-sospechoso-rol"),
  decFrase: document.getElementById("dec-frase"),
  contenedorOpcionesDeduccion: document.getElementById("contenedor-opciones-deduccion"),
  cajaRetroalimentacion: document.getElementById("caja-retroalimentacion"),
  retroTitulo: document.getElementById("retro-titulo"),
  retroExplicacion: document.getElementById("retro-explicacion"),
  btnSiguienteDeclaracion: document.getElementById("btn-siguiente-declaracion"),
  contadorAciertosDeduccion: document.getElementById("contador-aciertos-deduccion"),
  puntajeLateralInterrogatorio: document.getElementById("puntaje-lateral-interrogatorio"),

  // Libreta de Repaso (Sprint 3)
  btnAbrirRepaso: document.getElementById("btn-abrir-repaso"),
  contadorUsosRepaso: document.getElementById("contador-usos-repaso"),
  modalRepaso: document.getElementById("modal-repaso"),
  btnCerrarRepaso: document.getElementById("btn-cerrar-repaso"),
  btnCerrarRepasoX: document.getElementById("btn-cerrar-repaso-x"),
  repasoSelectorSala: document.getElementById("repaso-selector-sala"),
  repasoBotonesSalas: document.getElementById("repaso-botones-salas"),
  repasoVistaActiva: document.getElementById("repaso-vista-activa"),
  repasoNombreSalaActiva: document.getElementById("repaso-nombre-sala-activa"),
  tiempoRestanteRepaso: document.getElementById("tiempo-restante-repaso"),
  barraTiempoRepasoRelleno: document.getElementById("barra-tiempo-repaso-relleno"),
  escenarioRepaso2d: document.getElementById("escenario-repaso-2d"),
  capaObjetosRepaso: document.getElementById("capa-objetos-repaso"),

  // Modal de Ayuda (Sprint 3)
  modalAyuda: document.getElementById("modal-ayuda"),
  btnCerrarAyuda: document.getElementById("btn-cerrar-ayuda"),
  btnCerrarAyudaX: document.getElementById("btn-cerrar-ayuda-x"),

  // Elementos de la Fase de Acusación (Sprint 2)
  contenedorTarjetasAcusacion: document.getElementById("contenedor-tarjetas-acusacion"),

  // Elementos de la Pantalla Final de Veredicto, Rango y Solución (Sprint 2 y 3)
  selloVeredictoFinal: document.getElementById("sello-veredicto-final"),
  tituloResumen: document.getElementById("titulo-resumen"),
  mensajeVeredictoFinal: document.getElementById("mensaje-veredicto-final"),
  tarjetaRango: document.getElementById("tarjeta-rango"),
  rangoInsignia: document.getElementById("rango-insignia"),
  rangoTitulo: document.getElementById("rango-titulo"),
  rangoDescripcion: document.getElementById("rango-descripcion"),
  puntajeTotalValor: document.getElementById("puntaje-total-valor"),
  textoRecordFinal: document.getElementById("texto-record-final"),
  desglosePuntajeFinal: document.getElementById("desglose-puntaje-final"),
  tituloSolucionCaso: document.getElementById("titulo-solucion-caso"),
  textoSolucionCaso: document.getElementById("texto-solucion-caso"),
  btnVolverCasosFinal: document.getElementById("btn-volver-casos-final"),
  btnReiniciarObservacion: document.getElementById("btn-reiniciar-observacion")
};

/* ----------------------------------------------------------------------------
 * 4. INICIALIZACIÓN, SELECCIÓN Y CARGA DINÁMICA DE CASOS (data/casos.json)
 * ---------------------------------------------------------------------------- */

/**
 * Carga el índice de casos (data/casos.json) y muestra la pantalla de selección de casos.
 */
async function inicializarJuego() {
  try {
    const respuesta = await fetch("data/casos.json");
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datosIndice = await respuesta.json();
    estadoJuego.indiceCasos = Array.isArray(datosIndice)
      ? datosIndice
      : datosIndice.casos || RESPALDO_INDICE_CASOS;
  } catch (error) {
    console.warn(
      "No se pudo cargar data/casos.json mediante fetch (posible ejecución vía file://). Usando índice de respaldo.",
      error
    );
    estadoJuego.indiceCasos = RESPALDO_INDICE_CASOS;
  }

  // Configurar eventos de botones principales
  dom.btnIniciarObservacion.addEventListener("click", irAPantallaObservacion);
  dom.btnSiguienteDeclaracion.addEventListener("click", avanzarSiguienteDeclaracion);
  dom.btnReiniciarObservacion.addEventListener("click", reiniciarFaseObservacion);
  if (dom.btnVolverCasosInicio) {
    dom.btnVolverCasosInicio.addEventListener("click", volverASeleccionCasos);
  }
  if (dom.btnVolverCasosFinal) {
    dom.btnVolverCasosFinal.addEventListener("click", volverASeleccionCasos);
  }

  // Configurar eventos de Ayuda (Sprint 3)
  if (dom.btnAbrirAyuda) dom.btnAbrirAyuda.addEventListener("click", abrirModalAyuda);
  if (dom.btnCerrarAyuda) dom.btnCerrarAyuda.addEventListener("click", cerrarModalAyuda);
  if (dom.btnCerrarAyudaX) dom.btnCerrarAyudaX.addEventListener("click", cerrarModalAyuda);
  if (dom.modalAyuda) {
    dom.modalAyuda.addEventListener("click", (e) => {
      if (e.target === dom.modalAyuda) cerrarModalAyuda();
    });
  }

  // Configurar eventos de Libreta de Repaso (Sprint 3)
  if (dom.btnAbrirRepaso) dom.btnAbrirRepaso.addEventListener("click", abrirModalRepaso);
  if (dom.btnCerrarRepaso) dom.btnCerrarRepaso.addEventListener("click", cerrarModalRepaso);
  if (dom.btnCerrarRepasoX) dom.btnCerrarRepasoX.addEventListener("click", cerrarModalRepaso);
  if (dom.modalRepaso) {
    dom.modalRepaso.addEventListener("click", (e) => {
      if (e.target === dom.modalRepaso) cerrarModalRepaso();
    });
  }

  // Cierre de modales con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrarModalAyuda();
      cerrarModalRepaso();
    }
  });

  // Robustez contra segundo plano: sincronización de temporizadores al cambiar de pestaña
  document.addEventListener("visibilitychange", manejarCambioVisibilidadPestana);

  // Respaldo de imágenes: solo si una imagen de objeto falla al cargar (error), se oculta y muestra su emoji
  document.addEventListener(
    "error",
    (evento) => {
      const el = evento.target;
      if (el && el.tagName === "IMG" && el.dataset.respaldoEmoji === "true") {
        el.style.display = "none";
        if (el.nextElementSibling) {
          el.nextElementSibling.style.display = "inline-flex";
        }
      }
    },
    true
  );

  // Mostrar inicialmente la pantalla de selección de casos
  volverASeleccionCasos();
}

/**
 * Renderiza la cuadrícula de tarjetas de casos disponibles en la pantalla inicial.
 */
function renderizarSeleccionCasos() {
  if (!dom.contenedorTarjetasCasos) return;
  dom.contenedorTarjetasCasos.innerHTML = "";

  estadoJuego.indiceCasos.forEach((infoCaso) => {
    const recordCaso = obtenerRecordGuardadoPorCaso(infoCaso.id);
    const textoRecord =
      recordCaso !== null
        ? `🏆 Mejor puntaje: ${recordCaso} pts`
        : "🏆 Mejor puntaje: Sin registrar";

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-caso";
    tarjeta.innerHTML = `
      <div>
        <h3 class="tarjeta-caso__titulo">${infoCaso.titulo}</h3>
        <p class="tarjeta-caso__descripcion">${infoCaso.descripcionCorta || infoCaso.descripcion}</p>
      </div>
      <div class="tarjeta-caso__pie">
        <div class="tarjeta-caso__record">${textoRecord}</div>
        <button type="button" class="boton boton--primario">
          🔎 Investigar
        </button>
      </div>
    `;

    const btnInvestigar = tarjeta.querySelector("button");
    btnInvestigar.addEventListener("click", () => {
      seleccionarYCargarCaso(infoCaso);
    });

    dom.contenedorTarjetasCasos.appendChild(tarjeta);
  });
}

/**
 * Carga dinámicamente el archivo JSON del caso elegido y muestra su pantalla de expediente.
 * @param {Object} infoCaso - Objeto del índice con { id, titulo, descripcion, ruta }.
 */
async function seleccionarYCargarCaso(infoCaso) {
  estadoJuego.casoActualId = infoCaso.id;

  try {
    const respuesta = await fetch(infoCaso.ruta);
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    estadoJuego.caso = await respuesta.json();
  } catch (error) {
    console.warn(
      `No se pudo cargar ${infoCaso.ruta} mediante fetch. Usando respaldo local para ${infoCaso.id}.`,
      error
    );
    estadoJuego.caso = RESPALDO_CASOS_MAPA[infoCaso.id] || RESPALDO_CASO_1;
  }

  // Configurar tiempo por sala y estado limpio para el caso elegido
  estadoJuego.tiempoMaximoSala = estadoJuego.caso.tiempoPorSala || 30;
  estadoJuego.salaActualId = null;
  estadoJuego.salasCerradas.clear();
  estadoJuego.segundosRestantes = estadoJuego.tiempoMaximoSala;
  estadoJuego.colaDeclaraciones = [];
  estadoJuego.indiceDeclaracionActual = 0;
  estadoJuego.deduccionesCorrectas = 0;
  estadoJuego.usosLibretaRealizados = 0;
  estadoJuego.puntajeTotal = 0;
  estadoJuego.declaracionRespondida = false;
  estadoJuego.objetosVistosPorSala = {};

  estadoJuego.caso.salas.forEach((sala) => {
    estadoJuego.objetosVistosPorSala[sala.id] = new Set();
  });

  // Poblar textos del expediente seleccionado
  dom.subtituloCaso.textContent = estadoJuego.caso.titulo;
  dom.insigniaFaseActual.textContent = "📋 Expediente del Caso";
  dom.tituloExpediente.textContent = estadoJuego.caso.titulo;
  dom.descripcionExpediente.textContent = estadoJuego.caso.descripcion;
  if (dom.tituloSolucionCaso) {
    dom.tituloSolucionCaso.textContent = `🔎 Solución: ${estadoJuego.caso.titulo}`;
  }

  actualizarRecordPantallaInicio();
  actualizarBotonRepaso();
  actualizarContadorGlobalSalas();
  actualizarMarcadorPuntos();

  mostrarPantalla(dom.pantallaInicio);
}

/**
 * Detiene cualquier partida en curso y regresa a la pantalla de selección de casos.
 */
function volverASeleccionCasos() {
  detenerTemporizador();
  detenerTemporizadorRepaso();
  cerrarModalRepaso();
  cerrarModalAyuda();

  estadoJuego.salaActualId = null;
  estadoJuego.puntajeTotal = 0;
  dom.subtituloCaso.textContent = "Selecciona un caso para investigar";
  dom.insigniaFaseActual.textContent = "🗂️ Selección de Casos";
  dom.estadoSalasGlobal.textContent = "Salas inspeccionadas: 0 / 2";
  actualizarMarcadorPuntos();

  renderizarSeleccionCasos();
  mostrarPantalla(dom.pantallaCasos);
}

/* ----------------------------------------------------------------------------
 * 5. NAVEGACIÓN ENTRE PANTALLAS Y CONTROL DE SALAS
 * ---------------------------------------------------------------------------- */

/**
 * Muestra únicamente la pantalla indicada y oculta las demás.
 * @param {HTMLElement} pantallaActiva - Sección del DOM que debe mostrarse.
 */
function mostrarPantalla(pantallaActiva) {
  [
    dom.pantallaCasos,
    dom.pantallaInicio,
    dom.pantallaObservacion,
    dom.pantallaDeclaraciones,
    dom.pantallaAcusacion,
    dom.pantallaResumen
  ].forEach((pantalla) => {
    if (pantalla) {
      pantalla.classList.toggle("activa", pantalla === pantallaActiva);
    }
  });
}

/**
 * Pasa de la portada del expediente a la fase de observación y abre la primera sala.
 */
function irAPantallaObservacion() {
  dom.insigniaFaseActual.textContent = "🔍 Fase de Observación";
  mostrarPantalla(dom.pantallaObservacion);
  renderizarBotonesSalas();

  const nombreSala1 =
    (estadoJuego.caso && estadoJuego.caso.salas[0] && estadoJuego.caso.salas[0].nombre) ||
    "la primera sala";
  const nombreSala2 =
    (estadoJuego.caso && estadoJuego.caso.salas[1] && estadoJuego.caso.salas[1].nombre) ||
    "la segunda sala";

  // Mostrar mensaje inicial en el velo para que el jugador elija por cuál sala empezar
  mostrarVelo(
    "🚪",
    "Elige una sala para comenzar los 30 segundos",
    `Haz clic en «${nombreSala1}» o «${nombreSala2}» arriba. En cuanto entres, el reloj de 30 segundos comenzará a correr y al terminar la sala se cerrará para siempre.`
  );
}

/**
 * Genera los botones del selector de salas reflejando si están disponibles,
 * en observación actual o clausuradas definitivamente.
 */
function renderizarBotonesSalas() {
  dom.selectorSalas.innerHTML = "";

  estadoJuego.caso.salas.forEach((sala) => {
    const estaCerrada = estadoJuego.salasCerradas.has(sala.id);
    const esSalaActual = estadoJuego.salaActualId === sala.id;
    const hayOtraSalaEnCurso = estadoJuego.salaActualId !== null && !esSalaActual;

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton-sala";
    if (esSalaActual) boton.classList.add("activa");
    if (estaCerrada) boton.classList.add("cerrada");

    // No se puede volver a una sala cerrada ni cambiar de sala a mitad del conteo de 30s
    boton.disabled = estaCerrada || hayOtraSalaEnCurso;

    // Determinar texto de estado del botón
    let textoEstado = "🔓 Disponible (30s)";
    if (esSalaActual) {
      textoEstado = "👁️ Observando ahora...";
    } else if (estaCerrada) {
      textoEstado = "🔒 Cerrada (Sin retorno)";
    } else if (hayOtraSalaEnCurso) {
      textoEstado = "⏳ Termina la sala actual";
    }

    boton.innerHTML = `
      <span class="boton-sala__encabezado">
        <span aria-hidden="true">${sala.icono || "🚪"}</span>
        <span>${sala.nombre}</span>
      </span>
      <span class="boton-sala__estado">${textoEstado}</span>
    `;

    boton.addEventListener("click", () => entrarEnSala(sala.id));
    dom.selectorSalas.appendChild(boton);
  });
}

/**
 * Abre una sala para su observación durante 30 segundos si aún no ha sido cerrada.
 * @param {string} idSala - Identificador de la sala ('estudio' o 'vestibulo').
 */
function entrarEnSala(idSala) {
  // Regla clave: si la sala ya se cerró o ya hay una observación en curso, no permitir entrada
  if (estadoJuego.salasCerradas.has(idSala) || estadoJuego.salaActualId !== null) {
    return;
  }

  const sala = estadoJuego.caso.salas.find((s) => s.id === idSala);
  if (!sala) return;

  estadoJuego.salaActualId = sala.id;

  // Actualizar apariencia del escenario 2D según la sala ('estudio' o 'vestibulo')
  dom.escenario2d.setAttribute("data-sala", sala.id);
  dom.decoradoNombreSala.textContent = `${sala.icono || "📍"} ${sala.nombre}`;
  dom.descripcionSalaActual.textContent = sala.descripcion;
  dom.visorObjetoTexto.textContent = "Haz clic en un objeto de la sala para revelar su nombre...";

  // Ocultar el velo de bloqueo y dibujar los objetos clicables en sus coordenadas (x, y)
  ocultarVelo();
  renderizarObjetosDeSala(sala);
  actualizarLibretaSalaActual(sala);
  renderizarBotonesSalas();

  // Iniciar la cuenta regresiva estricta de 30 segundos
  iniciarTemporizadorSala(sala);
}

/* ----------------------------------------------------------------------------
 * 6. RENDERIZADO DE OBJETOS 2D E INTERACCIÓN (IMÁGENES CON RESPALDO EMOJI)
 * ---------------------------------------------------------------------------- */

/**
 * Construye el HTML visual de un objeto (en sala, libreta, repaso u opciones de deducción).
 * Si el objeto tiene campo `imagen` (o ruta en assets/objetos/<id>.png) y la imagen carga,
 * muestra la imagen PNG; si no existe o falla la carga, muestra su `emoji` como respaldo.
 * @param {Object} objeto - Objeto con { id, nombre, emoji, imagen? }.
 * @param {boolean} esEscena - true si se dibuja dentro del escenario 2D; false si es en lista/botón.
 * @returns {string} Fragmento HTML con <img> y respaldo <span> de emoji.
 */
function crearIconoObjetoHTML(objeto, esEscena = false) {
  const rutaImagen =
    objeto.imagen ||
    (objeto.id && objeto.id !== "ninguno_coherente"
      ? `assets/objetos/${objeto.id}.png`
      : null);

  const claseEmoji = esEscena ? "objeto-escena__emoji" : "icono-objeto-inline";
  const claseImg = esEscena ? "objeto-escena__imagen" : "icono-objeto-img-inline";

  if (!rutaImagen) {
    return `<span class="${claseEmoji}" aria-hidden="true">${objeto.emoji || "❓"}</span>`;
  }

  return `
    <img
      src="${rutaImagen}"
      alt="${objeto.nombre}"
      class="${claseImg}"
      data-respaldo-emoji="true"
      onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='inline-flex';"
    />
    <span class="${claseEmoji}" style="display: none;" aria-hidden="true">${objeto.emoji || "❓"}</span>
  `;
}

/**
 * Dibuja todos los objetos de la sala en sus posiciones (x%, y%).
 * @param {Object} sala - Objeto de la sala actual con su arreglo de objetos.
 */
function renderizarObjetosDeSala(sala) {
  dom.capaObjetos.innerHTML = "";
  const vistosEnSala = estadoJuego.objetosVistosPorSala[sala.id];

  sala.objetos.forEach((objeto) => {
    const botonObjeto = document.createElement("button");
    botonObjeto.type = "button";
    botonObjeto.className = "objeto-escena";
    botonObjeto.dataset.idObjeto = objeto.id;
    botonObjeto.style.left = `${objeto.x}%`;
    botonObjeto.style.top = `${objeto.y}%`;
    botonObjeto.setAttribute("aria-label", `Objeto en escena: hacer clic para identificar`);

    if (vistosEnSala.has(objeto.id)) {
      botonObjeto.classList.add("inspeccionado");
    }

    botonObjeto.innerHTML = `
      ${crearIconoObjetoHTML(objeto, true)}
      <span class="objeto-escena__etiqueta">${objeto.nombre}</span>
    `;

    // Evento al hacer clic sobre el objeto: muestra su nombre y lo registra en la libreta
    botonObjeto.addEventListener("click", (evento) => {
      evento.stopPropagation();
      inspeccionarObjeto(sala, objeto, botonObjeto);
    });

    dom.capaObjetos.appendChild(botonObjeto);
  });
}

/**
 * Maneja el clic sobre un objeto dentro del escenario 2D.
 * Muestra su nombre sobre el objeto, en el visor inferior y lo añade a la libreta.
 * @param {Object} sala - Sala actual.
 * @param {Object} objeto - Datos del objeto clicado (id, nombre, emoji, imagen, x, y).
 * @param {HTMLElement} elementoBoton - Botón del DOM que representa al objeto.
 */
function inspeccionarObjeto(sala, objeto, elementoBoton) {
  // Si la sala ya no está activa, ignorar clics
  if (estadoJuego.salaActualId !== sala.id) return;

  // Quitar la etiqueta flotante activa de otros objetos y mostrar la del objeto clicado
  const todosLosObjetosDOM = dom.capaObjetos.querySelectorAll(".objeto-escena");
  todosLosObjetosDOM.forEach((el) => el.classList.remove("mostrar-nombre"));
  elementoBoton.classList.add("mostrar-nombre", "inspeccionado");

  // Mostrar el icono/imagen y nombre completo del objeto en el visor inferior
  dom.visorObjetoTexto.innerHTML = `${crearIconoObjetoHTML(objeto, false)} <span>${objeto.nombre}</span>`;

  // Registrar el objeto como descubierto en esta sala
  const conjuntoVistos = estadoJuego.objetosVistosPorSala[sala.id];
  conjuntoVistos.add(objeto.id);

  // Actualizar la libreta lateral del detective
  actualizarLibretaSalaActual(sala);
}

/**
 * Actualiza el panel lateral (Libreta del Detective) con los objetos clicados.
 * @param {Object} sala - Sala que se está observando.
 */
function actualizarLibretaSalaActual(sala) {
  const conjuntoVistos = estadoJuego.objetosVistosPorSala[sala.id];
  const totalObjetos = sala.objetos.length;

  dom.contadorObjetosSala.textContent = `${conjuntoVistos.size} / ${totalObjetos}`;
  dom.listaObjetosDescubiertos.innerHTML = "";

  if (conjuntoVistos.size === 0) {
    const itemVacio = document.createElement("li");
    itemVacio.className = "lista-pistas__vacio";
    itemVacio.textContent = "Aún no has hecho clic en ningún objeto de esta sala.";
    dom.listaObjetosDescubiertos.appendChild(itemVacio);
    return;
  }

  sala.objetos.forEach((objeto) => {
    if (conjuntoVistos.has(objeto.id)) {
      const item = document.createElement("li");
      item.className = "lista-pistas__item";
      item.innerHTML = `
        ${crearIconoObjetoHTML(objeto, false)}
        <span>${objeto.nombre}</span>
      `;
      dom.listaObjetosDescubiertos.appendChild(item);
    }
  });
}

/* ----------------------------------------------------------------------------
 * 7. TEMPORIZADOR DE 30 SEGUNDOS Y CLAUSURA DEFINITIVA DE CADA SALA
 * ---------------------------------------------------------------------------- */

/**
 * Inicia el temporizador de 30 segundos para la sala activa.
 * Utiliza timestamp real (Date.now()) para evitar desfases si el usuario cambia de pestaña.
 * Al llegar a 0, clausura la sala permanentemente.
 * @param {Object} sala - Sala en observación.
 */
function iniciarTemporizadorSala(sala) {
  detenerTemporizador();

  estadoJuego.segundosRestantes = estadoJuego.tiempoMaximoSala;
  estadoJuego.marcaFinTemporizador = Date.now() + estadoJuego.tiempoMaximoSala * 1000;
  actualizarVistaTemporizador();

  estadoJuego.intervaloTemporizador = setInterval(() => {
    if (!estadoJuego.marcaFinTemporizador) return;

    const msRestantes = estadoJuego.marcaFinTemporizador - Date.now();
    const seg = Math.max(0, Math.ceil(msRestantes / 1000));
    estadoJuego.segundosRestantes = seg;
    actualizarVistaTemporizador();

    if (msRestantes <= 0) {
      clausurarSalaActual(sala);
    }
  }, 200);
}

/**
 * Limpia el intervalo del cronómetro si existe y resetea la marca de tiempo.
 */
function detenerTemporizador() {
  if (estadoJuego.intervaloTemporizador) {
    clearInterval(estadoJuego.intervaloTemporizador);
    estadoJuego.intervaloTemporizador = null;
  }
  estadoJuego.marcaFinTemporizador = null;
}

/**
 * Actualiza el texto de segundos restantes y la barra de progreso visual.
 */
function actualizarVistaTemporizador() {
  const seg = Math.max(0, estadoJuego.segundosRestantes);
  const porcentaje = (seg / estadoJuego.tiempoMaximoSala) * 100;

  dom.tiempoRestante.textContent = `${seg}s`;
  dom.barraTiempoRelleno.style.width = `${porcentaje}%`;

  // Activar alerta visual roja cuando quedan 10 segundos o menos
  dom.cajaTemporizador.classList.toggle("alerta", seg <= 10 && seg > 0);
}

/**
 * Clausura la sala una vez agotados los 30 segundos, impidiendo volver a entrar.
 * @param {Object} sala - Sala cuyo tiempo ha expirado.
 */
function clausurarSalaActual(sala) {
  detenerTemporizador();

  // Marcar la sala como cerrada permanentemente
  estadoJuego.salasCerradas.add(sala.id);
  estadoJuego.salaActualId = null;

  // Limpiar los objetos interactivos del escenario para que no se puedan clicar más
  dom.capaObjetos.innerHTML = "";
  dom.cajaTemporizador.classList.remove("alerta");

  actualizarContadorGlobalSalas();
  renderizarBotonesSalas();

  const totalSalas = estadoJuego.caso.salas.length;
  const salasCerradasCant = estadoJuego.salasCerradas.size;

  if (salasCerradasCant >= totalSalas) {
    // Ocultar inmediatamente la lista de objetos descubiertos de la libreta por seguridad
    dom.listaObjetosDescubiertos.innerHTML =
      '<li class="lista-pistas__vacio">🔒 Libreta cerrada para el interrogatorio.</li>';

    // Ambas salas han sido observadas y cerradas: mostrar aviso y pasar a Declaraciones
    mostrarVelo(
      "🔒",
      `¡Tiempo agotado en ${sala.nombre}!`,
      "Ambas salas han sido clausuradas. Cerrando tu libreta de notas y pasando a la Fase de Declaraciones..."
    );

    setTimeout(() => {
      iniciarFaseDeclaraciones();
    }, 1800);
  } else {
    // Aún queda otra sala disponible para observar
    const siguienteSala = estadoJuego.caso.salas.find(
      (s) => !estadoJuego.salasCerradas.has(s.id)
    );
    mostrarVelo(
      "🔒",
      `${sala.nombre} se ha cerrado definitivamente`,
      `Se agotaron los 30 segundos y ya no puedes volver a esta habitación. Selecciona ahora «${siguienteSala.nombre}» arriba para continuar la observación.`
    );
  }
}

/* ----------------------------------------------------------------------------
 * 8. FASE DE DECLARACIONES, DEDUCCIÓN Y RETROALIMENTACIÓN (SPRINT 2 Y 3)
 * ---------------------------------------------------------------------------- */

/**
 * Construye la cola secuencial de declaraciones de los 3 sospechosos
 * y muestra la vista de interrogatorio con la libreta bloqueada y opción de repaso.
 */
function iniciarFaseDeclaraciones() {
  estadoJuego.colaDeclaraciones = [];
  estadoJuego.indiceDeclaracionActual = 0;
  estadoJuego.deduccionesCorrectas = 0;
  estadoJuego.usosLibretaRealizados = 0;
  estadoJuego.puntajeTotal = 0;

  // Recopilar en orden las declaraciones de cada sospechoso
  estadoJuego.caso.sospechosos.forEach((sospechoso) => {
    sospechoso.declaraciones.forEach((declaracion) => {
      estadoJuego.colaDeclaraciones.push({
        sospechoso,
        declaracion
      });
    });
  });

  dom.insigniaFaseActual.textContent = "🗣️ Fase de Declaraciones";
  actualizarBotonRepaso();
  calcularYActualizarPuntajeEnVivo();
  mostrarPantalla(dom.pantallaDeclaraciones);
  renderizarDeclaracionActual();
}

/**
 * Muestra en pantalla la declaración correspondiente al índice actual
 * junto con sus opciones de deducción mezcladas al azar.
 */
function renderizarDeclaracionActual() {
  const total = estadoJuego.colaDeclaraciones.length;
  const actual = estadoJuego.indiceDeclaracionActual;
  const item = estadoJuego.colaDeclaraciones[actual];
  if (!item) return;

  estadoJuego.declaracionRespondida = false;

  // Actualizar barra y texto de progreso
  const numeroPregunta = actual + 1;
  const porcentaje = (numeroPregunta / total) * 100;
  dom.progresoDeclaracionTexto.textContent = `Declaración ${numeroPregunta} de ${total}`;
  dom.barraProgresoDeclaracionesRelleno.style.width = `${porcentaje}%`;

  // Datos del sospechoso y su frase
  dom.decSospechosoEmoji.textContent = item.sospechoso.emoji;
  dom.tituloDeclaraciones.textContent = item.sospechoso.nombre;
  dom.decSospechosoRol.textContent = item.sospechoso.rol;
  dom.decFrase.textContent = `«${item.declaracion.texto}»`;

  // Ocultar caja de retroalimentación hasta que el jugador elija una opción
  dom.cajaRetroalimentacion.className = "caja-retroalimentacion oculta";

  // Generar y mostrar las opciones mezcladas al azar
  const opciones = generarOpcionesDeduccion(item.declaracion);
  dom.contenedorOpcionesDeduccion.innerHTML = "";

  opciones.forEach((opcion) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton-opcion-deduccion";
    boton.dataset.esCorrecta = opcion.esCorrecta ? "true" : "false";
    boton.innerHTML = `
      ${crearIconoObjetoHTML(opcion, false)}
      <span>${opcion.nombre}</span>
    `;

    boton.addEventListener("click", () => {
      evaluarRespuestaDeduccion(opcion, boton, item.declaracion);
    });

    dom.contenedorOpcionesDeduccion.appendChild(boton);
  });

  // Actualizar estado del botón de repaso y contadores laterales
  actualizarBotonRepaso();
  calcularYActualizarPuntajeEnVivo();
  dom.contadorAciertosDeduccion.textContent = `${estadoJuego.deduccionesCorrectas} / ${actual}`;
}

/**
 * Genera entre 4 y 5 opciones para una declaración:
 * - Si tiene objetoContradice: el objeto correcto, 2 objetos reales que no la contradicen,
 *   1 señuelo que nunca estuvo en ninguna sala y la opción "Ninguno, es coherente" (5 opciones).
 * - Si es verdadera (null): la opción correcta "Ninguno, es coherente", 2 objetos reales de la escena
 *   y 1 señuelo que nunca estuvo en ninguna sala (4 opciones).
 * Mezcla todas las opciones al azar antes de devolverlas.
 * @param {Object} declaracion - Declaración actual a evaluar.
 * @returns {Array<Object>} Arreglo de opciones mezcladas al azar.
 */
function generarOpcionesDeduccion(declaracion) {
  const todosObjetosReales = obtenerTodosLosObjetosReales();
  const senuelos = estadoJuego.caso.senuelos || [];
  const opciones = [];

  // Elegir 1 señuelo al azar que nunca estuvo en ninguna sala
  const senueloElegido = mezclarArreglo([...senuelos])[0];

  if (declaracion.objetoContradice !== null) {
    // 1. El objeto correcto de la escena que contradice la declaración
    const objetoCorrecto = todosObjetosReales.find(
      (obj) => obj.id === declaracion.objetoContradice
    );
    if (objetoCorrecto) {
      opciones.push({
        id: objetoCorrecto.id,
        nombre: objetoCorrecto.nombre,
        emoji: objetoCorrecto.emoji,
        imagen: objetoCorrecto.imagen,
        esCorrecta: true
      });
    }

    // 2. Dos objetos reales de la escena que NO la contradicen
    const otrosReales = mezclarArreglo(
      todosObjetosReales.filter((obj) => obj.id !== declaracion.objetoContradice)
    ).slice(0, 2);

    otrosReales.forEach((obj) => {
      opciones.push({
        id: obj.id,
        nombre: obj.nombre,
        emoji: obj.emoji,
        imagen: obj.imagen,
        esCorrecta: false
      });
    });

    // 3. Un señuelo que nunca estuvo en ninguna sala
    if (senueloElegido) {
      opciones.push({
        id: senueloElegido.id,
        nombre: senueloElegido.nombre,
        emoji: senueloElegido.emoji,
        imagen: senueloElegido.imagen,
        esCorrecta: false
      });
    }

    // 4. Opción "Ninguno, es coherente" como distractor adicional (total: 5 opciones)
    opciones.push({
      id: "ninguno_coherente",
      nombre: "Ninguno, es coherente",
      emoji: "✅",
      esCorrecta: false
    });
  } else {
    // Si la declaración es verdadera (null), la opción correcta es "Ninguno, es coherente"
    opciones.push({
      id: "ninguno_coherente",
      nombre: "Ninguno, es coherente",
      emoji: "✅",
      esCorrecta: true
    });

    // Dos objetos reales de la escena que no la contradicen
    const dosReales = mezclarArreglo([...todosObjetosReales]).slice(0, 2);
    dosReales.forEach((obj) => {
      opciones.push({
        id: obj.id,
        nombre: obj.nombre,
        emoji: obj.emoji,
        imagen: obj.imagen,
        esCorrecta: false
      });
    });

    // Un señuelo que nunca estuvo en ninguna sala (total: 4 opciones)
    if (senueloElegido) {
      opciones.push({
        id: senueloElegido.id,
        nombre: senueloElegido.nombre,
        emoji: senueloElegido.emoji,
        imagen: senueloElegido.imagen,
        esCorrecta: false
      });
    }
  }

  return mezclarArreglo(opciones);
}

/**
 * Evalúa la opción seleccionada por el jugador, suma puntos si acertó,
 * aplica feedback visual (pulso o sacudida) y muestra la explicación.
 */
function evaluarRespuestaDeduccion(opcionElegida, botonElegido, declaracion) {
  if (estadoJuego.declaracionRespondida) return;
  estadoJuego.declaracionRespondida = true;

  const puntosPorDeduccion =
    (estadoJuego.caso.puntos && estadoJuego.caso.puntos.deduccionCorrecta) || 10;

  // Deshabilitar todos los botones y marcar visualmente la respuesta correcta e incorrecta
  const botones = dom.contenedorOpcionesDeduccion.querySelectorAll(".boton-opcion-deduccion");
  botones.forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.esCorrecta === "true") {
      btn.classList.add("correcta");
    }
  });

  // Pulido visual: animación de acierto o fallo
  const contenedorAnimar = dom.tarjetaInterrogatorio || botonElegido;
  if (opcionElegida.esCorrecta) {
    estadoJuego.deduccionesCorrectas += 1;
    dom.cajaRetroalimentacion.className = "caja-retroalimentacion es-correcta";
    dom.retroTitulo.textContent = `✅ ¡Deducción correcta! (+${puntosPorDeduccion} puntos)`;

    contenedorAnimar.classList.add("efecto-acierto");
    setTimeout(() => contenedorAnimar.classList.remove("efecto-acierto"), 700);
  } else {
    botonElegido.classList.add("incorrecta");
    dom.cajaRetroalimentacion.className = "caja-retroalimentacion es-incorrecta";
    dom.retroTitulo.textContent = "❌ Deducción incorrecta (0 puntos)";

    contenedorAnimar.classList.add("efecto-fallo");
    setTimeout(() => contenedorAnimar.classList.remove("efecto-fallo"), 700);
  }

  // Recalcular puntaje acumulado en vivo teniendo en cuenta descuentos por libreta
  calcularYActualizarPuntajeEnVivo();

  // Explicación breve de la contradicción o coherencia sin revelar al culpable
  dom.retroExplicacion.textContent =
    declaracion.explicacion ||
    (declaracion.objetoContradice
      ? "Existe una contradicción directa con las pruebas físicas de la escena."
      : "La declaración es coherente y no contradice ningún objeto real de la mansión.");

  // Actualizar contador lateral de progreso
  const respondidas = estadoJuego.indiceDeclaracionActual + 1;
  dom.contadorAciertosDeduccion.textContent = `${estadoJuego.deduccionesCorrectas} / ${respondidas}`;

  // Cambiar texto del botón si es la última declaración
  const esUltima = respondidas >= estadoJuego.colaDeclaraciones.length;
  dom.btnSiguienteDeclaracion.textContent = esUltima
    ? "Pasar a la Acusación Final ⚖️"
    : "Siguiente declaración ➡️";
}

/**
 * Avanza a la siguiente declaración o, si ya terminaron todas, pasa a la Fase de Acusación.
 */
function avanzarSiguienteDeclaracion() {
  estadoJuego.indiceDeclaracionActual += 1;

  if (estadoJuego.indiceDeclaracionActual < estadoJuego.colaDeclaraciones.length) {
    renderizarDeclaracionActual();
  } else {
    iniciarFaseAcusacion();
  }
}

/* ----------------------------------------------------------------------------
 * 9. FASE DE ACUSACIÓN, RANGOS Y PANTALLA FINAL (SPRINT 2 Y 3)
 * ---------------------------------------------------------------------------- */

/**
 * Muestra la vista de acusación para que el jugador elija al culpable entre los 3 sospechosos.
 */
function iniciarFaseAcusacion() {
  dom.insigniaFaseActual.textContent = "⚖️ Fase de Acusación";
  dom.contenedorTarjetasAcusacion.innerHTML = "";

  estadoJuego.caso.sospechosos.forEach((sospechoso) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-acusacion";
    tarjeta.innerHTML = `
      <div>
        <span class="tarjeta-sospechoso__emoji" aria-hidden="true">${sospechoso.emoji}</span>
        <h3 class="tarjeta-sospechoso__nombre">${sospechoso.nombre}</h3>
        <p class="tarjeta-sospechoso__rol">${sospechoso.rol}</p>
      </div>
      <button type="button" class="boton boton--primario">
        👉 Acusar a ${sospechoso.nombre.split(" ")[0]}
      </button>
    `;

    const botonAcusar = tarjeta.querySelector("button");
    botonAcusar.addEventListener("click", () => {
      procesarAcusacionFinal(sospechoso);
    });

    dom.contenedorTarjetasAcusacion.appendChild(tarjeta);
  });

  mostrarPantalla(dom.pantallaAcusacion);
}

/**
 * Evalúa al sospechoso acusado, calcula el desglose completo con libreta de repaso,
 * asigna el rango ("Detective Novato", "Detective Experto", "Mente Maestra") y
 * guarda el mejor puntaje en localStorage.
 * @param {Object} sospechosoAcusado - Sospechoso seleccionado por el jugador.
 */
function procesarAcusacionFinal(sospechosoAcusado) {
  const idCulpableReal = estadoJuego.caso.culpable || "socio";
  const acertoCulpable = sospechosoAcusado.id === idCulpableReal;

  const puntosPorDeduccion =
    (estadoJuego.caso.puntos && estadoJuego.caso.puntos.deduccionCorrecta) || 10;
  const puntosPorAcusacion =
    (estadoJuego.caso.puntos && estadoJuego.caso.puntos.acusacionCorrecta) || 30;

  // Cálculo de puntos por cada apartado
  const puntosGanadosDeduccion = estadoJuego.deduccionesCorrectas * puntosPorDeduccion;
  const puntosGanadosAcusacion = acertoCulpable ? puntosPorAcusacion : 0;
  const puntosDescontadosLibreta = estadoJuego.usosLibretaRealizados * estadoJuego.puntosPorUsoLibreta;

  // Puntaje final neto (mínimo 0 puntos)
  estadoJuego.puntajeTotal = Math.max(
    0,
    puntosGanadosDeduccion + puntosGanadosAcusacion - puntosDescontadosLibreta
  );
  actualizarMarcadorPuntos();

  const sospechosoCulpableObj = estadoJuego.caso.sospechosos.find(
    (s) => s.id === idCulpableReal
  );
  const nombreCulpableReal = sospechosoCulpableObj
    ? sospechosoCulpableObj.nombre
    : idCulpableReal;

  dom.insigniaFaseActual.textContent = "📁 Caso Cerrado";

  if (acertoCulpable) {
    dom.selloVeredictoFinal.textContent = "CASO RESUELTO CON ÉXITO";
    dom.selloVeredictoFinal.className = "sello-confidencial sello-confidencial--completado";
    dom.tituloResumen.textContent = "🎉 ¡Acertaste! Eres El Testigo Perfecto";
    dom.mensajeVeredictoFinal.innerHTML = `Acusaste correctamente a <strong>${sospechosoAcusado.nombre}</strong>. Tus deducciones y tu memoria visual permitieron resolver <em>${estadoJuego.caso.titulo}</em>.`;
  } else {
    dom.selloVeredictoFinal.textContent = "ACUSACIÓN ERRÓNEA";
    dom.selloVeredictoFinal.className = "sello-confidencial";
    dom.tituloResumen.textContent = "❌ El verdadero culpable escapó";
    dom.mensajeVeredictoFinal.innerHTML = `Acusaste a <strong>${sospechosoAcusado.nombre}</strong>, pero el verdadero culpable era <strong>${nombreCulpableReal}</strong>.`;
  }

  // Asignar rango según el puntaje final
  asignarRangoFinal(estadoJuego.puntajeTotal);

  // Mostrar puntaje total y desglose detallado con descuento por libreta
  const totalDeclaraciones = estadoJuego.colaDeclaraciones.length;
  const puntajeMaximoPosible = totalDeclaraciones * puntosPorDeduccion + puntosPorAcusacion;

  dom.puntajeTotalValor.textContent = `${estadoJuego.puntajeTotal} / ${puntajeMaximoPosible} pts`;
  dom.desglosePuntajeFinal.innerHTML = `
    <div>🧠 Deducciones correctas: <strong>${estadoJuego.deduccionesCorrectas} de ${totalDeclaraciones}</strong> (+${puntosGanadosDeduccion} pts)</div>
    <div>⚖️ Acusación al culpable: <strong>${acertoCulpable ? "Correcta" : "Incorrecta"}</strong> (+${puntosGanadosAcusacion} pts)</div>
    <div>📓 Descuento por libreta de repaso: <strong>${estadoJuego.usosLibretaRealizados} uso(s)</strong> (-${puntosDescontadosLibreta} pts)</div>
    <div>⭐ Puntaje neto final: <strong>${estadoJuego.puntajeTotal} pts</strong></div>
  `;

  // Gestión de récord histórico en localStorage por caso separado
  gestionarRecordLocalStorage(estadoJuego.puntajeTotal);

  // Mostrar resumen de la solución del caso
  if (dom.tituloSolucionCaso) {
    dom.tituloSolucionCaso.textContent = `📜 Solución del Caso: ${estadoJuego.caso.titulo}`;
  }
  dom.textoSolucionCaso.textContent =
    estadoJuego.caso.solucion ||
    "El socio comercial entró a las 21:50, envenenó la taza de té del Sr. Valdés, vació la caja fuerte con la llave maestra y cortó el cable del teléfono del vestíbulo antes de huir.";

  mostrarPantalla(dom.pantallaResumen);
}

/**
 * Determina y muestra el rango del jugador según su puntaje neto final:
 * - "Mente Maestra": >= 100 puntos
 * - "Detective Experto": 65 a 99 puntos
 * - "Detective Novato": < 65 puntos
 * @param {number} puntaje - Puntaje final obtenido.
 */
function asignarRangoFinal(puntaje) {
  let rango = "Detective Novato";
  let insignia = "🔍";
  let claseRango = "tarjeta-rango--novato";
  let descripcion =
    "Completaste la investigación, pero algunas pistas clave se te escaparon o recurriste demasiado al repaso. ¡Sigue entrenando tu agudeza visual!";

  if (puntaje >= 100) {
    rango = "Mente Maestra";
    insignia = "🧠";
    claseRango = "tarjeta-rango--maestra";
    descripcion =
      "¡Extraordinario! Tu memoria fotográfica y capacidad analítica son implacables. Has desenmascarado al culpable con honores de élite.";
  } else if (puntaje >= 65) {
    rango = "Detective Experto";
    insignia = "🕵️‍♂️";
    claseRango = "tarjeta-rango--experto";
    descripcion =
      "¡Gran trabajo policial! Supiste contrastar las coartadas, detectar las mentiras decisivas y sustentar una acusación firme.";
  }

  if (dom.tarjetaRango) {
    dom.tarjetaRango.className = `tarjeta-rango ${claseRango}`;
    dom.rangoInsignia.textContent = insignia;
    dom.rangoTitulo.textContent = rango;
    dom.rangoDescripcion.textContent = descripcion;
  }
}

/**
 * Devuelve la clave de localStorage asociada a un caso específico.
 * @param {string} idCaso - Identificador del caso (ej. 'caso1').
 * @returns {string} Clave en localStorage.
 */
function obtenerClaveRecordCaso(idCaso) {
  const id = idCaso || estadoJuego.casoActualId || "caso1";
  return `${estadoJuego.prefijoRecordLocalStorage}${id}`;
}

/**
 * Obtiene el mejor puntaje guardado en localStorage para un caso concreto.
 * @param {string} idCaso - Identificador del caso.
 * @returns {number|null} Puntaje récord o null si aún no tiene partidas.
 */
function obtenerRecordGuardadoPorCaso(idCaso) {
  try {
    const clave = obtenerClaveRecordCaso(idCaso);
    const val = localStorage.getItem(clave);
    if (val !== null && val !== "") {
      return parseInt(val, 10) || 0;
    }
  } catch (e) {
    console.warn("No se pudo leer localStorage:", e);
  }
  return null;
}

/**
 * Guarda y actualiza el récord personal del caso actual en localStorage por separado.
 * @param {number} puntajeFinal - Puntaje neto de la partida actual.
 */
function gestionarRecordLocalStorage(puntajeFinal) {
  const claveCaso = obtenerClaveRecordCaso(estadoJuego.casoActualId);
  const recordGuardado = obtenerRecordGuardadoPorCaso(estadoJuego.casoActualId);
  const recordPrevio = recordGuardado !== null ? recordGuardado : 0;

  let esNuevoRecord = false;
  let recordMostrar = recordPrevio;

  if (recordGuardado === null || puntajeFinal > recordPrevio) {
    esNuevoRecord = true;
    recordMostrar = puntajeFinal;
    try {
      localStorage.setItem(claveCaso, puntajeFinal.toString());
    } catch (e) {
      console.warn("No se pudo guardar récord en localStorage:", e);
    }
  }

  if (dom.textoRecordFinal) {
    if (esNuevoRecord) {
      dom.textoRecordFinal.textContent = `¡Nuevo récord histórico en este caso: ${recordMostrar} pts! 🌟`;
    } else {
      dom.textoRecordFinal.textContent = `Mejor récord guardado en este caso: ${recordMostrar} pts`;
    }
  }

  actualizarRecordPantallaInicio();
}

/* ----------------------------------------------------------------------------
 * 10. LIBRETA DE REPASO Y MODALES (SPRINT 3)
 * ---------------------------------------------------------------------------- */

/**
 * Actualiza el texto y estado del botón de la Libreta de Repaso según usos restantes.
 */
function actualizarBotonRepaso() {
  if (!dom.btnAbrirRepaso || !dom.contadorUsosRepaso) return;

  const restantes = Math.max(
    0,
    estadoJuego.maxUsosLibretaRepaso - estadoJuego.usosLibretaRealizados
  );
  dom.contadorUsosRepaso.textContent = `Usos restantes: ${restantes} / ${estadoJuego.maxUsosLibretaRepaso}`;

  if (restantes <= 0) {
    dom.btnAbrirRepaso.disabled = true;
    dom.btnAbrirRepaso.textContent = "📓 Libreta (Sin usos)";
  } else {
    dom.btnAbrirRepaso.disabled = false;
    dom.btnAbrirRepaso.textContent = "📓 Libreta de Repaso";
  }
}

/**
 * Abre el modal de la Libreta de Repaso si al jugador le quedan usos.
 */
function abrirModalRepaso() {
  const restantes = estadoJuego.maxUsosLibretaRepaso - estadoJuego.usosLibretaRealizados;
  if (restantes <= 0) return;

  // Mostrar selector de salas y ocultar vista activa
  dom.repasoSelectorSala.classList.remove("oculta");
  dom.repasoVistaActiva.classList.add("oculta");

  // Renderizar botones de elección de sala para repasar
  dom.repasoBotonesSalas.innerHTML = "";
  estadoJuego.caso.salas.forEach((sala) => {
    const botonSala = document.createElement("button");
    botonSala.type = "button";
    botonSala.className = "boton-elegir-repaso";
    botonSala.innerHTML = `
      <span class="boton-elegir-repaso__icono" aria-hidden="true">${sala.icono || "🚪"}</span>
      <span class="boton-elegir-repaso__nombre">${sala.nombre}</span>
      <span class="boton-elegir-repaso__desc">Reexaminar durante 10 segundos</span>
    `;

    botonSala.addEventListener("click", () => iniciarRepasoSala(sala.id));
    dom.repasoBotonesSalas.appendChild(botonSala);
  });

  dom.modalRepaso.classList.remove("oculta");
}

/**
 * Inicia la inspección visual de 10 segundos en la sala elegida:
 * descuenta 1 uso, descuenta 5 puntos acumulados y muestra los objetos en modo solo lectura.
 * @param {string} salaId - ID de la sala a repasar ('estudio' o 'vestibulo').
 */
function iniciarRepasoSala(salaId) {
  const sala = estadoJuego.caso.salas.find((s) => s.id === salaId);
  if (!sala) return;

  // Registrar consumo de uso de libreta y recalcular puntaje acumulado
  estadoJuego.usosLibretaRealizados += 1;
  actualizarBotonRepaso();
  calcularYActualizarPuntajeEnVivo();

  // Cambiar vista en el modal
  dom.repasoSelectorSala.classList.add("oculta");
  dom.repasoVistaActiva.classList.remove("oculta");
  dom.repasoNombreSalaActiva.textContent = `Inspeccionando: ${sala.nombre}`;

  // Configurar escenario 2D en solo lectura
  dom.escenarioRepaso2d.setAttribute("data-sala", sala.id);
  dom.capaObjetosRepaso.innerHTML = "";

  sala.objetos.forEach((obj) => {
    const divObjeto = document.createElement("div");
    divObjeto.className = "objeto-escena objeto-escena--repaso";
    divObjeto.style.left = `${obj.x}%`;
    divObjeto.style.top = `${obj.y}%`;
    divObjeto.innerHTML = `
      ${crearIconoObjetoHTML(obj, true)}
      <span class="objeto-escena__etiqueta">${obj.nombre}</span>
    `;
    dom.capaObjetosRepaso.appendChild(divObjeto);
  });

  // Temporizador de 10 segundos con Date.now() a prueba de cambio de pestaña
  detenerTemporizadorRepaso();
  estadoJuego.marcaFinRepaso = Date.now() + estadoJuego.tiempoRepasoSegundos * 1000;
  actualizarVistaTemporizadorRepaso(estadoJuego.tiempoRepasoSegundos);

  estadoJuego.intervaloRepaso = setInterval(() => {
    if (!estadoJuego.marcaFinRepaso) return;

    const msRestantes = estadoJuego.marcaFinRepaso - Date.now();
    const seg = Math.max(0, Math.ceil(msRestantes / 1000));
    actualizarVistaTemporizadorRepaso(seg);

    if (msRestantes <= 0) {
      cerrarModalRepaso();
    }
  }, 200);
}

/**
 * Actualiza la barra y el número de segundos restantes del repaso de 10s.
 */
function actualizarVistaTemporizadorRepaso(seg) {
  if (!dom.tiempoRestanteRepaso || !dom.barraTiempoRepasoRelleno) return;
  dom.tiempoRestanteRepaso.textContent = `${seg}s`;
  const porcentaje = (seg / estadoJuego.tiempoRepasoSegundos) * 100;
  dom.barraTiempoRepasoRelleno.style.width = `${porcentaje}%`;
}

/**
 * Detiene el temporizador del repaso de 10s.
 */
function detenerTemporizadorRepaso() {
  if (estadoJuego.intervaloRepaso) {
    clearInterval(estadoJuego.intervaloRepaso);
    estadoJuego.intervaloRepaso = null;
  }
  estadoJuego.marcaFinRepaso = null;
}

/**
 * Cierra el modal de repaso y limpia los objetos renderizados.
 */
function cerrarModalRepaso() {
  detenerTemporizadorRepaso();
  if (dom.modalRepaso) dom.modalRepaso.classList.add("oculta");
  if (dom.capaObjetosRepaso) dom.capaObjetosRepaso.innerHTML = "";
}

/**
 * Abre el modal de ayuda "¿Cómo se juega?".
 */
function abrirModalAyuda() {
  if (dom.modalAyuda) dom.modalAyuda.classList.remove("oculta");
}

/**
 * Cierra el modal de ayuda "¿Cómo se juega?".
 */
function cerrarModalAyuda() {
  if (dom.modalAyuda) dom.modalAyuda.classList.add("oculta");
}

/**
 * Recalcula el puntaje acumulado en vivo restando los usos de libreta
 * y actualiza los indicadores visibles en la pantalla.
 */
function calcularYActualizarPuntajeEnVivo() {
  const puntosPorDeduccion =
    (estadoJuego.caso && estadoJuego.caso.puntos && estadoJuego.caso.puntos.deduccionCorrecta) || 10;
  const puntosDeduccion = estadoJuego.deduccionesCorrectas * puntosPorDeduccion;
  const descuentoLibreta = estadoJuego.usosLibretaRealizados * estadoJuego.puntosPorUsoLibreta;

  estadoJuego.puntajeTotal = Math.max(0, puntosDeduccion - descuentoLibreta);

  actualizarMarcadorPuntos();
  if (dom.puntajeLateralInterrogatorio) {
    dom.puntajeLateralInterrogatorio.textContent = `${estadoJuego.puntajeTotal} pts`;
  }
}

/**
 * Actualiza el texto del récord en la pantalla de portada del expediente para el caso actual.
 */
function actualizarRecordPantallaInicio() {
  if (!dom.textoRecordInicio) return;
  const record = obtenerRecordGuardadoPorCaso(estadoJuego.casoActualId);
  if (record !== null) {
    dom.textoRecordInicio.textContent = `Mejor récord guardado en este caso: ${record} pts`;
  } else {
    dom.textoRecordInicio.textContent = "Mejor récord en este caso: Sin partidas registradas";
  }
}

/**
 * Sincroniza y valida de inmediato los cronómetros cuando la pestaña vuelve a primer plano.
 * Resuelve por completo el retraso por throttling que aplican los navegadores en segundo plano.
 */
function manejarCambioVisibilidadPestana() {
  if (document.visibilityState !== "visible") return;

  // 1. Si hay una sala en observación de 30s activa
  if (estadoJuego.salaActualId && estadoJuego.marcaFinTemporizador) {
    const msRestantes = estadoJuego.marcaFinTemporizador - Date.now();
    const seg = Math.max(0, Math.ceil(msRestantes / 1000));
    estadoJuego.segundosRestantes = seg;
    actualizarVistaTemporizador();

    if (msRestantes <= 0) {
      const sala = estadoJuego.caso.salas.find((s) => s.id === estadoJuego.salaActualId);
      if (sala) clausurarSalaActual(sala);
    }
  }

  // 2. Si hay un repaso de libreta de 10s activo
  if (estadoJuego.marcaFinRepaso) {
    const msRestantes = estadoJuego.marcaFinRepaso - Date.now();
    const seg = Math.max(0, Math.ceil(msRestantes / 1000));
    actualizarVistaTemporizadorRepaso(seg);

    if (msRestantes <= 0) {
      cerrarModalRepaso();
    }
  }
}

/* ----------------------------------------------------------------------------
 * 11. FUNCIONES AUXILIARES DE INTERFAZ Y REINICIO DEL JUEGO
 * ---------------------------------------------------------------------------- */

/**
 * Devuelve un arreglo plano con todos los objetos reales de las salas del caso.
 */
function obtenerTodosLosObjetosReales() {
  const lista = [];
  estadoJuego.caso.salas.forEach((sala) => {
    sala.objetos.forEach((objeto) => {
      lista.push(objeto);
    });
  });
  return lista;
}

/**
 * Mezcla un arreglo al azar usando el algoritmo de Fisher-Yates.
 * @param {Array} arreglo - Arreglo a mezclar.
 * @returns {Array} Arreglo mezclado.
 */
function mezclarArreglo(arreglo) {
  for (let i = arreglo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
  }
  return arreglo;
}

/**
 * Muestra el velo informativo sobre el escenario 2D.
 */
function mostrarVelo(icono, titulo, mensaje) {
  dom.veloIcono.textContent = icono;
  dom.veloTitulo.textContent = titulo;
  dom.veloMensaje.textContent = mensaje;
  dom.veloEscenario.classList.add("activo");
}

/**
 * Oculta el velo del escenario 2D para permitir hacer clic en los objetos.
 */
function ocultarVelo() {
  dom.veloEscenario.classList.remove("activo");
}

/**
 * Actualiza el indicador de salas inspeccionadas en la barra superior.
 */
function actualizarContadorGlobalSalas() {
  if (!estadoJuego.caso) return;
  const cerradas = estadoJuego.salasCerradas.size;
  const total = estadoJuego.caso.salas.length;
  dom.estadoSalasGlobal.textContent = `Salas inspeccionadas: ${cerradas} / ${total}`;
}

/**
 * Actualiza el marcador de puntos en la cabecera principal.
 */
function actualizarMarcadorPuntos() {
  if (dom.marcadorPuntos) {
    dom.marcadorPuntos.textContent = `🏆 Puntos: ${estadoJuego.puntajeTotal}`;
  }
}

/**
 * Reinicia toda la partida desde cero ("Jugar de nuevo").
 */
function reiniciarFaseObservacion() {
  detenerTemporizador();
  detenerTemporizadorRepaso();
  cerrarModalRepaso();
  cerrarModalAyuda();

  estadoJuego.salaActualId = null;
  estadoJuego.salasCerradas.clear();
  estadoJuego.segundosRestantes = estadoJuego.tiempoMaximoSala;
  estadoJuego.colaDeclaraciones = [];
  estadoJuego.indiceDeclaracionActual = 0;
  estadoJuego.deduccionesCorrectas = 0;
  estadoJuego.usosLibretaRealizados = 0;
  estadoJuego.puntajeTotal = 0;
  estadoJuego.declaracionRespondida = false;

  estadoJuego.caso.salas.forEach((sala) => {
    estadoJuego.objetosVistosPorSala[sala.id] = new Set();
  });

  dom.insigniaFaseActual.textContent = "🔍 Fase de Observación";
  dom.escenario2d.setAttribute("data-sala", "ninguna");
  dom.decoradoNombreSala.textContent = "Selecciona una sala";
  dom.visorObjetoTexto.textContent = "Haz clic en cualquier objeto de la sala para ver su nombre...";
  dom.contadorObjetosSala.textContent = "0 / 0";
  dom.listaObjetosDescubiertos.innerHTML =
    '<li class="lista-pistas__vacio">Aún no has inspeccionado ningún objeto en esta sala.</li>';

  actualizarBotonRepaso();
  actualizarRecordPantallaInicio();
  actualizarVistaTemporizador();
  actualizarContadorGlobalSalas();
  actualizarMarcadorPuntos();
  irAPantallaObservacion();
}

// Iniciar el juego cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", inicializarJuego);
