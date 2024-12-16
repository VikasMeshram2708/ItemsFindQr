"use client";
import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function QrForm() {
  const [user, setUser] = useState({
    name: "",
    age: "",
    phone: "",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("data", {
      name: user.name,
      age: user.age,
      phone: user.phone,
    });
    setUser({
      name: "",
      age: "",
      phone: "",
    });
  };
  return (
    <Card className="shadow-lg w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-">Fill Your Data</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <form onSubmit={onSubmit} className="grid gap-3">
          <Input
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            name="name"
            type="text"
            placeholder="Enter Your Name"
          />
          <Input
            name="age"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: e.target.value })}
            type="text"
            placeholder="Enter Your Age"
          />
          <Input
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            name="phone"
            type="tel"
            placeholder="Enter Your Phone Number"
          />
          <Button type="submit" variant={"secondary"}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
