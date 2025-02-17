import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './HistoricalDates.module.scss';

gsap.registerPlugin(useGSAP);

const timePeriods = [
  { year: [2015, 2017], title: 'title1',  events: [
    '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
    'Телескоп «Хаббл» обнаружил самую удаленную из всех обнаруженных галактик, получившую обозначение GN-z11',
    'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
    '222 Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi'
] },
  { year: [2012, 2017], title: 'title2',  events: ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4'] },
  { year: [2013, 2017], title: 'title3',  events: ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4'] },
  { year: [2015, 2017], title: 'title4',  events: ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4'] },
  { year: [2015, 2017], title: 'title5',  events: ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4'] },
  { year: [2015, 2017], title: 'title6',  events: ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4'] },
];

export default function HistoricalDates() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useGSAP(() => {
    const angle = 360 / timePeriods.length;
    gsap.to(`.${styles.circle}`, { rotation: activeIndex * -angle, duration: 0.5, ease: 'power2.out' });
  }, [activeIndex]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + timePeriods.length) % timePeriods.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % timePeriods.length);
  };

  return (
    <div className={styles.historicalDates} ref={container}>
      <h2 className={styles.h2}>Исторические даты</h2>
      <div className={styles.circleContainer}>
        <div className={styles.circle}>
          {timePeriods.map((period, index) => {
            const angle = (360 / timePeriods.length) * index;
            const radius = 200; // Радиус окружности
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            return (
                <>
                {
                    index === activeIndex ?
                    <h1 className={styles.yearTitle}>
                        {`${period.year[0]} ${period.year[1]}`}
                    </h1> :
                    null
                }
                <div
                    key={period.title}
                    className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    onClick={() => handleClick(index)}
                >
                    {index === activeIndex ? index : ''}
                </div>

              </>
            );
          })}
        </div>
      </div>
      <div className={styles.controls}>
        <p>{`0${activeIndex+1}/0${timePeriods.length}`}</p>
        <button onClick={handlePrev}>{'<'}</button>
        <button onClick={handleNext}>{'>'}</button>
      </div>
      <Swiper
      className={styles.eventsSlider}
      spaceBetween={40}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      >
        {timePeriods[activeIndex].events.map((event, index) => (
          <SwiperSlide key={index} className={styles.event}>
            {event}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}