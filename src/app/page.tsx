import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { Gallery } from '@/components/sections/Gallery'
import { About } from '@/components/sections/About'
import { SpaceAnalyzer } from '@/components/sections/SpaceAnalyzer'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Process />
        <About />
        <SpaceAnalyzer />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
