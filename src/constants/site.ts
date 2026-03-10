export const SITE = {
  name: 'Crea Melamine',
  tagline: 'Muebles de Calidad',
  phone: ['(+51) 994 080 979', '(+51) 956 167 469'],
  email: 'creamelamine@gmail.com',
  location: 'Ate-Lima, Peru',
  locationDetail: 'Showroom y Taller',
  whatsapp: '51989366433',
  hours: {
    weekdays: 'Lun - Vie: 8:00 - 18:00',
    saturday: 'Sab: 9:00 - 13:00',
    note: 'Visitas con cita previa',
  },
} as const

export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Productos', href: '#galeria' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'IA', href: '#analizador' },
  { label: 'Contacto', href: '#contacto' },
] as const

export const STATS = [
  { value: '15+', label: 'Anos de experiencia' },
  { value: '500+', label: 'Clientes satisfechos' },
  { value: '1000+', label: 'Proyectos realizados' },
] as const

export const SERVICES = [
  {
    title: 'Cocinas Integrales',
    description:
      'Diseno y fabricacion de cocinas a medida con acabados de primera calidad. Optimizamos cada centimetro de tu espacio.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    title: 'Placards y Vestidores',
    description:
      'Soluciones de almacenamiento personalizadas que combinan funcionalidad y estetica para tu hogar.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    title: 'Muebles de Oficina',
    description:
      'Espacios de trabajo funcionales y modernos. Escritorios, estantes y muebles corporativos a medida.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
] as const

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Diseno',
    items: ['Planos 3D', 'Renders realistas'],
  },
  {
    step: 2,
    title: 'Planificacion',
    items: ['Medicion gratuita', 'Asesoramiento profesional'],
  },
  {
    step: 3,
    title: 'Fabricacion',
    items: ['Melamina premium', 'Herrajes de calidad'],
  },
  {
    step: 4,
    title: 'Entrega',
    items: ['Acabados perfectos', 'Control de calidad'],
  },
] as const

export const GALLERY_CATEGORIES = ['Todos', 'Cocinas', 'Vestidores', 'Oficina'] as const

export const GALLERY_ITEMS = [
  {
    title: 'Cocina Moderna Blanca',
    category: 'Cocinas',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    featured: true,
  },
  {
    title: 'Vestidor con Espejo',
    category: 'Vestidores',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    featured: false,
  },
  {
    title: 'Escritorio Ejecutivo',
    category: 'Oficina',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    featured: false,
  },
  {
    title: 'Cocina Integral en L',
    category: 'Cocinas',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    featured: false,
  },
  {
    title: 'Placard Empotrado',
    category: 'Vestidores',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
    featured: true,
  },
  {
    title: 'Estacion de Trabajo',
    category: 'Oficina',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
    featured: false,
  },
] as const

export const ABOUT_HIGHLIGHTS = [
  '15+ anos de experiencia en el mercado',
  'Mas de 500 clientes satisfechos',
  'Equipo de disenadores profesionales',
  'Taller equipado con maquinaria moderna',
  'Materiales de primera calidad',
  'Servicio integral de diseno a instalacion',
] as const

export const FURNITURE_TYPES = [
  'Cocina integral',
  'Placard / Vestidor',
  'Mueble de oficina',
  'Estanteria',
  'Mueble de bano',
  'Otro',
] as const

export const BUDGET_RANGES = [
  'Menos de S/. 2,000',
  'S/. 2,000 - S/. 5,000',
  'S/. 5,000 - S/. 10,000',
  'Mas de S/. 10,000',
] as const
