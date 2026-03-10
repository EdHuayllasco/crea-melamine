import { supabase } from '@/lib/supabase/client'
import type { CatalogData } from '@/types/catalog'

/**
 * Fetch the full product catalog from Supabase.
 * Used as context for AI analysis prompts.
 */
export async function fetchCatalog(): Promise<CatalogData> {
  const [
    { data: brands },
    { data: colors },
    { data: thicknesses },
    { data: hardwareBrands },
    { data: hardwareTypes },
    { data: edgeBanding },
    { data: furnitureTypes },
    { data: countertops },
    { data: finishes },
  ] = await Promise.all([
    supabase.from('brands').select('*'),
    supabase.from('melamine_colors').select('*'),
    supabase.from('board_thicknesses').select('*'),
    supabase.from('hardware_brands').select('*'),
    supabase.from('hardware_types').select('*'),
    supabase.from('edge_banding').select('*'),
    supabase.from('furniture_types').select('*'),
    supabase.from('countertop_options').select('*'),
    supabase.from('finishes').select('*'),
  ])

  return {
    brands: brands ?? [],
    colors: colors ?? [],
    thicknesses: thicknesses ?? [],
    hardwareBrands: hardwareBrands ?? [],
    hardwareTypes: hardwareTypes ?? [],
    edgeBanding: edgeBanding ?? [],
    furnitureTypes: furnitureTypes ?? [],
    countertops: countertops ?? [],
    finishes: finishes ?? [],
  }
}

/**
 * Build a concise text summary of the catalog for AI prompt context.
 * Keeps token count low while providing all constraint data.
 */
export function catalogToPromptContext(catalog: CatalogData): string {
  const sections: string[] = []

  // Brands
  sections.push(
    '## Marcas disponibles\n' +
      catalog.brands
        .map((b) => `- ${b.name} (${b.country}, ${b.quality_tier})`)
        .join('\n'),
  )

  // Colors grouped by category
  const colorsByCategory = catalog.colors.reduce(
    (acc, c) => {
      const key = c.category
      if (!acc[key]) acc[key] = []
      acc[key].push(c.name + (c.code ? ` [${c.code}]` : ''))
      return acc
    },
    {} as Record<string, string[]>,
  )
  sections.push(
    '## Colores de melamina\n' +
      Object.entries(colorsByCategory)
        .map(([cat, names]) => `**${cat}**: ${[...new Set(names)].join(', ')}`)
        .join('\n'),
  )

  // Thicknesses
  sections.push(
    '## Espesores disponibles\n' +
      catalog.thicknesses
        .map((t) => `- ${t.thickness_mm}mm (${t.substrate}) — ${t.primary_uses.join(', ')}`)
        .join('\n'),
  )

  // Furniture types with prices
  sections.push(
    '## Tipos de mueble y rangos de precio (PEN)\n' +
      catalog.furnitureTypes
        .map(
          (f) =>
            `- ${f.name} (${f.category}): S/${f.price_range_min} – S/${f.price_range_max}`,
        )
        .join('\n'),
  )

  // Hardware
  sections.push(
    '## Herrajes\n' +
      catalog.hardwareTypes
        .map(
          (h) =>
            `- ${h.name} (${h.category}): S/${h.price_range_min} – S/${h.price_range_max}`,
        )
        .join('\n'),
  )

  // Countertops
  sections.push(
    '## Opciones de tablero/superficie\n' +
      catalog.countertops
        .map(
          (c) =>
            `- ${c.material}: S/${c.price_min_per_ml} – S/${c.price_max_per_ml} por ml`,
        )
        .join('\n'),
  )

  // Finishes
  sections.push(
    '## Acabados\n' +
      catalog.finishes.map((f) => `- ${f.name} (${f.texture})`).join('\n'),
  )

  return sections.join('\n\n')
}
