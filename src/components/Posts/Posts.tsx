// @flow 
import * as React from 'react';
import {getPosts, PostDto} from "../../serverApi";
import styles from "./posts.module.css";
import {useEffect, useState, MouseEvent} from "react";

export type PostsProps = {
    gotoNewPost: () => void,
    gotoPost: (id: number) => void
};
type State = {
    loading: boolean,
    dtoList: PostDto[];
}
export const Posts = (props: PostsProps) => {
    const {gotoNewPost, gotoPost} = props;
    const [state, setState] = useState({loading: true, dtoList: []} as State);
    useEffect(() => {
        getPosts()
            .then(dtoList => setState({...state, loading: false, dtoList: dtoList}))
            .catch((e: Error) => {
                alert(e.message);
                setState({...state, loading: false, dtoList: []})
            })
    }, [])
    return (
        <div className={styles["posts-container"]}>
            <div>Посты:</div>
            {state.loading
                ? <span>Загружаются...</span>
                : state.dtoList.length != 0
                    ? state.dtoList.map(dto => (<Card dto={dto} postDidClick={gotoPost}></Card>))
                    : (<><span>0 постов</span> <a href="#" onClick={gotoNewPost}>Добавить</a></>)}
        </div>
    );
};

type CardProps = {
    dto: PostDto,
    postDidClick: (id: number) => void;
}
function Card(props: CardProps) {
    const {dto, postDidClick} = props;
    const onClick = (event: MouseEvent) => {
        event.preventDefault();
        postDidClick(dto.id);
    }
    return (
        <article className={styles["post-container"]} onClick={onClick}>
            <div className={styles["post-header"]}>

            </div>
            <div className={styles["post-content"]}>
                <span>{dto.text}</span>
            </div>
            <div className={styles["post-footer"]}>

            </div>
        </article>
    )
}