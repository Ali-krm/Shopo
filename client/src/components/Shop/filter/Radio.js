import { useState } from 'react';
import styles from './productpage.module.scss'

const Radio = ({size,index}) => {
    const [checked,setChecked] = useState(false)



  return (
    <label htmlFor="sizeinput" className={styles.label}>
      <input
        type={"radio"}
        value={size}
        key={index}
        //defaultChecked={index === 0 ? true : checked}
        onChange={()=>setChecked(prev=>!prev)}
        checked={checked}
        id="sizeinput"
        className={styles.sizeinput}
      />
      <span>{size}</span>
    </label>
  );
};

export default Radio;
