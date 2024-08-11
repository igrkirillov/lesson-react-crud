import config from "../config/conf.json"

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
    return (await response.json()) as PostDtoDetails;
}

async function delay(secs: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, secs * 1000);
    });
}