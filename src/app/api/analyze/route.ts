import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { fetchCatalog, catalogToPromptContext } from '@/lib/catalog'
import type { AnalysisResult } from '@/types/analysis'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { image, instruction } = (await req.json()) as { image: string; instruction: string }

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    if (!instruction?.trim()) {
      return NextResponse.json({ error: 'Describe que quieres hacer en tu espacio' }, { status: 400 })
    }

    // Extract base64 data and media type
    const match = image.match(/^data:(image\/\w+);base64,(.+)$/)
    if (!match) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 })
    }
    const [, mimeType, base64Data] = match

    // Fetch catalog for prompt context
    const catalog = await fetchCatalog()
    const catalogContext = catalogToPromptContext(catalog)

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `Eres un cotizador de muebles de melamina de un taller en Lima, Peru. Tu trabajo es analizar la foto del espacio del cliente y responder SOLO a lo que el cliente pide.

# Lo que el cliente quiere
"${instruction.trim()}"

# Reglas estrictas
- SOLO propone muebles que el cliente pidio. No inventes ni agregues muebles extra.
- Si el cliente pide algo que NO se puede hacer en melamina (ej. sillas, camas, sofas), indicalo en recommendations y NO lo incluyas en items.
- Usa UNICAMENTE materiales, colores, acabados y herrajes del catalogo de abajo. Si no existe en el catalogo, no lo uses.
- Estima dimensiones basandote en lo que ves en la foto (paredes, espacios vacios, muebles existentes como referencia).
- Los precios deben estar dentro de los rangos del catalogo. No inventes precios.
- Si no puedes determinar algo con certeza, dilo en recommendations.

# Catalogo disponible (SOLO usar estos materiales)
${catalogContext}

# Formato de respuesta
Responde UNICAMENTE con JSON valido (sin markdown, sin backticks):
{
  "summary": "Que veo en la foto y que propongo hacer segun lo que pide el cliente",
  "items": [
    {
      "name": "Nombre del mueble",
      "category": "cocina|dormitorio|oficina|bano|sala",
      "dimensions": "largo x alto x profundidad en cm",
      "material": "Marca exacta del catalogo",
      "color": "Color exacto del catalogo con codigo si existe",
      "finish": "Acabado exacto del catalogo",
      "hardware": ["herraje exacto del catalogo"],
      "estimated_price_min": 0,
      "estimated_price_max": 0
    }
  ],
  "total_min": 0,
  "total_max": 0,
  "recommendations": ["observaciones honestas sobre viabilidad, limitaciones o alternativas"]
}`

    const response = await model.generateContent([
      prompt,
      { inlineData: { mimeType, data: base64Data } },
    ])

    const text = response.response.text()
    const result: AnalysisResult = JSON.parse(text)

    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Analysis failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
