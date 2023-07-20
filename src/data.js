const data = {
  images: Array.from({ length: 300 }, (_, index) => ({
    _id: index + 1,
    title: `Image ${index + 1}`,
    price: `${100 + index * 50}`,
    description:
      'In the sprawling metropolis, where skyscrapers reached for the heavens and neon lights bathed the streets in a kaleidoscope of colors, life pulsated with an electric energy. People from all walks of life mingled in a dance of diversity, their paths converging and diverging in a symphony of chaos. Street vendors enticed passersby with tantalizing aromas, while artists adorned walls with vivid murals that whispered stories of struggle and triumph. Amidst the hustle and bustle, dreams were born and dreams were shattered, as the relentless rhythm of the city pushed its inhabitants to their limits. Yet, amidst the chaos, hope lingered like a stubborn flame, refusing to be extinguished.',
    categories: ['Exploration and Production', 'Oil'],
    imageSrc: '/images/catbanner-01.jpg',
  })),
  user: {
    _id: 1,
    userId: 258147963,
    email: "test@test.com",
    firstName: "FirstNameTest",
    lastName: "LastNameTest",
    phone: 4447771112,
    address: "123 test",
    password: "abcDEF123$",
    like: [],
    cart: [],
  },
};

export default data;
