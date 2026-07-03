import Header from './components/Header'
import Hero from './components/Hero'
import Mission from './components/Mission'
import Services from './components/Services'
import Values from './components/Values'
import Process from './components/Process'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Mission />
        <Services />
        <Values />
        <Process />
      </main>
      <Contact />
    </>
  )
}
