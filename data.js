/* Contenido de NüMIA: categorías por defecto y retos (el curso está en course.js) */

/* Árbol de categorías: [nombre, [subcategorías...]] */
const DEFAULT_CATS = {
  out: [
    ['Vivienda', ['Arriendo', 'Administración', ['Servicios', ['Luz', 'Agua', 'Gas', 'Internet', 'Celular']]]],
    ['Comida', ['Mercado', 'Restaurantes', 'Domicilios', 'Mecato']],
    ['Transporte', ['Bus y Metro', 'Taxi y apps', 'Gasolina', 'Parqueadero', 'Mantenimiento']],
    ['Salud', ['Medicamentos', 'Citas', 'EPS o prepagada']],
    ['Deudas', ['Tarjeta de crédito', 'Préstamos', 'Otras deudas']],
    ['Personal', ['Ropa', 'Cuidado personal', 'Gimnasio']],
    ['Diversión', ['Salidas', 'Suscripciones', 'Viajes']],
    ['Familia', ['Ayuda a la familia', 'Mascotas', 'Regalos']],
    ['Educación', []],
    ['Ahorro', []],
    ['Otros gastos', []]
  ],
  in: [
    ['Sueldo', []],
    ['Trabajo extra', []],
    ['Ventas', []],
    ['Prima', []],
    ['Regalos recibidos', []],
    ['Otros ingresos', []]
  ]
};

const CHALLENGES = [
  { id: 'c1', name: '7 días anotando todo', days: 7, desc: 'Registra cada ingreso y gasto durante una semana, sin excepción.', icon: 'pen' },
  { id: 'c2', name: 'Semana sin domicilios', days: 7, desc: 'Siete días cocinando o comprando directo. Mira cuánto te ahorras.', icon: 'bag' },
  { id: 'c3', name: '3 días sin gastar', days: 3, desc: 'Tres días sin gastos que no sean esenciales (transporte y comida de casa sí).', icon: 'lock' },
  { id: 'c4', name: '$5.000 diarios por 30 días', days: 30, desc: 'Separa $5.000 cada día. Al final tendrás $150.000.', icon: 'coin' },
  { id: 'c5', name: 'Cacería de suscripciones', days: 1, desc: 'Revisa tus cobros automáticos y cancela lo que no usas.', icon: 'scissors' },
  { id: 'c6', name: 'Cocina en casa 5 días', days: 5, desc: 'Lleva almuerzo desde casa cinco días seguidos.', icon: 'pot' },
  { id: 'c7', name: 'Mecato a la mitad', days: 14, desc: 'Durante dos semanas gasta la mitad de lo normal en mecato y bebidas.', icon: 'cup' },
  { id: 'c8', name: 'Aprende 3 lecciones', days: 3, desc: 'Aprueba el examen de una lección diaria durante tres días.', icon: 'book' }
];
