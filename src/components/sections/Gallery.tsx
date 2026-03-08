'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '@/constants/site'

export function Gallery() {
  const [active, setActive] = useState<string>('Todos')

  const filtered =
    active === 'Todos' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === active)

  return (
    <section id="galeria" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Galeria de Proyectos</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Conoce algunos de nuestros trabajos realizados
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={active === cat ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 transition-colors"
              onClick={() => setActive(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card key={item.title} className="group relative overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="font-semibold text-white">{item.title}</p>
                <div className="mt-1 flex gap-2">
                  <Badge variant="default" className="text-xs">
                    {item.category}
                  </Badge>
                  {item.featured && (
                    <Badge variant="secondary" className="text-xs">
                      Destacado
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
