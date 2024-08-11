// @flow
import * as React from 'react';
import {FormEvent, useState} from 'react';
import styles from "./addpost.module.css"
import {savePost} from "../../serverApi";

type AddPostProps = {
    postDidSave: () => void,
};
type State = {
    saving: boolean
}
export const AddPost = (props: AddPostProps) => {
    const {postDidSave} = props;
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
    return state.saving
        ? <div>Сохраняется...</div>
        : (
            <form className={styles["form"]} onSubmit={onSubmit}>
                <div className={styles["fields"]}>
                    <label htmlFor="addPost" className={styles["label"]}>Я</label>
                    <textarea id="addPost" className={styles["text"]} required={true}></textarea>
                </div>
                <div className={styles["footer"]}>
                    <input type="submit" className={styles["submit"]} value="Опубликовать"/>
                </div>
            </form>
        );
};