// let's try to consume APIs by sending some data
// In our case, it’s the sample data.
// but in applications, models would be containing the interfaces to the database
let users = {
    1: {
        id: 1,
        username: "User A",
    },
    2: {
        id: 2,
        username: "User B",
    },
};

let messages = {
    1: {
        id: 1,
        text: "Text A",
        userId: 1,
    },
    2: {
        id: 2,
        text: "Text B",
        userId: 2,
    },
};

// If a module defines a default export: then you can import by omitting the curly braces
export default {
    users,
    messages,
};