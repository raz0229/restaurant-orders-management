<script>
import { browser } from "$app/env";
import Canva from "./deals";

let deal1 = {
    hotwings: 1,
    pizza: 1,
    mpizza: 1,
    spizza: 1,
    drink: 1,
    nuggets: 1,
    zinger: 1,
    fries: 1
};

if (browser) {
    
    const canva = new Canva(document.querySelector('#canvas1'),document.querySelector("#canvasimg1"));

    let imageURL = ["deal-template.jpg","hotwings.png", "pizza.png", "drink.png", "nuggets.png", "zinger.png", "fries.png", "mpizza.png", "spizza.png"]; // list of image URLs
    const images = []; /// array to hold images.
    let imageCount = 0; // number of loaded images;

    imageURL.forEach(src => { 
         const image = new Image();
         image.src = src;
         image.onload = ()=>{ 
             imageCount++;
             if(imageCount === imageURL.length){ // have all loaded?

                 canva.loadDeal(images, deal1); // start rendering`
             }
         }
         images.push(image);
    });
}

</script>

<!-- Generating images via canvas -->
<canvas id="canvas1" class="hidden" width="400" height="250"></canvas>
<canvas id="canvas2" class="hidden"></canvas>
<canvas id="canvas3" class="hidden"></canvas>
<canvas id="canvas4" class="hidden"></canvas>
<canvas id="canvas5" class="hidden"></canvas>
<canvas id="canvas6" class="hidden"></canvas>

