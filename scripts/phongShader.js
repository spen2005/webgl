// Define the Phong shader object
const phongShader = {
    // Vertex shader source code
    vertexShaderSource: `
        attribute vec3 aVertexPosition;
        attribute vec3 aVertexNormal;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        uniform mat4 uNormalMatrix;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
            vNormal = mat3(uNormalMatrix) * aVertexNormal;
            vec3 vertexPosition = vec3(uModelViewMatrix * vec4(aVertexPosition, 1.0));
            vViewDir = -vertexPosition;
        }
    `,

    // Fragment shader source code
    fragmentShaderSource: `
        precision mediump float;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        uniform vec3 uAmbientColor;
        uniform vec3 uDiffuseColor;
        uniform vec3 uSpecularColor;
        uniform float uShininess;
        void main(void) {
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewDir);
            vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Example light direction
            vec3 ambient = uAmbientColor;
            vec3 diffuse = uDiffuseColor * max(dot(normal, lightDir), 0.0);
            vec3 reflectDir = reflect(-lightDir, normal);
            vec3 specular = uSpecularColor * pow(max(dot(reflectDir, viewDir), 0.0), uShininess);
            vec3 result = ambient + diffuse + specular;
            gl_FragColor = vec4(result, 1.0);
        }
    `
};

// Export the Phong shader object so that other modules can access it if needed
export default phongShader;
