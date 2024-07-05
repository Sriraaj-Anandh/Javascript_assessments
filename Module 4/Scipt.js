function withCallback(callback) {
    setTimeout(() => {
        callback("Result from callback");
    }, 3000);

function withPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Result from promise");
        }, 3000);
    });
}


async function withAsyncAwait() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Result from async/await");
        }, 3000);
    });
}
}



withCallback((result) => {
    console.log(result); 
});


withPromise().then((result) => {
    console.log(result);
})

(async () => {
    const result = await withAsyncAwait();
    console.log(result); 
})();
