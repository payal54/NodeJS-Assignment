const app = require("express")();
const axios = require("axios");

//API for part 1 of the task

app.get("/todos",(req,res)=>{
    axios.get(`https://jsonplaceholder.typicode.com/todos`).then(response => {          // calling 3rd party api
        let resultData =  response.data.map((val)=>{
            return {"id":val.id,"title":val.title, "completed": val.completed}         // filtering the data according to assigned task
        }); 
        res.send(resultData);                                                          // send response back to client
    }).catch(error => console.log('Error to fetch data\n'))
});


//API for part 2 of the task

app.get(`/user/:id`,(req,res)=>{
    axios.get(`https://jsonplaceholder.typicode.com/todos`).then(response => {       // calling 3rd party API for fetching TODO array
        const todoData = response.data.filter((data)=>{                              // filtering respose recieved according to user id
            return data.userId == req.params.id;
        });
        axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`).then(response => {       // calling another 3rd party API for fetching user details according to provided user id
            const resultData = response.data;   
            resultData["todos"] = todoData;                                             // merging data of todo and user information
         res.send(resultData);                                                       // sending response back to client
        }).catch(error => console.log('Error to fetch data\n'))
    }).catch(error => console.log('Error to fetch data\n'))
});

app.listen(3000,()=>{
    console.log("connected");
});