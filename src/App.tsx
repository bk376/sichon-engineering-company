import Header from './components/Header'
import BuildJourney from './components/BuildJourney'
import Gap from './components/Gap'
import Aspiration from './components/Aspiration'
import Manifesto from './components/Manifesto'
import Services from './components/Services'
import Values from './components/Values'
import Process from './components/Process'
import Brief from './components/Brief'
import Contact from './components/Contact'
import MobileCTA from './components/MobileCTA'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <BuildJourney />
        <Gap />
        <Aspiration />
        <Manifesto />
        <Services />
        <Values />
        <Process />
        <Brief />
      </main>
      <Contact />
      <MobileCTA />
    </>
  )
}
