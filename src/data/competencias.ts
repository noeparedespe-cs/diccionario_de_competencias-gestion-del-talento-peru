
export interface NivelCrecer {
  id: 'A' | 'B' | 'C' | 'D';
  nombre: string;
  items: string[];
}

export interface CompetenciaCrecer {
  slug: string;
  nombre: string;
  descripcion: string;
  fuente?: string;
  comportamientosLabel: string;
  niveles: NivelCrecer[];
}

export interface CategoriaCrecer {
  slug: string;
  nombre: string;
  rol: string;
  descripcion: string;
  competencias: CompetenciaCrecer[];
}

export interface NivelRadar {
  id: 1 | 2 | 3 | 4;
  nombre: string;
  items: string[];
}

export interface CompetenciaRadar {
  slug: string;
  nombre: string;
  descripcion: string;
  niveles: NivelRadar[];
}

export interface AreaRadar {
  slug: string;
  nombre: string;
  descripcion: string;
  competencias: CompetenciaRadar[];
}

export const NIVELES_CRECER_LABELS: Record<'A' | 'B' | 'C' | 'D', string> = {
  A: 'Sobresaliente',
  B: 'Competencia Desarrollada',
  C: 'Competencia en Desarrollo',
  D: 'No Desarrollado',
};

export const NIVELES_RADAR_LABELS: Record<1 | 2 | 3 | 4, string> = {
  4: 'Supera lo esperado',
  3: 'Cumple',
  2: 'En desarrollo',
  1: 'No Cumple',
};

const COMPORTAMIENTOS_DEFAULT = 'Comportamientos (Fuente: Gestión del Talento Perú)';

function crecer(
  slug: string,
  nombre: string,
  descripcion: string,
  niveles: { A: string[]; B: string[]; C: string[]; D: string[] },
  opts: { fuente?: string; comportamientosLabel?: string } = {}
): CompetenciaCrecer {
  return {
    slug,
    nombre,
    descripcion,
    fuente: opts.fuente ?? 'Crecer',
    comportamientosLabel: opts.comportamientosLabel ?? COMPORTAMIENTOS_DEFAULT,
    niveles: [
      { id: 'A', nombre: `Nivel A: ${NIVELES_CRECER_LABELS.A}`, items: niveles.A },
      { id: 'B', nombre: `Nivel B: ${NIVELES_CRECER_LABELS.B}`, items: niveles.B },
      { id: 'C', nombre: `Nivel C: ${NIVELES_CRECER_LABELS.C}`, items: niveles.C },
      { id: 'D', nombre: `Nivel D: ${NIVELES_CRECER_LABELS.D}`, items: niveles.D },
    ],
  };
}

function radar(
  slug: string,
  nombre: string,
  descripcion: string,
  niveles: { 1: string[]; 2: string[]; 3: string[]; 4: string[] }
): CompetenciaRadar {
  return {
    slug,
    nombre,
    descripcion,
    niveles: [
      { id: 4, nombre: `4 | ${NIVELES_RADAR_LABELS[4]}`, items: niveles[4] },
      { id: 3, nombre: `3 | ${NIVELES_RADAR_LABELS[3]}`, items: niveles[3] },
      { id: 2, nombre: `2 | ${NIVELES_RADAR_LABELS[2]}`, items: niveles[2] },
      { id: 1, nombre: `1 | ${NIVELES_RADAR_LABELS[1]}`, items: niveles[1] },
    ],
  };
}

