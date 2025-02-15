import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  background-color: #fff;
`;

const Title = styled.h1`
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #EA6659;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "my_username",
    email: "user@stud.noroff.no",
    password: "securepassword",
    venueManager: true,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@stud.noroff.no")) {
      setError("You must use a @stud.noroff.no email to register.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          ...(formData.avatarUrl && { avatar: formData.avatarUrl }),
          venueManager: formData.venueManager,
        }),
      });

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        const data = await response.json();
        console.error("API Error Response:", data.errors);
        setError(data.errors ? data.errors[0].message : "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err.message);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Register</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Label>Name:
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Label>
          <Label>Email:
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Label>
          <Label>Password:
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Label>
          <Label>Venue Manager:
            <Checkbox type="checkbox" name="venueManager" checked={formData.venueManager} onChange={handleChange} />
          </Label>
          <Button type="submit">Register</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Register;
