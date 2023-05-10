import axios from "axios";

// const sendBook = async (book) => {
//     // console.log("HEY")
//     const data = JSON.stringify(book);
//     const res = await axios.post(
//         "http://localhost:8080/addBook",
//         data,
//         {
//             headers: {
//                 'content-type':"application/JSON",
//                 "Access-Control-Allow-Origin":"*"
//             }
//         }
//     );
//     console.log("Sent", res);
// }

const update = async (book) => {
    const res = await fetch('http://localhost:8080/api/updateBook',
        {
                method: 'POST',
                headers: {
                    'content-type':"application/JSON",
                },
                body: JSON.stringify(book)
            }
    );
    const data = await res.json();

    // console.log("UPDATE -->" + book)
    // const data = JSON.stringify(book.id);
    // const res = await axios.post(
    //     "http://localhost:8080/updateBook",
    //     data,
    //     {
    //         headers: {
    //             'content-type':"application/JSON",
    //             "Access-Control-Allow-Origin":"*"
    //         }
    //     }
    // );
}


// "http://localhost:8080/delete?id=", + id,
const removeBook = async (book) => {
    // console.log(book)
    const res = await fetch('http://localhost:8080/api/deleteBook',
        {
            method: 'POST',
            headers: {
                'content-type': "application/JSON",
            },
            body: JSON.stringify(book)
        })


    // console.log("ID -->" + id);
    // const data = JSON.stringify(id);
    // const res = await axios.get(
    //     "http://localhost:8080/delete?id=" + data,
    //     {
    //         headers: {
    //             "Content-Type": "text/html",
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Headers": "Origin, X-Requested-With"
    //         }
    //     }
    // );
}

// export {sendBook, removeBook, update}
export {removeBook, update}