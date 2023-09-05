<h1 align="center">PROJETO SANTA CASA</h1>

| ![Tela Relatorio Filtro](https://github.com/EdsonBila/images/blob/main/projetoSantaCasa/telaRelatorioFiltro.png) | ![tela Especialidade Cadastro](https://github.com/EdsonBila/images/blob/main/projetoSantaCasa/telaEspecialidadeCadastro.png) |
| --- | --- |
| ![Tela Medico](https://github.com/EdsonBila/images/blob/main/projetoSantaCasa/telaMedico.png) | ![tela Home](https://github.com/EdsonBila/images/blob/main/projetoSantaCasa/telaHome.png) |

## Proposta

Este é um projeto solicitado pela **Santa Casa de Misericórdia de Presidente Prudente** visando avaliar meus conhecimentos para uma vaga de programador. 

### Projeto Requisitado
Aqui estão os detalhes do projeto:

![Conteúdo do Projeto](https://github.com/EdsonBila/images/blob/main/projetoSantaCasa/descricaoTarefa.png)

### Modelagem do Banco de Dados
Aqui está a modelagem do banco de dados:

![Modelagem do Banco de Dados](https://github.com/EdsonBila/images/blob/main/projetoSantaCasa/modelagemTarefa.png)

# ALGUNS COMANDOS PARA SE COMEÇAR BEM
Terminal sempre na pasta raiz 
### Rodar o projeto - CRIANDO A BASE DE DADOS
 - php artisan migrate

### Rodar o projeto - INICIANDO
 - npm run dev
 - php artisan serve

### Popular o banco com algumas informações fakes
 - php artisan tinker
    - Especialidade::factory(20)->create()
    - Medico::factory(20)->create() 

<h1 align="center">E aqui está, projetinho pronto para ser explorado!</h1>
