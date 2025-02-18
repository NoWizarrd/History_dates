import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'swiper/scss';
import styles from './HistoricalDates.module.scss';
import { timePeriods } from '../../data/timePeriods';
import 'swiper/scss/navigation';
import SwiperComponent from '../Swiper/Swiper';

gsap.registerPlugin(useGSAP);

export default function HistoricalDates() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const firstYearRef = useRef<HTMLParagraphElement>(null);
  const secondYearRef = useRef<HTMLParagraphElement>(null)
  const circleRef = useRef<HTMLDivElement>(null);
  const hiddenDotRefs = useRef<(HTMLDivElement | null)[]>([]); 
  const dotTitleRef = useRef<HTMLDivElement>(null);
  hiddenDotRefs.current = Array.from({ length: timePeriods.length }, () => null);
  const radius = 200;

  useGSAP(() => {

    const angle = 360 / timePeriods.length;
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation: activeIndex * -angle,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    hiddenDotRefs.current.forEach((dot, index) => {
        gsap.to(dot, {
          rotation: activeIndex * angle,
          duration: 0.5,
          ease: 'power2.out',
        });
    });

    // gsap.to(`.${styles.circle}`, { rotation: activeIndex * -angle, duration: 0.5, ease: 'power2.out', });

    if (firstYearRef.current && secondYearRef.current) {
      gsap.to(firstYearRef.current, {
        textContent: timePeriods[activeIndex].year1,
        duration: 1,
        snap: { textContent: 1 },
      });

      gsap.to(secondYearRef.current, {
        textContent: timePeriods[activeIndex].year2,
        duration: 1,
        snap: { textContent: 1 },
      });
    }

    // gsap.to(`.${styles.hiddenDot}`, {
    //   rotation: activeIndex * angle,
    //   duration: 0.5,
    //   ease: 'power2.out',
    // });

    // gsap.to(`.${styles.dotTitle}`, {
    //   rotation: activeIndex * angle,
    //   duration: 0.5,
    //   ease: 'power2.out',
    // });
    
    gsap.fromTo(dotTitleRef.current, {
      opacity: 0,
      ease: 'power1',
    },
    {
      opacity: 1,
      delay: 1,
      ease: 'power1',
    });
    // if (dotTitleRef.current) {
    //   const activeAngle = (angle * activeIndex - angle) % 360; 
    //   const x = radius * Math.cos((activeAngle * Math.PI) / 180);
    //   const y = radius * Math.sin((activeAngle * Math.PI) / 180);
  
    //   gsap.to(dotTitleRef.current, {
    //     x: x + 360 / timePeriods.length, 
    //     y: y ,
    //     duration: 0.5,
    //     ease: 'power2.out',
    //   });
    // }

  if (activeIndex === 0 && dotTitleRef.current) {
    const firstAngle = (angle * (0 - 1)) % 360;
    const x = radius * Math.cos((firstAngle * Math.PI) / 180);
    const y = radius * Math.sin((firstAngle * Math.PI) / 180); 

    gsap.set(dotTitleRef.current, {
      x: x + 360 / timePeriods.length + 180, 
      y: y - 220, 
    });
  }

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
        <p ref={firstYearRef} style={{ color: '#5d5fef' }}></p>
        <p ref={secondYearRef} style={{ color: '#ef5da8' }}></p>
      </div>
      <div ref={circleRef} className={styles.circle}>
        {timePeriods.map((period, index) => {
          const angle = (360 / timePeriods.length) * (index - 1);
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (       
            // <div key={period.title} className={styles.dotWrapper}>
              <div
              key={period.title}
              ref={(el) => {
                hiddenDotRefs.current[index] = el;
              }}
              className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => handleClick(index)}
              >
                <div
                  className={styles.hiddenDot}
                >
                  {index + 1}
                </div>
                {/* <div className={styles.dotTitle} style={{ display: activeIndex === index ? "block" : "none"}} >
                  <b>{timePeriods[activeIndex].title}</b>
                </div> */}
              </div>
            //    <div
            //    className={styles.dotTitle}
            //    style={{ display: index === activeIndex ? "block" : "none", top: y, left: x + 72 }}
            //  >
            //    <b>{period.title}</b>
            //  </div>
            // </div>     
          );
        })}
      </div>
        <div
          ref={dotTitleRef}
          className={styles.dotTitle}
        >
          <b>{timePeriods[activeIndex].title}</b>
        </div>
    </div>
      <div className={styles.controls}>
        <div className={styles.buttons}>
            <p>{`0${activeIndex+1}/0${timePeriods.length}`}</p>
            <button onClick={handlePrev} disabled={activeIndex === 0}>{'<'}</button>
            <button onClick={handleNext} disabled={activeIndex === timePeriods.length - 1}>{'>'}</button>
        </div>
        <SwiperComponent activeIndex={activeIndex}/>
      </div>
    </div>
  );
}