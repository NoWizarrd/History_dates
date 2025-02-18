import HistoricalDates from './components/HistoricalDates/HistoricalDates';
import HistoricalDatesMobile from './components/HistoricalDatesMobile/HistoricalDatesMobile';

export default function App() {
    // eslint-disable-next-line no-restricted-globals
    if(screen.width > 768){
        return (
            <>
                <HistoricalDates/> 
            </>
        );
    } else {
        return (
            <>
                <HistoricalDatesMobile/>
            </>
        );
    }
}
