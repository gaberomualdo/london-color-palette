<?php
// generate page full title (e.g. "London Palette | City Color Palette")
$page_full_title;
if(isset($page_title)) {
    $page_full_title = $page_title . " | " .$app_details["name"];
}else {
    $page_full_title = $app_details["name"] . " &mdash; " . $app_details["description"];
}
?>


<head>
    <?php // basic meta tags ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <?php // apple-specific meta tags ?>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="white">
    <meta name="format-detection" content="telephone=no">

    <?php // SEO :) ?>
    <meta name="robots" content="index, follow">
    <meta name="author" content="Fred Adams">
    <meta name="description" content="">
    
    <meta property="og:title" content="<?= $page_full_title ?>">
    <meta property="og:site_name" content="<?= $app_details["name"] ?>">
    <meta property="og:description" content="<?= $app_details["description"] ?>">
    <meta property="og:url" content="<?= $app_details["url"] ?>">

    <script type="application/ld+json">
    {
        "@type": "WebSite",
        "@context": "http://schema.org",
        "url": "<?= $app_details["url"] ?>",
        "name": "<?= $app_details["name"] ?>",
        "author": {
            "@type": "Person",
            "name": "<?= $app_details["creator"]["name"] ?>"
        }
        "description": "<?= $app_details["description"] ?>"
    }
    </script>

    <title><?= $page_full_title ?></title>

    <?php // add google analytics here ?>

    <?php // add favicon here ?>
    <link rel="apple-touch-icon" sizes="57x57" href="/assets/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/assets/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/assets/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/assets/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">


    <?php // Fonts ?>
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap" rel="stylesheet">

    <?php // CSS ?>
    <link rel="stylesheet" href="/assets/css/<?= $page_css_filename ?>.css">
</head>