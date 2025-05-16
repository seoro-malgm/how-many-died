import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  app: {
    head: {
      title:
        "비극은 사건 때문이 아니라, 그것을 지켜보는 자들의 무관심으로 완성된다",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content:
            "비극은 사건 때문이 아니라, 그것을 지켜보는 자들의 무관심으로 완성된다",
        },
        {
          name: "og:title",
          content:
            "비극은 사건 때문이 아니라, 그것을 지켜보는 자들의 무관심으로 완성된다",
        },
        {
          name: "og:description",
          content:
            "비극은 사건 때문이 아니라, 그것을 지켜보는 자들의 무관심으로 완성된다",
        },
      ],
    },
  },
  devtools: { enabled: false },
  modules: ["@nuxt/image", "@nuxt/ui", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    // 파일 시스템 제한 해제
    server: {
      fs: {
        strict: false,
      },
    },
  },
});
