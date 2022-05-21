export default class Canva {



    constructor(canvas, img, deal) {
        this.canvas = canvas;
        this.img = img;
        this.deal = deal;
        
        canvas.width = 400;
        canvas.height = 250;

    }
    

// function called once all images have loaded.
loadDeal (images) {
    let context = this.canvas.getContext('2d');
    
    let deal = this.deal;
    const cond = Object.keys(deal).length === 1;
    let base = 140;
    let alt = 40;


    context.drawImage(images[0],0,0); // draw background
    // base positions
    for (cond ? base : base = 100; deal.pizza > 0; base -= 30) {
        context.drawImage(images[2],base, cond ? alt : alt = 20); // draw pizza
        deal.pizza--;
    }
    for (cond ? base : base = 30; deal.mpizza > 0; base += 30) {
        context.drawImage(images[7],base, cond ? alt : alt = 50); // draw medium pizza
        deal.mpizza--;
    }
    for (cond ? base : base = 110; deal.spizza > 0; base -= 30) {
        context.drawImage(images[8],base, cond ? alt : alt = 100); // draw small pizza
        deal.spizza--;
    }
    for (cond ? base : base = 180; deal.drink > 0; base += 30) {
        context.drawImage(images[3],base, cond ? alt : alt = 20); // draw drink
        deal.drink--;
    }
    for (cond ? base : base = 200; deal.sdrink > 0; base += 30) {
        context.drawImage(images[9],base, cond ? alt : alt = 120); // draw small drink
        deal.sdrink--;
    }
    for (cond ? base : base = 30; deal.nuggets > 0; base += 30) {
        context.drawImage(images[4],base, cond ? alt : alt = 90); // draw nuggets
        deal.nuggets--;
    }
    for (cond ? base : base = 90; deal.hotwings > 0; base -= 30) {
        context.drawImage(images[1],base, cond ? alt : alt = 190); // draw hotwings
        deal.hotwings--;
    }
    for (cond ? base : base = 240; deal.zinger > 0; base += 30) {
        context.drawImage(images[5],base, cond ? alt : alt = 150); // draw zinger
        deal.zinger--;
    }

    for (cond ? base : base = 270; deal.fries > 0; base += 30) {
        context.drawImage(images[6],base, cond ? alt : alt = 20); // draw fries
        deal.fries--;
    }

    this.img.setAttribute("src", this.canvas.toDataURL("img/png")); // populate source of provided blank image
}


    // returns all items
    static getProperties() {
        return [
            {
                name: 'Large Pizza',
                val: 'pizza'
            },
            {
                name: 'Medium Pizza',
                val: 'mpizza'
            },
            {
                name: 'Small Pizza',
                val: 'spizza'
            },
            {
                name: 'Soda Can',
                val: 'sdrink'
            },
            {
                name: 'Cold Drink',
                val: 'drink'
            },
            {
                name: 'Nuggets',
                val: 'nuggets'
            },
            {
                name: 'Hotwings',
                val: 'hotwings'
            },
            {
                name: 'Burger',
                val: 'zinger'
            },
            {
                name: 'Fries',
                val: 'fries'
            },
        ]
    }

}