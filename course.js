/* Curso de NüMIA: "Domina tu plata"
   Cada lección: explicación, ejemplo de la vida real, lo que te llevas y un examen de 4 preguntas.
   Formato de pregunta: [pregunta, [opciones], índice correcto, por qué]. Se aprueba con 3 de 4. */

const COURSE = { name: 'Domina tu plata', pass: 3 };

const LEVELS = [
  { id: 'm1', name: 'Tu relación con la plata', desc: 'Las bases: entender a dónde se va tu dinero.' },
  { id: 'm2', name: 'Tu presupuesto', desc: 'Darle un trabajo a cada peso antes de gastarlo.' },
  { id: 'm3', name: 'El ahorro', desc: 'Construir tu colchón y cumplir tus metas.' },
  { id: 'm4', name: 'Deudas y crédito', desc: 'Usar el crédito a tu favor y salir de deudas.' },
  { id: 'm5', name: 'Tu trabajo y tus ingresos', desc: 'Entender lo que ganas y hacerlo crecer.' },
  { id: 'm6', name: 'Protege tu plata', desc: 'Seguros, estafas y seguridad en el celular.' },
  { id: 'm7', name: 'Haz crecer tu plata', desc: 'Inflación, interés compuesto, inversión y pensión.' },
  { id: 'm8', name: 'Tu plan de vida financiera', desc: 'Pareja, grandes compras y tu plan personal.' }
];

