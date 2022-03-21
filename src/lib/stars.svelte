<script>
    export let stars = 5; // 5-stars review by default
    
    const loadStars = () => {
        if (stars === 0) return false
        stars--;
        return true
    }
</script>

<span class:text-yellow-400={loadStars()} class="material-icons">star</span>
<span class:text-yellow-400={loadStars()} class="material-icons">star</span>
<span class:text-yellow-400={loadStars()} class="material-icons">star</span>
<span class:text-yellow-400={loadStars()} class="material-icons">star</span>
<span class:text-yellow-400={loadStars()} class="material-icons">star</span>