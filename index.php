<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>CookieCutter</title>
        <style>

            *, *:after, *:before {
                box-sizing: border-box;
            }

            html, body {
                width: 100%;
            }

            body {
                padding: 34px;
                font-size: 14px;
                font-family: Arial, sans-serif;
            }

                p {
                    margin-bottom: 24px;
                }

                h2 {
                    margin: 0 0 24px 0;
                }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
        <link rel="stylesheet" href="dist/cookiecutter.css" />
    </head>
    <body>
        <h1>CookieCutter</h1>
        <hr class="o-rule" />
        <p><button class="js-cookiecutter__manage">Manage Cookies</button></p>

        <script src="dist/cookiecutter.umd.js"></script>
        <script>
            const cookies = new CookieCutter.CookieCutter();

            // Manually add Google Analytics
            window.gaID = 'UA-132550778-6';
            cookies.add(CookieCutter.GoogleAnalyticsCookie(window.gaID));

            // Pardot cookies
            window.piAId = '298892';
            window.piCId = '1066';
            cookies.add(CookieCutter.PardotCookies());

            // Ask
            cookies.request();
            
        </script>
    </body>
</html>
