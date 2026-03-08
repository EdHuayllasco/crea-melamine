import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'
import { STATS } from '@/constants/site'

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="bg-muted/30 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-wider">
              Fabricacion de muebles de melamina
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Transformamos espacios con{' '}
              <span className="text-primary">muebles unicos</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg">
              Disenamos y fabricamos muebles de melamina personalizados para tu hogar u oficina.
              Calidad, precision y diseno en cada proyecto.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#contacto" className={cn(buttonVariants({ size: 'lg' }))}>
                Solicitar Cotizacion
              </a>
              <a href="#galeria" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}>
                Ver Proyectos
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
