import React, {forwardRef, JSX} from "react";
import styles from "./Dialog.module.css"

export const Dialog = forwardRef<HTMLDialogElement, {
    children?: JSX.Element | JSX.Element[],
    className?: string
}>((props, ref) => {
    return <dialog ref={ref} className={styles.dialog}>
        <div className={`${styles.dialog_inner} ${props.className}`}>
            {props.children}
        </div>
    </dialog>
})