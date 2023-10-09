import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Login = ({ putnombre, putid }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3001/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const loginusuario = () => {
    for (var i in usuarios) {
      if (
        usuarios[i].nombre_usuario === username &&
        usuarios[i].contrasena === password
      ) {
        switch (username) {
          case "daniela":
            navigate("/pedidos");
            putnombre(username);
            break;
          case "pedro":
          case "cristian":
            navigate("/requerimientos");
            putnombre(username);
            putid(usuarios[i].id);
            break;
          case "alex":
            navigate("/aprobaciones");
            putnombre(username);
            break;
          default:
            break;
        }
      }
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="hidden sm:flex flex-col items-center justify-center h-screen">
        <a
          href="h"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          ADQUISICIONES
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Iniciar sesión en su cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={loginusuario}>
              <div>
                <label
                  htmlFor="user"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  name="user"
                  id="user"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="usuario"
                  required
                  value={username}
                  onChange={handleUsernameChange}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
              </div>

              <button
                type="submit"
                className="w-full text-white text-white bg-gray-900 hover:bg-gray-950 border-black rounded p-2"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
