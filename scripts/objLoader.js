// Function to load OBJ model with material
function loadOBJWithMaterial(url, callback) {
    // Adjust URL to include the models directory
    const adjustedURL = 'models/' + url;

    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure XMLHttpRequest
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Parse OBJ file
                const objData = xhr.responseText;
                // Callback with OBJ data
                parseOBJ(objData, callback);
            } else {
                console.error('Failed to load OBJ file: ' + adjustedURL);
            }
        }
    };

    // Open and send XMLHttpRequest
    xhr.open('GET', adjustedURL, true);
    xhr.send();
}
