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

    context.drawImage(images[0],0,0); // draw background
    // base positions
    for (let base = 100; deal.pizza > 0; base -= 30) {
        context.drawImage(images[2],base,20); // draw pizza
        deal.pizza--;
    }
    for (let base = 30; deal.mpizza > 0; base += 30) {
        context.drawImage(images[7],base,50); // draw medium pizza
        deal.mpizza--;
    }
    for (let base = 110; deal.spizza > 0; base -= 30) {
        context.drawImage(images[8],base,100); // draw small pizza
        deal.spizza--;
    }
    for (let base = 180; deal.drink > 0; base += 30) {
        context.drawImage(images[3],base,20); // draw drink
        deal.drink--;
    }
    for (let base = 200; deal.sdrink > 0; base += 30) {
        context.drawImage(images[9],base,120); // draw small drink
        deal.sdrink--;
    }
    for (let base = 30; deal.nuggets > 0; base += 30) {
        context.drawImage(images[4],base,90); // draw nuggets
        deal.nuggets--;
    }
    for (let base = 90; deal.hotwings > 0; base -= 30) {
        context.drawImage(images[1],base,190); // draw hotwings
        deal.hotwings--;
    }
    for (let base = 240; deal.zinger > 0; base += 30) {
        context.drawImage(images[5],base,150); // draw zinger
        deal.zinger--;
    }
    for (let base = 270; deal.fries > 0; base += 30) {
        context.drawImage(images[6],base,20); // draw fries
        deal.fries--;
    }

    this.img.setAttribute("src", this.canvas.toDataURL("img/png")); // populate source of provided blank image
}


}