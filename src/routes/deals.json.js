// import db

export async function get() {
    // connect to db to fetch & parse data
   
    const products = [
      {
        id: "00-00",
        title: "Chicken Tikka",
        priceS: 400, priceM: 650, priceL: 950,
        img: ""
      },
      {
        id: "00-01",
        title: "Chicken Fajita",
        priceS: 400, priceM: 650, priceL: 950,
        img: ""
      },
      {
        id: "00-02",
        title: "Fajia Sicilian",
        priceS: 400, priceM: 650, priceL: 950,
        img: ""
      },
      {
        id: "00-03",
        title: "Hot n Spicy",
        priceS: 400, priceM: 650, priceL: 950,
        img: ""
      },
      {
        id: "00-04",
        title: "Chicken Achari",
        priceS: 400, priceM: 650, priceL: 950,
        img: ""
      },
      {
        id: "00-05",
        title: "Chicken Tikka",
        priceS: 400, priceM: 650, priceL: 950,
        img: ""
      },
      {
        id: "00-06",
        title: "Veggie Lover",
        priceS: 400, priceM: 650, priceL: 950,
        img: ""
      },
      {
        id: "00-07",
        title: "Cheese Lover",
        priceS: 450, priceM: 750, priceL: 1050,
        img: ""
      },
      {
        id: "01-00",
        title: "Bonefire Pizza",
        priceS: 400, priceM: 650, priceL: 950,
        img: ""
      },
      {
        id: "01-01",
        title: "Super Supreme",
        priceS: 450, priceM: 750, priceL: 1050,
        img: ""
      },
      {
        id: "01-02",
        title: "Chicken Kebab",
        priceS: 450, priceM: 750, priceL: 1050,
        img: ""
      },
      {
        id: "01-03",
        title: "Creamy Pizza",
        priceS: 450, priceM: 750, priceL: 1050,
        img: ""
      },
      {
        id: "01-04",
        title: "Pepperoni Pizza",
        priceS: 450, priceM: 750, priceL: 1050,
        img: ""
      },
      {
        id: "01-05",
        title: "Extreme Pizza",
        priceS: 450, priceM: 750, priceL: 1050,
        img: ""
      },
      {
        id: "01-06",
        title: "Garlic Pizza",
        priceS: 450, priceM: 750, priceL: 1050,
        img: ""
      },
      {
        id: "01-07",
        title: "Chapli Pizza",
        priceS: 450, priceM: 750, priceL: 1050,
        img: ""
      },
      {
        id: "02-00",
        title: "Chicken Hotwings",
        priceS: 250, priceM: 550, priceL: 850,
        img: ""
      },
      {
        id: "02-01",
        title: "Chicken Nuggets",
        priceS: 210, priceM: 510, priceL: 810,
        img: ""
      },
      // statics
      ,
      {
        id: "03-00",
        title: "Zinger Burger",
        price: 450,
        img: ""
      },
      {
        id: "03-01",
        title: "500 ml drink",
        price: 50,
        img: ""
      },
      {
        id: "03-02",
        title: "1 litre drink",
        price: 70,
        img: ""
      },
      {
        id: "03-03",
        title: "1.5 litre drink",
        price: 100,
        img: ""
      },
      {
        id: "03-04",
        title: "French Fries",
        price: 150,
        img: ""
      }
    ]
  
    return {
        status: 200,
        body: { products } 
    }
    
  
  }