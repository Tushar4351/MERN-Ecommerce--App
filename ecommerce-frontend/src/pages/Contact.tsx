import Breadcrumb from "@/components/Shared/Breadcrumb";
import { Button } from "@/components/ui/button";


const Contact = () => {
  return (
    <div>
      <div className="mt-12">
        <Breadcrumb pageName="Home" currentPage="Contact Us" />
      </div>
      <div className="flex flex-col max-w-5xl mx-auto w-full md:flex-row justify-between items-center p-6 md:p-12">
        <div className="md:w-1/2 text-center md:text-left flex flex-col md:gap-10 mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">
            Need any help? <br /> we're here for you.
          </h2>
          <div className="mb-4">
            <p className="font-medium">CALL US</p>
            <p>+96746737637</p>
            <p>+96746737637</p>
          </div>
          <div>
            <p className="font-medium">MAIL</p>
            <p>hello@NexCartia.com</p>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <form className="p-6 rounded-lg space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border bg-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-150"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border bg-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-150"
            />
            <textarea
              placeholder="Message"
              className="w-full p-3 border bg-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-150"
              rows={4}
            />
            <Button type="submit" className="w-full text-white py-3 rounded-md">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
