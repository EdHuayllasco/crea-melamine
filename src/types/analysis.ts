export interface FurnitureItem {
  name: string
  category: string
  dimensions: string
  material: string
  color: string
  finish: string
  hardware: string[]
  estimated_price_min: number
  estimated_price_max: number
}

export interface AnalysisResult {
  summary: string
  items: FurnitureItem[]
  total_min: number
  total_max: number
  recommendations: string[]
}
