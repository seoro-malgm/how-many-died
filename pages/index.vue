<template>
  <!-- 리스트 섹션 -->
  <section
    class="w-full overflow-y-auto min-h-[77vh] max-h-[77vh] h-full w-full m-auto scroll-smooth bg-primary-900"
    ref="scrollableSection"
  >
    <div class="container mx-auto pt-12 pointer-events-none">
      <ul
        class="py-20 px-4 lg:px-12 inline-flex flex-wrap justify-center gap-2"
      >
        <transition-group name="fade">
          <li v-for="index in items" :key="index">
            <div class="max-lg:w-[24vw] w-[180px] max-lg:h-[24vw] h-[180px]">
              <div
                class="px-2 lg:p-3 py-4 border-2 border-primary-400 w-full h-full flex-col items-stretch justify-stretch"
              >
                <!-- box-header -->
                <div class="bg-box w-full h-2/12 rounded-t-lg"></div>
                <!-- box-inner -->
                <div class="bg-box w-full h-7/12 my-1">
                  <div class="w-full h-full flex items-center justify-center">
                    <h3
                      class="text-center text-lg lg:text-2xl text-primary-700"
                    >
                      {{ index }}
                    </h3>
                  </div>
                </div>
                <!-- box-footer -->
                <div class="bg-box h-2/12 rounded-b-xl w-[98%] mx-auto"></div>
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
      class="container mx-auto h-full flex flex-col items-center text-center justify-center text-primary-200 mix-blend-difference"
    >
      <h3 class="max-lg:text-6xl text-8xl mb-6">
        {{ formatNumber(transitionedNumber) }} 명
      </h3>
      <transition name="fade" mode="out-in">
        <div
          class="text-center max-lg:text-2xl text-4xl min-h-[40px]"
          :key="currentMessage"
        >
          {{ currentMessage }}
        </div>
      </transition>
      <div class="flex items-center justify-between w-full mt-6">
        <template v-if="isLoadAll">
          <UButton
            class="font-nanum hover:cursor-pointer font-bold"
            color="black"
            label="초기화"
            icon="system-uicons:reset-alt"
            size="xl"
            @click="resetList()"
          />
        </template>
        <template v-else>
          <UButton
            class="font-nanum hover:cursor-pointer font-bold"
            color="black"
            label="모두 보기"
            icon="material-symbols:background-grid-small-sharp"
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
              icon="ic:outline-info"
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
              <div class="font-nanum p-5">this is content</div>
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
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bg-box {
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
}
</style>
