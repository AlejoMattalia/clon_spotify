'use client'

import React from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { TextField } from "@mui/material";
import {
  textFieldStyles,
  inputPropsStyles,
  inputLabelPropsStyles,
} from "../../../style/textFieldStyles";
import { useRouter } from "next/navigation";

export default function Page() {

  const route = useRouter();  

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-gray-600 to-black flex items-center justify-center py-10">
      <section className="w-full max-w-[700px]  flex flex-col items-center justify-between bg-backgroundBase px-8 py-16 rounded-2xl">
        <header className="flex flex-col items-center w-full">
          <MusicNoteIcon sx={{ fontSize: 50, color: "white" }} />
          <p className="text-white text-3xl font-bold">Inicia sesión en ...</p>
        </header>

        <div className="border-t w-[450px] border-gray-600 my-12"></div>

        <form
          action=""
          className="flex flex-col items-center justify-start gap-6 w-full max-w-80"
        >
          <div className="w-full max-w-80">
            <p className="text-white text-sm mb-3 font-bold">
              Email o nombre de usuario
            </p>
            <TextField
              id="outlined-basic-1"
              placeholder="Email o nombre de usuario"
              variant="outlined"
              fullWidth
              InputProps={inputPropsStyles}
              InputLabelProps={inputLabelPropsStyles}
              sx={textFieldStyles}
            />
          </div>

          <div className="w-full max-w-80">
            <p className="text-white text-sm mb-3 font-bold">Contraseña</p>
            <TextField
              id="outlined-basic-2"
              placeholder="Contraseña"
              variant="outlined"
              fullWidth
              InputProps={inputPropsStyles}
              InputLabelProps={inputLabelPropsStyles}
              sx={textFieldStyles}
            />
          </div>

          <button className="w-full max-w-80 bg-primary hover:bg-primaryDark transition-all duration-300 text-white py-2 px-4 rounded-full">
            Iniciar sesión
          </button>
        </form>

        <div className="border-t w-[450px] border-gray-600 my-12"></div>

        <main>
          <p className="text-[#b3b3b3]">
            ¿No tienes cuenta?{" "}
            <span className="underline hover:text-blue-500 cursor-pointer text-white" onClick={() => route.push("/auth/register")}>
              Regístrate en ...
            </span>
          </p>
        </main>

        <div className="border-t w-[450px] border-gray-600 my-12"></div>

        <button className="w-full max-w-80 border text-white font-bold py-2 px-4 rounded-full flex items-center gap-4 justify-center">
          <img src="https://res.cloudinary.com/dl6igxwvo/image/upload/v1722292126/court-music/download-removebg-preview_sxgfun.png" alt="" className="w-5"/>  
          Continuar con google
        </button>
      </section>
    </main>
  );
}