const LESSONS = [
/* ================= Módulo 1 ================= */
{ id: 'finanzas', level: 'm1', min: 3, title: '¿Qué son las finanzas personales?',
  body: [
    'Las finanzas personales son la forma en que **ganas, gastas, ahorras, pides prestado y proteges** tu plata. No son cosa de bancos ni de gente con mucho dinero: las manejas todos los días, cada vez que pagas un pasaje o decides si pides un domicilio.',
    'Manejar bien tu plata no depende tanto de cuánto ganas sino de **lo que haces con lo que ganas**. Hay personas con buenos sueldos que viven endeudadas y personas con ingresos modestos que viven tranquilas y con ahorros.',
    'La meta no es volverte tacaño. Es que la plata trabaje para tu vida: que puedas pagar lo necesario, disfrutar sin culpa, estar preparado para imprevistos y avanzar hacia lo que sueñas.'
  ],
  example: { title: 'Dos amigos, el mismo sueldo', text: [
    'Andrés y Felipe ganan $2.000.000 cada uno. Andrés no sabe en qué se le va la plata: a fin de mes siempre le falta y usa la tarjeta para cubrir. Felipe anota sus gastos, separa $150.000 apenas le pagan y tiene claro cuánto puede gastar en salidas.',
    'Al año, Andrés debe $2.500.000 en la tarjeta. Felipe tiene $1.800.000 ahorrados. Ganan lo mismo; la diferencia está en los hábitos.'
  ] },
  learn: ['Las finanzas personales son tus decisiones diarias con la plata.', 'Importa más lo que haces con tu dinero que cuánto ganas.', 'El objetivo es tranquilidad y avanzar hacia tus metas, no dejar de vivir.'],
  q: [
    ['¿Qué incluyen las finanzas personales?', ['Solo invertir en la bolsa', 'Cómo ganas, gastas, ahorras, pides prestado y proteges tu plata', 'Solo los trámites con el banco'], 1, 'Abarcan todas tus decisiones con el dinero, no solo invertir o ir al banco.'],
    ['Según la lección, ¿qué influye más en tu tranquilidad financiera?', ['Lo que haces con lo que ganas', 'Tener un sueldo muy alto', 'Tener muchas tarjetas'], 0, 'Con el mismo ingreso, los hábitos marcan la diferencia, como pasó con Andrés y Felipe.'],
    ['¿Cuál es la meta de manejar bien tu plata?', ['No gastar nunca en gustos', 'Que la plata trabaje para tu vida: lo necesario, disfrutar, imprevistos y metas', 'Tener la mayor cantidad de créditos aprobados'], 1, 'No se trata de privarse de todo sino de usar el dinero con intención.'],
    ['En el ejemplo, ¿qué hizo diferente Felipe?', ['Pidió un aumento', 'Anotó sus gastos y separó ahorro apenas le pagaron', 'Usó la tarjeta para todo'], 1, 'Registrar y ahorrar primero fueron los hábitos que le cambiaron el año.']
  ] },

{ id: 'flujo', level: 'm1', min: 3, title: 'Ingresos, gastos y lo que te queda',
  body: [
    'Toda tu vida financiera se resume en una resta: **lo que entra menos lo que sale**. A eso se le llama flujo de caja. Si el resultado es positivo, tienes con qué ahorrar o pagar deudas. Si es negativo, estás gastando plata que no tienes.',
    'Los **ingresos** son todo lo que te entra: sueldo, ventas, trabajos extra, propinas, prima. Los **gastos** son todo lo que sale: arriendo, comida, transporte, cuotas, gustos.',
    'Hay gastos **fijos**, que se repiten cada mes con el mismo valor (arriendo, internet, cuotas), y gastos **variables**, que cambian (mercado, salidas, gasolina). Los variables son donde más fácil se escapa la plata y donde más fácil puedes ajustar.'
  ],
  example: { title: 'La cuenta de Camila', text: [
    'Camila gana $1.800.000. Sus gastos fijos suman $1.050.000 (arriendo, servicios, celular y transporte). Sus variables, sin darse cuenta, suman $900.000. Resultado: $1.800.000 − $1.950.000 = **−$150.000**. Cada mes cubre ese hueco con la tarjeta.',
    'Cuando hizo la resta por primera vez entendió por qué la deuda crecía. Bajó domicilios y salidas a $650.000 y su flujo pasó a +$100.000.'
  ] },
  learn: ['Flujo de caja = lo que entra − lo que sale.', 'Los gastos fijos se repiten; los variables cambian y son más fáciles de ajustar.', 'Un flujo negativo se termina pagando con deuda.'],
  q: [
    ['¿Qué es el flujo de caja?', ['Lo que entra menos lo que sale', 'El saldo de tu tarjeta de crédito', 'El total de tus deudas'], 0, 'Es la resta básica entre ingresos y gastos en un periodo.'],
    ['¿Cuál de estos es un gasto fijo?', ['Una salida a cine', 'El arriendo', 'Un domicilio'], 1, 'El arriendo se repite cada mes con el mismo valor.'],
    ['Si tu flujo de caja es negativo, ¿qué suele pasar?', ['Ahorras más', 'Terminas cubriendo la diferencia con deuda', 'No pasa nada'], 1, 'Si sale más de lo que entra, la diferencia sale de ahorros o de préstamos.'],
    ['¿Dónde es más fácil ajustar para mejorar tu flujo?', ['En los gastos variables', 'En el valor del arriendo de este mes', 'En la cuota de un crédito ya firmado'], 0, 'Los variables, como salidas o domicilios, se pueden cambiar de inmediato.']
  ] },

{ id: 'necesidades', level: 'm1', min: 3, title: 'Necesidades, deseos y antojos',
  body: [
    'No todos los gastos pesan igual. Las **necesidades** son lo que te permite vivir y trabajar: vivienda, comida básica, servicios, transporte, salud. Los **deseos** mejoran tu vida pero puedes posponerlos: ropa nueva, salidas, un celular mejor.',
    'Los **antojos** son deseos de último minuto, muchas veces provocados por la publicidad o el estado de ánimo: "me lo merezco", "está en promoción", "solo por hoy".',
    'Disfrutar está bien. El problema es cuando los deseos y antojos se pagan con plata que era para necesidades o con deuda. Antes de comprar, pregúntate: **¿lo necesito, lo quiero o me provocó?**'
  ],
  example: { title: 'El celular de Kevin', text: [
    'Kevin tenía un celular que funcionaba bien, pero vio el modelo nuevo en promoción a 24 cuotas de $95.000. Lo compró. Dos meses después le subieron el arriendo y no le alcanzaba para el mercado.',
    'El celular era un deseo pagado con plata que necesitaba para lo básico. Hoy Kevin se da 48 horas antes de comprar algo que no estaba en su plan.'
  ] },
  learn: ['Necesidades primero, luego deseos, y los antojos con cuidado.', 'Disfrutar está bien si no sacrifica lo básico ni se paga con deuda.', 'La pregunta clave: ¿lo necesito, lo quiero o me provocó?'],
  q: [
    ['¿Cuál de estos es una necesidad?', ['Unos tenis de marca', 'El transporte para ir a trabajar', 'Una suscripción adicional de streaming'], 1, 'Moverte para trabajar es básico para generar ingresos.'],
    ['¿Qué caracteriza a un antojo?', ['Es un gasto planeado desde hace meses', 'Es un deseo de último minuto, muchas veces impulsado por emociones o publicidad', 'Es un pago obligatorio'], 1, 'Los antojos aparecen de repente: "está en promoción", "me lo merezco".'],
    ['¿Cuándo un deseo se vuelve un problema?', ['Cuando se paga con plata de las necesidades o con deuda', 'Siempre que compras algo para ti', 'Cuando es más barato que $50.000'], 0, 'Darse gustos está bien; el problema es sacrificar lo básico o endeudarse.'],
    ['En el ejemplo, ¿qué aprendió Kevin a hacer?', ['Comprar solo en promociones', 'Esperar 48 horas antes de compras no planeadas', 'Comprar todo a 24 cuotas'], 1, 'Darse tiempo antes de comprar evita decisiones impulsivas.']
  ] },

{ id: 'registro', level: 'm1', min: 3, title: '¿A dónde se va tu plata?',
  body: [
    'Casi nadie sabe con exactitud en qué gasta. Un tinto de $3.000 al día son $90.000 al mes. Un domicilio de $25.000 dos veces por semana son $200.000 al mes. Sin anotar, esos gastos se vuelven invisibles.',
    'El hábito más poderoso para mejorar tus finanzas es **registrar todo lo que entra y sale durante 30 días**, por pequeño que sea. Anótalo apenas lo gastes: si lo dejas para la noche, se te olvida la mitad.',
    'No te juzgues mientras anotas, solo observa. Al final del mes tendrás la **foto real** de tu plata y sabrás exactamente qué ajustar. Para eso está el botón amarillo de esta app.'
  ],
  example: { title: 'El mes de prueba de Daniela', text: [
    'Daniela creía que gastaba unos $200.000 en comida fuera de casa. Anotó todo durante un mes con la app y el resultado fue $540.000 entre almuerzos, mecato y domicilios.',
    'No dejó de salir; empezó a llevar almuerzo tres días a la semana y se ahorró cerca de $220.000 al mes sin sentir que se privaba.'
  ] },
  learn: ['Lo que no se anota, no se ve.', 'Registra 30 días seguidos, apenas hagas cada gasto.', 'Con la foto real de tu plata puedes decidir qué ajustar.'],
  q: [
    ['¿Cuál es el hábito más poderoso para empezar?', ['Pedir un préstamo para organizarte', 'Registrar todo lo que entra y sale durante 30 días', 'Cambiar de banco'], 1, 'Anotar te da la información real para decidir.'],
    ['¿Cuándo conviene anotar un gasto?', ['Apenas lo haces', 'A fin de mes', 'Solo si es mayor a $50.000'], 0, 'Si lo dejas para después, olvidas muchos gastos pequeños.'],
    ['Un tinto de $3.000 diario, ¿cuánto suma al mes aproximadamente?', ['$9.000', '$30.000', '$90.000'], 2, '$3.000 × 30 días = $90.000.'],
    ['¿Qué descubrió Daniela?', ['Que gastaba menos de lo que creía', 'Que gastaba mucho más de lo que creía en comida fuera de casa', 'Que no necesitaba anotar'], 1, 'Creía $200.000 y eran $540.000. Anotar le mostró la realidad.']
  ] },

/* ================= Módulo 2 ================= */
{ id: 'presupuesto', level: 'm2', min: 4, title: 'Tu primer presupuesto, paso a paso',
  body: [
    'Un presupuesto es un **plan de cuánto vas a gastar en cada cosa antes de que empiece el mes**. Es decirle a tu plata para dónde va, en lugar de preguntarte después a dónde se fue.',
    'Paso a paso: 1) Escribe tu ingreso del mes (si varía, usa el de un mes flojo). 2) Anota tus gastos fijos. 3) Separa tu ahorro y el pago de deudas. 4) Reparte lo que queda en tus gastos variables: comida, transporte, salidas. 5) Revisa a mitad de mes y ajusta.',
    'Un buen presupuesto es **realista**. Si hoy gastas $600.000 en comida, no pongas $200.000 de un día para otro: baja poco a poco. Y deja una pequeña línea para imprevistos.'
  ],
  example: { title: 'El plan de Sebastián', text: [
    'Sebastián gana $2.200.000. Fijos: arriendo $800.000, servicios $150.000, celular $50.000. Ahorro: $150.000. Cuota de la moto: $300.000. Quedan $750.000 para variables: mercado $400.000, transporte $150.000, salidas $120.000 e imprevistos $80.000.',
    'El primer mes se pasó en salidas, pero como sabía cuánto llevaba, compensó bajando el mecato. Por primera vez llegó a fin de mes sin usar la tarjeta.'
  ] },
  learn: ['El presupuesto se hace antes de gastar, no después.', 'Orden: ingreso, fijos, ahorro y deudas, y luego variables.', 'Debe ser realista y revisarse a mitad de mes.'],
  q: [
    ['¿Qué es un presupuesto?', ['Un registro de lo que ya gastaste', 'Un plan de cuánto gastarás en cada cosa antes de que empiece el mes', 'Un préstamo para el mes'], 1, 'Es un plan hacia adelante: le das un destino a tu plata.'],
    ['¿Qué va antes de repartir los gastos variables?', ['Las salidas y los gustos', 'Los gastos fijos, el ahorro y el pago de deudas', 'Las compras en promoción'], 1, 'Primero aseguras lo obligatorio y tu futuro; luego repartes el resto.'],
    ['Si tus ingresos varían, ¿con qué ingreso haces el presupuesto?', ['Con el de un mes flojo', 'Con el mejor mes del año', 'Con el que esperas ganar'], 0, 'Así no te quedas corto en los meses malos.'],
    ['¿Qué hace realista un presupuesto?', ['Recortar todo a la mitad de un golpe', 'Ajustar poco a poco y dejar una línea para imprevistos', 'No dejar nada para gustos'], 1, 'Los cambios bruscos casi nunca se sostienen.']
  ] },

{ id: '503020', level: 'm2', min: 3, title: 'La regla 50/30/20',
  body: [
    'Es una guía sencilla para repartir lo que ganas: **50% para necesidades** (vivienda, comida, transporte, servicios), **30% para deseos** (salidas, ropa, suscripciones) y **20% para tu futuro** (ahorro y pago extra de deudas).',
    'Con $2.000.000 serían $1.000.000 para necesidades, $600.000 para deseos y $400.000 para tu futuro.',
    'No es una ley. Si tu arriendo se lleva mucho, prueba 60/20/20 o 70/20/10. Lo importante es que **siempre exista una parte para tu futuro**, aunque al principio sea pequeña.'
  ],
  example: { title: 'Valentina ajusta la regla', text: [
    'Valentina gana $1.600.000 y vive en arriendo con su hermana. Sus necesidades se llevan el 65%. En vez de frustrarse, usó 65/25/10: $1.040.000 necesidades, $400.000 deseos y $160.000 para ahorro.',
    'A los seis meses consiguió un ingreso extra los fines de semana y subió su ahorro al 15%. Empezó pequeño, pero empezó.'
  ] },
  learn: ['50% necesidades, 30% deseos, 20% futuro como punto de partida.', 'Se puede adaptar a tu realidad.', 'Siempre debe haber una parte para tu futuro.'],
  q: [
    ['En la regla 50/30/20, ¿para qué es el 20%?', ['Para gustos', 'Para ahorro y pago extra de deudas', 'Para el arriendo'], 1, 'El 20% es para tu futuro: ahorro y abonos extra.'],
    ['Con un ingreso de $2.000.000, ¿cuánto iría a necesidades?', ['$600.000', '$1.000.000', '$400.000'], 1, 'El 50% de $2.000.000 es $1.000.000.'],
    ['Si tus necesidades pasan del 50%, ¿qué conviene?', ['Abandonar el presupuesto', 'Adaptar los porcentajes sin dejar de ahorrar algo', 'Endeudarse para cumplir la regla'], 1, 'La regla es una guía; lo clave es mantener una parte para el futuro.'],
    ['¿Cuál de estos va en el 30% de deseos?', ['Servicios públicos', 'Salidas a comer', 'Cuota mínima de una deuda'], 1, 'Las salidas mejoran tu vida pero no son indispensables.']
  ] },

{ id: 'sobres', level: 'm2', min: 3, title: 'El método de los sobres',
  body: [
    'Antes, mucha gente repartía el sueldo en sobres de papel: uno para el mercado, otro para el transporte, otro para salidas. Cuando un sobre se vaciaba, se acababa ese gasto del mes.',
    'Funciona porque pone **límites visibles**. En esta app lo haces en **Plan › Presupuesto**: le pones un límite a cada categoría y te avisa al 80% y cuando te pasas.',
    'Si un sobre se vacía antes de tiempo, tienes dos opciones honestas: esperar al otro mes o **mover plata de otro sobre** que tenga espacio. Lo que no vale es sacar de la tarjeta.'
  ],
  example: { title: 'Los sobres de Don Jorge', text: [
    'Don Jorge es taxista y le pagan a diario. Cada noche separa en sobres: gasolina, casa, cuota del carro y ahorro. Lo que queda es para sus gastos personales.',
    'Hace dos años vivía con el agua al cuello. Hoy dice que los sobres le enseñaron que "la plata de la gasolina no se toca para otra cosa".'
  ] },
  learn: ['Los sobres ponen un límite claro a cada tipo de gasto.', 'Si un sobre se acaba, espera o mueve plata de otro, no de la tarjeta.', 'Empieza con 4 o 5 sobres.'],
  q: [
    ['¿Por qué funciona el método de los sobres?', ['Porque pone límites visibles a cada gasto', 'Porque te da más plata', 'Porque elimina los gastos fijos'], 0, 'Ver cuánto queda en cada sobre te ayuda a frenar a tiempo.'],
    ['Si el sobre de salidas se acaba a mitad de mes, ¿qué es lo más sano?', ['Usar la tarjeta de crédito', 'Esperar o mover plata de otro sobre con espacio', 'Pedir prestado a un amigo'], 1, 'Así respetas tu plan sin generar deuda.'],
    ['¿Dónde puedes crear tus sobres en esta app?', ['En Plan › Presupuesto', 'En Aprende › Glosario', 'En Ajustes'], 0, 'Allí le pones el límite a cada categoría.'],
    ['¿Qué aprendió Don Jorge?', ['Que la plata de un sobre no se usa para otra cosa', 'Que es mejor no separar nada', 'Que hay que pagar todo con tarjeta'], 0, 'Respetar cada sobre le dio orden y tranquilidad.']
  ] },

{ id: 'variables', level: 'm2', min: 3, title: 'Si tus ingresos cambian cada mes',
  body: [
    'Conductores, vendedores, independientes y quienes viven de comisiones tienen meses buenos y meses flojos. El error más común es **gastar como si todos los meses fueran buenos**.',
    'La clave: haz tu presupuesto con el **ingreso de un mes flojo** (tu "sueldo base"). Mira tus últimos 3 a 6 meses y toma el más bajo.',
    'Lo que ganes por encima del sueldo base va a un **colchón de ingresos**, que te cubre los meses malos, y a tus metas. Cuando el colchón cubra uno o dos meses de gastos, podrás dormir tranquilo aunque el trabajo baje.'
  ],
  example: { title: 'La temporada de Mauricio', text: [
    'Mauricio es guía de turismo. En diciembre y en vacaciones gana $4.500.000, pero en marzo apenas $1.800.000. Antes gastaba a lo grande en temporada alta y en marzo se endeudaba.',
    'Ahora vive con $1.800.000 todo el año. En temporada separa la diferencia: una parte al colchón y otra a su meta de comprar carro. Marzo ya no le da miedo.'
  ] },
  learn: ['Presupuesta con el ingreso de un mes flojo.', 'Lo que ganes de más va a un colchón y a tus metas.', 'El colchón te protege de endeudarte en temporada baja.'],
  q: [
    ['¿Cuál es el error más común con ingresos variables?', ['Ahorrar demasiado', 'Gastar como si todos los meses fueran buenos', 'Anotar los gastos'], 1, 'Los meses malos llegan y sin colchón terminan en deuda.'],
    ['¿Qué es el "sueldo base"?', ['El ingreso del mejor mes', 'El ingreso de un mes flojo, con el que haces el presupuesto', 'El salario mínimo'], 1, 'Presupuestar con el mes bajo te protege.'],
    ['¿Qué haces con lo que ganas por encima del sueldo base?', ['Gastarlo en el mismo mes', 'Llevarlo a un colchón y a tus metas', 'Pagar solo gustos'], 1, 'Así los meses buenos financian los malos.'],
    ['¿Qué logró Mauricio?', ['Dejar de trabajar en temporada', 'Que los meses flojos ya no lo endeuden', 'Ganar lo mismo todos los meses'], 1, 'Vivir con su sueldo base y ahorrar la diferencia lo estabilizó.']
  ] },

{ id: 'hormiga', level: 'm2', min: 3, title: 'Gastos hormiga y compras impulsivas',
  body: [
    'Los **gastos hormiga** son pequeños y frecuentes: mecato, gaseosa, café, recargas, "un domicilio solo por hoy". Uno solo no se siente, pero $8.000 diarios son **$240.000 al mes** y casi **$2.900.000 al año**.',
    'Las **compras impulsivas** son las que no estaban en tu plan. Las tiendas y las redes están diseñadas para provocarlas: "últimas unidades", "pague en cuotas", "envío gratis hoy".',
    'Dos herramientas: la **regla de las 48 horas** (espera dos días antes de una compra no planeada) y la pregunta **¿cuántas horas de trabajo me cuesta?** Si ganas $10.000 la hora, unos tenis de $300.000 son 30 horas de tu vida.'
  ],
  example: { title: 'El carrito de Laura', text: [
    'Laura dejaba productos en el carrito de una tienda en línea y los compraba en la noche, cuando estaba cansada. Empezó a cerrar la app y esperar dos días.',
    'En un mes, de 9 cosas que guardó en el carrito solo compró 2. Se ahorró $380.000 y no extrañó ninguna de las otras siete.'
  ] },
  learn: ['Los gastos pequeños y frecuentes suman muchísimo.', 'Espera 48 horas antes de comprar algo que no estaba en tu plan.', 'Mide los precios en horas de tu trabajo.'],
  q: [
    ['$8.000 diarios en gastos hormiga, ¿cuánto suman al mes?', ['$24.000', '$240.000', '$80.000'], 1, '$8.000 × 30 días = $240.000.'],
    ['¿Qué dice la regla de las 48 horas?', ['Comprar en las primeras 48 horas de una oferta', 'Esperar dos días antes de una compra no planeada', 'Pagar en 48 cuotas'], 1, 'El tiempo enfría el impulso y te deja decidir con calma.'],
    ['Si ganas $10.000 la hora, ¿cuántas horas te cuesta algo de $300.000?', ['3 horas', '30 horas', '300 horas'], 1, '$300.000 ÷ $10.000 = 30 horas de trabajo.'],
    ['¿Qué frase es típica de una compra impulsiva provocada?', ['"Está en mi presupuesto del mes"', '"Últimas unidades, solo por hoy"', '"Lo planeé hace tres meses"'], 1, 'La urgencia artificial es la herramienta favorita para que compres sin pensar.']
  ] },

/* ================= Módulo 3 ================= */
{ id: 'pagate', level: 'm3', min: 3, title: 'Págate primero a ti',
  body: [
    'La mayoría ahorra "lo que sobre" a fin de mes. El problema es que casi nunca sobra: el gasto siempre se estira hasta ocupar toda la plata disponible.',
    'Dale la vuelta: **el día que te pagan, separa primero tu ahorro** y vive con el resto. Así el ahorro deja de depender de la fuerza de voluntad.',
    'Trucos que ayudan: ten el ahorro en un lugar distinto a la plata del día a día (un bolsillo en la app del banco o una cuenta aparte), **automatiza** una transferencia el día de pago y empieza con un porcentaje pequeño que puedas sostener.'
  ],
  example: { title: 'El 5% de Juliana', text: [
    'Juliana siempre decía que ahorraría "cuando ganara más". Empezó con el 5% de su sueldo: $85.000 que pasaba a un bolsillo apenas le llegaba el pago.',
    'Cada vez que le subían el sueldo, subía un punto el porcentaje. A los dos años ahorraba el 12% y tenía su fondo de emergencia completo.'
  ] },
  learn: ['Ahorra primero, gasta después.', 'Separa el ahorro en un lugar distinto y automatízalo.', 'Empieza pequeño y sube poco a poco.'],
  q: [
    ['¿Qué significa "págate primero a ti"?', ['Gastar en ti antes que en otros', 'Separar tu ahorro apenas recibes la plata', 'Pagar tus deudas al final'], 1, 'El ahorro sale primero; con el resto vives.'],
    ['¿Por qué falla "ahorrar lo que sobre"?', ['Porque el gasto se estira y casi nunca sobra', 'Porque los bancos no lo permiten', 'Porque es ilegal'], 0, 'Si no lo separas antes, la plata se va en el día a día.'],
    ['¿Qué ayuda a sostener el hábito?', ['Tener el ahorro en la misma cuenta del gasto diario', 'Automatizar la transferencia el día de pago', 'Ahorrar solo en diciembre'], 1, 'Lo automático no depende de acordarte ni de la voluntad.'],
    ['¿Cómo empezó Juliana?', ['Con el 30% de su sueldo', 'Con un 5% y lo subió poco a poco', 'Esperando a ganar más'], 1, 'Empezar pequeño y aumentar es más fácil de sostener.']
  ] },

{ id: 'emergencia', level: 'm3', min: 3, title: 'Tu fondo de emergencia',
  body: [
    'Es plata guardada **solo para imprevistos**: te quedas sin trabajo, se daña la moto, una urgencia médica. Sin ese colchón, cualquier imprevisto termina en deuda, y muchas veces en deuda cara.',
    'La meta recomendada es **entre 3 y 6 meses de tus gastos básicos**. Si eso suena imposible, ve por escalones: primero $500.000, luego un mes de gastos, luego tres.',
    'Debe estar en un lugar seguro y disponible rápido, pero no tan a la mano que lo gastes sin pensar. Y no es para el viaje ni para el celular nuevo: si lo usas, tu siguiente prioridad es **reponerlo**.'
  ],
  example: { title: 'La moto de Brayan', text: [
    'A Brayan, domiciliario, se le dañó el motor de la moto: $1.200.000 de arreglo y una semana sin trabajar. Un año antes eso lo habría llevado a un gota a gota.',
    'Esta vez tenía $2.000.000 en su fondo de emergencia. Pagó el arreglo, cubrió la semana y en cuatro meses volvió a llenar el fondo.'
  ] },
  learn: ['El fondo de emergencia evita que los imprevistos se vuelvan deudas.', 'Meta: de 3 a 6 meses de gastos básicos, por escalones.', 'Si lo usas, reponerlo es la prioridad.'],
  q: [
    ['¿Para qué es el fondo de emergencia?', ['Para vacaciones', 'Solo para imprevistos', 'Para comprar en promociones'], 1, 'Su única función es cubrir lo inesperado.'],
    ['¿Cuánto se recomienda tener?', ['Una semana de gastos', 'Entre 3 y 6 meses de gastos básicos', 'Lo mismo que tus deudas'], 1, 'Ese rango cubre la mayoría de imprevistos, como quedarse sin trabajo.'],
    ['Si la meta te parece imposible, ¿qué haces?', ['Rendirte', 'Ir por escalones: primero una cifra pequeña, luego un mes, luego tres', 'Pedir un préstamo para llenarlo'], 1, 'Cada escalón ya te protege más que nada.'],
    ['Si usas el fondo, ¿qué sigue?', ['Olvidarlo', 'Reponerlo como prioridad', 'Usarlo también para gustos'], 1, 'El siguiente imprevisto puede llegar pronto.']
  ] },

{ id: 'metas', level: 'm3', min: 3, title: 'Metas de ahorro que sí se cumplen',
  body: [
    '"Quiero ahorrar" no es una meta. "Quiero $1.500.000 para el viaje del 15 de diciembre" sí lo es. Una buena meta es **concreta, con un valor y con una fecha**.',
    'Con eso puedes calcular cuánto separar: divide lo que te falta entre las semanas o meses que quedan. Si faltan $1.200.000 y quedan 20 semanas, necesitas **$60.000 por semana**.',
    'Ponle nombre a cada meta y sepárala en su propio bolsillo. Ver el avance motiva. Y si la cuota no te cabe, mueve la fecha o el valor: mejor una meta ajustada que una abandonada.'
  ],
  example: { title: 'La moto de Stiven', text: [
    'Stiven quería "algún día" comprar moto. Lo volvió meta: cuota inicial de $3.000.000 en 10 meses. Eso eran $300.000 al mes.',
    'Creó la meta en la app, la separó en un bolsillo y cada vez que le entraba una propina grande la abonaba. La logró en 9 meses.'
  ] },
  learn: ['Una meta tiene nombre, valor y fecha.', 'Lo que falta ÷ el tiempo que queda = cuánto separar.', 'Si no te cabe, ajusta la fecha o el valor en lugar de abandonarla.'],
  q: [
    ['¿Cuál de estas es una meta bien planteada?', ['"Quiero ahorrar más"', '"Quiero $1.500.000 para el 15 de diciembre"', '"Algún día compraré moto"'], 1, 'Tiene un valor y una fecha, así puedes planear.'],
    ['Si te faltan $1.200.000 y quedan 20 semanas, ¿cuánto separas por semana?', ['$6.000', '$60.000', '$600.000'], 1, '$1.200.000 ÷ 20 = $60.000.'],
    ['Si la cuota de la meta no te cabe, ¿qué conviene?', ['Abandonarla', 'Ajustar la fecha o el valor', 'Pedir un préstamo'], 1, 'Una meta realista se cumple; una imposible se abandona.'],
    ['¿Qué ayuda a mantener la motivación?', ['Tener la meta separada y ver su avance', 'No mirar nunca el ahorro', 'Mezclarla con la plata del día a día'], 0, 'Ver el progreso refuerza el hábito.']
  ] },

{ id: 'donde', level: 'm3', min: 4, title: 'Dónde guardar tus ahorros',
  body: [
    'Debajo del colchón tu plata corre riesgo de robo y pierde valor por la **inflación**. Lo mejor es guardarla en una entidad financiera formal.',
    'Opciones comunes: **cuentas de ahorro y bolsillos** en apps de bancos (sacas la plata cuando quieras, ideal para el fondo de emergencia) y **CDT** (dejas la plata quieta un tiempo fijo a cambio de una mejor tasa, ideal para metas con fecha).',
    'Antes de elegir: verifica que la entidad esté **vigilada por la Superintendencia Financiera**, compara la **tasa EA**, revisa las cuotas de manejo y ten en cuenta el **4x1000**, que puedes evitar en una cuenta marcada como exenta hasta cierto monto mensual. Los depósitos en bancos vigilados tienen además un seguro de Fogafín hasta un monto máximo por persona.'
  ],
  example: { title: 'Los dos bolsillos de Natalia', text: [
    'Natalia tenía $3.000.000 en efectivo guardados en un cajón. Los separó: $2.000.000 del fondo de emergencia en una cuenta de ahorros con buena tasa y $1.000.000 de su meta de diciembre en un CDT a 6 meses.',
    'La plata quedó segura, empezó a rendir y ya no se la "prestaba a sí misma" para gastos del día.'
  ] },
  learn: ['La plata quieta en casa corre riesgo y pierde valor.', 'Emergencias en algo disponible; metas con fecha en un CDT.', 'Verifica que la entidad esté vigilada y compara la tasa EA.'],
  q: [
    ['¿Por qué no conviene guardar ahorros en efectivo en la casa?', ['Por riesgo de robo y porque pierden valor con la inflación', 'Porque es ilegal', 'Porque los bancos lo prohíben'], 0, 'Además de inseguro, la plata quieta pierde poder de compra.'],
    ['¿Dónde conviene el fondo de emergencia?', ['En un CDT a 5 años', 'En algo que puedas sacar rápido, como una cuenta o bolsillo', 'En una inversión de alto riesgo'], 1, 'Una emergencia no espera a que se venza un plazo.'],
    ['¿Qué debes verificar antes de abrir un ahorro?', ['Que la entidad esté vigilada por la Superintendencia Financiera', 'Que tenga mucha publicidad', 'Que prometa duplicar tu plata'], 0, 'La vigilancia y el seguro de depósitos protegen tu plata.'],
    ['¿Para qué sirve un CDT?', ['Para sacar plata todos los días', 'Para dejar la plata quieta un tiempo fijo a cambio de una mejor tasa', 'Para pedir prestado'], 1, 'Es ideal para metas que tienen fecha.']
  ] },

/* ================= Módulo 4 ================= */
{ id: 'interes', level: 'm4', min: 4, title: 'Cómo funciona el interés',
  body: [
    'El interés es **el precio de usar plata que no es tuya**. Cuando te prestan, pagas interés; cuando ahorras, te pagan interés.',
    'En Colombia verás dos formas de expresarlo: **tasa mensual (MV)** y **tasa efectiva anual (EA)**. Un 2% mensual parece poquito, pero equivale a cerca de **26,8% EA**. Un 5% mensual ya es casi **80% EA**. Para comparar, usa siempre la EA.',
    'Antes de firmar un crédito pregunta tres cosas: la **tasa EA**, el **valor total que vas a pagar** y si hay **seguros o cobros adicionales**. Una cuota baja no significa crédito barato: muchas veces solo significa que vas a pagar durante más tiempo. Existe además un límite legal, la **tasa de usura**, que ningún crédito puede superar.'
  ],
  example: { title: 'Dos ofertas para Óscar', text: [
    'A Óscar le ofrecieron $3.000.000 de dos formas: a 12 meses con cuota de $290.000, o a 36 meses con cuota de $125.000. La segunda parecía mejor.',
    'Hizo la cuenta del total: $3.480.000 contra $4.500.000. La cuota baja le costaba $1.020.000 más. Eligió la de 12 meses y ajustó su presupuesto.'
  ] },
  learn: ['El interés es el precio de usar plata ajena.', 'Compara créditos por la tasa EA y el total a pagar.', 'Cuota baja no es lo mismo que crédito barato.'],
  q: [
    ['¿Qué tasa sirve para comparar créditos?', ['La tasa mensual', 'La tasa efectiva anual (EA)', 'La que diga la publicidad'], 1, 'La EA incluye el efecto de los intereses sobre intereses en un año.'],
    ['Un 2% mensual equivale aproximadamente a…', ['24% EA', '26,8% EA', '2% EA'], 1, '(1,02)^12 − 1 ≈ 26,8%.'],
    ['¿Qué aprendió Óscar al comparar las dos ofertas?', ['Que la cuota más baja siempre es mejor', 'Que la cuota baja le costaba mucho más en total', 'Que no importa el plazo'], 1, 'A 36 meses pagaba $1.020.000 más.'],
    ['¿Qué es la tasa de usura?', ['El interés que paga tu cuenta de ahorros', 'El máximo interés que la ley permite cobrar', 'Un tipo de seguro'], 1, 'Ningún crédito legal puede cobrar más que esa tasa.']
  ] },

{ id: 'buenamala', level: 'm4', min: 3, title: 'Deuda que suma y deuda que resta',
  body: [
    'No todas las deudas son iguales. Una deuda **suma** cuando te ayuda a generar ingresos o a construir algo que vale más con el tiempo: estudiar algo con salida laboral, la herramienta de tu trabajo, tu vivienda.',
    'Una deuda **resta** cuando financia cosas que pierden valor o se consumen rápido: ropa, viajes, celulares de lujo, salidas, mercado de todos los meses. Cuando te das cuenta, sigues pagando algo que ya no tienes.',
    'Antes de endeudarte pregúntate: **¿esto me va a generar ingresos o a ahorrar plata en el futuro? ¿puedo pagar la cuota sin descuidar lo básico?** Y nunca pidas un crédito para pagar otro sin un plan claro.'
  ],
  example: { title: 'Dos créditos de Diana', text: [
    'Diana sacó un crédito para un curso de diseño gráfico. Seis meses después ya tenía clientes y la cuota se pagaba sola.',
    'En diciembre usó la tarjeta para regalos y una fiesta: $1.800.000 a 24 cuotas. En marzo seguía pagando la fiesta de diciembre. Aprendió la diferencia.'
  ] },
  learn: ['Deuda que suma: te genera ingresos o construye valor.', 'Deuda que resta: financia consumo que se acaba rápido.', 'Pregunta siempre si la cuota cabe sin sacrificar lo básico.'],
  q: [
    ['¿Cuál de estas es una deuda que suma?', ['Un crédito para un viaje', 'Un crédito para una herramienta de trabajo', 'La tarjeta para salidas'], 1, 'La herramienta te ayuda a generar ingresos.'],
    ['¿Por qué la deuda de consumo suele restar?', ['Porque financia cosas que pierden valor o se acaban rápido', 'Porque es ilegal', 'Porque no cobra intereses'], 0, 'Terminas pagando algo que ya no tienes.'],
    ['¿Qué deberías preguntarte antes de endeudarte?', ['Si te lo aprueban rápido', 'Si te genera ingresos y si la cuota cabe sin descuidar lo básico', 'Si tus amigos tienen lo mismo'], 1, 'Esas dos preguntas evitan la mayoría de malas deudas.'],
    ['¿Qué pasó con la fiesta de Diana?', ['La pagó de contado', 'Siguió pagándola meses después', 'Le generó ingresos'], 1, 'Financiar consumo a muchas cuotas alarga el costo.']
  ] },

{ id: 'tarjeta', level: 'm4', min: 4, title: 'La tarjeta de crédito sin sustos',
  body: [
    'La tarjeta de crédito es un préstamo que usas cuando quieres. Bien usada da comodidad y construye historial. Mal usada es una de las deudas más caras.',
    'Reglas de oro: compra a **1 cuota** solo lo que puedes pagar completo el mes siguiente (en muchas tarjetas así no pagas interés), **nunca saques avances** en efectivo (suelen ser lo más caro), revisa la **cuota de manejo** y paga antes de la fecha límite.',
    'La gran trampa es el **pago mínimo**: si solo pagas eso, casi todo se va en intereses y la deuda casi no baja. Si ya tienes deuda en la tarjeta, **deja de usarla mientras la pagas**.'
  ],
  example: { title: 'El mínimo de Johana', text: [
    'Johana debía $3.000.000 en la tarjeta y pagaba el mínimo, unos $150.000. Al revisar el extracto vio que casi $80.000 eran intereses: la deuda bajaba apenas $70.000 al mes.',
    'Guardó la tarjeta en un cajón, subió el pago a $350.000 con lo que recortó de domicilios y en 10 meses la dejó en cero.'
  ] },
  learn: ['Usa 1 cuota solo si lo pagas completo al mes siguiente.', 'Evita los avances y el pago mínimo.', 'Si ya debes, deja de usarla mientras la pagas.'],
  q: [
    ['¿Qué pasa si solo pagas el mínimo?', ['La deuda baja rápido', 'Casi todo se va en intereses y la deuda casi no baja', 'No pagas intereses'], 1, 'Como le pasó a Johana: de $150.000 solo $70.000 bajaban la deuda.'],
    ['¿Qué uso de la tarjeta suele ser el más caro?', ['Compras a 1 cuota pagadas completas', 'Avances en efectivo', 'Pagar antes de la fecha límite'], 1, 'Los avances cobran intereses desde el primer día y comisiones.'],
    ['¿Cuándo conviene comprar a 1 cuota?', ['Cuando puedes pagarlo completo el mes siguiente', 'Siempre, sin importar el valor', 'Cuando no tienes plata'], 0, 'Así aprovechas la comodidad sin pagar intereses.'],
    ['Si ya tienes deuda en la tarjeta, ¿qué conviene?', ['Seguir usándola normal', 'Dejar de usarla mientras la pagas', 'Sacar otra tarjeta'], 1, 'No sirve sacar agua del bote mientras sigue entrando.']
  ] },

{ id: 'estrategias', level: 'm4', min: 4, title: 'Bola de nieve o avalancha',
  body: [
    'Si tienes varias deudas, el método es: **paga la cuota mínima de todas y pon toda la plata extra en una sola**. Cuando la terminas, esa cuota se suma a la siguiente. Así el pago crece y las deudas caen una tras otra.',
    '¿Cuál atacar primero? **Bola de nieve:** la de menor saldo. Ves resultados rápido y te motivas. **Avalancha:** la de mayor interés. Pagas menos intereses en total.',
    'Las dos funcionan; la mejor es la que vas a sostener. Cualquier plata extra (prima, ventas, un regalo) va a la deuda que estás atacando. En **Plan › Deudas** puedes ver la fecha en que quedas libre con cada estrategia.'
  ],
  example: { title: 'Las tres deudas de Carolina', text: [
    'Carolina debía $400.000 a una amiga, $2.500.000 en la tarjeta al 2,2% mensual y $5.000.000 de un crédito al 1,4%. Eligió bola de nieve: primero la amiga, para sentir avance.',
    'En dos meses la pagó y sumó esos $100.000 a la tarjeta. Cuando terminó la tarjeta, todo fue al crédito. Salió de todo cuatro meses antes de lo que habría tardado pagando solo mínimos.'
  ] },
  learn: ['Mínimos a todas y lo extra a una sola deuda.', 'Bola de nieve: la más pequeña. Avalancha: la más cara.', 'La mejor estrategia es la que vas a sostener.'],
  q: [
    ['¿En qué consiste el método general?', ['Pagar un poco extra a todas por igual', 'Pagar el mínimo de todas y poner lo extra en una sola', 'Pagar solo la más nueva'], 1, 'Concentrar el pago extra acelera cada deuda.'],
    ['En la avalancha, ¿qué deuda va primero?', ['La de mayor interés', 'La de menor saldo', 'La más reciente'], 0, 'Así pagas menos intereses en total.'],
    ['En la bola de nieve, ¿qué deuda va primero?', ['La de mayor saldo', 'La de menor saldo', 'La de mayor interés'], 1, 'Terminarla rápido te motiva a seguir.'],
    ['Cuando terminas una deuda, ¿qué haces con esa cuota?', ['La gastas en gustos', 'La sumas a la siguiente deuda', 'La dejas de pagar'], 1, 'Así el pago crece como una bola de nieve.']
  ] },

{ id: 'gota', level: 'm4', min: 3, title: 'El gota a gota y los préstamos informales',
  body: [
    'El gota a gota parece fácil: te prestan sin papeles y pagas a diario. Pero un préstamo con 20% de interés al mes equivale a **más de 790% efectivo anual**, muchísimo más de lo que la ley permite cobrar.',
    'Además es informal: no hay contrato claro, no te protege ninguna entidad y el cobro puede volverse intimidante. Lo mismo aplica para apps de préstamos que no están vigiladas y te piden acceso a tus contactos.',
    'Si estás en uno, **sal de él antes que de cualquier otra deuda**. Si necesitas plata urgente, busca primero opciones formales: fondo de empleados, cooperativa, microcréditos de entidades vigiladas o negociar el pago con quien le debes. Y si te amenazan, busca ayuda y denuncia.'
  ],
  example: { title: 'Los $500.000 de Wilson', text: [
    'Wilson pidió $500.000 a un gota a gota para pagar el arriendo: $25.000 diarios durante 24 días. Al final pagó $600.000. Al mes siguiente le faltaba otra vez y volvió a pedir.',
    'En seis meses había pagado más de $600.000 solo en intereses. Rompió el ciclo con un microcrédito de una cooperativa y empezando su fondo de emergencia con $10.000 diarios.'
  ] },
  learn: ['El gota a gota cuesta muchas veces más que un crédito formal.', 'Es informal y riesgoso, igual que las apps de préstamos no vigiladas.', 'Si estás en uno, es tu primera deuda a eliminar.'],
  q: [
    ['Un préstamo al 20% mensual equivale aproximadamente a…', ['20% anual', '240% anual', 'Más de 790% efectivo anual'], 2, 'El interés sobre interés lo dispara: (1,2)^12 − 1 ≈ 792%.'],
    ['¿Qué tienen en común el gota a gota y las apps de préstamos no vigiladas?', ['Son informales y no te protege ninguna entidad', 'Son más baratas que el banco', 'Están reguladas por la ley'], 0, 'Sin vigilancia no hay reglas que te protejan.'],
    ['Si tienes varias deudas y una es gota a gota, ¿cuál pagas primero?', ['La del banco', 'La del gota a gota', 'La más pequeña del banco'], 1, 'Es por lejos la más cara y riesgosa.'],
    ['¿Qué opción buscarías antes de un gota a gota?', ['Otro gota a gota', 'Fondo de empleados, cooperativa o microcrédito vigilado', 'Una app que pide acceso a tus contactos'], 1, 'Las opciones formales cobran mucho menos y tienen reglas claras.']
  ] },

{ id: 'historial', level: 'm4', min: 3, title: 'Tu historial crediticio',
  body: [
    'Cuando tienes créditos, las entidades reportan cómo pagas a las **centrales de riesgo** (como DataCrédito o TransUnion). Ese historial influye en si te prestan en el futuro y a qué tasa.',
    'Se construye **pagando a tiempo**, aunque sea poco, y usando el crédito con moderación. Un atraso de pocos días ya puede quedar registrado.',
    'Si te atrasaste, lo más importante es **ponerte al día**. Por ley el reporte negativo no es para siempre: dura el doble del tiempo que estuviste en mora, con un máximo de cuatro años contados desde que pagas. Puedes consultar tu historial gratis en las centrales de riesgo.'
  ],
  example: { title: 'El crédito de vivienda de Paola', text: [
    'Paola quería un crédito de vivienda, pero se lo negaron: tenía un reporte por una cuota de celular que dejó de pagar hace años. Ni se acordaba.',
    'Pagó la deuda, pidió el paz y salvo y durante un tiempo pagó todo a tiempo. Cuando volvió a solicitar, se lo aprobaron a una mejor tasa.'
  ] },
  learn: ['Tu forma de pagar queda registrada en las centrales de riesgo.', 'Pagar a tiempo construye un buen historial.', 'El reporte negativo tiene un tiempo máximo después de pagar.'],
  q: [
    ['¿Qué guardan las centrales de riesgo?', ['Tu historial de pagos de créditos', 'Tus contraseñas', 'Tu historial médico'], 0, 'Registran cómo cumples tus obligaciones de crédito.'],
    ['¿Cómo se construye un buen historial?', ['Sacando muchos créditos', 'Pagando a tiempo y usando el crédito con moderación', 'No pagando nunca'], 1, 'La puntualidad es lo que más pesa.'],
    ['Si te atrasaste, ¿qué es lo más importante?', ['Ponerte al día', 'Abrir otra tarjeta', 'Cambiar de número'], 0, 'Mientras sigas en mora, el reporte sigue empeorando.'],
    ['¿El reporte negativo dura para siempre?', ['Sí, nunca se borra', 'No, tiene un tiempo máximo después de pagar', 'Se borra al día siguiente de pagar'], 1, 'La ley fija un límite de permanencia después de pagar.']
  ] },

{ id: 'nopuedo', level: 'm4', min: 4, title: 'Si ya no puedes pagar',
  body: [
    'Le puede pasar a cualquiera: pierdes el trabajo, una enfermedad, un mal negocio. Lo peor que puedes hacer es **desaparecer**: los intereses de mora crecen, llegan los cobros y el reporte empeora.',
    'Lo mejor es **llamar a la entidad antes de caer en mora** y negociar. Muchas ofrecen ampliar el plazo, periodos de gracia, refinanciar o reestructurar la deuda. Pide siempre el acuerdo por escrito.',
    'Si tienes varias deudas que ya no puedes pagar, existe en Colombia un trámite de **insolvencia para personas naturales no comerciantes**, que se hace en centros de conciliación o notarías autorizadas para negociar con todos tus acreedores a la vez. Desconfía de "abogados" que te piden plata por adelantado para "borrar" deudas.'
  ],
  example: { title: 'La negociación de Hernán', text: [
    'Hernán quedó sin trabajo con dos créditos al día. Antes de atrasarse, llamó al banco, explicó su situación y le dieron tres meses de periodo de gracia y un plazo más largo.',
    'La cuota bajó de $520.000 a $310.000. Pagó intereses por el plazo extra, pero no cayó en mora ni dañó su historial mientras conseguía otro empleo.'
  ] },
  learn: ['No desaparezcas: negocia antes de caer en mora.', 'Pide alternativas como plazo, periodo de gracia o reestructuración, y todo por escrito.', 'Para casos graves existe la insolvencia de persona natural no comerciante.'],
  q: [
    ['¿Qué es lo peor cuando no puedes pagar?', ['Llamar al banco', 'Desaparecer y no contestar', 'Revisar tu presupuesto'], 1, 'La mora crece y el problema se hace más grande.'],
    ['¿Cuándo conviene negociar?', ['Antes de caer en mora', 'Solo después de un año de mora', 'Nunca'], 0, 'Negociar a tiempo te da más opciones y protege tu historial.'],
    ['¿Qué debes pedir al llegar a un acuerdo?', ['Que quede por escrito', 'Que sea solo verbal', 'Nada'], 0, 'El papel te protege si después hay diferencias.'],
    ['¿De qué desconfiar?', ['De quien te pide plata por adelantado para "borrar" tus deudas', 'De los centros de conciliación autorizados', 'De tu banco cuando te ofrece refinanciar'], 0, 'Nadie puede borrar una deuda por arte de magia.']
  ] },

/* ================= Módulo 5 ================= */
{ id: 'colilla', level: 'm5', min: 4, title: 'Entiende tu pago como empleado',
  body: [
    'Si eres empleado, tu sueldo tiene partes. Del salario te descuentan el **4% para salud** y el **4% para pensión**; el empleador aporta su parte por aparte. Si ganas hasta dos salarios mínimos, recibes además el **auxilio de transporte**.',
    'Revisa tu colilla o desprendible de pago cada mes: que el salario sea el pactado, que las horas extra y los recargos estén bien liquidados y que no haya descuentos que no autorizaste.',
    'Revisa también que te estén **afiliando y pagando** salud y pensión: puedes consultarlo en tu EPS y en tu fondo de pensiones. Si algo no cuadra, pregunta a recursos humanos.'
  ],
  example: { title: 'Las horas extra de Yeison', text: [
    'Yeison trabajaba turnos de noche y algunos domingos. Un compañero le sugirió revisar la colilla y vio que le pagaban las horas nocturnas como diurnas.',
    'Habló con recursos humanos con sus horarios anotados. Le corrigieron la liquidación y le pagaron lo atrasado: casi $400.000.'
  ] },
  learn: ['Al empleado le descuentan 4% de salud y 4% de pensión.', 'Revisa tu colilla: salario, horas extra, recargos y descuentos.', 'Verifica que te estén pagando salud y pensión.'],
  q: [
    ['¿Qué porcentajes se descuentan al empleado?', ['4% salud y 4% pensión', '10% salud y 10% pensión', 'Nada'], 0, 'Son los aportes a cargo del trabajador; el empleador paga su parte.'],
    ['¿Quién recibe auxilio de transporte?', ['Todos los empleados', 'Quienes ganan hasta dos salarios mínimos', 'Solo los conductores'], 1, 'Es para quienes ganan hasta dos salarios mínimos.'],
    ['¿Qué revisar en tu colilla?', ['Solo el valor final', 'Salario, horas extra, recargos y descuentos', 'Nada, siempre está bien'], 1, 'Los errores pasan, como le ocurrió a Yeison.'],
    ['¿Cómo verificas que te pagan la pensión?', ['Consultando en tu fondo de pensiones', 'Preguntando a un amigo', 'No se puede verificar'], 0, 'Tu historia laboral muestra cada aporte.']
  ] },

{ id: 'prima', level: 'm5', min: 4, title: 'Prima, cesantías y vacaciones',
  body: [
    'Los empleados reciben pagos extra que pueden cambiar sus finanzas si se usan bien. La **prima de servicios** equivale a un mes de salario al año, pagada en dos partes: a mitad y a final de año.',
    'Las **cesantías** son un mes de salario por año que el empleador consigna en un fondo antes del 14 de febrero; además te pagan **intereses sobre las cesantías** del 12% anual. Puedes retirarlas para vivienda, estudio o si te quedas sin trabajo. Las **vacaciones** son 15 días hábiles pagados por año.',
    'La trampa es tratar la prima como "plata para gastar". Una regla útil: divídela en tres partes, **una para deudas o ahorro, una para metas y una para disfrutar**.'
  ],
  example: { title: 'La prima de Adriana', text: [
    'Cada diciembre la prima de Adriana se le iba en regalos y salidas, y en enero empezaba con deudas. Este año dividió $1.000.000 en tres: $400.000 a la tarjeta, $300.000 a su meta de estudio y $300.000 para disfrutar.',
    'Llegó a enero sin deudas nuevas y con su meta avanzada, y aun así disfrutó diciembre.'
  ] },
  learn: ['Prima: un mes de salario al año, en dos pagos.', 'Cesantías: un mes por año en un fondo, más 12% de intereses.', 'Divide los pagos extra entre deudas o ahorro, metas y disfrute.'],
  q: [
    ['¿Cuánto equivale la prima de servicios al año?', ['Una semana de salario', 'Un mes de salario, en dos pagos', 'Dos meses de salario'], 1, 'Se paga en dos partes a lo largo del año.'],
    ['¿Para qué se pueden retirar las cesantías?', ['Para vivienda, estudio o si te quedas sin trabajo', 'Solo para viajes', 'No se pueden retirar nunca'], 0, 'Esos son los usos principales que permite la ley.'],
    ['¿Cuántos días de vacaciones pagadas tiene un empleado por año?', ['5 días hábiles', '15 días hábiles', '30 días hábiles'], 1, 'Son 15 días hábiles por cada año trabajado.'],
    ['¿Qué hizo Adriana con su prima?', ['La gastó toda en diciembre', 'La dividió entre deuda, meta y disfrute', 'La dejó en efectivo en la casa'], 1, 'Así avanzó sin dejar de disfrutar.']
  ] },

{ id: 'independiente', level: 'm5', min: 4, title: 'Si trabajas por tu cuenta',
  body: [
    'Si eres independiente, nadie te descuenta nada, pero tampoco nadie te paga prima ni cesantías ni te aporta a seguridad social. **Tú eres tu propio empleador.**',
    'Como independiente debes aportar a **salud y pensión** sobre una base que, en general, es el 40% de lo que ganas. Inclúyelo en tu presupuesto como un gasto fijo, igual que el arriendo.',
    'Tres hábitos clave: **separa la plata del negocio de la personal** (cuentas distintas), **págate un sueldo fijo** desde el negocio y **crea tu propia prima**: aparta cada mes un porcentaje para vacaciones, imprevistos y, si aplica, impuestos.'
  ],
  example: { title: 'El negocio de jugos de Marta', text: [
    'Marta vende jugos naturales. Usaba la misma cuenta para todo y nunca sabía si ganaba o perdía. Abrió una cuenta para el negocio y empezó a pagarse $1.500.000 fijos al mes.',
    'Descubrió que en temporada de lluvias el negocio apenas cubría costos. Con esa información ajustó precios y creó un colchón para esos meses.'
  ] },
  learn: ['El independiente es su propio empleador.', 'Aporta a salud y pensión y tenlo como gasto fijo.', 'Separa cuentas, págate un sueldo y crea tu propia prima.'],
  q: [
    ['Como independiente, ¿quién aporta tu seguridad social?', ['Tu cliente principal', 'Tú mismo', 'Nadie, no es necesario'], 1, 'No tienes empleador que lo haga por ti.'],
    ['¿Por qué separar la plata del negocio de la personal?', ['Para saber si el negocio realmente gana', 'Porque es más bonito', 'Para pagar más impuestos'], 0, 'Mezclarlas impide saber cuánto ganas de verdad.'],
    ['¿Qué significa "págate un sueldo fijo"?', ['Sacar del negocio lo que necesites cada día', 'Sacar un valor fijo mensual del negocio para tus gastos personales', 'No sacar nada'], 1, 'Así tu vida personal no depende de las ventas de cada día.'],
    ['¿Qué es "crear tu propia prima"?', ['Pedir prima a tus clientes', 'Apartar cada mes un porcentaje para vacaciones, imprevistos e impuestos', 'Gastar todo en diciembre'], 1, 'Reemplazas los beneficios que un empleado sí recibe.']
  ] },

{ id: 'ingresos', level: 'm5', min: 3, title: 'Cómo aumentar tus ingresos',
  body: [
    'Recortar gastos tiene un límite; ganar más, no tanto. Hay tres caminos: **mejorar en tu trabajo actual** (pedir aumento con argumentos, asumir más responsabilidades), **aprender una habilidad que pague mejor** y **crear un ingreso extra**.',
    'Para un ingreso extra, empieza por lo que ya sabes hacer o tienes a la mano: un oficio, vender algo, servicios en tu tiempo libre. Empieza pequeño, prueba si hay clientes y luego crece.',
    'La regla de oro: **cuando tus ingresos suban, no subas tus gastos al mismo ritmo**. Si cada aumento se va en un nivel de vida más alto, seguirás igual de apretado pero con cosas más caras.'
  ],
  example: { title: 'Las mañanas libres de Haider', text: [
    'Haider trabaja en las tardes y tenía las mañanas libres. Aprendió a editar videos con cursos gratuitos y empezó a hacerle contenido a dos negocios del barrio.',
    'Hoy gana $800.000 extra al mes. Decidió vivir con lo mismo de antes y mandar todo el extra a su deuda y a su ahorro. En un año salió de deudas.'
  ] },
  learn: ['Ganar más complementa a gastar menos.', 'Empieza un ingreso extra con lo que ya sabes o tienes.', 'Cuando ganes más, no subas tus gastos al mismo ritmo.'],
  q: [
    ['¿Cuál NO es un camino para aumentar ingresos?', ['Aprender una habilidad mejor pagada', 'Gastar más para aparentar éxito', 'Crear un ingreso extra'], 1, 'Gastar más no aumenta tus ingresos.'],
    ['¿Cómo conviene empezar un ingreso extra?', ['Con una gran inversión desde el inicio', 'Pequeño, con lo que ya sabes o tienes, probando si hay clientes', 'Con un préstamo grande'], 1, 'Empezar pequeño reduce el riesgo.'],
    ['¿Qué pasa si cada aumento se va en un nivel de vida más alto?', ['Sigues igual de apretado', 'Te vuelves rico', 'Sales de deudas automáticamente'], 0, 'El gasto se ajusta al ingreso y no queda margen.'],
    ['¿Qué hizo Haider con su ingreso extra?', ['Lo gastó en salidas', 'Lo mandó a su deuda y ahorro', 'Compró un carro a crédito'], 1, 'Mantener su nivel de vida le permitió salir de deudas.']
  ] },

/* ================= Módulo 6 ================= */
{ id: 'seguros', level: 'm6', min: 4, title: 'Seguros: cuáles necesitas de verdad',
  body: [
    'Un seguro es pagar un valor pequeño y conocido para protegerte de una pérdida grande e inesperada. No todos son necesarios; algunos son obligatorios y otros dependen de tu situación.',
    'Lo básico: estar afiliado a **salud** (EPS) y, si tienes moto o carro, el **SOAT**, que es obligatorio y cubre la atención de las personas en un accidente. Un seguro de **vida** tiene sentido si otras personas dependen de tus ingresos.',
    'Cuidado con los seguros que te "pegan" a créditos o tarjetas: revisa si los necesitas y si ya tienes uno igual. Antes de firmar pregunta **qué cubre, qué no cubre, cuánto cuesta al año** y cómo se reclama.'
  ],
  example: { title: 'El accidente de Luisa', text: [
    'Luisa tuvo un accidente en moto. Como tenía el SOAT al día, la atención médica inicial quedó cubierta.',
    'Un compañero suyo, sin SOAT, además de las lesiones enfrentó una multa y la inmovilización de la moto. Desde ese día Luisa programa un recordatorio un mes antes del vencimiento.'
  ] },
  learn: ['Un seguro cambia una pérdida grande por un costo pequeño y conocido.', 'Salud y, si tienes vehículo, SOAT son lo básico.', 'Pregunta qué cubre, qué no y cuánto cuesta al año antes de firmar.'],
  q: [
    ['¿Qué hace un seguro?', ['Te da plata gratis', 'Te protege de una pérdida grande a cambio de un pago pequeño', 'Reemplaza tu ahorro'], 1, 'Pagas poco para no perder mucho de golpe.'],
    ['¿Qué seguro es obligatorio si tienes moto o carro?', ['El seguro de vida', 'El SOAT', 'El seguro de celular'], 1, 'El SOAT es obligatorio para circular.'],
    ['¿Cuándo tiene más sentido un seguro de vida?', ['Cuando otras personas dependen de tus ingresos', 'Siempre, sin excepción', 'Nunca'], 0, 'Protege a quienes dependen de ti si faltas.'],
    ['¿Qué preguntar antes de tomar un seguro?', ['Qué cubre, qué no, cuánto cuesta al año y cómo se reclama', 'Solo el color de la póliza', 'Nada'], 0, 'Así sabes si realmente te sirve.']
  ] },

{ id: 'estafas', level: 'm6', min: 4, title: 'Estafas y fraudes más comunes',
  body: [
    'Las estafas cambian, pero repiten patrones. **Inversiones milagrosas** que prometen ganancias altas y garantizadas, piden traer más personas o presionan para decidir ya. Colombia ya vivió casos de captación ilegal que dejaron a miles de familias sin su plata.',
    '**Préstamos falsos** que piden un pago por adelantado para "desembolsar". **Mensajes y llamadas** que se hacen pasar por tu banco para pedirte claves o códigos. **Ventas en redes** con precios demasiado buenos que piden pago anticipado.',
    'Reglas simples: si es demasiado bueno para ser verdad, probablemente no lo es. **Tu banco nunca te pide claves ni códigos.** Verifica que la entidad esté vigilada y nunca decidas con afán.'
  ],
  example: { title: 'El "préstamo aprobado" de Jhon', text: [
    'A Jhon le escribieron por WhatsApp: "Su préstamo de $5.000.000 está aprobado, solo pague $300.000 de estudio de crédito". Pagó, y después le pidieron $200.000 más "por el seguro".',
    'Nunca hubo préstamo. Una entidad formal descuenta sus costos del desembolso; no te pide plata antes de prestarte.'
  ] },
  learn: ['Ganancias altas y garantizadas son una señal de alerta.', 'Nadie legítimo te pide pagar antes de prestarte.', 'Tu banco nunca te pide claves ni códigos.'],
  q: [
    ['¿Cuál es una señal típica de una estafa de inversión?', ['Te explican los riesgos', 'Prometen ganancias altas y garantizadas y piden traer más personas', 'La entidad está vigilada'], 1, 'Las ganancias garantizadas y el reclutamiento son clásicos de las pirámides.'],
    ['Te aprueban un préstamo pero piden pagar antes del desembolso. ¿Qué es?', ['Un trámite normal', 'Una señal de estafa', 'Un beneficio'], 1, 'Una entidad formal no cobra por adelantado para prestarte.'],
    ['¿Tu banco te puede pedir tu clave por mensaje o llamada?', ['Sí, si es urgente', 'No, nunca', 'Solo en diciembre'], 1, 'Nunca compartas claves ni códigos con nadie.'],
    ['¿Qué hacer ante una oferta con mucho afán?', ['Decidir rápido para no perderla', 'Tomarte tu tiempo y verificar', 'Pagar de una vez'], 1, 'La presión es una herramienta del estafador.']
  ] },

{ id: 'digital', level: 'm6', min: 3, title: 'Cuida tu plata en el celular',
  body: [
    'Hoy la plata vive en el celular: Nequi, Daviplata, apps de bancos. Eso es cómodo, pero exige cuidado. La mayoría de robos digitales no "hackean" nada: **engañan a la persona** para que entregue sus datos.',
    'Básicos: usa **clave o huella** en el celular y en cada app, activa la **doble verificación**, no abras enlaces que llegan por mensaje (entra siempre desde la app oficial) y no uses redes wifi públicas para hacer transacciones.',
    'Si te roban el celular, **bloquea tus cuentas de inmediato** llamando a tus bancos y pide el bloqueo de la SIM a tu operador. Ten anotados esos números en un lugar distinto al celular.'
  ],
  example: { title: 'El enlace de Sandra', text: [
    'A Sandra le llegó un mensaje: "Su cuenta será bloqueada, actualice sus datos aquí". El enlace llevaba a una página idéntica a la de su banco. Puso su usuario y clave, y en minutos le sacaron $900.000.',
    'Ahora nunca entra desde enlaces: abre la app del banco directamente y, si tiene dudas, llama a la línea oficial.'
  ] },
  learn: ['La mayoría de robos digitales son engaños, no hackeos.', 'Clave, huella, doble verificación y nunca enlaces por mensaje.', 'Si te roban el celular, bloquea cuentas y SIM de inmediato.'],
  q: [
    ['¿Cómo ocurren la mayoría de robos digitales?', ['Engañando a la persona para que entregue sus datos', 'Por fallas de los bancos', 'Por usar huella'], 0, 'El eslabón débil suele ser el engaño.'],
    ['¿Cuál es la forma segura de entrar a tu banco?', ['Desde un enlace que llega por mensaje', 'Desde la app oficial', 'Desde un wifi público'], 1, 'Los enlaces pueden llevar a páginas falsas.'],
    ['¿Qué haces si te roban el celular?', ['Esperar unos días', 'Bloquear tus cuentas y la SIM de inmediato', 'Nada'], 1, 'Cada minuto cuenta.'],
    ['¿Qué protección extra conviene activar?', ['La doble verificación', 'Compartir tu clave con un familiar', 'Desactivar la clave del celular'], 0, 'Agrega una barrera aunque alguien conozca tu clave.']
  ] },

/* ================= Módulo 7 ================= */
{ id: 'inflacion', level: 'm7', min: 3, title: 'Inflación: por qué la plata quieta pierde valor',
  body: [
    'La **inflación** es la subida general de los precios. Si un año la inflación es del 8%, lo que costaba $100.000 pasa a costar cerca de $108.000. Tu billete de $100.000 sigue siendo el mismo, pero compra menos.',
    'Por eso la plata guardada sin rendimiento **pierde poder de compra** con el tiempo. Para que tu ahorro no se encoja, necesitas que rinda al menos lo mismo que la inflación.',
    'La inflación también importa para tu sueldo: si tu ingreso sube menos que los precios, en realidad estás ganando menos. Tenlo en cuenta al negociar un aumento o al fijar tus precios si eres independiente.'
  ],
  example: { title: 'Los ahorros de la abuela Rosa', text: [
    'La abuela Rosa guardó $1.000.000 en efectivo hace diez años "para una emergencia". Hoy, con lo que ha subido todo, ese millón compra mucho menos mercado que cuando lo guardó.',
    'Su nieta le ayudó a pasar el ahorro a una cuenta que paga intereses. No la hace rica, pero ahora el ahorro no se encoge año tras año.'
  ] },
  learn: ['La inflación es la subida general de los precios.', 'La plata quieta pierde poder de compra.', 'Tu ahorro y tu sueldo deberían crecer al menos al ritmo de la inflación.'],
  q: [
    ['¿Qué es la inflación?', ['La subida general de los precios', 'Un impuesto', 'Un tipo de crédito'], 0, 'Hace que con la misma plata compres menos.'],
    ['Con una inflación del 8%, algo de $100.000 costará cerca de…', ['$92.000', '$108.000', '$180.000'], 1, '$100.000 × 1,08 = $108.000.'],
    ['¿Qué le pasa a la plata guardada sin rendimiento?', ['Gana valor', 'Pierde poder de compra', 'Se queda igual en todo sentido'], 1, 'El billete es el mismo, pero compra menos.'],
    ['Si tu sueldo sube menos que la inflación…', ['En realidad estás ganando menos', 'Estás ganando más', 'No cambia nada'], 0, 'Lo que puedes comprar con tu sueldo disminuye.']
  ] },

{ id: 'compuesto', level: 'm7', min: 3, title: 'El interés compuesto',
  body: [
    'Es ganar intereses **sobre los intereses**. Si ahorras $200.000 al mes durante 10 años al 10% EA, no tienes $24.000.000: tienes **cerca de $40.000.000**.',
    'El ingrediente más poderoso es el **tiempo**. Quien empieza joven con poquito suele terminar con más que quien empieza tarde con más plata.',
    'El interés compuesto también funciona **en tu contra** en las deudas: los intereses que no pagas se suman y generan más intereses. Por eso las deudas caras crecen tan rápido.'
  ],
  example: { title: 'Dos hermanas', text: [
    'Ana empezó a ahorrar $100.000 al mes a los 22 años y paró a los 32. Su hermana Lucía empezó a los 32 con la misma cuota y siguió hasta los 52. Las dos recibieron el mismo rendimiento.',
    'Ana puso la mitad de la plata que Lucía, pero como empezó diez años antes, a los 52 años tenía más. El tiempo hizo la mayor parte del trabajo.'
  ] },
  learn: ['Interés compuesto: intereses sobre intereses.', 'El tiempo es el ingrediente más poderoso: empieza ya.', 'En las deudas, el interés compuesto juega en tu contra.'],
  q: [
    ['¿Qué es el interés compuesto?', ['Ganar intereses sobre los intereses', 'Un interés que solo cobran los bancos', 'Un descuento'], 0, 'Los intereses se suman y generan más intereses.'],
    ['¿Cuál es su ingrediente más importante?', ['La suerte', 'El tiempo', 'Tener mucha plata al inicio'], 1, 'Mientras más tiempo, más crece.'],
    ['¿Por qué Ana terminó con más que Lucía?', ['Porque ahorró más plata', 'Porque empezó diez años antes', 'Porque tuvo mejor rendimiento'], 1, 'Con el mismo rendimiento, empezar antes ganó.'],
    ['¿Cómo afecta el interés compuesto a las deudas?', ['Las hace crecer más rápido', 'Las reduce solas', 'No las afecta'], 0, 'Los intereses no pagados también generan intereses.']
  ] },

{ id: 'riesgo', level: 'm7', min: 4, title: 'Riesgo, rentabilidad y liquidez',
  body: [
    'Toda forma de guardar o invertir plata tiene tres características. **Rentabilidad:** cuánto te puede hacer ganar. **Riesgo:** qué tan posible es que ganes menos o pierdas. **Liquidez:** qué tan rápido puedes sacar la plata.',
    'Casi nunca se tienen las tres a la vez. Más rentabilidad suele venir con **más riesgo** o **menos liquidez**. Una cuenta de ahorros es líquida y segura pero rinde poco; las acciones pueden rendir más pero su valor sube y baja.',
    'Por eso cada plata va en su lugar según **para qué y para cuándo** la necesitas: la de emergencias, segura y líquida; la de una meta en dos años, en algo de bajo riesgo con plazo; la del largo plazo puede asumir más riesgo.'
  ],
  example: { title: 'Los tres frascos de Mateo', text: [
    'Mateo organizó su plata en tres frascos: emergencias en una cuenta de ahorros, la cuota inicial de su apartamento (en 3 años) en CDT escalonados, y una parte pequeña para su retiro en un fondo de largo plazo.',
    'Cuando el fondo bajó un año, no se asustó: esa plata no la necesitaba pronto, y su emergencia estaba cubierta aparte.'
  ] },
  learn: ['Rentabilidad, riesgo y liquidez casi nunca vienen juntas.', 'Más rentabilidad suele significar más riesgo o menos liquidez.', 'Elige según para qué y para cuándo necesitas la plata.'],
  q: [
    ['¿Qué es la liquidez?', ['Qué tan rápido puedes sacar tu plata', 'Cuánto ganas', 'Cuánto riesgo tienes'], 0, 'Una cuenta de ahorros es muy líquida; un CDT, menos.'],
    ['Si una inversión promete más rentabilidad, normalmente…', ['Tiene menos riesgo', 'Tiene más riesgo o menos liquidez', 'Es gratis'], 1, 'Es la relación básica entre rentabilidad y riesgo.'],
    ['¿Dónde va la plata de emergencias?', ['En algo seguro y líquido', 'En acciones', 'En un plazo de 10 años'], 0, 'Debe estar disponible y no perder valor de golpe.'],
    ['¿Por qué Mateo no se asustó cuando su fondo bajó?', ['Porque esa plata era de largo plazo y su emergencia estaba cubierta', 'Porque no le importaba', 'Porque sacó todo'], 0, 'Cada frasco tenía un propósito y un plazo.']
  ] },

{ id: 'invertir', level: 'm7', min: 4, title: 'Primeros pasos para invertir',
  body: [
    'Antes de invertir, tres pasos: **1) sal de las deudas caras**, porque ninguna inversión segura rinde lo que cobra una tarjeta; **2) arma tu fondo de emergencia**; **3) ten claro para qué y para cuándo es esa plata**.',
    'En Colombia hay opciones para empezar con montos pequeños: **CDT**, **fondos de inversión colectiva** (juntas tu plata con la de otros y la administra una entidad vigilada), **fondos voluntarios de pensión** y, para el largo plazo, **acciones o fondos que siguen índices**, que suben y bajan.',
    'Reglas para no equivocarte: **no inviertas en lo que no entiendes**, **diversifica** (no pongas todo en un solo lugar), revisa los costos y verifica siempre que la entidad esté vigilada por la Superintendencia Financiera.'
  ],
  example: { title: 'El primer fondo de Kelly', text: [
    'Kelly ya no tenía deudas y su fondo de emergencia cubría tres meses. Quería que su ahorro de largo plazo creciera, pero le daba miedo "la bolsa".',
    'Empezó con $100.000 al mes en un fondo de inversión colectiva de una entidad vigilada, leyó su reglamento y entendió sus costos y su riesgo. Fue aprendiendo con poco antes de poner más.'
  ] },
  learn: ['Primero sin deudas caras y con fondo de emergencia.', 'Hay opciones vigiladas para empezar con poco.', 'Invierte solo en lo que entiendes y diversifica.'],
  q: [
    ['¿Qué debes hacer antes de invertir?', ['Salir de deudas caras y armar tu fondo de emergencia', 'Pedir un préstamo para invertir', 'Nada'], 0, 'Ninguna inversión segura rinde lo que cobra una deuda cara.'],
    ['¿Qué es un fondo de inversión colectiva?', ['Juntar tu plata con la de otros, administrada por una entidad vigilada', 'Una natillera entre amigos', 'Un crédito'], 0, 'Te permite invertir con montos pequeños y diversificar.'],
    ['¿Qué significa diversificar?', ['Poner todo en un solo lugar', 'Repartir tu plata en varias opciones', 'Cambiar de banco cada mes'], 1, 'Si una opción va mal, no pierdes todo.'],
    ['¿Cuál es una buena regla para invertir?', ['Invertir en lo que te recomiende cualquiera', 'No invertir en lo que no entiendes', 'Buscar la ganancia más alta sin importar el riesgo'], 1, 'Si no entiendes cómo se gana, no puedes medir el riesgo.']
  ] },

{ id: 'pension', level: 'm7', min: 3, title: 'Piensa en tu vejez desde hoy',
  body: [
    'La pensión parece lejana, pero las decisiones de hoy definen tu vejez. Para pensionarte en Colombia necesitas **cumplir una edad y un número de semanas cotizadas**; cada mes que no cotizas te aleja de esa meta.',
    'Revisa tu **historia laboral** en tu fondo de pensiones: que estén todas tus semanas y que tus empleadores hayan pagado. Los errores son más fáciles de corregir a tiempo que al final.',
    'El sistema de pensiones ha tenido cambios recientes, así que **infórmate en fuentes oficiales** antes de decisiones importantes como trasladarte de régimen. Además de la pensión, ahorrar por tu cuenta para el largo plazo te da más tranquilidad.'
  ],
  example: { title: 'Las semanas perdidas de Gloria', text: [
    'A los 55 años Gloria revisó su historia laboral y descubrió que un empleador nunca pagó dos años de aportes. Reclamar tanto tiempo después fue difícil.',
    'Su hijo, de 28 años, aprendió de eso: revisa su historia laboral cada año y guarda sus colillas de pago.'
  ] },
  learn: ['Para pensionarte necesitas edad y semanas cotizadas.', 'Revisa tu historia laboral con frecuencia.', 'Infórmate en fuentes oficiales y ahorra también por tu cuenta.'],
  q: [
    ['¿Qué se necesita para pensionarse?', ['Solo cumplir una edad', 'Cumplir una edad y un número de semanas cotizadas', 'Tener casa propia'], 1, 'Las dos condiciones son necesarias.'],
    ['¿Para qué revisar tu historia laboral?', ['Para verificar que estén todas tus semanas y pagos', 'Para pedir un crédito', 'No sirve para nada'], 0, 'Los errores se corrigen mejor a tiempo.'],
    ['Antes de trasladarte de régimen pensional, ¿qué conviene?', ['Hacerlo por recomendación de un amigo', 'Informarte en fuentes oficiales', 'Decidir sin revisar nada'], 1, 'Es una decisión importante y el sistema ha cambiado.'],
    ['¿Qué aprendió el hijo de Gloria?', ['A revisar su historia laboral cada año', 'A no cotizar', 'A cambiar de trabajo cada año'], 0, 'Revisar a tiempo evita sorpresas al final.']
  ] },

/* ================= Módulo 8 ================= */
{ id: 'pareja', level: 'm8', min: 3, title: 'La plata en pareja y en familia',
  body: [
    'La plata es una de las principales causas de peleas en pareja, casi siempre por **falta de conversación**. Hablen de cuánto gana cada uno, qué deudas tienen y qué metas quieren lograr juntos.',
    'Hay varias formas de organizarse: **todo en común**, **todo separado** o un **modelo mixto**: cada uno aporta a una cuenta común para los gastos de la casa, en proporción a lo que gana, y conserva una parte para sí. No hay una única correcta; lo importante es que sea clara y justa para ambos.',
    'Hagan una **reunión de plata** mensual, corta y sin reproches: revisen el presupuesto, cómo van las metas y qué viene. Si hay hijos, involúcralos según su edad: la educación financiera empieza en casa.'
  ],
  example: { title: 'La reunión de Camilo y Paula', text: [
    'Camilo y Paula peleaban cada fin de mes porque ninguno sabía cuánto había gastado el otro. Crearon una cuenta común: Camilo aporta el 60% de los gastos de la casa y Paula el 40%, según lo que gana cada uno.',
    'El primer domingo de cada mes revisan cómo van, durante media hora y con café. Las peleas por plata casi desaparecieron.'
  ] },
  learn: ['Hablar de plata en pareja evita la mayoría de conflictos.', 'Elijan un modelo claro y justo, como aportar en proporción a lo que gana cada uno.', 'Hagan una reunión de plata mensual, corta y sin reproches.'],
  q: [
    ['¿Cuál es la causa más común de peleas por plata en pareja?', ['La falta de conversación', 'Ganar poco', 'Tener una cuenta común'], 0, 'Cuando no se habla, aparecen malentendidos y reproches.'],
    ['En el modelo mixto, ¿cómo se aporta a los gastos comunes?', ['Cada uno aporta según lo que gana', 'Uno paga todo', 'No se aporta nada'], 0, 'Aportar en proporción suele sentirse más justo.'],
    ['¿Cómo debe ser la reunión de plata?', ['Larga y para buscar culpables', 'Corta, periódica y sin reproches', 'Solo cuando hay problemas'], 1, 'La idea es revisar y planear juntos, no pelear.'],
    ['¿Desde cuándo empieza la educación financiera de los hijos?', ['Cuando entran a la universidad', 'En casa, según su edad', 'Nunca es necesaria'], 1, 'Los hábitos se aprenden en casa.']
  ] },

{ id: 'grandes', level: 'm8', min: 4, title: 'Grandes compras: moto, carro y vivienda',
  body: [
    'Las grandes compras merecen planeación. Antes de comprar, calcula el **costo total de tenerla**, no solo la cuota: en un carro o moto suma SOAT, tecnomecánica, gasolina, mantenimiento, parqueadero e impuestos.',
    'Ahorra una **cuota inicial** grande: mientras más pongas, menos te prestan y menos intereses pagas. Compara opciones de crédito por la tasa EA y el total a pagar, y asegúrate de que la cuota no pase del 30% de tus ingresos sumando tus otras deudas.',
    'Para vivienda, averigua por los **subsidios y programas** vigentes en tu caja de compensación y en las entidades del Gobierno, y por opciones como el leasing habitacional. Si la cuota de vivienda queda similar a tu arriendo actual y tienes estabilidad, puede ser buen momento.'
  ],
  example: { title: 'El carro de Fredy', text: [
    'Fredy quería un carro con una cuota de $700.000. Al sumar seguro, gasolina, parqueadero y mantenimiento, el costo real era $1.400.000 al mes, casi la mitad de su sueldo.',
    'Decidió comprar una moto y ahorrar un año más. Cuando compró carro, puso el 40% de cuota inicial y la cuota le quedó cómoda.'
  ] },
  learn: ['Calcula el costo total de tener algo, no solo la cuota.', 'Una cuota inicial grande reduce intereses.', 'Que tus cuotas no pasen del 30% de tus ingresos.'],
  q: [
    ['¿Qué incluye el costo total de tener un carro?', ['Solo la cuota', 'Cuota, seguro, gasolina, mantenimiento, parqueadero e impuestos', 'Solo la gasolina'], 1, 'Como descubrió Fredy, el costo real puede doblar la cuota.'],
    ['¿Por qué conviene una cuota inicial grande?', ['Porque te prestan menos y pagas menos intereses', 'Porque el carro sale más caro', 'No conviene'], 0, 'Menos deuda significa menos interés.'],
    ['¿Qué porcentaje máximo de tus ingresos se recomienda para cuotas?', ['Alrededor del 30%', 'El 70%', 'El 100%'], 0, 'Por encima de eso, cualquier imprevisto te aprieta.'],
    ['¿Dónde averiguar subsidios de vivienda?', ['En tu caja de compensación y entidades del Gobierno', 'En redes sociales sin verificar', 'No existen'], 0, 'Son las fuentes oficiales de esos programas.']
  ] },

{ id: 'plan', level: 'm8', min: 4, title: 'Tu plan financiero personal',
  body: [
    'Llegaste al final del curso. Ahora junta todo en un **plan** sencillo, en este orden: **1)** registra tus gastos; **2)** arma tu presupuesto; **3)** crea un primer colchón de emergencia; **4)** sal de las deudas caras; **5)** completa tu fondo de 3 a 6 meses; **6)** ahorra para tus metas; **7)** invierte para el largo plazo.',
    'Revisa tu plan **cada mes** (presupuesto y gastos) y **cada año** (metas, seguros, historia laboral, ingresos). Los planes cambian con la vida, y está bien ajustarlos.',
    'Recuerda: no se trata de ser perfecto sino de ser **constante**. Habrá meses malos. Lo importante es volver al plan. **No se trata de cuánto produces, sino de cuánto te queda y qué haces con eso.**'
  ],
  example: { title: 'Un año de Natalia', text: [
    'Hace un año Natalia no sabía cuánto debía. Siguió el plan paso a paso: registró, presupuestó, armó $500.000 de colchón y atacó su tarjeta con avalancha.',
    'Hoy no tiene deudas caras, su fondo cubre dos meses y está ahorrando para estudiar. No gana mucho más que antes; maneja mucho mejor lo que gana.'
  ] },
  learn: ['El orden importa: registrar, presupuestar, colchón, deudas, fondo, metas e inversión.', 'Revisa cada mes y cada año.', 'La constancia vale más que la perfección.'],
  q: [
    ['¿Qué va primero en el plan?', ['Invertir en acciones', 'Registrar tus gastos', 'Comprar vivienda'], 1, 'Sin saber a dónde se va tu plata, no puedes planear.'],
    ['¿Qué va antes: salir de deudas caras o invertir?', ['Salir de deudas caras', 'Invertir', 'Da igual'], 0, 'Las deudas caras cuestan más de lo que rinde una inversión segura.'],
    ['¿Cada cuánto revisar tu presupuesto?', ['Cada mes', 'Cada cinco años', 'Nunca'], 0, 'Así ajustas a tiempo.'],
    ['¿Qué es lo más importante para que el plan funcione?', ['Ser perfecto', 'Ser constante y volver al plan después de un mes malo', 'Ganar mucho más'], 1, 'Los resultados llegan con la constancia.']
  ] }
];

