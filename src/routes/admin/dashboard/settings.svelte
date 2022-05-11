<div id="menu" class="mt-12 container mx-auto px-4 lg:pt-24 lg:pb-64">
    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">
        <h2 class="text-4xl font-semibold text-black">Settings</h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
            This page contains a few options you can change to make the front-end of your website to look the way prefer. Make sure to Save the settings before logging out
        </p>
  
        </div>

        <div class="w-full mt-4 px-4 py-4">
            <div class="flex px-2 py-2 border-t border-gray-300">
                <div class="flex-3-4 p-2 text-left mt-4">
                    <div class="text-lg text-gray-700 font-semibold">
                        Max Deals
                    </div>
                    <div class="text-md text-gray-500 font-normal">
                        Represents number of deals to show on your website's home page. Number can only be between 3 and the total number of deals.
                    </div>    
                </div>
                <div class="flex-1-4 p-3-0 text-md">
                    <input class="w-100 border border-gray-300 rounded text-center p-2 outline outline-1 outline-offset-2 outline-cyan-500 focus:outline-blue-500" 
                        type="number" min="3" value="3">
                </div>
            </div>

            <div class="flex px-2 py-2 border-t border-gray-300">
                <div class="flex-3-4 p-2 text-left mt-4">
                    <div class="text-lg text-gray-700 font-semibold">
                        Max Reviews
                    </div>
                    <div class="text-md text-gray-500 font-normal">
                        Represents number of reviews to show on your website's home page. Number can only be between 3 and the total number of reviews.
                    </div>    
                </div>
                <div class="flex-1-4 p-3-0 text-md">
                    <input class="w-100 border border-gray-300 rounded text-center p-2 outline outline-1 outline-offset-2 outline-cyan-500 focus:outline-blue-500" 
                        type="number" min="3" value="3">
                </div>
            </div>



            <div class="flex px-2 py-2 border-t border-gray-300">
                <div class="flex-3-4 p-2 text-left mt-4">
                    <div class="text-lg text-gray-700 font-semibold">
                        Opening Hour
                    </div>
                    <div class="text-md text-gray-500 font-normal">
                        Specify the local hour (24-hour format) when your restaurant opens.
                    </div>    
                </div>
                <div class="flex-1-4 p-3-0 text-md">
                    <select class="w-100 border border-gray-300 bg-gray-100 rounded text-center p-2 outline outline-1 outline-offset-2 outline-cyan-500 focus:outline-blue-500">
                        <option value="1">1 AM</option>
                        <option value="2">2 AM</option>
                        <option value="3">3 AM</option>
                        <option value="4">4 AM</option>
                        <option value="5">5 AM</option>
                        <option value="6">6 AM</option>
                        <option value="7">7 AM</option>
                        <option value="8">8 AM</option>
                        <option value="9">9 AM</option>
                        <option value="10">10 AM</option>
                        <option value="11">11 AM</option>
                        <option value="12">12 AM</option>
                    </select>
                </div>
            </div>

            <div class="flex px-2 py-2 border-t border-gray-300">
                <div class="flex-3-4 p-2 text-left mt-4">
                    <div class="text-lg text-gray-700 font-semibold">
                        Closing Hour
                    </div>
                    <div class="text-md text-gray-500 font-normal">
                        Specify the local hour (24-hour format) when your restaurant closes. Customers will not ab able to order between these hours.
                    </div>    
                </div>
                <div class="flex-1-4 p-3-0 text-md">
                    <select class="w-100 border border-gray-300 bg-gray-100 rounded text-center p-2 outline outline-1 outline-offset-2 outline-cyan-500 focus:outline-blue-500">
                        <option value="1">1 PM</option>
                        <option value="2">2 PM</option>
                        <option value="3">3 PM</option>
                        <option value="4">4 PM</option>
                        <option value="5">5 PM</option>
                        <option value="6">6 PM</option>
                        <option value="7">7 PM</option>
                        <option value="8">8 PM</option>
                        <option value="9">9 PM</option>
                        <option value="10">10 PM</option>
                        <option value="11">11 PM</option>
                        <option value="12">12 PM</option>
                    </select>
                </div>
            </div>

            <div class="flex px-2 py-2 border-t border-gray-300">
                <div class="flex-3-4 p-2 text-left mt-4">
                    <div class="text-lg text-gray-700 font-semibold">
                        Delivery Charges
                    </div>
                    <div class="text-md text-gray-500 font-normal">
                        This amount will be automatically added to the bill when someone places an order.
                    </div>    
                </div>
                <div class="flex-1-4 p-3-0 text-md">
                    <input class="w-100 border border-gray-300 rounded text-center p-2 outline outline-1 outline-offset-2 outline-cyan-500 focus:outline-blue-500" 
                        type="number" min="0" value="3">
                </div>
            </div>

        </div>

    </div>
</div>

<style>
    .flex-3-4 {
        flex: 3 1 0;
    }
    .flex-1-4 {
        flex: 1 1 0;
    }
    .p-3-0 {
        padding: 3rem 0;
    }
    input, select {
        width: clamp(30px, 100%, 100%);
    }
</style>