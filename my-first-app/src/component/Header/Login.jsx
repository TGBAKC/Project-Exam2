import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 30px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 5px;
  color: #333;
  font-size: 22px;
`;

const Subtitle = styled.p`
  margin-bottom: 20px;
  color: #777;
  font-size: 14px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border 0.3s ease-in-out;

  &:focus {
    border: 1px solid #EA6659;
  }
`;

const Button = styled.button`
  background-color: #EA6659;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #d45548;
  }
`;

const RegisterText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #666;
`;

const RegisterLink = styled.span`
  color: #EA6659;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
`;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("authToken", data.data.accessToken);
      window.dispatchEvent(new Event("storage"));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Welcome Back!</Title>
        <Subtitle>Please login to continue</Subtitle>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button type="submit">Login</Button>

        <RegisterText>
          Don't have an account? {" "}
          <RegisterLink onClick={() => navigate("/register")}>
            Register here
          </RegisterLink>
        </RegisterText>
      </Form>
    </Container>
  );
}

export default Login;
