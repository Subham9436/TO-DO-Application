require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { todo } = require("./db/db");
const { TODOCheck } = require("./types");
const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/create", async function (req, res) {
  const newPayload = req.body;
  const parsedPaylooad = TODOCheck.safeParse(newPayload);
  if (!parsedPaylooad.success) {
    res.status(411).json("Wrong Inputs");
  }
  const newToDo = todo.create({
    task: newPayload.task,
  });
  try {
    const todos = await todo.find(); // Retrieve all todos
    res.send(todos); // Send the list of todos back in the response
  } catch (err) {
    res.status(500).send(err);
  }

  res.json({
    msg: "TO-DO Created Successfully",
    newToDo,
  });
});

app.get("/todoget", async function (req, res) {
  const response = await todo.find({});
  res.json(response);
});

app.post("/updatetodo", async function (req, res) {
  console.log(req.body);
  const { updatedTask, updateId } = req.body;
  if (!updatedTask || !updateId) {
    return res
      .status(400)
      .json({ error: "Missing required fields (task or updateId)" });
  }
  const updateToDo = await todo.findByIdAndUpdate(
    updateId,
    { task: updatedTask },
    { new: true }
  );
  try {
    const todos = await todo.find(); // Retrieve all todos
    res.send(todos); // Send the list of todos back in the response
  } catch (err) {
    res.status(500).send(err);
  }

  res.json({
    msg: "TO-DO Updated Successfully",
    updateToDo,
  });
});

app.put("/complete/:id", async function (req, res) {
  const { id } = req.params;
  const completeTodo = await todo.findByIdAndUpdate(id, {
    Status: "completed",
  });
  try {
    const todos = await todo.find(); // Retrieve all todos
    res.send(todos); // Send the list of todos back in the response
  } catch (err) {
    res.status(500).send(err);
  }
  res.json({
    completeTodo
  })
});
app.delete("/delete/:id", async function (req, res) {
  const { id } = req.params;
  const deleteTodo = await todo.findByIdAndDelete(id);
  try {
    const todos = await todo.find(); // Retrieve all todos
    res.send(todos); // Send the list of todos back in the response
  } catch (err) {
    res.status(500).send(err);
  }
  res.json({
    msg: "TO-DO deleted Successfully",
    deleteTodo,
  });
});

app.listen(port, () => {
  console.log(`The port is running on ${port}`);
});
