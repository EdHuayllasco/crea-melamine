import { SITE, NAV_LINKS } from '@/constants/site'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">{SITE.name}</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Fabricamos muebles de melamina a medida con la mejor calidad y acabados profesionales.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Enlaces</h4>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Contacto</h4>
            <div className="text-muted-foreground flex flex-col gap-2 text-sm">
              <p>{SITE.phone.join(' | ')}</p>
              <p>{SITE.email}</p>
              <p>{SITE.location}</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-muted-foreground text-center text-sm">
          &copy; {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
