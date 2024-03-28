import { loadOBJWithMaterial } from './objLoader'; // Import loadOBJWithMaterial function from objLoader.js

// Define the scene object
const scene = {
    // List of objects in the scene
    objects: [],
    
    // List of lights in the scene
    lights: []
};

// Function to initialize the scene
function initScene() {
    // Load object data
    loadOBJWithMaterial('cube.obj', function(objModel) {
        // Add loaded object to the scene
        const object = {
            // Define object properties based on loaded data
            vertices: objModel.vertices,
            normals: objModel.normals,
            uvs: objModel.uvs,
            material: objModel.material,
            // Other properties like position, rotation, scale, etc.
        };
        scene.objects.push(object);

        // Add lights to the scene after loading the object data
        addLightsToScene();
    });
}

// Function to add lights to the scene
function addLightsToScene() {
    const light1 = createLight({
        position: [0, 5, 0],
        color: [1, 1, 1],
        intensity: 1
    });
    scene.lights.push(light1);

    const light2 = createLight({
        position: [5, 0, 0],
        color: [1, 0, 0],
        intensity: 0.8
    });
    scene.lights.push(light2);
}


// Function to create a light object
function createLight(options) {
    const { position, color, intensity } = options;
    return {
        position: position || [0, 0, 0],
        color: color || [1, 1, 1],
        intensity: intensity || 1
    };
}

// Call initialization function to set up the scene
initScene();

// Export the scene object so that other modules can access it if needed
export default scene;
