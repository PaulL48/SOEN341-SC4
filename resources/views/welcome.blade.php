<!doctype html>
<html lang="{{ app()->getLocale() }}">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>SOEN341-SC4</title>
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
        <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
    </head>
    <body>
        <div id="root"></div>
        <script src="{{mix('js/index.js')}}" ></script>
    </body>
</html>