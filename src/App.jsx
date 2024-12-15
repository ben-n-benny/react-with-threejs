/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Box,
  Cylinder,
  OrbitControls,
  RoundedBox,
  Sparkles,
  Text,
} from "@react-three/drei";

import "./index.css";

export default function App() {
  const [newItem, setNewItem] = useState("TODOS");
  const [todos, setTodos] = useState([]);
  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });

    setNewItem("");
  }

  function handleSubmitButton() {
    if (newItem) {
      setTodos((currentTodos) => {
        return [
          ...currentTodos,
          { id: crypto.randomUUID(), title: newItem, completed: false },
        ];
      });
    }

    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  console.log(todos);
  return (
    <>
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          background: "black",
        }}
      >
        <OrbitControls enableZoom enablePan enableRotate />

        <directionalLight color={0x9cdba6} position={[1, 1, 1]} />
        <ambientLight intensity={1} />

        <mesh>
          <Text position={[0, 4, 1]} fontSize={0.6}>
            TODOS
          </Text>
          <Text position={[0, 2, 1]} fontSize={0.6}>
            {newItem}
          </Text>
          <Box position={[2, 3, 1]} >
            <Text position={[0,0,1]} onClick={() => handleSubmitButton()}>Add</Text>
            <meshNormalMaterial />
          </Box>

          {todos.length === 0 && "No Todos"}
          {todos.map((todo, index) => {
            return (
              <>
                <Text
                  key={todo.id}
                  position={[0, index * -1, 1]}
                  fontSize={0.6}
                >
                  {todo.title}
                  <Sparkles scale={[9, 2, 0]} size={1} />
                  <Cylinder position={[0, 0, -1]}>
                    <meshNormalMaterial />
                    <Sparkles scale={2} size={5} />
                  </Cylinder>
                  
                </Text>
                <Box scale={0.8} position={[5, index * -1, 0]} onClick={() => deleteTodo(todo.id)}>
                    <Text position={[0,0,1]}>Delete</Text>
                    <meshNormalMaterial />
                  </Box>
              </>
            );
          })}
        </mesh>
      </Canvas>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button className="btn">Add</button>
      </form>
    </>
  );
}
