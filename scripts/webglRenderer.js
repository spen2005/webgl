import camera from './camera';
import { mat4 } from 'gl-matrix';
import { loadOBJWithMaterial } from './objLoader';
import { phongShaderProgram, uModelViewMatrix, uProjectionMatrix, uNormalMatrix } from './phongShader';
import { vertexBuffer, normalBuffer, aVertexPosition, aVertexNormal } from './buffers';
import { scene } from './scene';
import { light } from './light';
// Rest of the code goes here...


// Global variables
let currentRenderMode = 'phong'; // Default render mode

// Get the canvas element
const canvas = document.getElementById('webgl-canvas');

// Get the WebGL rendering context
const gl = canvas.getContext('webgl');
if (!gl) {
    console.error('Unable to initialize WebGL. Your browser may not support it.');
}

function setPhongShading() {
    currentRenderMode = 'phong';
    render();
}

function setGouraudShading() {
    currentRenderMode = 'gouraud';
    render();
}

function setRayTracing() {
    currentRenderMode = 'raytracing';
    render();
}


// WebGL initialization
function initWebGL() {
    // Set clear color and enable depth testing
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Other WebGL initialization code here, such as shader compilation, program linking, etc.
}

// Render function for Phong shading
function renderPhong() {
    // Clear the color and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Set up the camera transformation
    const viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, camera.position, [0, 0, 0], [0, 1, 0]);

    // Set up the light properties and pass them to the shader program
    gl.useProgram(phongShaderProgram);
    gl.uniform3fv(uLightPosition, light.position);
    gl.uniform3fv(uLightColor, light.color);
    gl.uniform1f(uLightIntensity, light.intensity);

    // Iterate over each object in the scene and render them
    scene.objects.forEach(object => {
        // Load the object's model using the objLoader.js module
        const model = loadOBJWithMaterial(object.modelFile, function(model) {
            // Set shader uniforms such as model-view and projection matrices
            const modelViewMatrix = mat4.create();
            mat4.multiply(modelViewMatrix, viewMatrix, object.modelMatrix);
            gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);
            gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);
            gl.uniformMatrix4fv(uNormalMatrix, false, mat4.transpose(mat4.invert(mat4.create(), modelViewMatrix)));

            // Draw the object using the Phong shader
            drawObject(model);
        });
    });
}


// Render function for Gouraud shading
function renderGouraud() {
    // Clear the color and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Perform rendering for Gouraud shading mode

    // Example: set shader uniforms, draw objects using Gouraud shader
}

// Render function for ray tracing
function renderRayTracing() {
    // Clear the color and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Perform rendering for ray tracing mode

    // Example: implement ray tracing algorithm, draw scene
}

// Function to switch to Phong shading mode
function setPhongShading() {
    currentRenderMode = 'phong';
}

// Function to switch to Gouraud shading mode
function setGouraudShading() {
    currentRenderMode = 'gouraud';
}

// Function to switch to ray tracing mode
function setRayTracing() {
    currentRenderMode = 'raytracing';
}

// Main render function based on current render mode
function render() {
    if (currentRenderMode === 'phong') {
        renderPhong();
    } else if (currentRenderMode === 'gouraud') {
        renderGouraud();
    } else if (currentRenderMode === 'raytracing') {
        renderRayTracing();
    }

    // Request the browser to call render() again on the next frame
    requestAnimationFrame(render);
}

// Function to draw the object using the Phong shader
function drawObject(model) {
    // Bind vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPosition);

    // Bind normal buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.normals), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aVertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexNormal);

    // Draw the object
    gl.drawArrays(gl.TRIANGLES, 0, model.vertices.length / 3);
}


// Call initialization function
initWebGL();

// Start rendering loop
render();
