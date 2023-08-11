"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/quiz/login", {
        uid: id,
        pwd: password,
      });

      if (res.status === 200) {
        router.push("/admin/addQuestion");
        alert("Authentication successful, redirecting...");
      }
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input
          type="number"
          id="id"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
