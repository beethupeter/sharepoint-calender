import * as React from 'react';
import PopUp from './popup';
import styles from './../CalenderWebPart.module.scss';

const left: string = require('../assets/images/left-arrow-black-triangular-shape.png');
const right: string = require('../assets/images/right-arrow-black-triangle.png');

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getCalenderDates = (date) => {
    const array = [];

    const previousStartDay = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
    const previousLastDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    if (previousStartDay < 6) {
        for(let i = previousLastDate - previousStartDay ;i<= previousLastDate;i++){
            const tempDate = new Date(date.getFullYear(), date.getMonth()-1, i);
            array.push({
                "day": i,
                'date': tempDate.getFullYear() + '-' + tempDate.getMonth() + '-' + tempDate.getDate(),
                "is_current": false,
            });

        }
    }
    const endDate = new Date(date.getFullYear(),date.getMonth() + 1, 0).getDate();
    for(let i=1;i<=endDate;i++){
        const tempDate = new Date(date.getFullYear(), date.getMonth(), i);
        array.push({
            "day": i,
            'date': tempDate.getFullYear() + '-' + tempDate.getMonth() + '-' + tempDate.getDate(),
            "is_current": true,
        });
    }
    const nextStartDay = new Date(date.getFullYear(),date.getMonth() + 1, 0).getDay();
    const numberOfDay = 6;
    for(let i=1;i<=(numberOfDay - nextStartDay); i++){
        const tempDate = new Date(date.getFullYear(), date.getMonth()+1, i);
        array.push({
            "day": i,
            'date': tempDate.getFullYear() + '-' + tempDate.getMonth() + '-' + tempDate.getDate(),
            "is_current": false,
        });
    }

    const formattedArray = [];
    let tempArray = [];
    array.map((item,index) => {
        if (index % 7 === 0 && index > 0 ) {
            formattedArray.push(tempArray);
            tempArray = [];
        }
        tempArray.push(item);
        return false;
    });
    formattedArray.push(tempArray);
    return formattedArray;
};

export const Calender = () => {
    const [date, setDate] = React.useState(new Date());
    const [dateArray, setDateArray] = React.useState([]);
    const [showPopUp, setShowPopUp] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState('');
    const [todos, setTodos] = React.useState({});

    console.log(dateArray);

    React.useEffect(() => {
        setDateArray(getCalenderDates(date));
    }, [date]);

    return  (
        <>
            <div className={styles.flexContainer} id="calander_container">
                <div className={styles.flexTitle}>
                    <img 
                        className={styles.left}
                        src={left}
                        alt="Preveous Month"
                        onClick={() => { setDate(new Date( date.getFullYear(), date.getMonth()-1,1))}}
                    />
                    <span><b>{ monthNames[date.getMonth()] } { date.getFullYear() }</b></span>
                    <img
                        className={styles.right}
                        src={right}
                        alt="Next Month"
                        onClick={() => { setDate(new Date( date.getFullYear(), date.getMonth()+1,1))}}
                    />
                </div>
                <div className={styles.flexDayHeading}>
                    
                    <div><b>S</b></div>
                    <div><b>M</b></div>
                    <div><b>T</b></div>  
                    <div><b>W</b></div>
                    <div><b>T</b></div>
                    <div><b>F</b></div>  
                    <div><b>S</b></div>
                    
                </div>
                <div className="items_div">
                    { dateArray.map((item, index) => (
                        <div className={styles.flexRow} key={index}>
                            { item.map((day) =>(
                                <div
                                    key={day.date}
                                    className={day.is_current ? '' : styles.outsideDate}
                                    onClick={() => {
                                        setShowPopUp(true);
                                        setSelectedDate(day.date);
                                    }}
                                >
                                   <b> {day.day} </b>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            { showPopUp && 
                <PopUp 
                    events={todos[selectedDate] ?? []}
                    onAdd={(item) => setTodos({
                        ...todos,
                        [selectedDate]: [
                            ...(todos[selectedDate] ?? []),
                            item,
                        ]
                    })}
                    onClose={() => setShowPopUp(false)}
                />
            }
        </>
    );

};