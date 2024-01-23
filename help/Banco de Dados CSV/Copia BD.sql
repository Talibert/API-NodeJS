--
-- PostgreSQL database dump
--

-- Dumped from database version 10.23
-- Dumped by pg_dump version 10.23

-- Started on 2023-11-03 21:44:45

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
-- TOC entry 2856 (class 0 OID 16434)
-- Dependencies: 203
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categoria VALUES (1, 'Custo fixo', 'ATIVO', true, false, NULL);
INSERT INTO public.categoria VALUES (2, 'Pedidos', 'ATIVO', false, true, NULL);
INSERT INTO public.categoria VALUES (3, 'Custo variável', 'ATIVO', true, false, NULL);


--
-- TOC entry 2850 (class 0 OID 16396)
-- Dependencies: 197
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cliente VALUES (1, 'Carlos e Noah Construções Ltda', '50.415.944/0001-06', '604.854.844.858', 'qualidade@carlosenoahconstrucoesltda.com.br', 'www.carlosenoahconstrucoesltda.com.br', '(17) 3690-9132', '15804-385', 'Rua das Camélias', '281', NULL, 'Jardim Pedro Borgoni', 'Catanduva', 'SP', 2, 'ATIVO');
INSERT INTO public.cliente VALUES (2, 'Emilly e José Marketing ME', '25.039.145/0001-27', '251.365.150.993', 'contato@emillyejosemarketingme.com.br', 'www.emillyejosemarketingme.com.br', '(12) 2692-3327', '12602-350', 'Rua Geraldo Luiz dos Santos', '968', NULL, 'Nova Lorena', 'Lorena', 'SP', 3, 'ATIVO');
INSERT INTO public.cliente VALUES (3, 'Bento e Stefany Entregas Expressas ME', '21.557.558/0001-42', '937.294.112.794', 'representantes@bentoestefanyentregasexpressasme.com.br', 'www.bentoestefanyentregasexpressasme.com.br', '(11) 2668-7882', '08150-540', 'Rua Felipe Cassiano', '897', NULL, 'Jardim Senice', 'São Paulo', 'SP', 4, 'ATIVO');
INSERT INTO public.cliente VALUES (4, 'Eduardo e Martin Assessoria Jurídica ME', '52.382.442/0001-43', '179.776.429.471', 'atendimento@eduardoemartinassessoriajuridicame.com.br', 'www.eduardoemartinassessoriajuridicame.com.br', '(15) 3532-0621', '18410-010', 'Avenida Brasil', '916', NULL, 'Vila Nova', 'Itapeva', 'SP', 4, 'ATIVO');
INSERT INTO public.cliente VALUES (5, 'Vicente e Luzia Informática Ltda', '73.942.964/0001-22', '358.100.507.992', 'ouvidoria@vicenteeluziainformaticaltda.com.br', 'www.vicenteeluziainformaticaltda.com.br', '(11) 2716-5995', '04531-020', 'Rua da Mata', '196', 'Sala 3', 'Itaim Bibi', 'São Paulo', 'SP', 5, 'ATIVO');
INSERT INTO public.cliente VALUES (6, 'Tiago e Filipe Telecom Ltda', '64.082.116/0001-08', '598.517.001.230', 'cobranca@tiagoefilipetelecomltda.com.br', 'www.tiagoefilipetelecomltda.com.br', '(14) 3836-5188', '18703-310', 'Rua Dias Cintra', '634', NULL, 'Parque Novo Mundo', 'São Paulo', 'SP', 5, 'ATIVO');
INSERT INTO public.cliente VALUES (7, 'Laís e Manoel Lavanderia Ltda', '45.759.655/0001-86', '143.638.815.171', 'compras@laisemanoellavanderialtda.com.br', 'www.laisemanoellavanderialtda.com.br', '(11) 2719-5737', '02190-080', 'Rua João de Lara da Cunha', '326', NULL, 'Parque Novo Mundo', 'São Paulo', 'SP', 1, 'ATIVO');
INSERT INTO public.cliente VALUES (8, 'Rita e Márcia Pizzaria ME', '55.186.714/0001-28', '824.682.084.684', 'rh@ritaemarciapizzariame.com.br', 'www.ritaemarciapizzariame.com.br', '(14) 3949-3219', '17026-794', 'Rua Maria da Conceição', '768', NULL, 'Jardim Chapadão', 'Bauru', 'SP', 1, 'ATIVO');
INSERT INTO public.cliente VALUES (9, 'Thiago e Emily Adega Ltda', '77.229.315/0001-30', '900.893.704.630', 'fiscal@thiagoeemilyadegaltda.com.br', 'www.thiagoeemilyadegaltda.com.br', '(11) 3743-5254', '04923-020', 'Rua Serra do Ajuá', '905', NULL, 'Riviera Paulista', 'São Paulo', 'SP', 2, 'ATIVO');
INSERT INTO public.cliente VALUES (10, 'Amanda e Hugo Locações de Automóveis Ltda', '28.738.885/0001-40', '748.008.132.263', 'producao@amandaehugolocacoesdeautomoveisltda.com.br', 'www.amandaehugolocacoesdeautomoveisltda.com.br', '(14) 2858-5131', '19906-015', 'Avenida Horácio Soares', '168', NULL, 'Jardim Ouro Verde', 'Ourinhos', 'SP', 3, 'INATIVO');


