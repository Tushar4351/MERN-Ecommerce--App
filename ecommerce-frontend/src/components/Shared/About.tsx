
import { Button } from '../ui/button'
import aboutImage from "../../assets/images/about.jpg";
const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-8 px-4 md:px-8">
    <div className="md:w-1/2 mb-8 md:mb-0">
      <img src={aboutImage} alt="About" className="w-full h-auto" />
    </div>
    <div className="md:w-1/2 lg:ml-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">About Our Website</h2>
        <ul className="list-disc ml-6">
          <li>Electronics: Wide range of consumer electronics</li>
          <li>Health Care: Medical supplies and equipment</li>
          <li>All Products: Comprehensive product catalog</li>
        </ul>
      </div>

      <div>
        <Button className="bg-green-150 hover:bg-green-150/80">
          Learn More
        </Button>
      </div>
    </div>
  </div>
  )
}

export default About