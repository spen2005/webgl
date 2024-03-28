// Define a structure to represent material properties
class Material {
    constructor(diffuseColor, ambientColor, specularColor, shininess) {
        this.diffuseColor = diffuseColor || [1.0, 1.0, 1.0]; // Default diffuse color (white)
        this.ambientColor = ambientColor || [0.2, 0.2, 0.2]; // Default ambient color
        this.specularColor = specularColor || [1.0, 1.0, 1.0]; // Default specular color (white)
        this.shininess = shininess || 32.0; // Default shininess
    }
}

// Function to initialize a material object with default values
function createDefaultMaterial() {
    return new Material();
}

// Function to initialize a material object with specific properties
function createMaterial(diffuseColor, ambientColor, specularColor, shininess) {
    return new Material(diffuseColor, ambientColor, specularColor, shininess);
}

// Export the Material class and functions
export { Material, createDefaultMaterial, createMaterial };
