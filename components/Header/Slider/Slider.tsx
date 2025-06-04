'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import { useState } from 'react';

const slides = [
      'https://wallpaperaccess.com/full/1562342.jpg',
      'https://wallpaperaccess.com/full/384787.jpg',
      'https://wallpaperaccess.com/full/1562336.jpg',
];

export default function CustomSlider() {
      const [activeIndex, setActiveIndex] = useState(0);

      return (
            <div className="relative w-full h-[450px] overflow-hidden">
                  <Swiper
                        modules={[Autoplay]}
                        loop
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        onInit={(swiper) => setActiveIndex(swiper.realIndex)}
                        className="w-full h-full"
                  >
                        {slides.map((src, i) => (
                              <SwiperSlide key={i}>
                                    <div
                                          className="w-full h-full bg-cover bg-center"
                                          style={{ backgroundImage: `url(${src})` }}
                                    />
                              </SwiperSlide>
                        ))}
                  </Swiper>

                  {/* Custom Pagination */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {slides.map((_, i) => (
                              <div
                                    key={i}
                                    className={`h-1 w-6 rounded-full transition-all duration-300 ${activeIndex === i
                                                ? 'bg-[#a855f7]'
                                                : 'bg-white'
                                          }`}
                              ></div>
                        ))}
                  </div>
            </div>
      );
}
