import styles from './Swiper.module.scss'
import { timePeriods } from '../../data/timePeriods'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'swiper/scss';
import 'swiper/scss/navigation';

interface SwiperProps {
    activeIndex: number
}

export default function SwiperComponent (props: SwiperProps) {
    const {activeIndex} = props
    useGSAP(() => {
        gsap.fromTo(`.${styles.eventsSlider}`, {
          opacity: 0,
          delay: 0.5,
          ease: 'power1',
        },
        {
          opacity: 1,
          delay: 0.5,
          ease: 'power1',
        });
      }, [activeIndex]);

  return (
    <Swiper
        className={styles.eventsSlider}
        spaceBetween={'10%'}
        slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        >
        {timePeriods[activeIndex].events.map((event, index) => (
          <SwiperSlide key={index} className={styles.event}>
            <h3>{event.year}</h3>
            <p>{event.event}</p>
        </SwiperSlide>
        ))}
    </Swiper>
  )
}
