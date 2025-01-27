# Blog Node.js

Este é um projeto de blog desenvolvido com Node.js, Express, MongoDB e Handlebars. O objetivo deste projeto é
criar uma plataforma de blog onde os usuários podem se registrar, fazer login, criar, editar e excluir postagens e categorias.

## Funcionalidades

- Registro de usuário
- Login e logout de usuário
- Criação, edição e exclusão de postagens
- Criação, edição e exclusão de categorias
- Sistema de autenticação com Passport.js
- Flash messages para feedback do usuário
- Interface responsiva com Bootstrap

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Handlebars
- Passport.js
- Bcrypt.js
- Connect-flash
- Express-session
- Bootstrap

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/blog-nodejs.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd blog-nodejs
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Configure o MongoDB:
    - Certifique-se de que o MongoDB está instalado e em execução na sua máquina.
    - Altere a string de conexão com o MongoDB no arquivo [app.js](http://_vscodecontentref_/0) se necessário.

5. Inicie o servidor:
    ```bash
    npm start
    ```

6. Abra o navegador e acesse:
    ```
    http://localhost:5000
    ```

## Estrutura do Projeto

- [app.js](http://_vscodecontentref_/1): Arquivo principal do servidor, onde as configurações do Express, Mongoose, Passport.js e outras bibliotecas são feitas.
- [models](http://_vscodecontentref_/2): Diretório que contém os modelos Mongoose para as coleções do MongoDB.
- [routes](http://_vscodecontentref_/3): Diretório que contém as rotas do aplicativo.
  - [admin.js](http://_vscodecontentref_/4): Rotas para administração de categorias e postagens.
  - `usuario.js`: Rotas para registro, login e logout de usuários.
- [views](http://_vscodecontentref_/5): Diretório que contém os templates Handlebars.
  - `layouts/`: Layouts principais do aplicativo.
  - `partials/`: Partials reutilizáveis nos templates.
  - `admin/`: Templates para a área administrativa.
  - `usuarios/`: Templates para registro e login de usuários.
- [public](http://_vscodecontentref_/6): Diretório que contém arquivos estáticos como CSS, JS e imagens.

## Rotas Principais

- `/`: Página inicial do blog.
- `/usuarios/registro`: Página de registro de usuário.
- `/usuarios/login`: Página de login de usuário.
- `/usuarios/logout`: Rota para logout de usuário.
- `/admin`: Página inicial da área administrativa.
- `/admin/categorias`: Página para listar categorias.
- `/admin/categorias/add`: Página para adicionar nova categoria.
- `/admin/categorias/nova`: Rota para criar nova categoria.
- `/admin/posts`: Página para listar postagens.

## Middleware de Autenticação

O projeto utiliza um middleware de autenticação para proteger as rotas administrativas. Apenas usuários autenticados podem acessar essas rotas.
```
javascript
function eAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    req.flash('error_msg', 'Você precisa ser um administrador para acessar esta área');
    res.redirect('/');
}
```

Contribuição
Se você quiser contribuir com este projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.


Este arquivo `README.md` fornece uma visão geral completa do projeto, incluindo suas funcionalidades, tecnologias utilizadas, instruções de instalação, estrutura do projeto, principais rotas, middleware de autenticação, e informações sobre contribuição e licença.
Este arquivo `README.md` fornece uma visão geral completa do projeto, incluindo suas funcionalidades, tecnologias utilizadas, instruções de instalação, estrutura do projeto, principais rotas, middleware de autenticação, e informações sobre contribuição e licença.