/* Lecciones del curso anterior → equivalentes nuevos (para conservar el progreso) */
const LEGACY_LESSONS = { l1: 'registro', l2: '503020', l3: 'hormiga', l4: 'sobres', l5: 'variables', l6: 'hormiga', l7: 'interes', l8: 'estrategias', l9: 'gota', l10: 'tarjeta', l11: 'historial', l12: 'pagate', l13: 'emergencia', l14: 'donde', l15: 'compuesto', l16: 'estafas' };

const GLOSSARY = [
  ['4x1000 (GMF)', 'Impuesto de 4 pesos por cada 1.000 que sacas o transfieres. Puedes marcar una cuenta como exenta hasta cierto monto mensual.'],
  ['Auxilio de transporte', 'Pago adicional para empleados que ganan hasta dos salarios mínimos.'],
  ['Avance', 'Sacar efectivo con la tarjeta de crédito. Suele ser de lo más caro.'],
  ['CDT', 'Certificado de Depósito a Término. Dejas tu plata quieta un tiempo fijo y te pagan una tasa acordada.'],
  ['Central de riesgo', 'Empresa que guarda tu historial de pagos de créditos (por ejemplo DataCrédito o TransUnion).'],
  ['Cesantías', 'Un mes de salario por año que el empleador consigna en un fondo. Se pueden usar para vivienda, estudio o si te quedas sin trabajo.'],
  ['Cuota de manejo', 'Lo que cobra el banco cada mes por tener una tarjeta o cuenta.'],
  ['Diversificar', 'Repartir tu plata en varias opciones para no depender de una sola.'],
  ['Flujo de caja', 'Lo que entra menos lo que sale en un periodo.'],
  ['Fogafín', 'Entidad que asegura los depósitos en bancos vigilados hasta un monto máximo por persona.'],
  ['Fondo de emergencia', 'Ahorro solo para imprevistos. Lo ideal: de 3 a 6 meses de gastos básicos.'],
  ['Fondo de inversión colectiva', 'Vehículo en el que muchas personas juntan su plata y la administra una entidad vigilada.'],
  ['Historia laboral', 'Registro de tus semanas cotizadas y aportes a pensión.'],
  ['Inflación', 'La subida general de los precios. Hace que la plata quieta pierda poder de compra.'],
  ['Insolvencia de persona natural', 'Trámite legal para negociar con todos tus acreedores a la vez cuando ya no puedes pagar tus deudas.'],
  ['Interés compuesto', 'Ganar (o pagar) intereses sobre los intereses acumulados.'],
  ['Interés de mora', 'Interés extra que te cobran cuando te atrasas en un pago.'],
  ['Liquidez', 'Qué tan rápido puedes convertir una inversión en plata disponible.'],
  ['Pago mínimo', 'Lo menos que puedes pagar de la tarjeta para no caer en mora. Si solo pagas eso, la deuda baja muy lento.'],
  ['Prima de servicios', 'Pago para empleados equivalente a un mes de salario al año, en dos partes.'],
  ['Presupuesto', 'Plan de cuánto vas a gastar en cada cosa antes de que empiece el mes.'],
  ['Refinanciar', 'Cambiar las condiciones de una deuda (plazo o tasa) para que sea más manejable.'],
  ['Rentabilidad', 'Lo que gana tu plata en un periodo, normalmente en porcentaje.'],
  ['SOAT', 'Seguro obligatorio para vehículos que cubre la atención de las personas en un accidente de tránsito.'],
  ['Tasa EA', 'Efectiva anual. El costo o rendimiento real de un año. Sirve para comparar créditos y ahorros.'],
  ['Tasa mensual (MV)', 'El interés que se cobra cada mes. Un 2% mensual equivale a cerca de 26,8% EA.'],
  ['Tasa de usura', 'El máximo interés que la ley permite cobrar en Colombia. La certifica la Superintendencia Financiera y cambia periódicamente.']
];
