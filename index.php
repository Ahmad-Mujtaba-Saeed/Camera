<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $imageDataURL = $_POST['imageDataURL'];
    $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imageDataURL));

    $imageName = 'captured_image.png';
    file_put_contents($imageName, $imageData);

    echo 'Image saved successfully!';
} else {
    echo 'Invalid request.';
}
?>