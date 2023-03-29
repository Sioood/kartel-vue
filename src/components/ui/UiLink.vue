<script setup>
import { onMounted } from "vue";

const props = defineProps({
  // extern is for set a RouterLink for no reload or a simple a anchor
  extern: Boolean,
  url: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

/**
 *
 *  SETUP
 *
 */

//  uuid
let random = Math.random();

let canvas;
let ctx;

// function setup() {
//     let c = document.getElementById(random);
//     let gl = c.getContext("webgl");

//     let fShaderProgram =
//       "#ifdef GL_ES\n" +
//       "precision highp float;\n" +
//       "#endif\n\n" +
//       "void main(void) {\n" +
//       "    gl_FragColor = vec4(0.3,0.3,0.3, 1.0);\n" +
//       "}";

//     let vShaderProgram =
//       "attribute vec3 aVertexPosition;" +
//       "void main(void) {" +
//       "  gl_Position = vec4(aVertexPosition,1.0);" +
//       "}";

//     let vShader = gl.createShader(gl.VERTEX_SHADER);
//     gl.shaderSource(vShader, vShaderProgram);
//     gl.compileShader(vShader);

//     if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
//       alert(gl.getShaderInfoLog(vShader));
//     }

//     let fShader = gl.createShader(gl.FRAGMENT_SHADER);
//     gl.shaderSource(fShader, fShaderProgram);
//     gl.compileShader(fShader);

//     if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
//       alert(gl.getShaderInfoLog(vShader));
//     }

//     let prg = gl.createProgram();
//     gl.attachShader(prg, vShader);
//     gl.attachShader(prg, fShader);
//     gl.linkProgram(prg);

//     gl.useProgram(prg);

//     let vertices = [
//       -0.1,
//       0.1,
//       0.0, //Vertex 0

//       -0.1,
//       -0.1,
//       0.0, //Vertex 1

//       0.1,
//       -0.1,
//       0.0, //Vertex 2

//       0.1,
//       0.1,
//       0.0,
//     ];

//     let indexes = [3, 2, 1, 3, 1, 0];

//     let vxBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, vxBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
//     gl.bindBuffer(gl.ARRAY_BUFFER, null);

//     let fgBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fgBuffer);
//     gl.bufferData(
//       gl.ELEMENT_ARRAY_BUFFER,
//       new Uint16Array(indexes),
//       gl.STATIC_DRAW
//     );
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

//     gl.clearColor(0.0, 0.0, 0.0, 0.0);
//     gl.enable(gl.DEPTH_TEST);

//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//     gl.viewport(0, 0, c.width, c.height);

//     gl.bindBuffer(gl.ARRAY_BUFFER, vxBuffer);
//     gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(prg.aVertexPosition);

//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fgBuffer);
//     gl.drawElements(gl.TRIANGLES, indexes.length, gl.UNSIGNED_SHORT, 0);
//   }

let startTime, state, stop;

function animate() {
  const wrapper = document.getElementById(`wrapper-${random}`);
  const text = document.getElementById(`text-${random}`);
  const element = document.getElementById(`${random + 1}`);

  const timestamp = new Date().getTime();

  if (!startTime) startTime = timestamp;

  let elapsed = timestamp - startTime;

  const toHoverMax = wrapper.offsetWidth - element.offsetWidth * 3;
  const toHoverCount = Math.min(0.1 * elapsed, toHoverMax);
  if (!state) {
    element.style.transform = `translate(${toHoverCount}px, 0)`;
    if (toHoverCount === toHoverMax) state = "hover";
  }

  const toHover2Max =
    wrapper.offsetHeight - element.offsetHeight * 3 - text.offsetHeight / 2;
  const toHover2Count = Math.min(0.005 * elapsed, toHover2Max);
  if (state === "hover") {
    element.style.transform = `translate(${toHoverCount}px ,-${toHover2Count}px)`;

    if (toHover2Count === toHover2Max) state = "hover2";
  }

  // if (state === "hover2") {
  //   const max =
  //     wrapper.offsetHeight - element.offsetHeight * 3 - text.offsetHeight / 2;
  //   const count = Math.min(0.005 * elapsed, max);
  //   console.log(count);
  //   element.style.transform = `translate(${toHoverCount}px ,-${count}px)`;

  //   if (count === max) state = "hover2";
  //   stop = false;
  // }

  if (!stop) window.requestAnimationFrame(animate);
}

onMounted(() => {
  // setup();

  requestAnimationFrame(animate);
});
</script>

<template>
  <div :id="`wrapper-${random}`" class="relative">
    <div v-if="props.extern !== true">
      <RouterLink
        :id="`text-${random}`"
        class="link relative mx-2 p-2 flex flex-col items-center font-medium"
        :to="props.url"
        >{{ props.text }}
      </RouterLink>
    </div>

    <a :id="`text-${random}`" v-else :href="props.url"> {{ props.text }}</a>

    <!-- calculate size mesures with the size of the link... -->
    <!-- create element in js ? or with v-if when the width and the height are calculated -->
    <canvas
      :id="random"
      class="absolute top-0 left-0 w-full h-full border pointer-events-none"
      width="1000"
      height="1000"
    ></canvas>

    <span
      :id="random + 1"
      class="absolute bottom-1 left-1 block w-1 h-1 bg-black"
    ></span>
  </div>
</template>

<style scoped>
/* after:block after:w-full after:h-0.5 
 after:bg-black after:transition-all hover:after:translate-x-1/2
  */

.link::after {
  content: "";
  position: absolute;
  bottom: 0.3rem;
  width: 100%;
  height: 0.125rem;
  display: block;
  background: #000;
  animation: link-out 1s forwards;
}
.link:hover::after {
  animation: link-in 1s forwards;
  /* animation-fill-mode: forwards; */
}

.router-link-active::after {
  animation: link-in 1s forwards;
}

@keyframes link-in {
  0% {
    right: 0;
    width: 100%;
  }
  50% {
    bottom: 0.3rem;
    width: 0.25rem;
    height: 0.125rem;
    transform: translateY(0%);
  }
  100% {
    right: 0;
    bottom: 42%;
    width: 0.25rem;
    height: 0.25rem;
    transform: translateY(75%);
  }
}

@keyframes link-out {
  0% {
    right: 0;
    bottom: 42%;
    width: 0.25rem;
    height: 0.25rem;
    transform: translateY(75%);
  }
  50% {
    bottom: 0.3rem;
    width: 0.25rem;
    height: 0.125rem;
    transform: translateY(0%);
  }

  100% {
    right: 0;
    width: 100%;
  }
}
</style>
