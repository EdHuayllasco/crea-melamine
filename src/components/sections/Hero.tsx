import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { STATS } from '@/constants/site'

const statIcons = [
  // Star
  <svg key="star" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>,
  // People
  <svg key="people" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>,
  // Badge/check
  <svg key="badge" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>,
]

export function Hero() {
  return (
    <section id="inicio" className="bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-8rem)] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          {/* Left: text */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Disenamos y construimos muebles unicos
            </h1>
            <p className="text-muted-foreground mt-6 max-w-lg text-lg leading-relaxed">
              Especialistas en muebles de melamina de alta calidad. Desde el diseno hasta la
              instalacion, creamos espacios funcionales y elegantes para tu hogar u oficina.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#galeria" className={cn(buttonVariants({ size: 'lg' }), 'gap-2 rounded-xl px-6')}>
                Ver Catalogo
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a href="#contacto" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'rounded-xl px-6')}>
                Solicitar Presupuesto
              </a>
            </div>

            <div className="mt-10 border-t pt-8">
              <div className="grid grid-cols-3 gap-4">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <div className="text-muted-foreground flex items-center gap-1.5">
                      {statIcons[i]}
                      <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative hidden overflow-hidden rounded-2xl lg:block" style={{ aspectRatio: '4/5' }}>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85"
              alt="Muebles de melamina Crea Melamine"
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
