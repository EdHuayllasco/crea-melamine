import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SERVICES } from '@/constants/site'

export function Services() {
  return (
    <section id="servicios" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nuestros Servicios</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Soluciones completas en muebles de melamina para cada espacio
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <Card key={service.title} className="overflow-hidden">
              <div className="relative aspect-video w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="#contacto" className="text-primary text-sm font-medium hover:underline">
                  Solicitar cotizacion &rarr;
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
