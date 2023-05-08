<script setup lang="ts">
import type {BScrollConstructor} from '@better-scroll/core/dist/types/BScroll';
import BScroll from 'better-scroll';
import { onMounted, ref, defineExpose } from 'vue';

interface Props {
  probeType: number
  stopPropagation: boolean
}

interface Position {
  x: number
  y: number
}

const emit = defineEmits(['scroll','scrollEnd','pullingDown','pullingUp']);
const props = withDefaults(defineProps<Props>(), {
  probeType: 3,
  stopPropagation: false
})

const scrollWrapper = ref<HTMLDivElement>()

let bs: BScrollConstructor<any> | null = null;

onMounted(() => {
  setTimeout(() => {
    if (scrollWrapper.value) {
      bs = new BScroll(scrollWrapper.value, {
        probeType: props.probeType,
        stopPropagation: props.stopPropagation,
        click: true,
        pullUpLoad: {
          threshold: 50
        },
        pullDownRefresh: true
      })
      bs.on('scroll', (position: Position) => {
        emit('scroll', position)
      })
      bs.on('scrollEnd', () => {
        emit('scrollEnd')
      })
      bs.on('pullingUp', () => {
        emit('pullingUp')
      })
      bs.on('pullingDown', () => {
        emit('pullingDown')
      })
    }
  }, 1000)
})

function scrollToElement(el: HTMLElement, time: number) {
  bs && bs.scrollToElement(el, time, false, false)
}

// 刷新
function refresh() {
  bs && bs.refresh()
}
// 下拉加载
function finishPullUp() {
  bs && bs.finishPullUp()
}
// 顶部下拉结束
function finishPullDown() {
  bs?.finishPullDown()
}

defineExpose({
  scrollToElement,
  refresh,
  finishPullUp,
  finishPullDown
})
</script>


<template>
  <div class="scroll" ref="scrollWrapper">
    <div class="scroll_content">
      <slot></slot>
    </div>
  </div>
</template>


<style scoped lang="scss">
.scroll {
  height: 100%;
  overflow: hidden;
}
</style>