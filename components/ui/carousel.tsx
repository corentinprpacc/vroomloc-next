import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"

// Waiting for dynamic images
// interface CarouselProps {
//   slides?: string[]
// }

// export default function Carousel({ slides }: CarouselProps) {
export default function Carousel() {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        slidesPerView="auto"
      >
        {/* {slides?.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image
              src={slide}
              alt={`Slide ${index}`}
              width={100}
              height={100}
              className="w-full"
            />
          </SwiperSlide>
        ))} */}
        <SwiperSlide>
          <Image
            src="/images/car-image.webp"
            alt="car"
            width={100}
            height={100}
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/car-image.webp"
            alt="car"
            width={100}
            height={100}
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/car-image.webp"
            alt="car"
            width={100}
            height={100}
            className="w-full"
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
