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

    <?php // Fonts ?>
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap" rel="stylesheet">

    <?php // CSS ?>
    <link rel="stylesheet" href="/assets/css/<?= $page_css_filename ?>.css">
</head>