<!--
This file is meant to generate thumbnails for palettes. It has bad code, and uses deprecated functions, and is simply only meant to work on my personal browser and dev environment.
-->

<style>
* {
    margin: 0;
    padding: 0;
}
section {
    width: 33.33%;
    height: 50vh;
    display: block;
    float: left;
    background-size: cover;
    background-blend-mode: screen, screen;
    background-position: center;
    position: relative;
}
section div {
    position: absolute;
    bottom: 1.25rem;
    right: 1.25rem;
    width: 5rem;
    height: 5rem;
    border-radius: 4px;
    background-color: var(--color);
    box-shadow: 0 0 1rem var(--color);
    border: .15rem solid #fff;
    opacity: 1;
    display: none;
}
</style>

<?php
if(isset($_GET["p"])) {
    echo "<script src='" . $_GET["p"] . "'></script>";
}
?>

<script src="/assets/js/vendors/psbc.js"></script>
<script>
colors.forEach((color) => {
    document.write("<section style='background-image: linear-gradient(to bottom right, " + pSBC ( 0, color.hex + "99", "c" ) +  "," + pSBC ( 0, color.hex + "99", "c" ) + "), url(" + color.imagePath + ");'><div style='--color: " + color.hex + "; --dark-color: " + pSBC(-.5, color.hex) + "'></div></section>");
});
</script>