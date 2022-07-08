const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = " https://api.escuelajs.co/api/v1";

function fetchData(urlApi, callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", urlApi, true);
    xhttp.onreadystatechange = function (event) {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                const error = new Error(`Error ${urlApi}`);
                return callback(error, null);
            }
        }
    };

    xhttp.send();
}

fetchData(`${API}/products`, function (err, data) {
    if (err) return console.error(err);

    fetchData(`${API}/products/${data[0].id}`, function (err2, data2) {
        if (err2) return console.error(err2);

        fetchData(
            `${API}/categories/${data2?.category?.id}`,
            function (err3, data3) {
                if (err3) return console.error(err3);
                console.log(data[0]);
                console.log(data2.title);
                console.log(data3.name);
            }
        );
    });
});
