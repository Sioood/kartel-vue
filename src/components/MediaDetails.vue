<script setup>
/**

  Components

**/
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import UiDescription from "@/components/ui/UiDescription.vue";
</script>

<template>
  <!-- main for visualisation inside artist or artwork page -->
  <main
    class="pt-12 pr-20 pb-10 w-full min-h-screen flex justify-between gap-10"
  >
    <div
      class="px-6 py-5 h-full w-full max-w-md flex flex-col gap-6 justify-center shadow-border"
    >
      <div>
        <img src="https://source.unsplash.com/random/" alt="" />
      </div>

      <div class="flex gap-5">
        <div class="w-1/2 flex flex-col justify-between">
          <UnderlineTitle
            title="Le titre de la photo"
            subtitle="Title"
            :uppercase="true"
            :fontSize="3"
          />
          <UnderlineTitle
            title="Le titre de la photo"
            subtitle="Copyright"
            :uppercase="true"
            :fontSize="3"
          />
          <!-- Need to pass a props to define an height for the scroll -->
          <UiDescription desc_fr="fr" desc_en="en" />
        </div>
        <div class="w-1/2 flex flex-col justify-between">
          <div>
            <ul
              class="h-1/2 flex flex-col overflow-y-scroll divide-y divide-white divide-dashed"
            >
              <li
                v-for="(gallery, index) in [
                  'In Situ',
                  'Process',
                  'Press',
                  'Replace with right galleries',
                ]"
                :key="index"
                class="p-2 bg-gray-extralightest text-sm font-medium uppercase"
              >
                {{ gallery }}
              </li>
            </ul>
            <span class="mb-1 block w-full h-1 bg-black"></span>
            <div class="w-full flex items-center justify-between">
              <div class="relative w-5 h-5 border-0.5 border-gray rounded">
                <span
                  class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-3 h-px bg-gray"
                ></span>
                <span
                  class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-px h-3 bg-gray"
                ></span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-2 h-2 bg-green"></div>
                <h6 class="text-xs text-gray uppercase">Galleries</h6>
              </div>
            </div>
          </div>
          <div>
            <div>
              <ul class="p-1 flex flex-wrap gap-1">
                <li
                  v-for="(tag, index) in [
                    'Frame',
                    'Clips',
                    'Water',
                    'Replace with right tags',
                  ]"
                  :key="index"
                  class="p-1 w-fit h-fit bg-gray-extralight text-xs font-medium uppercase rounded"
                >
                  {{ tag }}
                </li>
              </ul>
              <span class="mb-1 block w-full h-1 bg-black"></span>
              <div class="w-full flex items-center justify-between">
                <div class="relative w-5 h-5 border-0.5 border-gray rounded">
                  <span
                    class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-3 h-px bg-gray"
                  ></span>
                  <span
                    class="absolute inset-x-1/2 inset-y-1/2 -translate-x-1/2 -translate-y-1/2 block w-px h-3 bg-gray"
                  ></span>
                </div>
                <div class="flex items-center gap-1">
                  <div class="w-2 h-2 bg-green"></div>
                  <h6 class="text-xs text-gray uppercase">Tags</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
