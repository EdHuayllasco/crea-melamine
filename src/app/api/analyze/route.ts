import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { fetchCatalog, catalogToPromptContext } from '@/lib/catalog'
import type { AnalysisResult } from '@/types/analysis'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { image } = (await req.json()) as { image: string }

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
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

    const prompt = `Eres un experto en muebles de melamina en Peru. Analiza esta foto de un espacio y recomienda muebles que podemos fabricar.

IMPORTANTE: Solo recomienda lo que realmente se puede fabricar con los materiales de nuestro catalogo. Se realista con dimensiones y precios.

# Catalogo disponible
${catalogContext}

# Instrucciones
1. Identifica cada mueble visible o que se podria agregar al espacio
2. Para cada mueble, especifica: nombre, categoria, dimensiones estimadas, material y color exacto del catalogo, acabado, herrajes necesarios, y rango de precio
3. Se especifico con los codigos de color y marcas del catalogo

Responde UNICAMENTE con JSON valido (sin markdown, sin backticks) con esta estructura:
{
  "summary": "Descripcion breve del espacio y lo que se puede hacer",
  "items": [
    {
      "name": "Nombre del mueble",
      "category": "cocina|dormitorio|oficina|bano|sala",
      "dimensions": "largo x alto x profundidad en cm",
      "material": "Marca y tipo de melamina",
      "color": "Color exacto del catalogo",
      "finish": "Acabado del catalogo",
      "hardware": ["herraje1", "herraje2"],
      "estimated_price_min": 0,
      "estimated_price_max": 0
    }
  ],
  "total_min": 0,
  "total_max": 0,
  "recommendations": ["consejo1", "consejo2"]
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
