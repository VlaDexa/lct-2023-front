import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {OpenAPI} from "./openapi";

OpenAPI.BASE = "https://api.lapki.itatmisis.ru:8080";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