export const CATEGORIAS_CRECER: CategoriaCrecer[] = [
  {
    slug: 'liderazgo-ejecutivo',
    nombre: 'Liderazgo Ejecutivo',
    rol: 'Gerentes',
    descripcion: 'Competencias para líderes que definen dirección, mueven resultados y desarrollan equipos.',
    competencias: [
      crecer(
        'direccion-estrategica',
        'Dirección Estratégica',
        'Define prioridades claras, toma decisiones complejas y conecta la estrategia del negocio con un propósito que moviliza a otros.',
        {
          A: [
            'Tiene una visión clara del negocio incluso más allá de su propia área.',
            'Se anticipa a los cambios y ajusta las prioridades con rapidez.',
            'Convierte la estrategia en objetivos retadores y moviliza al equipo para lograrlos',
          ],
          B: [
            'Define prioridades claras y alineadas con las necesidades del negocio.',
            'Convierte la estrategia en objetivos concretos y medibles para su equipo.',
            'Toma decisiones considerando el impacto en los resultados, las personas y la sostenibilidad.',
          ],
          C: [
            'Define prioridades, pero no siempre están totalmente alineadas con la estrategia.',
            'Establece objetivos para su equipo, principalmente enfocados en el corto plazo.',
            'Le cuesta anticiparse a los cambios y evaluar el impacto de sus decisiones.',
          ],
          D: [
            'No se enfoca en la estrategia.',
            'Define prioridades según lo que aparece en el momento, más que por la estrategia.',
            'No se anticipa y no tiene claridad sobre cuáles son los objetivos más importantes.',
          ],
        }
      ),
      crecer(
        'impacto-en-resultados',
        'Impacto en Resultados',
        'Entrega resultados de negocio de manera consistente, asignando recursos con criterio, tomando decisiones oportunas y asumiendo responsabilidad por el impacto de sus acciones, promoviendo la excelencia operativa (smart cost).',
        {
          A: [
            'Logra resultados por encima de lo esperado de manera constante.',
            'Usa los recursos de forma eficiente, ágil y se anticipa a posibles riesgos',
            'Toma decisiones rápidas y eleva el nivel de exigencia y responsabilidad del equipo, incluso más allá de su equipo.',
          ],
          B: [
            'Cumple de manera constante con los resultados esperados de su área.',
            'Organiza y usa los recursos considerando costos, impacto y posibles riesgos.',
            'Detecta a tiempo las desviaciones y asume la responsabilidad por los resultados de su equipo.',
          ],
          C: [
            'No es constante en el cumplimiento de resultados.',
            'Hace seguimiento, pero suele reaccionar tarde ante problemas o desviaciones.',
            'Asume responsabilidad parcial por el impacto de sus decisiones.',
          ],
          D: [
            'No cumple con los resultados esperados.',
            'Usa los recursos de forma reactiva y sin control de costos y riesgos.',
            'No hace seguimiento y suele atribuir los problemas a factores externos.',
          ],
        }
      ),
      crecer(
        'innovacion-disruptiva',
        'Innovación Disruptiva',
        'Anticipa cambios, impulsa mejoras y lidera la transformación con foco en la generación de valor para el negocio y la organización.',
        {
          A: [
            'Se anticipa a los cambios y lidera mejoras importantes para el negocio.',
            'Impulsa nuevas ideas que generan valor y mejores resultados.',
            'Moviliza a las personas y asegura que los cambios se implementen con éxito.',
          ],
          B: [
            'Identifica mejoras e ideas que generan valor para el negocio.',
            'Se adapta rápido a los cambios y ajusta sus decisiones cuando es necesario.',
            'Impulsa al equipo para convertir las ideas en acciones concretas.',
          ],
          C: [
            'Propone algunas mejoras y generalmente reacciona cuando el cambio ya ocurrió.',
            'Es inconsistente en la generación de ideas dentro del equipo.',
            'Le cuesta convertir esas ideas en acciones que se mantengan en el tiempo.',
          ],
          D: [
            'Trabaja de manera tradicional y de manera reactiva ante los cambios.',
            'No muestra apertura al cambio y mantiene prácticas rutinarias.',
            'No propone mejoras dentro del equipo.',
          ],
        }
      ),
      crecer(
        'desarrollo-de-lideres-y-equipos',
        'Desarrollo de Líderes y Equipos',
        'Desarrolla talento, empodera a otros y construye equipos autónomos que entregan resultados, asegurando la continuidad del liderazgo y reduciendo la dependencia del líder.',
        {
          A: [
            'Forma equipos autónomos y de alto desempeño.',
            'Desarrolla a las personas para que puedan asumir mayores responsabilidades.',
            'Promueve el aprendizaje, la toma de decisiones, la responsabilidad y la sostenibilidad por los resultados.',
          ],
          B: [
            'Da feedback claro y oportuno para mejorar el desempeño del equipo.',
            'Delega responsabilidades y da autonomía para tomar decisiones.',
            'Identifica personas con potencial y las prepara para asumir mayores retos.',
          ],
          C: [
            'Eventualmente da feedback y delega algunas decisiones con una alta intervención.',
            'Aún interviene bastante y le cuesta dar autonomía al equipo.',
            'El equipo solo logra resultados en contextos estables o favorables.',
          ],
          D: [
            'No supervisa al equipo y le cuesta dar autonomía.',
            'No da feedback al equipo.',
            'Delega solo tareas operativas y el equipo depende mucho de él para avanzar.',
          ],
        }
      ),
      crecer(
        'influencia-y-colaboracion',
        'Influencia y Colaboración',
        'Influye más allá de su jerarquía, construye puentes y moviliza decisiones y ejecución entre áreas, países y funciones, priorizando el resultado del negocio sobre intereses locales.',
        {
          A: [
            'Influye en decisiones importantes, incluso fuera de su propia área.',
            'Logra alinear a distintas personas y áreas para trabajar hacia un mismo objetivo.',
            'Maneja conflictos complejos y construye acuerdos que se mantienen en el tiempo.',
          ],
          B: [
            'Coordina con otras áreas para lograr resultados en conjunto.',
            'Influye en decisiones dentro de su área.',
            'Maneja los conflictos del día a día, buscando soluciones y acuerdos.',
          ],
          C: [
            'Coordina con otras áreas cuando es necesario, pero no siempre logra alinear objetivos.',
            'Usa argumentos y datos para influir, aunque su impacto todavía es limitado.',
            'Ante conflictos, busca soluciones rápidas, pero le cuesta lograr acuerdos que se mantengan en el tiempo.',
          ],
          D: [
            'Se enfoca principalmente en su propia área y no coordina con otros equipos.',
            'Solo prioriza las necesidades de su área antes que el resultado general del negocio.',
            'No influye y no logra acuerdos cuando no tiene autoridad directa.',
          ],
        }
      ),
    ],
  },
  {
    slug: 'liderazgo-mandos-medios',
    nombre: 'Liderazgo Mandos Medios',
    rol: 'Jefes, Supervisores, Coordinadores y Especialistas con Personal a Cargo',
    descripcion: 'Competencias para líderes que conectan la estrategia con la ejecución diaria.',
    competencias: [
      crecer(
        'comunicacion',
        'Comunicación',
        'Demuestra sólida habilidad de comunicación y asegura una comunicación clara dentro del equipo. Alienta a los miembros a compartir información y valora las contribuciones de todos. La comunicación es clara, transparente y confiable.',
        {
          A: [
            'Promueve una comunicación abierta y clara dentro del equipo.',
            'Expresa ideas, problemas y opiniones de manera sobresaliente.',
            'Logra que las personas comprendan el mensaje y se comprometan.',
          ],
          B: [
            'Expresa sus ideas y opiniones con claridad y seguridad.',
            'Comparte información y promueve el intercambio de ideas.',
            'Escucha y toma en cuenta los consejos y puntos de vista de los demás.',
          ],
          C: [
            'Se comunica de la misma manera con todos, sin adaptar su mensaje a la persona o situación.',
            'Le cuesta explicar sus ideas de forma clara.',
            'A veces su mensaje no se entiende completamente o genera confusión.',
          ],
          D: [
            'Responde de forma impulsiva o en momentos poco adecuados.',
            'No tiene predisposición de escuchar y considerar las opiniones de los demás.',
            'Solo le da importancia a su punto de vista.',
          ],
        }
      ),
      crecer(
        'desarrollo-de-personas',
        'Desarrollo de Personas',
        'Capacidad para facilitar procesos de formación y desarrollo del personal a su cargo, motivándolo a la superación y apoyándolo en la búsqueda de metas de alto rendimiento. También, supone la facilidad para la relación interpersonal y la capacidad de comprender la repercusión que las acciones personales ejercen sobre el éxito de las acciones de los demás.',
        {
          A: [
            'Impulsa activamente el desarrollo de las personas de su equipo.',
            'Brinda apoyo, orientación y oportunidades para que sigan creciendo de su equipo y de otras áreas.',
            'Motiva a sus colaboradores a asumir nuevos retos y desarrollarse profesionalmente.',
          ],
          B: [
            'Busca desarrollar a las personas de su equipo.',
            'Cumple con brindar la orientación para que puedan mejorar.',
            'Genera oportunidades para que su equipo aprenda y crezca.',
          ],
          C: [
            'Entiende la importancia de desarrollar a las personas de su equipo con acción limitada.',
            'Brinda algunas oportunidades de aprendizaje, pero no de manera constante.',
            'A veces su forma de trabajar o dirigir limita el crecimiento de algunos colaboradores.',
          ],
          D: [
            'No muestra interés por desarrollar a las personas de su equipo.',
            'No brinda oportunidades de aprendizaje o crecimiento.',
            'Se enfoca principalmente en sus propios resultados, más que en el desarrollo del equipo.',
          ],
        }
      ),
      crecer(
        'gestion-de-resultados',
        'Gestión de Resultados',
        'Capacidad para actuar con velocidad y sentido de urgencia cuando se deben tomar decisiones importantes necesarias para responder a las necesidades del cliente y/o mejorar la organización. Es la capacidad de administrar los procesos establecidos para que no interfieran con la consecución de los resultados esperados.',
        {
          A: [
            'Promueve, reconoce e implementa las mejoras que ayudan a la eficiencia.',
            'Da el ejemplo y apoya al equipo para mejorar la calidad de los procesos y servicios.',
            'Define metas retadoras para sí mismo con un plan de acción claro para él como para su equipo.',
          ],
          B: [
            'Resuelve situaciones del día a día y realiza los cambios necesarios.',
            'Define los objetivos que debe lograr el equipo.',
            'Establece un plan de acción para alcanzar los resultados esperados.',
          ],
          C: [
            'Hace seguimiento eventual a los tiempos y al cumplimiento de las tareas.',
            'Algunas veces controla que se realicen dentro de los plazos establecidos.',
            'Le cuesta proponer mejoras por iniciativa propia y suele hacerlo cuando se le solicita.',
          ],
          D: [
            'No impulsa mejoras en la forma de trabajar.',
            'No cumple con los objetivos.',
            'No responde con rapidez cuando aparecen urgencias o situaciones fuera de lo habitual.',
          ],
        }
      ),
      crecer(
        'excelencia-en-costos-y-optimizacion',
        'Excelencia en Costos y Optimización',
        'Capacidad de gestión enfocada en la productividad, calidad, confiabilidad y excelencia, buscando lograr un desempeño extraordinario en todos los procesos donde se encuentra involucrado. Buscando innovar constantemente y asignando recursos de mejora óptima.',
        {
          A: [
            'Trabaja con altos estándares de calidad, eficiencia y cumplimiento.',
            'Ejecuta sus funciones de manera ordenada y efectiva.',
            'Optimiza continuamente el uso de personas, equipos y presupuesto.',
          ],
          B: [
            'Se adapta a los cambios y ajusta sus objetivos o proyectos cuando es necesario.',
            'Responde a nuevas necesidades del negocio.',
            'Utiliza los recursos disponibles controlando los costos.',
          ],
          C: [
            'Identifica los cambios solo cuando impactan directamente en su trabajo.',
            'Puede ajustar costos y recursos solo cuando recibe orientación o feedback.',
            'Necesita comprender mejor el contexto para adaptarse con mayor autonomía.',
          ],
          D: [
            'No entiende ni se adapta a los cambios del entorno.',
            'No muestra flexibilidad ante nuevas situaciones o necesidades.',
            'No administra de manera eficiente el presupuesto ni los recursos disponibles.',
          ],
        }
      ),
      crecer(
        'integridad',
        'Integridad',
        'Capacidad para establecer relaciones basadas en el respeto mutuo y la confianza, demostrando coherencia entre acciones, conductas y palabras. Asume la responsabilidad de sus propios errores y busca ser ejemplo y referente de ADN de la empresa en todo momento.',
        {
          A: [
            'Construye relaciones basadas en el respeto y la confianza.',
            'Reconoce sus errores y asume la responsabilidad por ellos.',
            'Actúa con honestidad y es coherente entre lo que dice y lo que hace.',
          ],
          B: [
            'Se comunica con franqueza y respeto.',
            'Mantiene relaciones basadas en la confianza.',
            'Es coherente entre lo que dice y lo que hace.',
          ],
          C: [
            'Genera confianza solo en las personas con las que trabaja.',
            'Mantiene relaciones respetuosas y cercanas solo en su entorno.',
            'A veces no es consistente entre lo que dice y lo que hace.',
          ],
          D: [
            'No siempre actúa de acuerdo con lo que dice.',
            'Sus acciones pueden generar dudas o desconfianza en los demás.',
            'No tiene una coherencia entre lo que dice y hace.',
          ],
        }
      ),
      crecer(
        'cooperacion',
        'Cooperación',
        'Capacidad de trabajar en colaboración con grupos multidisciplinarios, con otras personas, áreas o gerencias de la organización. Implica respeto por los demás, inteligencia emocional y comprensión interpersonal.',
        {
          A: [
            'Cumple con sus responsabilidades sin descuidar las necesidades de otras áreas.',
            'Es una persona confiable para trabajar en conjunto.',
            'Busca constantemente apoyar y aportar al logro de otros equipos.',
          ],
          B: [
            'Cumple con sus responsabilidades y apoya el trabajo de su equipo.',
            'Genera confianza dentro de su equipo.',
            'Coopera con facilidad con otras personas.',
          ],
          C: [
            'Entiende que trabajar en equipo es importante y sin embargo coopera eventualmente.',
            'Apoya a otros solo cuando se lo solicitan.',
            'Necesita mayor iniciativa para colaborar sin esperar indicaciones.',
          ],
          D: [
            'Se enfoca solo en sus propias responsabilidades.',
            'No muestra disposición para apoyar a otros.',
            'No trabaja en conjunto con personas de otras áreas.',
          ],
        }
      ),
      crecer(
        'empatia',
        'Empatía',
        'Es la sensibilidad personal para atender y comprender los sentimientos de los demás, captar emociones y buscar comprender antes de ser comprendido. Busca generar relaciones de confianza a todo nivel.',
        {
          A: [
            'Reconoce cómo se sienten los demás y escucha con atención.',
            'Genera confianza y hace que las personas se sientan apoyadas.',
            'Ante los problemas, busca soluciones en conjunto.',
          ],
          B: [
            'Escucha cómo se sienten los demás.',
            'Valora sus emociones antes de dar una opinión o respuesta.',
            'Brinda orientación para que la persona pueda afrontar y resolver la situación.',
          ],
          C: [
            'Algunas veces comprende cómo se sienten los demás.',
            'A veces le cuesta identificar lo que la otra persona necesita o siente.',
            'Necesita generar mayor confianza para relacionarse de manera más empática.',
          ],
          D: [
            'No muestra interés por comprender cómo se sienten los demás.',
            'No escucha ni se pone en el lugar de otras personas.',
            'Tiene dificultades para generar relaciones de confianza.',
          ],
        }
      ),
      crecer(
        'gestion-del-cambio-e-innovacion',
        'Gestión del Cambio e Innovación',
        'Promueve e implementa cambios en los procesos o productos para adaptarse a las variaciones del entorno y generar mejoras sostenibles.',
        {
          A: [
            'Lidera los cambios de manera proactiva y asegura que se implementen.',
            'Impulsa nuevas ideas y busca formas de mejorar continuamente.',
            'Involucra al equipo y logra que participe activamente en los cambios.',
          ],
          B: [
            'Implementa cambios importantes en su área cuando son necesarios.',
            'Involucra al equipo para que participe en la mejora.',
            'Convierte las ideas de mejora en acciones concretas.',
          ],
          C: [
            'Acepta y apoya los cambios propuestos por otros.',
            'Se adapta cuando recibe orientación y acompañamiento.',
            'Le cuesta liderar los cambios o mantenerlos en el tiempo.',
          ],
          D: [
            'Muestra resistencia frente a los cambios.',
            'Prefiere mantener las formas de trabajo de siempre, aunque ya no sean las más adecuadas.',
            'No participa en iniciativas de mejora o innovación.',
          ],
        }
      ),
    ],
  },
  {
    slug: 'contribuidor-individual',
    nombre: 'Contribuidor Individual',
    rol: 'Especialistas, Analistas y Asistentes sin Personal a cargo',
    descripcion: 'Competencias base para colaboradores especialistas y aportantes individuales.',
    competencias: [
      crecer(
        'sentimiento-de-pertenencia',
        'Sentimiento de Pertenencia',
        'Sentir los objetivos de la organización como propios. Demostrar respeto por la cultura organizacional e identificarse emocionalmente con el grupo de personas que forman la organización.',
        {
          A: [
            'Se compromete con los objetivos de la organización y los siente como propios.',
            'Apoya las decisiones y trabaja por el logro de objetivos comunes.',
            'Cumple sus compromisos y supera obstáculos para alcanzar los resultados.',
          ],
          B: [
            'Se compromete con los objetivos de la organización.',
            'Aporta activamente para lograr las metas de su área.',
            'Demuestra sentido de pertenencia en su forma de trabajar.',
          ],
          C: [
            'Busca alinear su trabajo con los objetivos de la organización.',
            'Cumple algunas veces con lo esperado y le cuesta adaptarse rápidamente a nuevos retos.',
            'Necesita mayor compromiso frente a cambios y metas más exigentes.',
          ],
          D: [
            'Prioriza sus propios intereses antes que los objetivos del negocio.',
            'No está comprometido con las necesidades de su área u organización.',
            'No tiene sentido de pertenencia hacia la organización.',
          ],
        }
      ),
      crecer(
        'orientacion-a-resultados-crecer',
        'Orientación a Resultados',
        'Es la capacidad de encaminar todos los actos al logro de lo esperado, actuando con velocidad y sentido de urgencia ante decisiones importantes necesarias para cumplir con las necesidades del cliente o para mejorar la organización. Es la tendencia al logro de resultados, fijando metas desafiantes por encima de los estándares, teniendo presente el ADN Low - Cost; mejorando y manteniendo altos niveles de rendimiento en el marco de las estrategias de la organización.',
        {
          A: [
            'Actúa con rapidez para lograr los resultados esperados teniendo presente el ahorro en costos.',
            'Se anticipa a las necesidades del cliente y busca mejorar continuamente.',
            'Se fija metas retadoras y trabaja con claridad para alcanzarlas.',
          ],
          B: [
            'Resuelve adecuadamente situaciones y ajusta los procesos cuando es necesario.',
            'Responde adecuadamente ante necesidades no previstas.',
            'Revisa los resultados y propone acciones para mejorar.',
          ],
          C: [
            'Eventualmente identifica cuando los resultados no son los esperados y realiza ajustes.',
            'Algunas veces cambia su forma de trabajar para mejorar el resultado.',
            'Resuelve de manera reactiva situaciones que requieren corrección.',
          ],
          D: [
            'No busca mejoras en su forma de trabajar.',
            'Se conforma con resultados básicos y evita asumir metas más exigentes.',
            'No responde con rapidez cuando aparecen situaciones fuera de lo habitual.',
          ],
        }
      ),
      crecer(
        'adaptacion-al-cambio-crecer',
        'Adaptación al Cambio',
        'Es la capacidad para adaptarse e interiorizar los cambios, modificando si fuese necesario su propia conducta para alcanzar determinados objetivos cuando surgen dificultades, nueva información o cambios, ya sean externos, de la propia organización, de la del cliente o de los requerimientos del trabajo en sí.',
        {
          A: [
            'Se anticipa a los cambios del mercado y del negocio.',
            'Se adapta con rapidez a nuevas situaciones y necesidades.',
            'Mantiene un desempeño sobresaliente aún cuando cambian las condiciones de trabajo.',
          ],
          B: [
            'Identifica los cambios y ajusta sus objetivos o proyectos cuando es necesario.',
            'Se adapta a nuevas situaciones y formas de trabajo.',
            'Escucha otros puntos de vista y los toma en cuenta para mejorar procesos o relaciones.',
          ],
          C: [
            'Identifica los cambios cuando impactan solo directamente en su trabajo.',
            'Se adapta mejor solo cuando recibe orientación o feedback.',
            'Necesita mayor autonomía para responder ante nuevas situaciones.',
          ],
          D: [
            'No se adapta a los cambios.',
            'No responde cuando cambian los objetivos o la forma de trabajar.',
            'No tiene disposición y flexibilidad frente a nuevas situaciones.',
          ],
        }
      ),
      crecer(
        'excelencia-operacional',
        'Excelencia Operacional',
        'La excelencia operacional consiste en la ejecución de la estrategia de negocio de manera más consistente y confiable, buscando la excelencia en el cumplimiento de estándares. Implica tener amplios conocimientos de los temas del área / puesto que estén bajo su responsabilidad. Poseer la capacidad de comprender la esencia e impacto de su rol en el negocio.',
        {
          A: [
            'Conoce muy bien su rol y los procesos que debe cumplir.',
            'Analiza el contexto para planificar y ejecutar mejor su trabajo.',
            'Cumple los estándares de su función con un nivel sobresaliente.',
          ],
          B: [
            'Conoce sus objetivos y ejecuta los procesos de su función.',
            'Busca formas simples y prácticas de hacer mejor el trabajo.',
            'Aprovecha su experiencia y la del equipo para lograr mejores resultados.',
          ],
          C: [
            'Propone algunas soluciones para lograr los objetivos.',
            'Busca alternativas solo cuando se presentan dificultades.',
            'Cumple algunas veces con los estándares de calidad requeridos.',
          ],
          D: [
            'No tiene claridad sobre los objetivos y desafíos de su puesto.',
            'No propone soluciones eficientes.',
            'Le cuesta encontrar soluciones prácticas a los problemas.',
          ],
        }
      ),
      crecer(
        'dinamismo-crecer',
        'Dinamismo',
        'Se trata de la habilidad para trabajar duro en situaciones cambiantes o alternativas, con interlocutores muy diversos, que cambian en cortos espacios de tiempo, en jornadas de trabajo prolongadas sin que por esto se vea afectado su nivel de energía, actitud positiva y actividad.',
        {
          A: [
            'Mantiene un alto nivel de energía aún en jornadas exigentes o cambiantes.',
            'Sostiene su rendimiento sin que la presión afecte su trabajo.',
            'Transmite energía y motiva al equipo con su actitud.',
          ],
          B: [
            'Mantiene energía y buen ritmo de trabajo durante la jornada.',
            'Sostiene su rendimiento en el día a día laboral.',
            'Transmite una actitud positiva y energía al equipo.',
          ],
          C: [
            'Eventualmente transmite energía durante el día laboral.',
            'Su nivel de energía puede bajar después de períodos prolongados de trabajo.',
            'Le cuesta mantener una actitud positiva constante en el equipo.',
          ],
          D: [
            'No muestra disposición para mantener el esfuerzo en jornadas exigentes.',
            'Su energía disminuye cuando el trabajo se prolonga o aumenta la presión.',
            'No rinde en situaciones de alta exigencia.',
          ],
        }
      ),
      crecer(
        'trabajo-colaborativo',
        'Trabajo Colaborativo',
        'Es la capacidad para colaborar y cooperar con los demás, formar parte de un grupo y trabajar con otras áreas de la organización con el propósito de alcanzar, en conjunto la estrategia organizacional, subordinar los intereses personales a los objetivos grupales. Implica tener expectativas positivas respecto de los demás, comprender a los otros, y generar y mantener un buen clima de trabajo.',
        {
          A: [
            'Motiva y promueve el trabajo en equipo y la colaboración entre áreas.',
            'Reconoce y celebra el logro de los demás.',
            'Comparte información y experiencias que ayudan al equipo a trabajar mejor.',
          ],
          B: [
            'Promueve un buen ambiente de trabajo.',
            'Fomenta la cooperación y el apoyo entre los miembros del equipo.',
            'Impulsa formas de trabajo en equipo que ayudan a lograr mejores resultados.',
          ],
          C: [
            'Participa y colabora en las tareas del equipo solo de ser requerido.',
            'Cumple solo con la parte del trabajo que le corresponde.',
            'Eventualmente informa a los demás sobre sus avances y pendientes.',
          ],
          D: [
            'No trabaja en equipo.',
            'Prioriza sus propios objetivos antes que los del grupo.',
            'No comparte información sobre sus avances y pendientes.',
          ],
        }
      ),
    ],
  },
];

