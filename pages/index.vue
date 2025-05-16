<template>
  <!-- 리스트 섹션 -->
  <section
    class="w-full overflow-y-auto min-h-[77vh] max-h-[77vh] h-full w-full m-auto scroll-smooth bg-primary-900"
    ref="scrollableSection"
  >
    <div class="container mx-auto pt-12 pointer-events-none">
      <ul
        class="py-20 px-2 lg:px-12 lg:py-20 inline-flex flex-wrap justify-center gap-1 lg:gap-2"
      >
        <transition-group name="fade">
          <li v-for="index in items" :key="index">
            <div class="max-lg:w-[21vw] w-[180px] max-lg:h-[21vw] h-[180px]">
              <div
                class="px-1 py-1 lg:px-2 lg:py-2 border-2 border-primary-400 w-full h-full"
              >
                <div
                  class="box-wrap w-full h-full flex-col items-stretch justify-stretch relative"
                >
                  <img
                    :src="`/icons/box.svg`"
                    :alt="`유골함 ${index}번째 이미지`"
                    class="w-full h-full"
                    sizes="180px"
                  />
                  <span
                    class="text-primary-600 text-base lg:text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    {{ index }}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>
  </section>
  <div
    class="text-center py-1 text-primary-200 text-sm lg:text-lg font-nanum bg-primary-900 min-h-[28px]"
  >
    <transition name="fade" mode="out-in">
      <div v-if="scrolled <= 1">
        <UIcon name="material-symbols:arrow-cool-down-rounded" />
        스크롤을 계속 내려주세요
        <UIcon name="material-symbols:arrow-cool-down-rounded" />
      </div>
      <div v-else-if="items > 50">얼마나 더 죽어야 하는 걸까요?</div>
    </transition>
  </div>
  <section
    class="w-full h-full max-h-[30vh] bg-linear-to-b from-primary-900 to-primary-700 py-2"
  >
    <div
      class="container px-4 mx-auto h-full flex flex-col items-center text-center justify-center text-primary-200 mix-blend-difference"
    >
      <h3 class="max-lg:text-5xl text-8xl mb-6">
        {{ formatNumber(transitionedNumber) }} 명
      </h3>
      <transition name="fade" mode="out-in">
        <div
          class="text-center max-lg:text-xl text-4xl min-h-[40px]"
          :key="currentMessage"
        >
          {{ currentMessage }}
        </div>
      </transition>
      <div class="flex items-center justify-between w-full my-3">
        <template v-if="isLoadAll">
          <UButton
            class="font-nanum hover:cursor-pointer font-bold"
            color="black"
            label="초기화"
            icon="mdi:backup-restore"
            size="xl"
            @click="resetList()"
          />
        </template>
        <template v-else>
          <UButton
            class="font-nanum hover:cursor-pointer font-bold"
            color="black"
            label="모두 보기"
            icon="mdi:grid"
            size="xl"
            @click="listAll()"
          />
        </template>
        <span>
          <UModal>
            <UButton
              class="font-nanum hover:cursor-pointe"
              variant="link"
              color="white"
              icon="mdi:information"
              size="xl"
            />

            <template #content>
              <header class="px-4 py-6 flex flex-col items-center">
                <h3 class="text-3xl lg:text-5xl text-center mb-2">
                  비극은 사건 때문이 아니라, 그것을 지켜보는 자들의 무관심으로
                  완성된다
                </h3>
                <span class="text-sm lg:text-md text-primary-600 font-nanum">
                  - 조지 오웰, &lt;동물농장&gt;
                </span>
              </header>
              <div class="font-nanum p-5">
                대한민국은 2023년, 13,978명의 자살 사망자가 있었습니다. 10만명
                당 32.3명이 자살하고 있습니다. 2024년도의 잠정치는 이보다 더
                많을 것으로 예상됩니다. <br />
                그럼에도 우리는 단순히 많다고만 느낄 뿐, 마주하지 않고 피하고
                있습니다.
              </div>
            </template>
          </UModal>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import countMessages from "~/data/count-messages";

const scrollableSection = ref(null);
const items = ref(0);
const isLoadAll = ref(false);
const currentMessage = ref("");
const itemImageMap = reactive(new Map()); // 각 아이템의 이미지 번호를 저장하는 맵

const { isScrolling } = useScroll(scrollableSection);
const scrolled = ref(0);

watch(
  () => isScrolling.value,
  (n, o) => {
    if (n) {
      scrolled.value += 1;
    }
  }
);

// 부드러운 숫자 트랜지션
const transitionedNumber = useTransition(items, {
  duration: 2000,
  transition: [0.25, 0.1, 0.25, 1], // cubic-bezier
});

// items가 변경될 때마다 메시지 업데이트
watch(items, (newValue) => {
  if (countMessages[newValue]) {
    currentMessage.value = countMessages[newValue];
  }
  // 새로운 아이템이 추가될 때 이미지 번호 할당
  if (!itemImageMap.has(newValue)) {
    itemImageMap.set(newValue, getRandomNumber(0, 15));
  }
});

const { reset } = useInfiniteScroll(
  scrollableSection,
  () => {
    // load more
    items.value += 1;
  },
  {
    distance: 30,
    canLoadMore: () => items.value < 13978,
  }
);

function listAll() {
  isLoadAll.value = true;
  items.value = 13978;
  nextTick(() => {
    if (scrollableSection.value) {
      setTimeout(() => {
        scrollableSection.value.scrollTo({
          top: scrollableSection.value.scrollHeight,
          behavior: "smooth",
        });
      }, 1200);
    }
  });
}

function resetList() {
  // items.value = 0;
  // currentMessage.value = "";
  // reset();
  reloadNuxtApp();
}

// 숫자 포맷팅 함수
function formatNumber(num) {
  return Math.round(num).toLocaleString("ko-KR");
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease-in-out;
  .box-wrap {
    transition: transform 1.5s ease-in-out;
    transform: scale(1);
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  .box-wrap {
    transform: scale(1.2);
  }
}

.box-wrap {
  /* .bg-box {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.8) 15%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0.8) 85%,
      rgba(255, 255, 255, 0.95) 87%,
      rgba(255, 255, 255, 0.8) 89%,
      rgba(255, 255, 255, 0.1) 100%
    );
  } */
}
</style>
