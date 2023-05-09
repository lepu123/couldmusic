<script setup lang="ts">
import type {CreativesType} from "@/typings/discover";
import PlayListItem from "./PlayListItem.vue";

defineProps<{
  playList: Array<CreativesType>
}>()
</script>

<template>
  <div class="playList">
    <PlayListItem
        v-for="c in playList"
        :key="c.creativeId"
        :id="c.creativeId"
        :title="c.creativeTitle"
        :image="c.uiImage"
        :playCount="c.playCount"
    />
  </div>

</template>


<style lang="scss" scoped>

.playList {
  width: 100%;
  overflow: auto;
  display: flex;

  &::-webkit-scrollbar {
    display: none;
  }
}


</style>