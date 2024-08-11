// @flow
import * as React from 'react';
import styles from "./post.module.css"
import {getDetails, PostDto, PostDtoDetails} from "../../serverApi";
import {useEffect, useState} from "react";
import {useParams} from "react-router";

type PostProps = {
};
type State = {
    loading: boolean
    details: PostDtoDetails | null
}
export const Post = (props: PostProps) => {
    const {id} = useParams()
    const [state, setState] = useState({loading: true, details: null} as State);
    useEffect(() => {
        getDetails(+id)
            .then(details => {
                setState({...state, loading: false, details})
            })
            .catch((e: Error) => {
                alert(e.message);
                setState({...state, loading: false, details: null})
            })
    }, []);
    return state.loading
        ? <div>Загружается...</div>
        : (
            <div className={styles["container"]}>
                <div className={styles["content"]}>
                    <span>{state.details?.text}</span>
                </div>
            </div>
        );
};