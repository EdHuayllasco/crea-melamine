import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PROCESS_STEPS } from '@/constants/site'

export function Process() {
  return (
    <section id="proceso" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nuestro Proceso</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            De la idea al mueble terminado en 4 simples pasos
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <Card key={step.step}>
              <CardHeader>
                <div className="bg-primary text-primary-foreground mb-2 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                  {step.step}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {step.items.map((item) => (
                    <li key={item} className="text-muted-foreground text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