<div class="w-full mt-9 bg-white dark:bg-gray-800">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div class="text-center pb-12">
            <h2 class="text-base font-bold text-indigo-600">
                Hottest deals that are updated daily
            </h2>
            <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-800 dark:text-white">
                Check our latest for the best price            
            </h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="relative w-full bg-gray-900 rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                <div class="ribbon font-bold text-white whitespace-no-wrap px-4">
                    <div class="label">20% OFF</div>
                </div>
                <div>
                    <img class="canva object-center object-cover h-auto w-full" id="canvasimg1" src="" alt="photo">
                </div>
                <div class="flex justify-between w-64">
                    <div class="py-8 sm:py-6">
                        <p class="text-xl text-white font-bold mb-2">Today's Special</p>
                        <ul class="list-disc">
                            <li class="text-base text-gray-400 font-normal">1 Large Pizza</li>
                            <li class="text-base text-gray-400 font-normal">10 Hot wings</li>
                            <li class="text-base text-gray-400 font-normal">1.5 litre drink</li>
                          </ul>
                    </div>
                    <div class="py-8 sm:py-6">
                        <p class="text-3xl text-white font-bold">1350</p>
                        <span class="text-base text-gray-400 font-normal">PKR</span>
                    </div>
                </div>
            </div>


            <div class="relative w-full bg-gray-900 rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                <div class="ribbon font-bold text-white whitespace-no-wrap px-4">
                    <div class="label">10% OFF</div>
                </div>
                <div>
                    <img class="object-center object-cover h-auto w-full" src="" alt="photo">
                </div>
                <div class="flex justify-between w-64">
                    <div class="py-8 sm:py-6">
                        <p class="text-xl text-white font-bold mb-2">Regular Deal 1</p>
                        <ul class="list-disc">
                            <li class="text-base text-gray-400 font-normal">1 Large Pizza</li>
                            <li class="text-base text-gray-400 font-normal">1 Medium Pizza</li>
                            <li class="text-base text-gray-400 font-normal">1.5 litre drink</li>
                          </ul>
                    </div>
                    <div class="py-8 sm:py-6">
                        <p class="text-3xl text-white font-bold">1600</p>
                        <span class="text-base text-gray-400 font-normal">PKR</span>
                    </div>
                </div>
            </div>


            <div class="relative w-full bg-gray-900 rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                <div class="ribbon font-bold text-white whitespace-no-wrap px-4">
                    <div class="label">15% OFF</div>
                </div>
                <div>
                    <img class="object-center object-cover h-auto w-full" src="" alt="photo">
                </div>
                <div class="flex justify-between w-64">
                    <div class="py-8 sm:py-6">
                        <p class="text-xl text-white font-bold mb-2">Regular Deal 2</p>
                        <ul class="list-disc">
                            <li class="text-base text-gray-400 font-normal">1 Medium Pizza</li>
                            <li class="text-base text-gray-400 font-normal">10 Hot wings</li>
                            <li class="text-base text-gray-400 font-normal">1 litre drink</li>
                          </ul>
                    </div>
                    <div class="py-8 sm:py-6">
                        <p class="text-3xl text-white font-bold">1050</p>
                        <span class="text-base text-gray-400 font-normal">PKR</span>
                    </div>
                </div>
            </div>


            <div class="relative w-full bg-gray-900 rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                <div class="ribbon font-bold text-white whitespace-no-wrap px-4">
                    <div class="label">25% OFF</div>
                </div>
                <div>
                    <img class="object-center object-cover h-auto w-full" src="" alt="photo">
                </div>
                <div class="flex justify-between w-64">
                    <div class="py-8 sm:py-6">
                        <p class="text-xl text-white font-bold mb-2">Regular Deal 3</p>
                        <ul class="list-disc">
                            <li class="text-base text-gray-400 font-normal">2 Large Pizza</li>
                            <li class="text-base text-gray-400 font-normal">1.5 litre drink</li>
                          </ul>
                    </div>
                    <div class="py-8 sm:py-6">
                        <p class="text-3xl text-white font-bold">1850</p>
                        <span class="text-base text-gray-400 font-normal">PKR</span>
                    </div>
                </div>
            </div>


            <div class="relative w-full bg-gray-900 rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                <div class="ribbon font-bold text-white whitespace-no-wrap px-4">
                    <div class="label">9% OFF</div>
                </div>
                <div>
                    <img class="object-center object-cover h-auto w-full" src="" alt="photo">
                </div>
                <div class="flex justify-between w-64">
                    <div class="py-8 sm:py-6">
                        <p class="text-xl text-white font-bold mb-2">Banger Deal 1</p>
                        <ul class="list-disc">
                            <li class="text-base text-gray-400 font-normal">2 Large Pizza</li>
                            <li class="text-base text-gray-400 font-normal">3 Zinger Burgers</li>
                            <li class="text-base text-gray-400 font-normal">20 Hot wings</li>
                            <li class="text-base text-gray-400 font-normal">1.5 litre drinks (2)</li>
                          </ul>
                    </div>
                    <div class="py-8 sm:py-6">
                        <p class="text-3xl text-white font-bold">3300</p>
                        <span class="text-base text-gray-400 font-normal">PKR</span>
                    </div>
                </div>
            </div>


            <div class="relative w-full bg-gray-900 rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
                <div class="ribbon font-bold text-white whitespace-no-wrap px-4">
                    <div class="label">18% OFF</div>
                </div>
                <div>
                    <img class="object-center object-cover h-auto w-full" src="" alt="photo">
                </div>
                <div class="flex justify-between w-64">
                    <div class="py-8 sm:py-6">
                        <p class="text-xl text-white font-bold mb-2">Banger Deal 2</p>
                        <ul class="list-disc">
                            <li class="text-base text-gray-400 font-normal">3 Large Pizza</li>
                            <li class="text-base text-gray-400 font-normal">20 Chicken Nuggets</li>
                            <li class="text-base text-gray-400 font-normal">1.5 litre drinks (3)</li>
                            <li class="text-base text-gray-400 font-normal">5 Zinger Burgers</li>
                            <li class="text-base text-gray-400 font-normal">2 Family Fries</li>
                          </ul>
                    </div>
                    <div class="py-8 sm:py-6">
                        <p class="text-3xl text-white font-bold">5300</p>
                        <span class="text-base text-gray-400 font-normal">PKR</span>
                    </div>
                </div>
            </div>

        </div>
    </section>
</div>

<style>
    .canva {
        width: 440px;
    }

.ribbon {
position: absolute;
display: block;
top: -4px;
right: 0;
width: 110px;
height: 110px;
overflow: hidden;
}

.ribbon .label {
position: relative;
display: block;
left: -20px;
top: 23px;
width: 158px;
padding: 10px 0;
font-size: 15px;
text-align: center;
color: #fff;
background-color: #e85e68;
-webkit-box-shadow: 0px 0px 4px rgba(0,0,0,0.3);
-moz-box-shadow: 0px 0px 4px rgba(0,0,0,0.3);
-ms-box-shadow: 0px 0px 4px rgba(0,0,0,0.3);
box-shadow: 0px 0px 4px rgba(0,0,0,0.3);
-webkit-transform: rotate(45deg) translate3d(0,0,0);
-moz-transform: rotate(45deg) translate3d(0,0,0);
-ms-transform: rotate(45deg) translate3d(0,0,0);
transform: rotate(45deg) translate3d(0,0,0);
}

.label:before, .label:after {
content: '';
position: absolute;
bottom: -4px;
border-top: 4px solid #a71c26;
border-left: 4px solid transparent;
border-right: 4px solid transparent;
}

.label:before {
left: 0;
}

.label:after {
right: 0;
}


</style>