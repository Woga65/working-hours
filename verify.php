<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Page</title>
    <link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="css/global-styles.css">
    <style>
        .main { background-color: var(--secondary-bgr); }
        .main a { color: var(--secondary-accent); }
        .main a:hover, main a:focus { text-decoration: underline; font-style: italic; }
        .main p span, .main h2 span { color: var(--primary-accent); }
    </style>    
</head>
<body class="main" tabindex=0 >

    <?php
        require_once "./classes/autoloader.class.php";
        Autoloader::register();

        $vkey = isset($_GET['vkey']) ? $_GET['vkey'] : '';
        if (!empty($vkey)) {
            $user = new User();
            $userName = $user->verifyUser($vkey);
            if ($userName === false) {
                // not exactly one user found
                echo '<p align="center">Invalid account or account already verified!</p>';
                echo '<p align="center"><a href="https://wolfgang-siebert.de/projects/kanban/index.html"><br>Please click here, to return to the start page.</a></p>';
            }
            else {
                // user successfully verified
                echo "<h2 align='center'>Congratulations <span>$userName,</span> your account has been verified successfully!<br></h2>";
                echo '<p align="center"><a href="https://wolfgang-siebert.de/projects/kanban/index.html"><br>Please click here, go to the login page.</a></p>';
            }
        }
        // reject request if $vkey is empty
        else {
            echo '<h2 align="center">Nothing to do here!</h2>';
            echo '<p align="center"><a href="https://wolfgang-siebert.de/index.html"><br>Please click here, to check out my portfolio.</a></p>'; 
        }
        exit();
    ?>

</body>
</html>
