const {connect}=require("./connectDB.js");
const Todo=require("./todoModel.js");

//creating table and adding values to the table
const createTodo=async()=>{
    try{
        await connect();
        // const todo=await Todo.create({
        const todo=await Todo.addTask({
            title:"Second Item",
            dueDate:new Date(),
            completed:false,
        });
        console.log(`created todo with id : ${todo.id}`);
    }
    catch(error){
        console.error(error);
    }
}


//count number of entries
const countItems=async()=>{
    try{
        const totalCount=await Todo.count();
        console.log(`fount ${totalCount} items in the table`);
    }
    catch(error){
        console.error(error);
    }
}


// retrieving all values from table
const getAllTodos=async()=>{
    try{
        // const todos=await Todo.findAll();
        //------
        // const todos=await Todo.findAll({
        //     order:[
        //         ['id','DESC']
        //     ]
        // });
        //-----
        // const todos=await Todo.findAll({
        //     where:{
        //         completed:true
        //     },
        //     order:[
        //         ['id','DESC']
        //     ]
        // });
        //----------
        const todos=await Todo.findAll();
        const todoList=todos.map(todo=>todo.displayableString()).join("\n");
        console.log(todoList)
    }
    catch(error){
        console.error(error);
    }
}

// retrieving one value from table
const getSingleTodo=async()=>{
    try{
        // const todos=await Todo.findOne();
        //------
        // const todos=await Todo.findOne({
        //     order:[
        //         ['id','DESC']
        //     ]
        // });
        //-----
        const todos=await Todo.findOne({
            where:{
                completed:false
            },
            order:[
                ['id','DESC']
            ]
        });

        console.log(todos.displayableString())
    }
    catch(error){
        console.error(error);
    }
}

//update table
const updateItem=async(id)=>{
    try{
        await Todo.update({completed:true},{
            where:{
                id:id
            }
        })
    }
    catch(error){
        console.error(error);
    }
}

//deletion
const deleteItem=async(id)=>{
    try{
        const deletedRowCount=await Todo.destroy({
            where:{
                id:id
            }
        })
        console.log(`Delete ${deletedRowCount} rows.`)
    }
    
    catch(error){
        console.error(error);
    }
}

(async()=>{
    await getAllTodos();
    await countItems();
})();  

//------------
// const run =async()=>{
//     await getAllTodos();
//     await countItems();
// }
// run();  
//------
// (async()=>{
//     // await createTodo();
//     // await countItems();
//     await getAllTodos();
//     // await getSingleTodo();
//     // await updateItem(1);
//     await deleteItem(1);
//     await getAllTodos();
// })();