-- ============================================================
-- CREA MELAMINE - Catalog Database Schema + Seed Data
-- ============================================================

-- 1. BRANDS (Marcas de melamina)
CREATE TABLE IF NOT EXISTS brands (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  country text NOT NULL,
  quality_tier text NOT NULL CHECK (quality_tier IN ('economy', 'mid-range', 'premium')),
  substrate_types text[] NOT NULL DEFAULT '{}',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. MELAMINE COLORS
CREATE TABLE IF NOT EXISTS melamine_colors (
  id serial PRIMARY KEY,
  brand_id integer NOT NULL REFERENCES brands(id),
  name text NOT NULL,
  code text,
  category text NOT NULL CHECK (category IN ('blanco', 'madera_clara', 'madera_media', 'madera_oscura', 'color_solido', 'piedra_fantasia')),
  finish text NOT NULL DEFAULT 'mate',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. BOARD THICKNESSES
CREATE TABLE IF NOT EXISTS board_thicknesses (
  id serial PRIMARY KEY,
  thickness_mm numeric NOT NULL UNIQUE,
  substrate text NOT NULL,
  primary_uses text[] NOT NULL DEFAULT '{}',
  notes text
);

-- 4. HARDWARE BRANDS
CREATE TABLE IF NOT EXISTS hardware_brands (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  country text NOT NULL,
  quality_tier text NOT NULL CHECK (quality_tier IN ('economy', 'mid-range', 'premium')),
  product_types text[] NOT NULL DEFAULT '{}',
  notes text
);

-- 5. HARDWARE TYPES
CREATE TABLE IF NOT EXISTS hardware_types (
  id serial PRIMARY KEY,
  category text NOT NULL CHECK (category IN ('bisagra', 'corredera', 'piston', 'jaladera', 'soporte')),
  name text NOT NULL,
  description text,
  common_sizes text,
  notes text
);

-- 6. EDGE BANDING (Tapacantos)
CREATE TABLE IF NOT EXISTS edge_banding (
  id serial PRIMARY KEY,
  material text NOT NULL CHECK (material IN ('PVC', 'ABS')),
  thickness_mm numeric NOT NULL,
  use_case text NOT NULL,
  notes text
);

-- 7. FURNITURE TYPES
CREATE TABLE IF NOT EXISTS furniture_types (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  category text NOT NULL CHECK (category IN ('cocina', 'dormitorio', 'oficina', 'bano', 'sala', 'lavanderia')),
  typical_dimensions text,
  melamina_thickness text NOT NULL,
  price_min integer NOT NULL,
  price_max integer NOT NULL,
  components text[] NOT NULL DEFAULT '{}',
  requires_rh boolean NOT NULL DEFAULT false,
  notes text
);

-- 8. COUNTERTOP OPTIONS
CREATE TABLE IF NOT EXISTS countertop_options (
  id serial PRIMARY KEY,
  material text NOT NULL UNIQUE,
  price_min_per_ml integer NOT NULL,
  price_max_per_ml integer NOT NULL,
  popularity text NOT NULL CHECK (popularity IN ('muy_alta', 'alta', 'media', 'baja', 'muy_baja')),
  pros text[] NOT NULL DEFAULT '{}',
  cons text[] NOT NULL DEFAULT '{}',
  notes text
);

-- 9. FINISHES (Acabados de superficie)
CREATE TABLE IF NOT EXISTS finishes (
  id serial PRIMARY KEY,
  brand_id integer NOT NULL REFERENCES brands(id),
  name text NOT NULL,
  code text,
  description text
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- BRANDS
INSERT INTO brands (name, country, quality_tier, substrate_types, notes) VALUES
('Vesto (Arauco)', 'Chile', 'premium', ARRAY['MDP', 'MDP RH', 'MDF'], 'Proteccion antimicrobiana Copptech. Abrasion >500 ciclos. Plancha 1.83m x 2.44m'),
('Masisa', 'Chile', 'premium', ARRAY['MDP', 'MDF'], 'Proteccion antimicrobiana. Amplio catalogo por lineas. Plancha 1.83m x 2.44m'),
('Pelikano (Novopan)', 'Ecuador', 'mid-range', ARRAY['MDP termofundido'], '84+ colores. Premio iF Design por diseno Toquilla. Plancha 1.83m x 2.44m'),
('Tableros Hispanos', 'Peru', 'economy', ARRAY['MDP termofundido'], 'Precio accesible. Texturas Poro y Natural'),
('Faplac (Arauco)', 'Argentina', 'mid-range', ARRAY['MDP', 'MDF'], 'Grupo Arauco. Disponibilidad limitada en Peru')
ON CONFLICT (name) DO NOTHING;

-- MELAMINE COLORS - Blancos
INSERT INTO melamine_colors (brand_id, name, code, category, finish) VALUES
((SELECT id FROM brands WHERE name = 'Masisa'), 'Blanco', NULL, 'blanco', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Blanco Perla', 'M004', 'blanco', 'liso brillo'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Blanco', NULL, 'blanco', 'liso'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Blanco', NULL, 'blanco', 'texturado'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Blanco', NULL, 'blanco', 'liso');

-- MELAMINE COLORS - Maderas claras
INSERT INTO melamine_colors (brand_id, name, code, category, finish) VALUES
((SELECT id FROM brands WHERE name = 'Masisa'), 'Roble Santana', 'M058', 'madera_clara', 'naturale'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Roble Milano', 'M035', 'madera_clara', 'softwood'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Peral', NULL, 'madera_clara', 'mate'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Teka Artico', NULL, 'madera_clara', 'poro'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Linosa Cinza', NULL, 'madera_clara', 'poro'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Aserrado Nordico', NULL, 'madera_clara', 'nordic'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Roble Americano', NULL, 'madera_clara', 'poro'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Roble Provenzal', NULL, 'madera_clara', 'poro'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Fresno', NULL, 'madera_clara', 'poro'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Milan', NULL, 'madera_clara', 'poro'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Bardolino', NULL, 'madera_clara', 'natural');

-- MELAMINE COLORS - Maderas medias/calidas
INSERT INTO melamine_colors (brand_id, name, code, category, finish) VALUES
((SELECT id FROM brands WHERE name = 'Masisa'), 'Nogal Amazonico', 'M029', 'madera_media', 'mate'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Carvalo', NULL, 'madera_media', 'softwood'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Cedro', NULL, 'madera_media', 'mate'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Cerezo Natural', NULL, 'madera_media', 'mate'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Nogal Terracota', NULL, 'madera_media', 'poro'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Nocce Milano', NULL, 'madera_media', 'poro'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Aserrado Amazonico', NULL, 'madera_media', 'poro'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Coigue', NULL, 'madera_media', 'poro'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Tabaco', NULL, 'madera_media', 'poro'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Roble Dakar', NULL, 'madera_media', 'poro'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Panela', NULL, 'madera_media', 'natural'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Toquilla', NULL, 'madera_media', 'poro');

-- MELAMINE COLORS - Maderas oscuras
INSERT INTO melamine_colors (brand_id, name, code, category, finish) VALUES
((SELECT id FROM brands WHERE name = 'Masisa'), 'Nogal Africano', 'M050', 'madera_oscura', 'softwood'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Nogal Ceniza', NULL, 'madera_oscura', 'mate'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Caoba Amazonico', NULL, 'madera_oscura', 'mate'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Roble Moro', NULL, 'madera_oscura', 'mate'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Teca Italia', NULL, 'madera_oscura', 'mate'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Fume', NULL, 'madera_oscura', 'poro');

-- MELAMINE COLORS - Colores solidos
INSERT INTO melamine_colors (brand_id, name, code, category, finish) VALUES
((SELECT id FROM brands WHERE name = 'Masisa'), 'Negro', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Gris Grafito', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Gris Grafito Soft', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Aluminio', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Rojo Cobalto', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Azul Acero', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Azul Cobalto', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Verde Limon', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Amarillo Ocaso', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Fucsia', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Negro', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Gris Humo', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Aluminio', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Rojo', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Lago', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Lila', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Almendra', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Agave', NULL, 'color_solido', 'liso'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Arupo', NULL, 'color_solido', 'liso');

-- MELAMINE COLORS - Piedras/fantasias
INSERT INTO melamine_colors (brand_id, name, code, category, finish) VALUES
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Tivoli', NULL, 'piedra_fantasia', 'liso'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Lino', NULL, 'piedra_fantasia', 'texturado');

-- BOARD THICKNESSES
INSERT INTO board_thicknesses (thickness_mm, substrate, primary_uses, notes) VALUES
(3, 'MDF/HDF', ARRAY['Fondos de cajones', 'Traseras de muebles', 'Fondos de closet'], NULL),
(5.5, 'MDF/MDP', ARRAY['Fondos de muebles', 'Divisiones internas livianas', 'Traseras'], NULL),
(9, 'MDP/MDF', ARRAY['Repisas pequenas', 'Divisiones internas', 'Entrepaños cortos'], NULL),
(12, 'MDP/MDF', ARRAY['Entrepaños de closet tramos cortos <60cm', 'Divisiones', 'Costados internos'], NULL),
(15, 'MDP/MDF', ARRAY['Entrepaños de closet', 'Costados de muebles bajos', 'Cuerpos economicos'], NULL),
(18, 'MDP/MDF', ARRAY['Costados', 'Puertas', 'Bases', 'Entrepaños principales', 'Cuerpos de cocina y closet'], 'ESPESOR MAS USADO. Recomendado para puertas >1.20m largo'),
(25, 'MDP/MDF', ARRAY['Cubiertas de escritorios', 'Mesas', 'Tableros de cocina', 'Repisas de gran extension'], NULL),
(36, 'MDP', ARRAY['Cubiertas pesadas', 'Mostradores', 'Muebles de recepcion'], 'Aplicaciones comerciales')
ON CONFLICT (thickness_mm) DO NOTHING;

-- HARDWARE BRANDS
INSERT INTO hardware_brands (name, country, quality_tier, product_types, notes) VALUES
('Blum', 'Austria', 'premium', ARRAY['Bisagras CLIP top', 'Correderas TANDEM/MOVENTO', 'Sistemas AVENTOS', 'Organizadores ORGA-LINE'], 'Distribuidor: Mueblum, Miraflores'),
('Hettich', 'Alemania', 'premium', ARRAY['Bisagras Sensys', 'Correderas InnoTech/ArciTech', 'Push to Open'], 'Leroy Merlin, ferreterias especializadas'),
('Hafele', 'Alemania', 'premium', ARRAY['Bisagras', 'Correderas', 'Iluminacion LED', 'Accesorios de cocina'], 'Placacentros, distribuidores especializados'),
('King Slide', 'Taiwan', 'mid-range', ARRAY['Correderas telescopicas', 'Correderas cierre suave'], 'Importadores, ferreterias industriales'),
('Grass', 'Austria', 'mid-range', ARRAY['Bisagras', 'Correderas', 'Sistemas de cajones'], 'Distribuidores limitados'),
('FGV', 'Italia', 'mid-range', ARRAY['Bisagras', 'Correderas economicas'], 'Distribuidores, ferreterias'),
('DTC', 'China', 'economy', ARRAY['Bisagras cierre suave', 'Correderas cierre suave'], 'Ferreterias medianas, importadores'),
('Genericos China', 'China', 'economy', ARRAY['Bisagras cazoleta 35mm', 'Correderas telescopicas', 'Jaladeras', 'Soportes de repisa'], 'Las Malvinas, Paruro, ferreterias de barrio')
ON CONFLICT (name) DO NOTHING;

-- HARDWARE TYPES
INSERT INTO hardware_types (category, name, description, common_sizes, notes) VALUES
('bisagra', 'Bisagra de cazoleta 35mm', 'La mas comun, apertura 95-110 grados', '35mm cazoleta', 'Tipos: embutir (full overlay), semicodo (half overlay), codo (inset)'),
('bisagra', 'Bisagra cierre suave', 'Premium con amortiguacion', '35mm cazoleta', 'Blum CLIP top, Hettich Sensys, o generica DTC'),
('bisagra', 'Bisagra para vidrio', 'Con cazoleta especial para puertas de vidrio', '35mm', NULL),
('corredera', 'Corredera telescopica simple', 'Extension parcial, 2 cuerpos', '250-550mm largo, 25-35kg', 'Economica'),
('corredera', 'Corredera telescopica 3 cuerpos', 'Extension completa', '250-550mm largo, 35-45kg', NULL),
('corredera', 'Corredera cierre suave', 'Premium con amortiguacion', '250-550mm largo, 35-45kg', 'Hettich, Blum TANDEM o generica'),
('corredera', 'Corredera oculta', 'Bajo cajon, no visible', '250-550mm largo', 'Hettich ArciTech, Blum MOVENTO - sistema premium'),
('piston', 'Piston a gas', 'Para puertas elevables de alacenas', '60N, 80N, 100N, 120N, 150N', 'Alternativa premium: Blum AVENTOS HF/HK/HL/HS'),
('jaladera', 'Jaladera tipo arco', 'La mas comun, puente metalico', '96, 128, 160, 192, 256mm entre centros', 'Aluminio, acero inox, zamac cromado/negro mate'),
('jaladera', 'Tirador tipo perilla', 'Perilla redonda o cuadrada', '30-40mm diametro', NULL),
('jaladera', 'Perfil gola (J o C)', 'Sin jaladera visible, tendencia moderna', 'Perfil continuo', 'Estilo minimalista, se empotra en el canto'),
('jaladera', 'Jaladera embutida', 'Embutida en la puerta', '96, 128mm', NULL),
('soporte', 'Soporte tipo pin 5mm', 'Para repisas ajustables', '5mm diametro', 'El mas comun'),
('soporte', 'Tubo para colgar ropa', 'Tubo de closet', '25mm y 32mm diametro', 'Con soportes laterales');

-- EDGE BANDING
INSERT INTO edge_banding (material, thickness_mm, use_case, notes) VALUES
('PVC', 0.4, 'Cantos internos no visibles, entrepaños interiores', 'Economico, se aplica con plancha o enchapadora'),
('PVC', 0.8, 'Cantos semi-visibles, uso intermedio', 'Balance entre costo y apariencia'),
('PVC', 1, 'Cantos visibles de muebles estandar, closets, estantes', 'Buena apariencia y durabilidad'),
('PVC', 2, 'Cantos premium: cocinas, frentes de puertas', 'Mejor proteccion contra impactos, apariencia solida'),
('ABS', 1, 'Cantos visibles, alternativa ecologica al PVC', 'Mas rigido, mejor resistencia a rayones'),
('ABS', 2, 'Cantos premium visibles', 'Mayor resistencia a impactos y humedad');

-- FURNITURE TYPES
INSERT INTO furniture_types (name, category, typical_dimensions, melamina_thickness, price_min, price_max, components, requires_rh, notes) VALUES
('Cocina integral', 'cocina', 'Altos: 70-80cm x 30-35cm prof. Bajos: 80-85cm x 55-60cm prof. Modulos: 40-90cm ancho', '18mm cuerpos y puertas', 3500, 12000, ARRAY['Muebles bajos', 'Muebles altos (alacenas)', 'Isla/peninsula opcional'], false, 'Precio para 2.5-3m lineales sin tablero. Metro lineal: S/800-2500'),
('Repostero', 'cocina', '60-80cm alto x 30-35cm prof x largo variable', '18mm', 300, 1200, ARRAY['Alacenas', 'Puertas', 'Entrepaños'], false, 'Precio por metro lineal. A veces sinonimo de cocina integral'),
('Closet / Ropero', 'dormitorio', '180-240cm alto x 120-200cm ancho x 50-60cm prof', '18mm cuerpo, 18mm puertas', 1200, 4500, ARRAY['Colgadores', 'Entrepaños', 'Cajoneras', 'Zapatera'], false, 'Puertas batientes. Con corredizas: S/2000-6000'),
('Vestidor / Walking Closet', 'dormitorio', 'Variable, modulos de 40-60cm ancho', '18mm', 3000, 15000, ARRAY['Modulos abiertos', 'Cajones', 'Colgadores dobles', 'Zapatera', 'Espejo'], false, NULL),
('Escritorio', 'oficina', '120-150cm largo x 50-60cm prof x 75cm alto', '25mm cubierta, 18mm cuerpo', 350, 1500, ARRAY['Cubierta', 'Cajonera', 'Pasacables'], false, 'Home office y estudio'),
('Mueble de bano', 'bano', '60-120cm ancho x 45-50cm prof x 80cm alto', '18mm MDP RH', 500, 2500, ARRAY['Cajones', 'Puerta', 'Espejo superior'], true, 'DEBE usar melamina RH (resistente a humedad)'),
('Centro de entretenimiento', 'sala', '150-240cm ancho x 35-45cm prof x 40-180cm alto', '18mm', 500, 3000, ARRAY['Repisa TV', 'Cajones', 'Puertas', 'Nichos abiertos'], false, 'Estilos: flotante, con base, modular'),
('Estante / Librero', 'sala', '60-120cm ancho x 25-35cm prof x 180-200cm alto', '18mm cuerpo, 15-18mm entrepaños', 250, 1200, ARRAY['Entrepaños ajustables', 'Base', 'Costados'], false, NULL),
('Escritorio ejecutivo', 'oficina', '150-180cm largo x 60-75cm prof x 75cm alto', '25mm cubierta, 18mm cuerpo', 800, 3000, ARRAY['Cubierta grande', 'Cajonera doble', 'Pasacables', 'Faldon'], false, NULL),
('Estacion de trabajo', 'oficina', '120-150cm x 60cm x 75cm', '25mm cubierta, 18mm cuerpo', 500, 1800, ARRAY['Cubierta', 'Separadores', 'Pasacables'], false, NULL),
('Archivador', 'oficina', '45-50cm ancho x 50cm prof x 100-130cm alto', '18mm', 300, 800, ARRAY['Cajones con cerradura', 'Correderas reforzadas'], false, NULL),
('Counter de recepcion', 'oficina', '150-300cm ancho x 60cm prof x 110cm alto', '25mm cubierta, 18mm cuerpo', 1500, 5000, ARRAY['Mostrador alto', 'Cubierta de trabajo', 'Cajones', 'Puertas'], false, NULL),
('Mueble de lavanderia', 'lavanderia', '60-100cm ancho x 50cm prof x 200cm alto', '18mm MDP RH', 500, 1800, ARRAY['Espacio lavadora', 'Entrepaños', 'Puerta'], true, 'Requiere melamina RH')
ON CONFLICT (name) DO NOTHING;

-- COUNTERTOP OPTIONS
INSERT INTO countertop_options (material, price_min_per_ml, price_max_per_ml, popularity, pros, cons, notes) VALUES
('Postformado', 55, 350, 'muy_alta', ARRAY['Muy economico', 'Variedad de disenos', 'Facil instalacion'], ARRAY['Baja resistencia al calor', 'Se hincha con agua', 'Menor durabilidad'], 'La opcion mas comun para cocinas economicas en Lima'),
('Granito Nacional', 350, 800, 'alta', ARRAY['Durable', 'Resistente al calor', 'Apariencia premium'], ARRAY['Requiere sellado periodico', 'Pesado'], 'Popular en cocinas de gama media'),
('Granito Importado', 600, 1500, 'media', ARRAY['Mayor variedad de colores', 'Alta durabilidad'], ARRAY['Costo elevado', 'Pesado'], 'Brasil, India'),
('Cuarzo', 800, 2000, 'media', ARRAY['Muy resistente', 'No requiere sellado', 'No poroso', 'Moderno'], ARRAY['Precio alto', 'No resiste calor extremo directo'], 'Creciendo en popularidad'),
('Marmol', 600, 1800, 'baja', ARRAY['Apariencia elegante y lujosa'], ARRAY['Poroso', 'Se mancha facilmente', 'Requiere mucho mantenimiento'], 'Mas comun en banos que cocinas'),
('Concreto pulido', 300, 700, 'baja', ARRAY['Industrial/moderno', 'Durable'], ARRAY['Requiere sellado', 'Pesado'], NULL),
('Acero inoxidable', 500, 1200, 'muy_baja', ARRAY['Higienico', 'Profesional'], ARRAY['Ruidoso', 'Se raya', 'Estetica fria'], 'Solo cocinas industriales')
ON CONFLICT (material) DO NOTHING;

-- FINISHES
INSERT INTO finishes (brand_id, name, code, description) VALUES
((SELECT id FROM brands WHERE name = 'Masisa'), 'Basic', NULL, 'Liso standard, semi-mate'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Softwood', 'SW', 'Textura de madera suave al tacto'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Naturale', NULL, 'Poro sincronizado: la veta visual coincide con la textura tactil'),
((SELECT id FROM brands WHERE name = 'Masisa'), 'Liso Brillo', NULL, 'Alto brillo polyester/poliuretano. Solo colores selectos como Blanco Perla'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Liso', 'SM', 'Superficie lisa, semi-mate'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Poro', 'TX', 'Textura de poro madera'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Nordic', 'ND', 'Textura profunda estilo nordico'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Felt', 'FL', 'Textura tipo fieltro/textil suave'),
((SELECT id FROM brands WHERE name = 'Vesto (Arauco)'), 'Trend', 'TR', 'Textura moderna'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Poro', NULL, 'Textura de poro de madera'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Natural', NULL, 'Textura suave natural'),
((SELECT id FROM brands WHERE name = 'Pelikano (Novopan)'), 'Liso', NULL, 'Superficie lisa'),
((SELECT id FROM brands WHERE name = 'Tableros Hispanos'), 'Poro', NULL, 'Textura de poro'),
((SELECT id FROM brands WHERE name = 'Tableros Hispanos'), 'Natural', NULL, 'Textura suave');

-- Enable RLS but allow public read access for catalog
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE melamine_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_thicknesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE hardware_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE hardware_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE edge_banding ENABLE ROW LEVEL SECURITY;
ALTER TABLE furniture_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE countertop_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE finishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON brands FOR SELECT USING (true);
CREATE POLICY "Public read access" ON melamine_colors FOR SELECT USING (true);
CREATE POLICY "Public read access" ON board_thicknesses FOR SELECT USING (true);
CREATE POLICY "Public read access" ON hardware_brands FOR SELECT USING (true);
CREATE POLICY "Public read access" ON hardware_types FOR SELECT USING (true);
CREATE POLICY "Public read access" ON edge_banding FOR SELECT USING (true);
CREATE POLICY "Public read access" ON furniture_types FOR SELECT USING (true);
CREATE POLICY "Public read access" ON countertop_options FOR SELECT USING (true);
CREATE POLICY "Public read access" ON finishes FOR SELECT USING (true);
