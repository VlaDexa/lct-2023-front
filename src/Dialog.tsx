import React, {forwardRef, JSX} from "react";
import styles from "./Dialog.module.css"

export const Dialog = forwardRef((props: {
    children?: JSX.Element | JSX.Element[],
    dialogRef?: React.RefObject<HTMLDialogElement>
}) => {
    return <dialog ref={props.dialogRef} className={styles.dialog}>
        <div className={styles.dialog_inner}>
            {props.children}
        </div>
    </dialog>
})