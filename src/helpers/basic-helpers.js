export function FetchItems(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => console.log(err));
}

export function Authenticate(url, queryData, callback) {
    console.log("queryData : ", queryData.credential.email);
    fetch(url,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: queryData.credential.email, password: queryData.credential.password})
    })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => console.log("error : ", err));
}