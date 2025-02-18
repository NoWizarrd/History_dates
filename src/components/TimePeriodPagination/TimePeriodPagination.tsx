import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import styles from './TimePeriodPagination.module.scss';
import { timePeriods } from '../../data/timePeriods';
import {Swiper as SwiperType } from 'swiper';
import { useEffect, useRef } from 'react';

interface PaginationSwiperProps {
  activeIndex: number;
  onSlideChange: (index: number) => void;
}

export default function TimePeriodPagination({ activeIndex, onSlideChange }: PaginationSwiperProps) {
    const swiperRef = useRef<SwiperType>(null);

    useEffect(() => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(activeIndex); 
      }
    }, [activeIndex]);
    
  return (
    <Swiper
      spaceBetween={10}
      modules={[Pagination]}
      onSwiper={(swiper: SwiperType) => {
        swiperRef.current = swiper; 
      }}
      onSlideChange={(swiper: SwiperType) => {
        swiperRef.current = swiper;
        onSlideChange(swiper.activeIndex);
      }}
      initialSlide={activeIndex}
      pagination={{ clickable: true }}
      className={styles.paginationSwiper}
    >
      {timePeriods.map((period, index) => (
        <SwiperSlide key={index} className={styles.paginationSlide} >
        </SwiperSlide>
      ))}
    </Swiper>
  );
}