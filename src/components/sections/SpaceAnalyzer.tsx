'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'
import type { AnalysisResult } from '@/types/analysis'

type Status = 'idle' | 'loading' | 'done' | 'error'

export function SpaceAnalyzer() {
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
      setResult(null)
      setError('')
      setStatus('idle')
    }
    reader.readAsDataURL(file)
  }

  async function analyze() {
    if (!preview) return
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: preview }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al analizar')
      }
      const data: AnalysisResult = await res.json()
      setResult(data)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
      setStatus('error')
    }
  }

  function reset() {
    setPreview(null)
    setResult(null)
    setError('')
    setStatus('idle')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <section id="analizador" className="bg-muted/40 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-muted-foreground mb-2 inline-block text-sm font-medium uppercase tracking-wider">
            Tecnologia IA
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Analiza tu Espacio
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
            Sube una foto de tu espacio y nuestra IA te recomendara los muebles ideales con
            materiales, colores y precios reales de nuestro catalogo.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Upload */}
          <div className="flex flex-col gap-4">
            {!preview ? (
              <label className="flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card transition-colors hover:border-primary/40">
                <svg className="text-muted-foreground mb-3 h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
                <p className="text-muted-foreground text-sm font-medium">
                  Haz clic o arrastra una foto de tu espacio
                </p>
                <p className="text-muted-foreground/60 mt-1 text-xs">JPG, PNG o WebP</p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </label>
            ) : (
              <div className="relative min-h-[320px] overflow-hidden rounded-2xl">
                <Image
                  src={preview}
                  alt="Espacio a analizar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}

            <div className="flex gap-3">
              {preview && status !== 'loading' && (
                <>
                  <button
                    onClick={analyze}
                    className={cn(buttonVariants({ size: 'lg' }), 'flex-1 gap-2 rounded-xl')}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                    Analizar Espacio
                  </button>
                  <button
                    onClick={reset}
                    className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'rounded-xl')}
                  >
                    Cambiar
                  </button>
                </>
              )}
              {status === 'loading' && (
                <div className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-card py-3 text-sm font-medium">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analizando tu espacio...
                </div>
              )}
            </div>

            {error && (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}
          </div>

          {/* Right: Results */}
          <div className="flex flex-col gap-4">
            {status === 'idle' && !result && (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-card p-8">
                <p className="text-muted-foreground text-center text-sm">
                  Los resultados del analisis apareceran aqui.
                </p>
              </div>
            )}

            {status === 'loading' && (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-card p-8">
                <div className="text-center">
                  <svg className="mx-auto mb-3 h-8 w-8 animate-spin text-muted-foreground" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-muted-foreground text-sm">Identificando muebles y calculando presupuesto...</p>
                </div>
              </div>
            )}

            {result && (
              <div className="flex flex-col gap-4">
                {/* Summary */}
                <div className="rounded-2xl bg-card p-6">
                  <p className="text-sm leading-relaxed">{result.summary}</p>
                </div>

                {/* Items */}
                {result.items.map((item, i) => (
                  <div key={i} className="rounded-2xl bg-card p-6">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <span className="text-muted-foreground text-xs uppercase tracking-wide">
                          {item.category} · {item.dimensions}
                        </span>
                      </div>
                      <span className="shrink-0 rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold">
                        S/{item.estimated_price_min} – S/{item.estimated_price_max}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Material:</span>{' '}
                        {item.material}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Color:</span>{' '}
                        {item.color}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Acabado:</span>{' '}
                        {item.finish}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Herrajes:</span>{' '}
                        {item.hardware.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Presupuesto Estimado Total</span>
                    <span className="text-xl font-bold">
                      S/{result.total_min.toLocaleString()} – S/{result.total_max.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <div className="rounded-2xl bg-card p-6">
                    <h4 className="mb-2 font-semibold">Recomendaciones</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-muted-foreground flex gap-2 text-sm">
                          <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <a
                  href="#contacto"
                  className={cn(buttonVariants({ size: 'lg' }), 'w-full gap-2 rounded-xl')}
                >
                  Solicitar Cotizacion Formal
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
