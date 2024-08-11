// @flow
import * as React from 'react';
import styles from "./post.module.css"
import {deletePost, getDetails, PostDtoDetails, retrieveIdFromParams} from "../../serverApi";
import {useEffect, useState, MouseEvent} from "react";
import {useParams} from "react-router";
import {Params} from "react-router-dom";

type PostProps = {
    gotoEdit: (id: number) => void,
    postDidDelete: (id: number) => void
};
type State = {
    loading: boolean
    details: PostDtoDetails | null
}
export const Post = (props: PostProps) => {
    const {gotoEdit, postDidDelete} = props;
    const id = retrieveIdFromParams(useParams());
    const [state, setState] = useState({loading: true, details: null} as State);
    useEffect(() => {
        getDetails(+id)
            .then(details => {
                setState({...state, loading: false, details: details})
            })
            .catch((e: Error) => {
                alert(e.message);
                setState({...state, loading: false, details: null})
            })
    }, []);
    const onRemoveClick = (e: MouseEvent) => {
        e.preventDefault();
        deletePost(id)
            .then(() => {
                postDidDelete(id);
            })
            .catch((e: Error) => {
                alert(e.message);
            })
    }
    const onEditClick = (e: MouseEvent) => {
        e.preventDefault();
        gotoEdit(id);
    }
    return state.loading
        ? <div>Загружается...</div>
        : (
            <div className={styles["container"]}>
                <div className={styles["content"]}>
                    <span>{state.details?.text}</span>
                </div>
                <div className={styles["footer"]}>
                    <input type="button" className={styles["button-edit"]} value="Изменить" onClick={onEditClick}/>
                    <input type="button" className={styles["button-remove"]} value="Удалить" onClick={onRemoveClick}/>
                </div>
            </div>
        );
};