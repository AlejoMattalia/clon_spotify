"use client";

import React, { useState, useEffect } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  FormControlLabel,
  LinearProgress,
  Radio,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { months } from "@/data/months";
import { genderOptions } from "@/data/genderOptions";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState({
    letter: false,
    numberOrSpecial: false,
    length: false,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      gender: "",
      username: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Este campo es obligatorio")
        .email("Debe ser un email válido"),

      password: Yup.string()
        .required("Este campo es obligatorio")
        .min(10, "La contraseña debe tener al menos 10 caracteres")
        .matches(/[a-zA-Z]/, "La contraseña debe contener al menos una letra")
        .matches(
          /[0-9!@#$%^&*()_+<>?]/,
          "La contraseña debe contener al menos un número o carácter especial"
        ),

      birthDay: Yup.number()
        .required("Este campo es obligatorio")
        .min(1, "El día debe ser mayor o igual a 1")
        .max(31, "El día debe ser menor o igual a 31"),

      birthMonth: Yup.string().required("Este campo es obligatorio"),

      birthYear: Yup.number()
        .required("Este campo es obligatorio")
        .min(1900, "El año debe ser mayor o igual a 1900")
        .max(
          new Date().getFullYear(),
          "El año no puede ser mayor al año actual"
        ),

      username: Yup.string().required("Este campo es obligatorio"),

      gender: Yup.string().required("Este campo es obligatorio"),
    }),
    onSubmit: async(values) => {

      const birthDate = `${values.birthDay.toString().padStart(2, '0')}/${values.birthMonth.toString().padStart(2, '0')}/${values.birthYear}`;

      const newValues = {
        email: values.email,
        password: values.password,
        username: values.username,
        gender: values.gender,
        birthDate: birthDate
      }

      await axios.post("/api/auth/register", newValues);
    },
  });

  useEffect(() => {
    const { password } = formik.values;

    setPasswordStrength({
      letter: /[a-zA-Z]/.test(password),
      numberOrSpecial: /[0-9!@#$%^&*()_+<>?]/.test(password),
      length: password.length >= 10,
    });
  }, [formik.values.password]);


  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-gray-600 to-black flex items-center justify-center p-10">
      {step === 1 ? (
        <section className="w-full max-w-[700px] flex flex-col items-center justify-between bg-backgroundBase px-8 py-16 rounded-2xl">
          <header className="flex flex-col items-center w-full">
            <MusicNoteIcon sx={{ fontSize: 50, color: "white" }} />
            <p className="text-white text-3xl font-bold max-w-80 text-center mt-3">
              Regístrate para empezar a escuchar contenido
            </p>
          </header>

          <div className="border-t w-[450px] border-gray-600 my-12"></div>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center justify-start gap-6 w-full max-w-80"
          >
            <div className="w-full">
              <p className="text-white text-sm mb-3 font-bold">
                Email
              </p>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="nombre@dominio.com"
                className={`h-12 w-full p-2 rounded-md text-white bg-transparent border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-500"
                }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className={`w-full max-w-80 transition-all duration-300 text-white py-2 px-4 rounded-full ${
                formik.errors.email
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-primary hover:bg-primaryDark cursor-pointer"
              }`}
              disabled={formik.errors.email ? true : false}
            >
              Siguiente
            </button>
          </form>

          <div className="border-t w-[450px] border-gray-600 my-12"></div>

          <main>
            <p className="text-[#b3b3b3]">
              ¿Ya tienes una cuenta?{" "}
              <span
                className="underline hover:text-blue-500 cursor-pointer text-white"
                onClick={() => router.push("/auth/login")}
              >
                Inicia sesión aquí
              </span>
              .
            </p>
          </main>

          <div className="border-t w-[450px] border-gray-600 my-12"></div>

          <button className="w-full max-w-80 border text-white font-bold py-2 px-4 rounded-full flex items-center gap-4 justify-center">
            <img
              src="https://res.cloudinary.com/dl6igxwvo/image/upload/v1722292126/court-music/download-removebg-preview_sxgfun.png"
              alt=""
              className="w-5"
            />
            Registrarse con Google
          </button>
        </section>
      ) : step === 2 ? (
        <section className="w-full max-w-[700px] min-h-[90vh] flex flex-col items-center justify-start bg-backgroundBase px-8 py-16 rounded-2xl">
          <header className="flex flex-col items-center w-full mb-5 max-w-[450px]">
            <MusicNoteIcon sx={{ fontSize: 50, color: "white" }} />
          </header>
          <Box sx={{ width: "100%", maxWidth: "20rem" }}>
            <LinearProgress variant="determinate" value={66} color="primary"/>
          </Box>

          <section className="w-full flex items-start justify-start mt-8 max-w-80">
            <ArrowBackIosIcon
              onClick={() => setStep(1)}
              sx={{
                fontSize: 30,
                color: "#b3b3b3",
                cursor: "pointer",
                transition: "color 0.1s",
                "&:hover": {
                  color: "white",
                },
              }}
            />

            <div className="w-full flex flex-col items-start justify-center">
              <p className="text-[#b3b3b3] max-w-80 text-center">Paso 2 de 3</p>
              <p className="text-white font-bold max-w-80 text-center">
                Crea una contraseña
              </p>
            </div>
          </section>

          <div className="w-full mt-12 max-w-80 flex flex-col items-start justify-start gap-6">
            <div className="w-full">
              <p className="text-white text-sm mb-3 font-bold">Contraseña</p>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Contraseña"
                className={`h-12 w-full p-2 rounded-md text-white bg-transparent border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-500"
                }`}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="w-full max-w-80 flex flex-col items-start justify-center gap-1">
              <p className="text-white text-xs font-bold">
                La contraseña debe tener al menos
              </p>
              <p className="text-white text-xs mt-1 flex items-center gap-2">
                <CheckCircleIcon
                  sx={{
                    fontSize: 13,
                    color: passwordStrength.letter ? "green" : "white",
                  }}
                />
                1 letra
              </p>
              <p className="text-white text-xs mt-1 flex items-center gap-2">
                <CheckCircleIcon
                  sx={{
                    fontSize: 13,
                    color: passwordStrength.numberOrSpecial ? "green" : "white",
                  }}
                />
                1 número o carácter especial
              </p>
              <p className="text-white text-xs mt-1 flex items-center gap-2">
                <CheckCircleIcon
                  sx={{
                    fontSize: 13,
                    color: passwordStrength.length ? "green" : "white",
                  }}
                />
                10 caracteres
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              className={`w-full max-w-80 transition-all duration-300 text-white py-2 px-4 rounded-full ${
                passwordStrength.letter && passwordStrength.numberOrSpecial && passwordStrength.length
                  ? "bg-primary hover:bg-primaryDark"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              disabled={!passwordStrength.letter && !passwordStrength.numberOrSpecial && !passwordStrength.length}
            >
              Siguiente
            </button>
          </div>
        </section>
      ) : step === 3 ? (
        <section className="w-full max-w-[700px] min-h-[90vh] flex flex-col items-center justify-start bg-backgroundBase px-8 py-16 rounded-2xl">
          <header className="flex flex-col items-center w-full mb-5 max-w-[450px]">
            <MusicNoteIcon sx={{ fontSize: 50, color: "white" }} />
          </header>
          <Box sx={{ width: "100%", maxWidth: "20rem" }}>
            <LinearProgress variant="determinate" value={100} />
          </Box>

          <section className="w-full flex items-start justify-start mt-8 max-w-80">
            <ArrowBackIosIcon
              onClick={() => setStep(2)}
              sx={{
                fontSize: 30,
                color: "#b3b3b3",
                cursor: "pointer",
                transition: "color 0.1s",
                "&:hover": {
                  color: "white",
                },
              }}
            />

            <div className="w-full flex flex-col items-start justify-center">
              <p className="text-[#b3b3b3] max-w-80 text-center">Paso 3 de 3</p>
              <p className="text-white font-bold max-w-80 text-center">
                Configura tu perfil
              </p>
            </div>
          </section>

          <form onSubmit={formik.handleSubmit} className="w-full mt-12 max-w-80 flex flex-col items-start justify-start gap-6">
            <div className="w-full">
              <p className="text-white text-sm mb-3 font-bold">
                Nombre de usuario
              </p>
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nombre de usuario"
                className={`h-12 w-full p-2 rounded-md text-white bg-transparent border ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500"
                    : "border-gray-500"
                }`}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>

            <div className="w-full">
              <p className="text-white text-sm mb-3 font-bold">
                Fecha de nacimiento
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="birthDay"
                  value={formik.values.birthDay}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Día"
                  className={`h-12 w-[25%] p-2 rounded-md text-white bg-transparent border ${
                    formik.touched.birthDay && formik.errors.birthDay
                      ? "border-red-500"
                      : "border-gray-500"
                  }`}
                />
                <select
                  name="birthMonth"
                  value={formik.values.birthMonth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-12 w-[45%] p-2 rounded-md text-white bg-transparent border ${
                    formik.touched.birthMonth && formik.errors.birthMonth
                      ? "border-red-500"
                      : "border-gray-500"
                  }`}
                >
                  {months.map((month) => (
                    <option key={month.value} value={+month.value} style={{ backgroundColor: "#0a0a0a", color: "white" }}>
                      {month.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="birthYear"
                  value={formik.values.birthYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Año"
                  className={`h-12 w-[30%] p-2 rounded-md text-white bg-transparent border ${
                    formik.touched.birthYear && formik.errors.birthYear
                      ? "border-red-500"
                      : "border-gray-500"
                  }`}
                />
              </div>
              {
              formik.errors.gender && formik.touched.gender
                ? <p className="text-red-500 text-sm mt-1">Debes llenar todos los campos correctamente.</p> 
                : null}
            </div>

            <div className="w-full">
              <p className="text-white text-sm mb-3 font-bold">Género</p>
              {genderOptions.map((option) => (
                <FormControlLabel
                key={option.value}
                control={
                  <Radio
                    checked={formik.values.gender === option.value}
                    onChange={formik.handleChange}
                    value={option.value}
                    name="gender"
                    size="small"
                    sx={{
                      color: "white",
                      "&.Mui-checked": { color: "white" },
                    }}
                  />
                }
                label={option.label}
                sx={{ 
                  color: 'white',
                  '& .MuiFormControlLabel-label': { fontSize: '14px' } // Adjust the fontSize as needed
                }}
              />
              ))}
              {formik.touched.gender && formik.errors.gender ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.gender}
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className={`w-full max-w-80 transition-all duration-300 text-white py-2 px-4 rounded-full ${
                formik.values.username === "" ||
                formik.values.birthDay === "" ||
                formik.values.birthMonth === "" ||
                formik.values.birthYear === "" ||
                formik.values.gender === ""
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-primary hover:bg-primaryDark"
              }`}
              disabled={
                formik.values.username === "" ||
                formik.values.birthDay === "" ||
                formik.values.birthMonth === "" ||
                formik.values.birthYear === "" ||
                formik.values.gender === ""
              }
            >
              Registrarse
            </button>
          </form>
        </section>
      ) : null}
    </main>
  );
}
