<div class="w-full mt-9 bg-white dark:bg-dark-bg">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div class="text-center pb-12">
            <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-800 dark:text-light-header">
                Where to find us?        
            </h1>
            <div id="map" class="dark:invert-[90%]">
                <iframe class="frame" src={import.meta.env.VITE_EMBED_LOCATION_SRC} width="100%" height="400" allowfullscreen="false" loading="lazy"></iframe>
            </div>
        </div>
    </section>
</div>

<style>
    #map {
        margin-top: 2.5rem;
  height: 400px;
  /* The height is 400 pixels */
  width: 100%;
  /* The width is the width of the web page */
}
iframe {
    border-radius:10px; 
}
</style>