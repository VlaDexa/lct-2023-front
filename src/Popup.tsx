import styles from "./Popup.module.css";
import {JSX} from "react";

export default function Popup(props: { children: JSX.Element }) {
    return <div className={styles.shadow_caster}>
        <div className={styles.inner_content}>
            {props.children}
        </div>
    </div>
}