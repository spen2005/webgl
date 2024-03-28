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
                // Assume MTL file has the same name as OBJ file but with .mtl extension
                const mtlURL = url.replace('.obj', '.mtl');
                // Load MTL file and parse material data
                loadMTL(mtlURL, function(mtlData) {
                    // Callback with OBJ and MTL data
                    parseOBJData(objData, mtlData, callback);
                });
            } else {
                console.error('Failed to load OBJ file: ' + adjustedURL);
            }
        }
    };

    // Open and send XMLHttpRequest
    xhr.open('GET', adjustedURL, true);
    xhr.send();
}

// Function to load MTL file
function loadMTL(url, callback) {
    // Adjust URL to include the models directory
    const adjustedURL = 'models/' + url;

    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure XMLHttpRequest
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Callback with MTL data
                callback(xhr.responseText);
            } else {
                console.error('Failed to load MTL file: ' + adjustedURL);
                // Callback with null if MTL file fails to load
                callback(null);
            }
        }
    };

    // Open and send XMLHttpRequest
    xhr.open('GET', adjustedURL, true);
    xhr.send();
}