--
-- TOC entry 2858 (class 0 OID 16450)
-- Dependencies: 205
-- Data for Name: conta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.conta VALUES (1, 'Caixa', '0', '0', '2012-06-25 00:00:00', 'Caixa da empresa.', 'ATIVO');
INSERT INTO public.conta VALUES (2, 'Banco Bradesco', '2598', '15489-5', '2012-06-02 00:00:00', NULL, 'ATIVO');
INSERT INTO public.conta VALUES (3, 'Banco Itaú', '6597', '2165747-7', '2012-06-02 00:00:00', NULL, 'ATIVO');


--
-- TOC entry 2852 (class 0 OID 16407)
-- Dependencies: 199
-- Data for Name: contato; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contato VALUES (1, 'Martin Carlos Baptista', 'Comercial', '539.909.612-92', 'martincarlosbaptista@piscinasegura.com.br', '(61) 99984-3946', 'ATIVO', 1);
INSERT INTO public.contato VALUES (2, 'Antônia Sophia Porto', 'Diretoria', '210.038.100-80', 'antoniasophiaporto-84@novotempo.com', '(21) 98789-7435', 'ATIVO', 1);
INSERT INTO public.contato VALUES (3, 'Isaac Danilo da Rosa', 'Compras', '792.786.490-40', 'isaacdanilodarosa-84@iclud.com', '(14) 98181-7387', 'ATIVO', 1);
INSERT INTO public.contato VALUES (4, 'Edson Benedito Paulo Rodrigues', NULL, '035.193.976-84', 'edsonbeneditopaulorodrigues@vinax.com.br', '(27) 98639-2076', 'ATIVO', 1);
INSERT INTO public.contato VALUES (5, 'Caio Anthony Daniel Silva', 'Técnico', '102.331.585-88', 'caioanthonydanielsilva-92@land.com.br', '(77) 99918-4390', 'ATIVO', 2);
INSERT INTO public.contato VALUES (6, 'Manuela Aline Natália Jesus', 'Compras', '405.298.197-91', 'manuelaalinenataliajesus_@mls.com.br', NULL, 'ATIVO', 2);
INSERT INTO public.contato VALUES (7, 'Allana Vitória Elisa Peixoto', NULL, '592.056.118-16', 'allanavitoriaelisapeixoto_@engeseg.com.br', '(21) 98611-2887', 'ATIVO', 3);
INSERT INTO public.contato VALUES (8, 'Pietro Anderson Osvaldo Costa', NULL, '073.204.307-70', 'pietroandersonosvaldocosta@cursomarcato.com.br', '(79) 99215-0924', 'ATIVO', 4);
INSERT INTO public.contato VALUES (9, 'Natália Allana Viana', 'Diretoria', '064.206.928-06', 'nataliaallanaviana@harmoniacontabil.com.br', '(81) 99807-3263', 'INATIVO', 5);
INSERT INTO public.contato VALUES (10, 'Laura Sarah Moura', 'Compras', '668.795.737-62', 'maiteclariceheloisaassuncao_@directnet.com', '(19) 98688-2949', 'ATIVO', 5);
INSERT INTO public.contato VALUES (11, 'Enzo Arthur Matheus Gomes', NULL, '902.618.848-08', 'enzoarthurmatheusgomes_@editorazap.com.br', NULL, 'ATIVO', 6);
INSERT INTO public.contato VALUES (12, 'Emanuel Benedito Murilo Nogueira', NULL, '517.327.150-76', 'eemanuelbeneditomurilonogueira@hormail.com', NULL, 'ATIVO', 7);
INSERT INTO public.contato VALUES (13, 'Caleb Miguel Noah Almada', NULL, '759.252.189-06', 'calebmiguelnoahalmada@boll.com.br', NULL, 'ATIVO', 8);
INSERT INTO public.contato VALUES (14, 'Manoel Anderson da Conceição', NULL, '706.019.010-45', 'manoelandersondaconceicao-92@prokopetz.com.br', NULL, 'ATIVO', 9);
INSERT INTO public.contato VALUES (15, 'Marcos Vinicius Filipe Gonçalves', NULL, '278.518.657-51', NULL, '(67) 99563-1342', 'ATIVO', 10);


