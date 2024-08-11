// @flow
import * as React from 'react';
import {FormEvent, useEffect, useState} from 'react';
import styles from "./editpost.module.css"
import {editPost, getDetails, PostDtoDetails, retrieveIdFromParams} from "../../serverApi";
import {useParams} from "react-router";

type EditPostProps = {
    postDidEdit: (id: number) => void,
};
type State = {
    id: number,
    loading: boolean,
    saving: boolean,
    details: PostDtoDetails | null
}
export const EditPost = (props: EditPostProps) => {
    const {postDidEdit} = props;
    const id = retrieveIdFromParams(useParams());
    const [state, setState] = useState({id: id, loading: true, saving: false, details: null} as State);
    useEffect(() => {
        getDetails(id)
            .then(details => {
                setState({...state, loading: false, details: details})
            })
            .catch((e: Error) => {
                alert(e.message);
                setState({...state, loading: false, details: null})
            })
    }, []);
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        editPost(id, (form[0] as HTMLTextAreaElement).value)
            .then(() => {
                setState({...state, loading: false});
                postDidEdit(id);
            })
            .catch((e: Error) => {
                alert(e.message);
                setState({...state, loading: false});
            });
    }
    return state.loading
        ? <div>Загружается...</div>
        : (
            <form className={styles["form"]} onSubmit={onSubmit}>
                <div className={styles["fields"]}>
                    <label htmlFor="addPost" className={styles["label"]}>Я</label>
                    <textarea id="addPost" className={styles["text"]} required={true}>{state.details?.text}</textarea>
                </div>
                <div className={styles["footer"]}>
                    <input type="submit" className={styles["submit"]} value="Сохранить"/>
                </div>
            </form>
        );
};