PRUEBA TECNICA FROTEND - CONCEPTO MADA

Consumo de API REST realizada en Express (Typescript) y Sequelize

Tecnologias utilizadas en el frontend:

- React (Typescript)
- Fetch API (No axios)

PASOS PARA EJECTUTAR EL PROYECTO LOCALMENTE

1. Clonar el repositorio

- git clone https://github.com/gusvaldev/PruebaTecnica---Concepto-Mada----Frontend.git
- cd CONCEPTO_MADA_REACT

2. Instalar las dependencias del proyecto

- npm install

3. Ejecutar el backend

- npm run dev

4. Ejecutar el frontend

- npm run dev

Al ejecutar el proyecto debe salir algo como
VITE v7.3.1 ready in 1385 ms

➜ Local: http://localhost:5173/
➜ Network: use --host to expose
➜ press h + enter to show help

---

Validaciones

- El formulario tiene validaciones como que todos los campos son necesarios (required)

Estructura del proyecto
├── assets/ # Imagenes o SVGS que se quieran incluir (no fue el caso)
│ ├── components/ # Carpeta que contiene componentes reutilizables, tal como barra de busqueda, filtros, cards
│ ├── hooks/ # Carpeta que contiene mi custom hook, el cual se encarga de controlar el estado de la aplicacion
│ ├── interfaces/ # Tipado de Typescript para los modelos con los que vamos a trabajar
│ ├── services/ # Carpeta que contiene las llamadas a la API, para despues ser llamadas en el custom hook
├── App.css # Estilos globales de la app
├── App.tsx # Nuestra aplicacion
├── index.css # Estilos globales de la app
└── main.jsx # Config de la app de React (Modo estricto)

Proceso que lleve a cabo para poder desarrollar el CRUD

1. Definir la interfaz que voy a utilizar, en este caso Products o Products[]

interface Products {
id: number;
nombre: string;
color: string;
tipo: "Zapato" | "Bolsa";
talla: string;
precio: number;
}

2. Hacer un servicio, que contenga las llamadas a la API

export const productService = {

getAll(), // GET /product
createProduct(), // POST /product
updateProduct(), // PUT /product/:id
deleteProduct(), // DELETE /product/:id

}

3. Hacer el custom hook

- El custom hook se encarga de manejar el estado de la aplicacion y la logica de la aplicacion

4. Hacer los componentes pequeños

- Hacer una serie de componentes que puedan ser reutilizables en un futuro

5. Dashboard

- Realizar el diseño de UI en una sola pantalla
- Coordinar props e informacion desde useProducts
- Mostrarlo en los componentes

6. Realizar estilos

NOTA: Se que es muy común y cómodo utilizar TailwindCSS con react, pero no quise instalar o tener tanta dependencia (Hacer react lo mas plano que se pueda)