export const AREAS_RADAR: AreaRadar[] = [
  {
    slug: 'transversales',
    nombre: 'Competencias Transversales',
    descripcion:
      'Competencias para todo el personal N1. Orientan comportamientos esenciales que se esperan en la operación diaria, independientemente del área o familia ocupacional.',
    competencias: [
      radar(
        'orientacion-a-resultados',
        'Orientación a Resultados',
        'Cumple las tareas asignadas en tiempo, forma y calidad, cuidando recursos y actuando con sentido de urgencia.',
        {
          1: [
            'No termina tareas básicas sin seguimiento.',
            'Presenta errores o retrasos frecuentes.',
            'No avisa a tiempo cuando hay un problema.',
          ],
          2: [
            'Cumple solo algunas tareas y necesita recordatorios.',
            'La calidad o el ritmo aún son inconstantes.',
            'Las tareas asignadas se presentan tarde y sin propuesta de mejora.',
          ],
          3: [
            'Cumple la tarea diaria en tiempo y con calidad.',
            'Cuida materiales, equipos e insumos.',
            'Avisa desviaciones y ayuda a resolver.',
          ],
          4: [
            'Supera lo esperado sin descuidar la calidad.',
            'Propone mejoras para ahorrar tiempo o recursos.',
            'Resuelve imprevistos optimizando la operación.',
          ],
        }
      ),
      radar(
        'adaptacion-al-cambio',
        'Adaptación al Cambio',
        'Acepta y aplica nuevas instrucciones, formas de trabajo, horarios o herramientas con buena disposición.',
        {
          1: [
            'No acepta cambios o nuevas indicaciones.',
            'No muestra disposición a aprender nuevas formas de trabajo.',
            'Su desempeño baja cuando cambia la rutina.',
          ],
          2: [
            'Acepta el cambio, pero requiere acompañamiento constante.',
            'Aplica instrucciones nuevas con errores.',
            'Pregunta varias veces lo mismo antes de actuar.',
          ],
          3: [
            'Aplica nuevas instrucciones con seguridad.',
            'Aprende herramientas o procesos nuevos.',
            'Mantiene buena actitud ante imprevistos.',
          ],
          4: [
            'Se adapta rápido y sin perder el ritmo.',
            'Ayuda a otros a entender el cambio.',
            'Propone distintas formas de adaptarse.',
          ],
        }
      ),
      radar(
        'dinamismo',
        'Dinamismo',
        'Mantiene energía, buen ritmo y actitud positiva durante la jornada, incluso en momentos de alta exigencia.',
        {
          1: [
            'No trabaja con ritmo y tiene baja energía.',
            'Se desmotiva ante carga alta de trabajo.',
            'No avanza sin supervisión.',
          ],
          2: [
            'Su ritmo y actitud son inconstantes.',
            'Cumple solo cuando se le recuerda su tarea.',
            'Baja el rendimiento en momentos exigentes.',
          ],
          3: [
            'Mantiene buen ritmo durante la jornada.',
            'Tiene buena disposición para apoyar.',
            'Sostiene su desempeño bajo presión normal.',
          ],
          4: [
            'Mantiene alta energía incluso en momentos de alta exigencia.',
            'Transmite y realiza acciones para mantener la buena actitud en el equipo.',
            'Es rápido para cumplir sus tareas sin perder calidad.',
          ],
        }
      ),
    ],
  },
  {
    slug: 'comercial',
    nombre: 'Comercial',
    descripcion: 'Competencias específicas para la gestión comercial en el punto de venta.',
    competencias: [
      radar(
        'iniciativa-comercial-y-negociacion',
        'Iniciativa Comercial y Negociación',
        'Impulsa la venta, maneja objeciones y negocia con el cliente para lograr un cierre comercial favorable.',
        {
          1: [
            'No ofrece alternativas, ni pedido sugerido.',
            'Se queda con el primer “no” del cliente.',
            'No detecta oportunidades de venta o visibilidad.',
          ],
          2: [
            'Ofrece algunos productos, pero sin insistencia o solo aquellos de mayor rotación.',
            'Responde objeciones simples.',
            'Necesita guía para negociar y cerrar.',
          ],
          3: [
            'Sustenta los atributos del producto y/o marca de forma clara.',
            'Maneja objeciones frecuentes.',
            'Logra cerrar acuerdos comerciales.',
          ],
          4: [
            'Incrementa su facturación y efectividad de preventa.',
            'Asegura y gana espacios de visibilidad competitivos.',
            'Propone alternativas comerciales efectivas.',
          ],
        }
      ),
      radar(
        'planificacion-y-organizacion-de-ruta',
        'Planificación y Organización de Ruta',
        'Organiza su ruta, tiempos, herramientas e inventario para cumplir la cobertura y llegar preparado a cada cliente.',
        {
          1: [
            'No cumple con la ruta asignada.',
            'No sale a ruta o sale sin herramientas e información básica.',
            'Presenta demoras por desorden o falta de planificación.',
          ],
          2: [
            'Cubre parte de la ruta, pero con retrasos.',
            'Revisa herramientas de forma incompleta.',
            'Necesita apoyo para priorizar la visita a sus clientes.',
          ],
          3: [
            'Cumple la ruta planificada.',
            'Lleva herramientas y material para su gestión de ventas y visibilidad.',
            'Cumple sus visitas en el tiempo estimado.',
          ],
          4: [
            'Cubre la ruta con eficiencia.',
            'Anticipa problemas de stock o tiempo.',
            'Optimiza visitas sin afectar la calidad de su servicio.',
          ],
        }
      ),
      radar(
        'comunicacion-efectiva-y-servicio',
        'Comunicación Efectiva y Servicio',
        'Brinda información clara al cliente, escucha sus necesidades y atiende sus reclamos y/o solicitudes con disposición.',
        {
          1: [
            'Comparte información incompleta o sin claridad.',
            'No escucha la necesidad del cliente.',
            'No da seguimiento a reclamos o pedidos.',
          ],
          2: [
            'Comunica lo básico, pero con poca claridad.',
            'Necesita apoyo para atender reclamos simples.',
            'Requiere mejorar su seguimiento y trato.',
          ],
          3: [
            'Explica precios, promociones y beneficios con claridad.',
            'Escucha y responde con respeto.',
            'Da seguimiento a pedidos y/o reclamos.',
          ],
          4: [
            'Genera confianza con el cliente.',
            'Resuelve incidencias con rapidez y criterio.',
            'La calidad de su servicio permite fortalecer la relación comercial.',
          ],
        }
      ),
      radar(
        'calidad-en-el-trabajo-y-ejecucion',
        'Calidad en el Trabajo y Ejecución',
        'Ejecuta correctamente los estándares comerciales en el punto de venta, cuidando los activos y la visibilidad de los productos y equipos.',
        {
          1: [
            'No cumple con las tareas de visibilidad.',
            'Registra pedidos o datos con errores.',
            'No cuida los activos o equipos asignados.',
          ],
          2: [
            'Cumple algunos criterios de visibilidad, pero requiere revisión.',
            'Tiene errores puntuales en el registro de pedidos.',
            'Reporta problemas de activos de forma tardía.',
          ],
          3: [
            'Cumple estándares de visibilidad.',
            'Registra correctamente sus pedidos y otros datos requeridos.',
            'Cuida activos y reporta incidencias.',
          ],
          4: [
            'Gestiona la visibilidad de forma sobresaliente.',
            'Detecta y corrige errores antes de cerrar sus pedidos diarios.',
            'Mejora la exhibición y uso de activos.',
          ],
        }
      ),
    ],
  },
  {
    slug: 'logistica',
    nombre: 'Logística',
    descripcion: 'Competencias específicas para roles afines a: operación logística, auxiliar de almacén, almacenero, asistente de transporte T1, auxiliar administrativo y control de producto.',
    competencias: [
      radar(
        'cumplimiento-normativo-y-seguridad',
        'Cumplimiento Normativo y Seguridad',
        'Cumple normas, procedimientos y estándares de seguridad, usando EPP y previniendo riesgos en la operación.',
        {
          1: [
            'No usa EPPs o procedimientos.',
            'Omite pasos básicos de seguridad.',
            'Expone la operación a riesgos o incidentes.',
          ],
          2: [
            'Cumple normas cuando se le recuerda.',
            'Identifica algunos riesgos, pero no siempre reporta.',
            'Necesita seguimiento para sostener la disciplina.',
          ],
          3: [
            'Usa EPP y cumple procedimientos.',
            'Reporta condiciones inseguras a tiempo.',
            'Trabaja cuidando personas, producto y equipos.',
          ],
          4: [
            'Es ejemplo de cumplimiento y seguridad.',
            'Previene riesgos antes de iniciar la tarea.',
            'Ayuda a otros a trabajar de forma segura.',
          ],
        }
      ),
      radar(
        'precision-en-la-ejecucion',
        'Precisión en la Ejecución',
        'Realiza movimientos, registros y manipulación de producto con exactitud, evitando errores en la cadena.',
        {
          1: [
            'Comete errores  en códigos o cantidades.',
            'Manipula producto sin el cuidado requerido.',
            'No detecta diferencias entre físico y sistema..',
          ],
          2: [
            'Tiene errores puntuales que requieren corrección.',
            'Necesita doble revisión en tareas críticas.',
            'Detecta desvíos, pero no siempre a tiempo.',
          ],
          3: [
            'Registra movimientos correctamente.',
            'Manipula el producto con cuidado.',
            'Detecta y reporta desvíos de forma oportuna.',
          ],
          4: [
            'Trabaja con alta exactitud.',
            'Anticipa desvíos antes de que avancen.',
            'Ayuda a mejorar el control de la operación.',
          ],
        }
      ),
    ],
  },
  {
    slug: 'cadena-1',
    nombre: 'Cadena 1',
    descripcion:
      'Competencias específicas para roles afines a: operarios, operadores, técnico operador especializado, técnico operador, operador - entrenador, técnico de mantenimiento especializado, técnico de mantenimiento, técnico de servicios industriales, técnico operador entrenador, técnico de ptar y técnico de servicios generales.',
    competencias: [
      radar(
        'responsabilidad-operativa-y-seguridad-m1',
        'Responsabilidad Operativa y Seguridad',
        'Cuida su seguridad y el ritmo de la planta, evitando errores y asegurando la continuidad del proceso.',
        {
          1: [
            'No cumple normas QHSE o de seguridad.',
            'Descuida producto, insumos o equipos.',
            'No reacciona a tiempo ante paradas o fallas.',
          ],
          2: [
            'Cumple normas básicas con recordatorios.',
            'Mantiene orden de forma irregular.',
            'Reacciona ante problemas, pero con demora.',
          ],
          3: [
            'Sigue normas QHSE y usa EPP correctamente.',
            'Mantiene el área limpia y ordenada.',
            'Actúa rápido ante paradas u observaciones.',
          ],
          4: [
            'Previene riesgos antes de operar.',
            'Sostiene ritmo sin comprometer seguridad.',
            'Ayuda a mantener continuidad sin errores.',
          ],
        }
      ),
      radar(
        'eficiencia-colaborativa-m1',
        'Eficiencia Colaborativa',
        'Coordina con el equipo, entrega relevos claros y avisa anomalías para asegurar continuidad entre turnos.',
        {
          1: [
            'No comunica pendientes o fallas.',
            'No colabora cuando el equipo lo necesita.',
            'Avisa anomalías tarde o no las avisa.',
          ],
          2: [
            'Comunica algunos pendientes, pero incompletos.',
            'Apoya solo cuando se le solicita.',
            'Necesita mejorar claridad en el relevo.',
          ],
          3: [
            'Entrega el turno con información clara.',
            'Apoya a compañeros para resolver problemas.',
            'Avisa anomalías de máquinas, producto o proceso.',
          ],
          4: [
            'Anticipa información crítica para el siguiente turno.',
            'Coordina soluciones rápidas con el equipo.',
            'Evita que problemas escalen por comunicación oportuna.',
          ],
        }
      ),
    ],
  },
  {
    slug: 'cadena-2',
    nombre: 'Cadena 2',
    descripcion: 'Competencias específicas para roles afines a: auxiliares agrícolas, auxiliar de segregación de residuos, auxiliar de producción y auxiliar de campo.',
    competencias: [
      radar(
        'responsabilidad-operativa-y-seguridad-m2',
        'Responsabilidad Operativa y Seguridad',
        'Cuida su seguridad y el ritmo de planta o campo, evitando errores y protegiendo producto o insumo.',
        {
          1: [
            'No cumple normas QHSE o de seguridad.',
            'Descuida producto o insumo.',
            'No reporta observaciones que afectan su función.',
          ],
          2: [
            'Cumple normas básicas con supervisión.',
            'Mantiene orden de forma irregular.',
            'Reporta observaciones, pero con demora.',
          ],
          3: [
            'Sigue reglas QHSE y usa EPP correctamente.',
            'Mantiene su área limpia y organizada.',
            'Actúa y reporta para asegurar continuidad.',
          ],
          4: [
            'Previene riesgos antes de iniciar el trabajo.',
            'Cuida producto o insumo de forma ejemplar.',
            'Asegura continuidad sin errores ni retrasos.',
          ],
        }
      ),
      radar(
        'eficiencia-colaborativa-m2',
        'Eficiencia Colaborativa',
        'Coordina con el equipo y realiza el trabajo según lo requerido, comunicando pendientes u observaciones con claridad.',
        {
          1: [
            'No comunica pendientes u observaciones.',
            'No apoya a otras áreas o compañeros.',
            'Su trabajo genera retrasos o reprocesos.',
          ],
          2: [
            'Comunica información básica, pero incompleta.',
            'Apoya cuando se le solicita.',
            'Necesita seguimiento para cumplir lo requerido.',
          ],
          3: [
            'Realiza el trabajo según lo requerido.',
            'Comunica pendientes y observaciones claras.',
            'Colabora para resolver problemas operativos.',
          ],
          4: [
            'Anticipa pendientes y los comunica a tiempo.',
            'Apoya activamente sin esperar que se lo pidan.',
            'Ayuda a mantener continuidad y calidad del trabajo.',
          ],
        }
      ),
    ],
  },
  {
    slug: 'soporte-tecnico-administrativo',
    nombre: 'Soporte técnico administrativo',
    descripcion: 'Competencias específicas para funciones técnicas administrativas de soporte.',
    competencias: [
      radar(
        'orden-y-precision-admin',
        'Orden y Precisión',
        'Organiza documentos, datos, registros, materiales y tareas de manera ordenada, ejecutando sus actividades con precisión y atención al detalle para asegurar la calidad y prevenir errores.',
        {
          1: [
            'Presenta errores constantes en la ejecución de sus tareas.',
            'Es desorganizado y pierde documentos, materiales o información necesarios para su trabajo.',
            'No revisa sus actividades antes de finalizarlas o entregarlas.',
          ],
          2: [
            'Eventualmente mantiene cierto orden en sus documentos, materiales y tareas.',
            'Presenta errores puntuales que pueden afectar la calidad o continuidad de su trabajo.',
            'Revisa sus actividades de forma reactiva.',
          ],
          3: [
            'Mantiene organizados sus documentos, datos, registros, materiales y tareas.',
            'Ejecuta sus actividades con precisión, siguiendo los procedimientos establecidos.',
            'Revisa su trabajo antes de finalizarlo para asegurar que la información y resultados sean correctos.',
          ],
          4: [
            'Detecta y corrige errores antes de finalizar su trabajo, evidenciando proactividad.',
            'Mantiene información, documentos, materiales y tareas organizados.',
            'Propone mejoras que contribuyen a reducir errores y optimizar el orden y control de las actividades.',
          ],
        }
      ),
      radar(
        'servicio-y-coordinacion-admin',
        'Servicio y Coordinación',
        'Atiende solicitudes internas con disposición, comunica avances y coordina con otras áreas hasta cerrar el requerimiento.',
        {
          1: ['No responde solicitudes a tiempo.', 'No informa avances ni problemas.', 'Deja pendientes sin cierre.'],
          2: [
            'Responde solicitudes simples con apoyo.',
            'Comunica avances de forma incompleta.',
            'Necesita seguimiento para cerrar pendientes.',
          ],
          3: [
            'Atiende solicitudes con disposición.',
            'Comunica avances y problemas oportunamente.',
            'Da seguimiento hasta el cierre.',
          ],
          4: [
            'Anticipa necesidades y coordina soluciones.',
            'Mantiene informados a los involucrados.',
            'Cierra solicitudes con rapidez y buen servicio.',
          ],
        }
      ),
    ],
  },
  {
    slug: 'eventos',
    nombre: 'Eventos',
    descripcion: 'Competencias específicas para el apoyo y la ejecución de eventos.',
    competencias: [
      radar(
        'orden-y-precision-eventos',
        'Orden y Precisión',
        'Prepara, organiza y revisa los materiales, espacios y entregables del evento para asegurar una ejecución sin errores.',
        {
          1: [
            'Olvida materiales o tareas asignadas.',
            'No revisa montaje, activos, cantidades o entregables.',
            'Genera retrasos por desorden.',
          ],
          2: [
            'Requiere apoyo para organizar los materiales y recursos. .',
            'Presenta errores durante la ejecución.',
            'Necesita seguimiento para concluir sus tareas.',
          ],
          3: [
            'Prepara materiales y espacios correctamente.',
            'Revisa montaje, activos, cantidades o entregables.',
            'Mantiene orden antes, durante y después del evento.',
          ],
          4: [
            'Anticipa necesidades del evento.',
            'Detecta errores antes de que afecten la ejecución.',
            'Pese a la presión, asegura el orden y precisión en sus tareas.',
          ],
        }
      ),
      radar(
        'servicio-y-coordinacion-eventos',
        'Servicio y Coordinación',
        'Coordina con participantes, proveedores o áreas involucradas, atendiendo solicitudes durante la ejecución del evento.',
        {
          1: [
            'No sigue las indicaciones y/o solicitudes planteadas.',
            'No comunica cambios o incidencias.',
            'Se desordena ante la presión del evento.',
          ],
          2: [
            'Atiende solicitudes simples.',
            'Tarda en comunicar algunas incidencias.',
            'Durante el evento, necesita guía para priorizar tareas.',
          ],
          3: [
            'Cumple con acierto a lo solicitando.',
            'Según la necesidad, coordina con áreas o proveedores.',
            'Comunica incidencias y busca solución.',
          ],
          4: [
            'Resuelve imprevistos con rapidez.',
            'Coordina varias solicitudes sin perder el orden.',
            'Cuida la experiencia del participante y/o cliente interno.',
          ],
        }
      ),
    ],
  },
];

export const TOTAL_COMPETENCIAS_CRECER = CATEGORIAS_CRECER.reduce(
  (acc, c) => acc + c.competencias.length,
  0
);
export const TOTAL_COMPETENCIAS_RADAR = AREAS_RADAR.reduce((acc, a) => acc + a.competencias.length, 0);
export const TOTAL_COMPETENCIAS = TOTAL_COMPETENCIAS_CRECER + TOTAL_COMPETENCIAS_RADAR;
