import Header from './components/Header'
import BuildJourney from './components/BuildJourney'
import Services from './components/Services'
import ToolsHub from './components/ToolsHub'
import Desk from './components/Desk'
import Standard from './components/Standard'
import Brief from './components/Brief'
import Contact from './components/Contact'
import MobileCTA from './components/MobileCTA'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <BuildJourney />
        <Services />
        <ToolsHub />
        <Desk />
        <Standard />
        <Brief />
      </main>
      <Contact />
      <MobileCTA />
    </>
  )
}
