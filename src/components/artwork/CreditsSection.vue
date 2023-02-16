<script setup>
import UnderlineTitle from "@/components/ui/UnderlineTitle.vue";
import UiDescription from "@/components/ui/UiDescription.vue";
import { ref, onMounted } from "vue";

// const props = defineProps(["artwork"]);
const props = defineProps([
  "collaborators",
  "partners",
  "credits_fr",
  "credits_en",
]);

let collaborators = ref([]);
let partners = ref([]);

// sort by task label to regroup by label

async function getOrganizationData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

onMounted(() => {
  props.collaborators.forEach((collaborator) => {
    async function getCollaborator() {
      let partnerData = {
        organization: await getOrganizationData(collaborator.organization),
        task: await getOrganizationData(collaborator.task),
      };

      partners.value.push(partnerData);
    }
    getCollaborator();
  });

  props.partners.forEach((partner) => {
    async function getPartner() {
      let partnerData = {
        organization: await getOrganizationData(partner.organization),
        task: await getOrganizationData(partner.task),
      };

      partners.value.push(partnerData);
    }
    getPartner();
  });
  // sort function can be added for organize into the order of the same task label categories
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <UiDescription
      v-if="props.credits_fr || props.credits_en"
      :desc_fr="props.credits_fr"
      :desc_en="props.credits_en"
    />

    <ul v-if="collaborators[0]" class="flex flex-col gap-3">
      <UnderlineTitle title="Collaborateurs" :fontSize="3" />
      <li
        v-for="collaborator in collaborators"
        :key="collaborator.url"
        class="flex flex-col gap-3"
      >
        <img
          v-if="partner.organization.picture"
          class="w-full"
          :src="collaborator.organization.picture"
          :alt="collaborator.organization.picture"
        />
        <h4
          class="text-lg font-medium after:block after:w-20 after:h-1 after:bg-black"
        >
          {{ collaborator.organization.name }}
        </h4>
        <h5 class="text-base font-medium text-gray-dark">
          {{ collaborator.task.label }}
        </h5>
        <p>{{ collaborator.organization.description }}</p>
      </li>
    </ul>

    <ul v-if="partners[0]" class="pl-6 flex flex-col gap-3">
      <UnderlineTitle title="Partenaires" :fontSize="3" />
      <li
        v-for="partner in partners"
        :key="partner.url"
        class="pl-2 flex flex-col gap-1"
      >
        <h5 class="text-base font-medium text-gray-dark">
          — {{ partner.task.label }}
        </h5>
        <h4
          class="text-lg font-medium after:block after:w-20 after:h-1 after:bg-black"
        >
          {{ partner.organization.name }}
        </h4>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
