import Header from './header/Header.jsx'
import About from './about/About.jsx'
import Vision from './vision/Vision.jsx'
import Mission from './mission/Mission.jsx'
import SecretsOfSuccess from './secretsOfSuccess/secretsOfSuccess.jsx'
import Partners from './partners/Partners.jsx'
import LatestPosts from './latestPosts/LatestPosts.jsx'
import Contact from './contact/Contact.jsx'
import Footer from './footer/Footer.jsx'

const Home = () => {
    return (
        <div className="bg-[#f8f9fa]">
            <Header />
            <About />
            <Vision />
            <Mission />
            <SecretsOfSuccess />
            <Partners />
            <LatestPosts />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home;