import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'swiper/scss';
import styles from './HistoricalDatesMobile.module.scss';
import { timePeriods } from '../../data/timePeriods';
import 'swiper/scss/navigation';
import SwiperComponent from '../Swiper/Swiper';

gsap.registerPlugin(useGSAP);

export default function HistoricalDatesMobile() {

  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useGSAP(() => {

    gsap.to('#firstYear', {
      textContent: timePeriods[activeIndex].year1,
      duration: 1,
      snap: { textContent: 1 },
    });
    
    gsap.to('#secondYear', {
      textContent: timePeriods[activeIndex].year2,
      duration: 1,
      snap: { textContent: 1 },
    });

    gsap.fromTo(`.${styles.Title}`, {
      opacity: 0,
      ease: 'power1',
    },
    {
      opacity: 1,
      delay: 1,
      ease: 'power1',
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
      <div className={styles.yearTitle}>
        <p id='firstYear' style={{ color: '#5d5fef' }}></p>
        <p id='secondYear' style={{ color: '#ef5da8' }}></p>
      </div>
      <div className={styles.controls}>
      <div className={styles.Title}>
        <b>{timePeriods[activeIndex].title}</b>
      </div>
        <SwiperComponent activeIndex={activeIndex}/>
      </div>
        <div className={styles.buttons}>
            <p style={{marginBottom: 5}}>{`0${activeIndex+1}/0${timePeriods.length}`}</p>
            <button onClick={handlePrev} disabled={activeIndex === 0}>{'<'}</button>
            <button onClick={handleNext} disabled={activeIndex === timePeriods.length - 1}>{'>'}</button>
        </div>
    </div>
  );
}