// @flow
import {FormEvent, useEffect, useRef, useState} from 'react';
import styles from "./addpost.module.css"
import {savePost} from "../../serverApi";

type AddPostProps = {
    postDidSave: () => void,
    gotoPosts: () => void
};
type State = {
    saving: boolean
}
export const AddPost = (props: AddPostProps) => {
    const {postDidSave, gotoPosts} = props;
    const [state, setState] = useState({saving: false} as State);
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        savePost((form[0] as HTMLTextAreaElement).value)
            .then(() => {
                form.reset();
                setState({...state, saving: false});
                postDidSave();
            })
            .catch((e: Error) => {
                form.reset();
                alert(e.message);
                setState({...state, saving: false});
            });
    }
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    })
    const onCancelClick = () => {
        gotoPosts();
    }
    return state.saving
        ? <div>Сохраняется...</div>
        : (
            <form className={styles["form"]} onSubmit={onSubmit}>
                <div className={styles["header"]}>
                    <a href="#" className={styles["cancel"]} onClick={onCancelClick}>X</a>
                </div>
                <div className={styles["fields"]}>
                    <label htmlFor="addPost" className={styles["label"]}>
                        <img src="https://i.pravatar.cc/300" alt="avatar" className={styles["avatar"]}/>
                    </label>
                    <textarea id="addPost" className={styles["text"]} required={true} ref={textAreaRef}></textarea>
                </div>
                <div className={styles["footer"]}>
                    <input type="submit" className={styles["submit"]} value="Опубликовать"/>
                </div>
            </form>
        );
};