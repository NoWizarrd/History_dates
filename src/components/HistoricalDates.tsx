import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './HistoricalDates.module.scss';

gsap.registerPlugin(useGSAP);

const timePeriods = [
  { year1: 2015, year2:2017, title: 'title1',  events: [
    '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
    'Телескоп «Хаббл» обнаружил самую удаленную из всех обнаруженных галактик, получившую обозначение GN-z11',
    'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
    '222 Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
    '222 Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
    '222 Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi'
] },
  { year1: 1999, year2:2189, title: 'title2',  events: ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4'] },
  { year1: 2000, year2:2017, title: 'title3',  events: ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4'] },
  { year1: 3000, year2:2017, title: 'title4',  events: ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4'] },
  { year1: 1231, year2:2017, title: 'title5',  events: ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4'] },
  { year1: 5212, year2:2017, title: 'title6',  events: ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4'] },

];

export default function HistoricalDates() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {

    const angle = 360 / timePeriods.length;
    gsap.to(`.${styles.circle}`, { rotation: activeIndex * -angle, duration: 0.5, ease: 'power2.out', });

    // Анимация для year1
    gsap.to(`.${styles.yearTitle} p:nth-child(1)`, {
        textContent: timePeriods[activeIndex].year1,
        duration: 0.5,
        snap: { textContent: 1 },
        ease: 'power2.out',
        onStart: () => {
            
        }
    });

    // Анимация для year2
    gsap.to(`.${styles.yearTitle} p:nth-child(2)`, {
        textContent: timePeriods[activeIndex].year2,
        duration: 0.5,
        snap: { textContent: 1 }, 
        ease: 'power2.out',
    });

    gsap.to(`.${styles.hiddenDot}`, {
      rotation: activeIndex * angle,
      duration: 0.5,
      ease: 'power2.out',
    });

  }, [activeIndex]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <div className={styles.historicalDates} ref={container}>
      <h2 className={styles.h2}>Исторические даты</h2>
      <div className={styles.circleContainer}>
        <div className={styles.yearTitle}>
        <p style={{color: '#5d5fef'}}>{timePeriods[activeIndex].year1}</p>
        <p style={{color: '#ef5da8'}}>{timePeriods[activeIndex].year2}</p>
        </div>
        <div className={styles.circle}>
          {timePeriods.map((period, index) => {
              const angle = (360 / timePeriods.length) * (index - 1);
              const radius = 200;
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
            return (
                <>
                <div
                    key={period.title}
                    className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    onClick={() => handleClick(index)}
                >
                  <div className={styles.hiddenDot} style={{ transform: `rotate(${angle * 360 / timePeriods.length}deg)` }}>
                    {index + 1}
                  </div>
                    
                </div>

              </>
            );
          })}
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.buttons}>
            <p>{`0${activeIndex+1}/0${timePeriods.length}`}</p>
            <button onClick={handlePrev} disabled={activeIndex === 0}>{'<'}</button>
            <button onClick={handleNext} disabled={activeIndex === timePeriods.length - 1}>{'>'}</button>
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
    </div>
  );
}