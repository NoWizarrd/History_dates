import styles from './Swiper.module.scss'
import { timePeriods } from '../../data/timePeriods'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/css/pagination';

interface SwiperProps {
    activeIndex: number
}
// eslint-disable-next-line no-restricted-globals
const swiperArray = screen.width > 768 ? [Navigation] : []

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
        // eslint-disable-next-line no-restricted-globals
        spaceBetween={screen.width > 1024 ? '10%' : '2%'}
        // spaceBetween={'10%'}
        // eslint-disable-next-line no-restricted-globals
        slidesPerView={screen.width > 550 ? 3 : 2}
        // eslint-disable-next-line no-restricted-globals
        navigation={screen.width > 768 ? true : false}
        modules={swiperArray}
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