--
-- TOC entry 2854 (class 0 OID 16423)
-- Dependencies: 201
-- Data for Name: fornecedor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.fornecedor VALUES (1, 'Márcia e Raimundo Esportes ME', '29.160.262/0001-03', '641.066.289.480', 'desenvolvimento@marciaeraimundoesportesme.com.br', 'www.marciaeraimundoesportesme.com.br', '(16) 2860-7795', '14050-475', 'Travessa Marácia', '249', NULL, 'Vila Tibério', 'Ribeirão Preto', 'SP', 5, 'ATIVO');
INSERT INTO public.fornecedor VALUES (2, 'Isabella e Danilo Restaurante Ltda', '70.053.060/0001-58', '81.036.507.184', 'juridico@isabellaedanilorestauranteltda.com.br', 'www.isabellaedanilorestauranteltda.com.br', '(15) 3626-3758', '18046-152', 'Rua Ignauro Duarte', '823', NULL, 'Jardim Pagliato', 'Sorocaba', 'SP', 2, 'ATIVO');
INSERT INTO public.fornecedor VALUES (3, 'Antônia e Oliver Doces & Salgados ME', '31.172.666/0001-50', '31.266.401.563', 'almoxarifado@antoniaeoliverdocessalgadosme.com.br', 'www.antoniaeoliverdocessalgadosme.com.br', '(11) 3570-1742', '04417-240', 'Rua Delfim Guedes', '150', NULL, 'Jardim Miriam', 'São Paulo', 'SP', 5, 'ATIVO');


--
-- TOC entry 2860 (class 0 OID 16461)
-- Dependencies: 207
-- Data for Name: lancamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.lancamento VALUES (1, 1, 1, -289.00, '2012-06-25 00:00:00', '2012-06-25 00:00:00', 'Almoço', 'PAGO', 1, 1, 0, 1);
INSERT INTO public.lancamento VALUES (2, 1, 1, 98.74, '2012-06-25 00:00:00', '2012-06-25 00:00:00', 'Pedido #16312', 'PAGO', 1, 2, 1, 0);
INSERT INTO public.lancamento VALUES (3, 1, 2, 63.67, '2012-06-28 00:00:00', '2012-06-28 00:00:00', 'Pedido #16312', 'PAGO', 2, 2, 1, 0);
INSERT INTO public.lancamento VALUES (4, 2, 2, 63.67, '2012-06-28 00:00:00', '2012-07-28 00:00:00', 'Pedido #16312', 'PENDENTE', 2, 2, 1, 0);
INSERT INTO public.lancamento VALUES (5, 1, 1, -89.14, '2012-08-29 00:00:00', '2012-08-29 00:00:00', 'Combustível da Van', 'PAGO', 2, 3, 0, 2);
INSERT INTO public.lancamento VALUES (6, 1, 1, -587.00, '2012-08-29 00:00:00', '2012-12-31 00:00:00', 'Parcela do IPTU', 'PENDENTE', 3, 1, 0, 3);
INSERT INTO public.lancamento VALUES (7, 1, 1, 1257.00, '2012-09-01 00:00:00', '2012-09-01 00:00:00', 'Pedido #163231', 'PAGO', 3, 2, 5, 0);
INSERT INTO public.lancamento VALUES (8, 1, 3, 500.00, '2012-09-01 00:00:00', '2012-09-01 00:00:00', 'Pedido #163234', 'PENDENTE', 2, 2, 3, 0);
INSERT INTO public.lancamento VALUES (9, 2, 3, 500.00, '2012-09-01 00:00:00', '2012-10-01 00:00:00', 'Pedido #163235', 'PENDENTE', 2, 2, 3, 0);
INSERT INTO public.lancamento VALUES (10, 3, 3, 500.00, '2012-09-01 00:00:00', '2012-10-01 00:00:00', 'Pedido #163236', 'PENDENTE', 2, 2, 3, 0);
INSERT INTO public.lancamento VALUES (11, 1, 1, -74.00, '2012-09-02 00:00:00', '2012-09-02 00:00:00', 'Almoço', 'PAGO', 2, 3, 0, 3);
INSERT INTO public.lancamento VALUES (12, 1, 2, 687.00, '2012-09-03 00:00:00', '2012-09-03 00:00:00', 'Pedido #163237', 'PAGO', 3, 2, 3, 0);
INSERT INTO public.lancamento VALUES (13, 2, 2, 687.00, '2012-09-03 00:00:00', '2012-10-03 00:00:00', 'Pedido #163237', 'PENDENTE', 3, 2, 3, 0);


--
-- TOC entry 2875 (class 0 OID 0)
-- Dependencies: 202
-- Name: categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_seq', 1, false);


--
-- TOC entry 2876 (class 0 OID 0)
-- Dependencies: 196
-- Name: cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cliente_id_seq', 4, true);


--
-- TOC entry 2877 (class 0 OID 0)
-- Dependencies: 204
-- Name: conta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conta_id_seq', 1, false);


--
-- TOC entry 2878 (class 0 OID 0)
-- Dependencies: 198
-- Name: contato_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contato_id_seq', 3, true);


--
-- TOC entry 2879 (class 0 OID 0)
-- Dependencies: 200
-- Name: fornecedor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fornecedor_id_seq', 1, false);


--
-- TOC entry 2880 (class 0 OID 0)
-- Dependencies: 206
-- Name: lancamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lancamento_id_seq', 1, false);


-- Completed on 2023-11-03 21:44:46

--
-- PostgreSQL database dump complete
--

