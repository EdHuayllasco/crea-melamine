import Image from 'next/image'
import { ABOUT_HIGHLIGHTS } from '@/constants/site'

export function About() {
  return (
    <section id="nosotros" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Sobre Nosotros</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Somos un equipo de profesionales apasionados por la fabricacion de muebles de
              melamina. Con mas de 15 anos de experiencia, hemos transformado cientos de espacios en
              Lima.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {ABOUT_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <svg
                    className="text-primary mt-0.5 h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-xl lg:aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="Taller de Crea Melamine"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
