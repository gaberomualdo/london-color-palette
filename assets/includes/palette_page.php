<!DOCTYPE html>
<html lang="en">

<?php
$page_css_filename = "palette";

include "app_variables.php";
include "head.php";
?>

<body>
    <div class="container">
        <nav class="topbar">
            <div class="topbar__logo">
                <a class="topbar__home-link" href="<?php echo ($palette_type == "city" ? "/#cities" : "/#colors"); ?>">
                    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
                    </svg><svg class="rectangle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 0h-24v24h24v-24z"/></svg>
                </a>
                <h1 class="topbar__title"><?= $page_title ?></h1>
                <p class="topbar__description"><?= $page_description ?></p>
            </div>
            <div class="topbar__color-format">
                <select class="select-input" data-placeholder="Color Format:" data-callback="changeColorFormat">
                    <option value="hex">Hex (#FFFFFF)</option>
                    <option value="hex_no_hash">Hex (FFFFFF)</option>
                    <option value="rgb">RGB (R, G, B)</option>
                    <option value="rgba">RGBA (R, G, B, A)</option>
                </select>
            </div>
            <div class="topbar__color-copied-alert">
                <strong class="topbar__color-copied-alert--alert-title">Color Copied!</strong>
                <span class="topbar__color-copied-alert--alert-content">#FFFFFF</span>
            </div>
        </nav>
        <div class="app">
            <div class="app__palette">
                
            </div>
        </div>
        <footer class="footer">
            <p class="footer__credits">
                Built by <a href="<?= $app_details["creator"]["url"] ?>" target="_blank"><?= $app_details["creator"]["name"] ?></a><em class="u-display-none-phone"> &larr; Check out his site!</em>
            </p>
        </footer>
    </div>

    <!-- AW Select -->
    <script src="/assets/js/vendors/jquery.js"></script>
    <script src="/assets/js/vendors/awselect.min.js"></script>
    
    <!-- psbc.js (for color manipulation w/js) -->
    <script src="/assets/js/vendors/psbc.js"></script>
    
    <!-- copy to clipboard function -->
    <script src="/assets/js/vendors/copytoclipboard.js"></script>

    <!-- Scripts -->
    <script src="<?= $page_colors_datafile ?>"></script>
    <script src="/assets/js/palette.js"></script>
</body>

</html>