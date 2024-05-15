import React from 'react'
const testimonials = [
    {
      name: "Luisa",
      rating: 4,
      quote: "I love it! No more air fresheners",
    },
    {
      name: "Edoardo",
      rating: 5,
      quote: "Raccomended for everyone",
    },
    {
      name: "Mart",
      rating: 4,
      quote: "Looks very natural, the smell is awesome",
    },
  ];
const Testimonials = () => {
  return (
    <div className="bg-green-150/20 py-12 rounded-xl">
    <h2 className="text-center text-2xl font-bold mb-8">Testimonials</h2>
    <p className="text-center text-gray-600 mb-12">
      Some quotes from our happy customers
    </p>
    <div className="flex flex-wrap justify-center gap-6">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 w-80 "
        >
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 rounded-full p-2 mr-2">
              <img
                src={`https://ui-avatars.com/api/?name=${testimonial.name}&background=random`}
                alt={testimonial.name}
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div>
              <p className="font-bold">{testimonial.name}</p>
              <div className="flex items-center">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <span key={i} className="text-yellow-400">
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-700">"{testimonial.quote}"</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Testimonials