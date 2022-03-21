// import db

export async function get() {
    // connect to db to fetch & parse data

    
let dealArray = [
  {
      id: 0,
      title: "Today's Special",
      price: 1350,
      discount: 20,
      content: [
          "1 Large Pizza",
          "10 Hot Wings",
          "1.5 litre drink"
      ],
      deal: {
          hotwings: 1,
          pizza: 1,
          drink: 1
      }
  },
  {
      id: 1,
      title: "Regular Deal 1",
      price: 1600,
      discount: 10,
      content: [
          "1 Large Pizza",
          "1 Medium Pizza",
          "1.5 litre drink"
      ],
      deal: {
          pizza: 1,
          mpizza: 1,
          drink: 1
      }
  },
  {
      id: 2,
      title: "Regular Deal 2",
      price: 1050,
      discount: 15,
      content: [
          "1 Medium Pizza",
          "10 Hot Wings",
          "1 litre drink"
      ],
      deal: {
          hotwings: 1,
          mpizza: 1,
          drink: 1
      }
  },
  {
      id: 3,
      title: "Regular Deal 3",
      price: 1850,
      discount: 25,
      content: [
          "2 Large Pizza",
          "1.5 litre drink"
      ],
      deal: {
          pizza: 2,
          drink: 1
      }
  },
  {
      id: 4,
      title: "Banger Deal 1",
      price: 3300,
      discount: 9,
      content: [
          "2 Large Pizza",
          "3 Zinger Burgers",
          "20 Hot wings",
          "1.5 litre drinks (2)"
      ],
      deal: {
          hotwings: 2,
          pizza: 2,
          drink: 2,
          zinger: 3
      }
  },
  {
      id: 5,
      title: "Banger Deal 2",
      price: 5300,
      discount: 18,
      content: [
          "3 Large Pizza",
          "20 Chicken Nuggets",
          "1.5 litre drinks (3)",
          "5 Zinger Burgers",
          "2 Family Fries"
      ],
      deal: {
          hotwings: 1,
          pizza: 3,
          drink: 3,
          nuggets: 2,
          zinger: 5,
          fries: 2
      }
  },
  {
      id: 6,
      title: "Banger Deal 3",
      price: 4500,
      discount: 20,
      content: [
          "3 Large Pizza",
          "20 Chicken Nuggets",
          "1 litre drink (2)",
          "2 Zinger Burgers",
          "1 Family Fries"
      ],
      deal: {
          pizza: 3,
          sdrink: 2,
          nuggets: 2,
          zinger: 2,
          fries: 1
      }
  },
  {
      id: 7,
      title: "Special Deal 1",
      price: 2300,
      discount: 10,
      content: [
          "1 Large Pizza",
          "1 Medium Pizza",
          "1 Family Fries",
          "1.5 litr drink"
      ],
      deal: {
          pizza: 1,
          mpizza: 1,
          drink: 1,
          fries: 1,
      }
  },
  {
      id: 8,
      title: "Special Deal 2",
      price: 2600,
      discount: 12,
      content: [
          "1 Large Pizza",
          "20 Chicken Nuggets",
          "1.5 litre drink",
          "2 Zinger Burgers"
      ],
      deal: {
          pizza: 1,
          drink: 1,
          nuggets: 2,
          zinger: 2
      }
  }
];


let reviews = [
    {
        title: "Muhammad Iqbal",
        stars: 3,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        title: "Ali Janjua",
        stars: 4,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        title: "Wajiha Sahreen",
        stars: 4,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        title: "Hurairah Randhawa",
        stars: 4,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        title: "Zafar Iqbal Raja",
        stars: 2,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        title: "Rabbia Naz",
        stars: 5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
];

    return {
        status: 200,
        body: { dealArray, reviews } 
    }
    
  
  }