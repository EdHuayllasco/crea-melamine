// Database catalog types — mirrors Supabase schema

export interface Brand {
  id: number
  name: string
  country: string
  quality_tier: 'economy' | 'mid-range' | 'premium'
  substrate_types: string[]
  notes: string | null
}

export interface MelamineColor {
  id: number
  brand_id: number
  name: string
  code: string | null
  category: 'blanco' | 'madera_clara' | 'madera_media' | 'madera_oscura' | 'color_solido' | 'piedra_fantasia'
  finish: string
}

export interface BoardThickness {
  id: number
  thickness_mm: number
  substrate: string
  primary_uses: string[]
  notes: string | null
}

export interface HardwareBrand {
  id: number
  name: string
  country: string
  quality_tier: 'economy' | 'mid-range' | 'premium'
  product_types: string[]
  notes: string | null
}

export interface HardwareType {
  id: number
  category: 'bisagra' | 'corredera' | 'piston' | 'jaladera' | 'soporte'
  name: string
  description: string | null
  price_range_min: number
  price_range_max: number
  recommended_brands: string[]
}

export interface EdgeBanding {
  id: number
  material: string
  thickness_mm: number
  use_case: string
  notes: string | null
}

export interface FurnitureType {
  id: number
  name: string
  category: string
  typical_materials: string[]
  common_thicknesses_mm: number[]
  price_range_min: number
  price_range_max: number
  description: string | null
}

export interface CountertopOption {
  id: number
  material: string
  price_min_per_ml: number
  price_max_per_ml: number
  popularity: string
  pros: string[]
  cons: string[]
  notes: string | null
}

export interface Finish {
  id: number
  name: string
  texture: string
  available_in: string[]
  notes: string | null
}

export interface CatalogData {
  brands: Brand[]
  colors: MelamineColor[]
  thicknesses: BoardThickness[]
  hardwareBrands: HardwareBrand[]
  hardwareTypes: HardwareType[]
  edgeBanding: EdgeBanding[]
  furnitureTypes: FurnitureType[]
  countertops: CountertopOption[]
  finishes: Finish[]
}
