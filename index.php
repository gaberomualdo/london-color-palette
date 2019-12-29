<!DOCTYPE html>
<html lang="en">

<?php
$page_css_filename = "home";

include "assets/includes/app_variables.php";
include "assets/includes/head.php";

// parsedown for reading markdown into HTML
include "assets/php/vendors/Parsedown.php";
?>

<body>
    <div class="container">
        <div class="center-area">
            <nav class="center-area__topbar">
                <a class="center-area__topbar-logo">
                    <img src="assets/favicon/icon.png" alt="<?= $app_details["name"] ?> Logo">
                    <h1 class="center-area__topbar-logo-title"><?= $app_details["name"] ?></h1>
                    <p class="center-area__topbar-logo-description"><?= $app_details["description"] ?></p>
                </a>
            </nav>
            <div class="tabs tabs--show-cities">
                <ul class="tabs__tabselect">
                    <li class="tabs__tabselect-button tabs__tabselect-button--cities">Cities</li
                    ><li class="tabs__tabselect-button tabs__tabselect-button--colors">Colors</li
                    ><li class="tabs__tabselect-button tabs__tabselect-button--about">About</li>
                </ul>
                <div class="tabs__sections">
                    <div class="tabs__sections-section tabs__sections-section--cities">

                    </div>
                    <div class="tabs__sections-section tabs__sections-section--colors">

                    </div>
                    <div class="tabs__sections-section tabs__sections-section--about">
                        <?php
                            $Parsedown = new Parsedown();
                            echo $Parsedown->text(file_get_contents("assets/markdown/about.markdown"));
                        ?>
                    </div>
                </div>
                <p style="clear:both;"></p>
            </div>
            <footer class="footer">
                <p class="footer__credits">
                    Built by <a href="<?= $app_details["creator"]["url"] ?>" target="_blank"><?= $app_details["creator"]["name"] ?></a><em class="u-display-none-phone"> &larr; Check out his site!</em>
                </p>
            </footer>
        </div>
    </div>

    <!-- Scripts -->
    <script src="palettes.js"></script>
    <script src="/assets/js/home.js"></script>
</body>

</html>