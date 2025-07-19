import Header from './components/home/header/Header.jsx'
import About from './components/home/about/About.jsx'
import Vision from './components/home/vision/Vision.jsx'
import Mission from './components/home/mission/Mission.jsx'
import SecretsOfSuccess from './components/home/secretsOfSuccess/secretsOfSuccess.jsx'
import Partners from './components/home/partners/Partners.jsx'
import LatestPosts from './components/home/latestPosts/LatestPosts.jsx'

function App() {
  return (
    <div className="bg-[#f8f9fa]">
      <Header />
      <About />
      <Vision />
      <Mission />
      <SecretsOfSuccess />
      <Partners />
      <LatestPosts />
    </div>
  )
}

export default App
