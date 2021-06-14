import * as React from 'react';
import styles from './../CalenderWebPart.module.scss';

function PopUp(props){
    const [item, setItem] = React.useState('');
    return (
        <div className={styles.popUpContainer}>
            <span className={styles.popUpClose} onClick={props.onClose}>X</span>
            <div className={styles.listBox}>
                <ul className={styles.list}>
                    {props.events.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.buttonBox}>
               <input
                    className={styles.popUpText}
                    type="text"
                    placeholder="Event Name"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />
               <input
                    className={styles.popUpButton}
                    type="button"
                    value="Add"
                    onClick={() => {
                        props.onAdd(item);
                        setItem('');
                    }}
                />
            </div>
        </div>
    )
}
export default PopUp;