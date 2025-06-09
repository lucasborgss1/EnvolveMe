// src/routes/index.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Sobre } from "./pages/PaginaAbout/Sobre";
import { Cadastro } from "./pages/PaginaLogin/Cadastro";
import { GlobalStyles } from "./styles/GlobalStyles";
import PaginaInicial from "./pages/PaginaInicial/PaginaInicial";
import { Login } from "./pages/PaginaLogin/Login";

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <>
            <GlobalStyles />
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Sobre />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/paginaInicial" element={<PaginaInicial />} />
            </Routes>
        </>
    );
};

export const AppRoutes = () => (
    <BrowserRouter>
        <AnimatedRoutes />
    </BrowserRouter>
);
