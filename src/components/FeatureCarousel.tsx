// components/FeatureCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

export const FeatureCarousel = () => {
  return (
    <Swiper
      modules={[FreeMode, Pagination]}
      spaceBetween={20}
      slidesPerView={1.2}
      centeredSlides
      freeMode
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2.5,
          spaceBetween: 30
        }
      }}
      className="!pb-12 dark:[--swiper-theme-color:#a78bfa]"
    >
      {/* Seus slides aqui */}
    </Swiper>
  );
};