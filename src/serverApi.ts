import config from "../config/conf.json"
import {Params} from "react-router-dom";

export type PostDto = {
    id: number,
    created: Date,
    text: string
}

export type PostDtoDetails = {
    text: string
}

export async function getPosts() {
    const endpoint = config.serverUrl + "/posts";
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    await delay(1);
    return (await response.json()) as PostDto[];
}

export async function savePost(text: string) {
    const endpoint = config.serverUrl + "/posts";
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: JSON.stringify({text: text})
    });

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    await delay(1);
}

export async function editPost(id: number, text: string) {
    const endpoint = config.serverUrl + "/posts/" + id;
    const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
        },
        body: JSON.stringify({text: text})
    });

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    await delay(1);
}

export async function getDetails(id: number) {
    const endpoint = config.serverUrl + "/posts/" + id;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    await delay(1);
    return await response.json().then(obj => obj["post"]) as PostDtoDetails;
}

export async function deletePost(id: number) {
    const endpoint = config.serverUrl + "/posts/" + id;
    const response = await fetch(endpoint, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    await delay(1);
}

async function delay(secs: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, secs * 1000);
    });
}

export function retrieveIdFromParams(params: Params<string>): number {
    const {id} = params;
    if (id && !isNaN(parseInt(id))) {
        return +id;
    } else {
        throw Error(`Не определён id поста: ${id}`);
    }
}