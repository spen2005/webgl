// Define the camera object
const camera = {
    // Camera position
    position: { x: 0, y: 0, z: 5 },
    
    // Camera rotation (in degrees)
    rotation: { yaw: 0, pitch: 0 },

    // Camera speed (adjust as needed)
    speed: 0.1,

    // Mouse sensitivity (adjust as needed)
    sensitivity: 0.1
};

// Function to handle keyboard input for camera movement
function handleKeyboardInput() {
    window.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowUp':
                // Move forward along the camera's local Z axis
                moveCameraForward();
                break;
            case 'ArrowDown':
                // Move backward along the camera's local Z axis
                moveCameraBackward();
                break;
            case 'ArrowLeft':
                // Rotate camera left
                rotateCameraLeft();
                break;
            case 'ArrowRight':
                // Rotate camera right
                rotateCameraRight();
                break;
        }
    });
}

// Function to handle mouse input for camera rotation
function handleMouseInput() {
    // Initialize variables to track mouse movement
    let lastX = 0;
    let lastY = 0;
    let isMouseDown = false;

    // Add event listeners for mouse movement
    window.addEventListener('mousedown', function(event) {
        isMouseDown = true;
        lastX = event.clientX;
        lastY = event.clientY;
    });

    window.addEventListener('mouseup', function() {
        isMouseDown = false;
    });

    window.addEventListener('mousemove', function(event) {
        if (isMouseDown) {
            const deltaX = event.clientX - lastX;
            const deltaY = event.clientY - lastY;
            rotateCamera(deltaX, deltaY);
            lastX = event.clientX;
            lastY = event.clientY;
        }
    });
}

// Function to move the camera forward
function moveCameraForward() {
    // Move along the camera's local Z axis
    camera.position.x += camera.speed * Math.sin(degToRad(camera.rotation.yaw));
    camera.position.z -= camera.speed * Math.cos(degToRad(camera.rotation.yaw));
}

// Function to move the camera backward
function moveCameraBackward() {
    // Move along the opposite direction of the camera's local Z axis
    camera.position.x -= camera.speed * Math.sin(degToRad(camera.rotation.yaw));
    camera.position.z += camera.speed * Math.cos(degToRad(camera.rotation.yaw));
}

// Function to rotate the camera left
function rotateCameraLeft() {
    // Rotate around the vertical axis (yaw)
    camera.rotation.yaw -= camera.speed * 10; // Adjust the rotation speed as needed
}

// Function to rotate the camera right
function rotateCameraRight() {
    // Rotate around the vertical axis (yaw)
    camera.rotation.yaw += camera.speed * 10; // Adjust the rotation speed as needed
}

// Function to rotate the camera based on mouse movement
function rotateCamera(deltaX, deltaY) {
    // Invert deltaY for natural mouse movement
    deltaY *= -1;

    // Update camera rotation based on mouse movement
    camera.rotation.yaw += deltaX * camera.sensitivity;
    camera.rotation.pitch += deltaY * camera.sensitivity;

    // Clamp pitch to prevent camera flipping
    camera.rotation.pitch = Math.max(-90, Math.min(90, camera.rotation.pitch));
}

// Function to convert degrees to radians
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

// Call functions to handle user input
handleKeyboardInput();
handleMouseInput();

// Export the camera object so that other modules can access it if needed
export default camera;
