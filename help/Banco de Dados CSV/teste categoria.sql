--
-- PostgreSQL database dump
--

-- Dumped from database version 10.23
-- Dumped by pg_dump version 10.23

-- Started on 2023-11-03 21:48:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2826 (class 0 OID 16434)
-- Dependencies: 203
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categoria VALUES (1, 'Custo fixo', 'ATIVO', true, false, NULL);
INSERT INTO public.categoria VALUES (2, 'Pedidos', 'ATIVO', false, true, NULL);
INSERT INTO public.categoria VALUES (3, 'Custo variável', 'ATIVO', true, false, NULL);


--
-- TOC entry 2833 (class 0 OID 0)
-- Dependencies: 202
-- Name: categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_seq', 1, false);


-- Completed on 2023-11-03 21:48:02

--
-- PostgreSQL database dump complete
--

