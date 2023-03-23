<script setup>
/**

  Components

**/
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
</script>

<template>
  <div
    class="px-10 py-5 h-full w-1/2 max-w-md flex flex-col gap-2 justify-center shadow-border"
  >
    <details class="group">
      <summary class="group relative flex items-center gap-3 cursor-pointer">
        <UnderlineTitle title="Profile" :underlineSize="1" :fontSize="2" />
        <div
          class="relative invisible group-hover:visible group-open:visible w-5 h-5 border-0.5 border-gray rounded"
        >
          <span
            class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-3 h-px bg-gray"
          ></span>
          <span
            class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-px h-3 bg-gray"
          ></span>
        </div>
      </summary>
      <ul class="p-4 flex flex-col gap-4">
        <li>
          <a href="#">
            <h3 class="text-xl font-bold">General</h3>
            <h6 class="text-sm text-gray font-medium">Name, Adress, ...</h6>
          </a>
        </li>
        <li>
          <a href="#">
            <h3 class="text-xl font-bold">Artist Info</h3>
            <h6 class="text-sm text-gray font-medium">
              Biography, Website, ...
            </h6>
          </a>
        </li>
        <li>
          <a href="#">
            <h3 class="text-xl font-bold">Student Info</h3>
            <h6 class="text-sm text-gray font-medium">
              Diploma, Promotion, ...
            </h6>
          </a>
        </li>
      </ul>
    </details>
    <details class="group">
      <summary class="relative flex items-center gap-3 cursor-pointer">
        <UnderlineTitle title="Artworks" :underlineSize="1" :fontSize="2" />
        <div
          class="relative invisible group-hover:visible group-open:visible w-5 h-5 border-0.5 border-gray rounded"
        >
          <span
            class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-3 h-px bg-gray"
          ></span>
          <span
            class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-px h-3 bg-gray"
          ></span>
        </div>
      </summary>
      <ul class="p-4 flex flex-col gap-4">
        <li>
          <a href="#">
            <h3 class="text-xl font-bold">Une Oeuvre</h3>
            <h6 class="text-sm text-gray font-medium">Type - 2000</h6>
          </a>
        </li>
        <li>
          <details class="group/artwork">
            <summary class="flex flex-col cursor-pointer">
              <h3 class="text-xl font-bold">Une Oeuvre avec du détails</h3>
              <div class="w-full flex items-center gap-4">
                <h6 class="whitespace-nowrap text-sm text-gray font-medium">
                  Type - 2000
                </h6>
                <span
                  class="group-open/artwork:visible invisible w-full block h-1 bg-black"
                ></span>
              </div>
            </summary>
            <ul class="px-4 flex flex-col items-end gap-4 text-right">
              <li>
                <a href="#">
                  <h3 class="text-xl font-bold">General</h3>
                  <h6 class="text-sm text-gray font-medium">
                    Title, Media, Description, ...
                  </h6>
                </a>
              </li>
              <li>
                <a href="#">
                  <h3 class="text-xl font-bold">Technical Info</h3>
                  <h6 class="text-sm text-gray font-medium">
                    Blueprints, Specification, ...
                  </h6>
                </a>
              </li>
              <li>
                <a href="#">
                  <h3 class="text-xl font-bold">Press</h3>
                  <h6 class="text-sm text-gray font-medium">
                    Media, Press kit, ...
                  </h6>
                </a>
              </li>
              <li>
                <a href="#">
                  <h3 class="text-xl font-bold">Distribution</h3>
                  <h6 class="text-sm text-gray font-medium">
                    Exhibitions, Awards, ...
                  </h6>
                </a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </details>
    <details class="group">
      <summary class="relative flex items-center gap-3 cursor-pointer">
        <UnderlineTitle title="Guide" :underlineSize="1" :fontSize="2" />
        <div
          class="relative invisible group-hover:visible group-open:visible w-5 h-5 border-0.5 border-gray rounded"
        >
          <span
            class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-3 h-px bg-gray"
          ></span>
          <span
            class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-px h-3 bg-gray"
          ></span>
        </div>
      </summary>
      <ul class="p-4 flex flex-col gap-4">
        <li>
          <a href="#">
            <h3 class="text-xl font-bold">Info</h3>
            <h6 class="text-sm text-gray font-medium">Some info, ...</h6>
          </a>
        </li>
      </ul>
    </details>
  </div>
</template>

<style scoped></style>
