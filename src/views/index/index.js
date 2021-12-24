
export default {
  data() {
    return {
      actData: {},
      count: 1,
    };
  },
  created() {
    setInterval(() => {
      this.count++;
    }, 1000);
  },
  mounted() {
    new Swiper(".mySwiper", {
      direction: "vertical",
      slidesPerView: "auto",
      freeMode: true,
      scrollbar: {
        el: ".mySwiper .swiper-scrollbar",
      },
      mousewheel: true,
    });

    new Swiper(".mySwiper2", {
      slidesPerView: "auto",
      freeMode: true,
      scrollbar: {
        el: "#swiper-scrollbar2",
      },
      mousewheel: true,
    });
  },
};