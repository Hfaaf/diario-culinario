# 📖 Diário Culinário PWA

Este projeto é um **Progressive Web App (PWA)** de um diário culinário, desenvolvido como uma atividade acadêmica.

O objetivo principal da atividade era construir um PWA que fizesse uso de **recursos de hardware (câmera)** e consumisse uma **API pública**, além de uma API própria.

Este aplicativo permite que os usuários descubram receitas aleatórias da API pública [TheMealDB](https://www.themealdb.com/api.php) e, o mais importante, salvem suas próprias receitas pessoais em um diário, tirando uma foto do prato na hora.

## ✨ Funcionalidades

* **Progressive Web App (PWA):** O aplicativo é totalmente instalável em dispositivos móveis e desktops, com suporte básico offline.
* **Design Mobile-First:** A interface foi desenhada com Tailwind CSS para uma experiência nativa em celulares.
* **Aba "Explorar":** Consome a API pública `TheMealDB` para buscar e exibir uma receita aleatória.
* **Aba "Adicionar Receita":**
    * **Uso de Hardware:** Utiliza o metodo `navigator.mediaDevices.getUserMedia()` para acessar a câmera do dispositivo e tirar uma foto.
    * Permite ao usuário salvar um título, ingredientes e instruções.
    * Envia a foto e os dados para o backend privado (ASP.NET).
* **Aba "Meu Diário":** Lista todas as receitas pessoais salvas pelo usuário, exibindo as fotos e os dados vindos do backend e do banco de dados MongoDB.

## 🛠️ Tecnologias Utilizadas

Este é um projeto Full-Stack dividido em duas partes:

### **Frontend (`diario-culinario/`)**

* **React 18** (com Hooks)
* **TypeScript**
* **Vite** (Como build tool e servidor de desenvolvimento)
* **Tailwind CSS** (Para estilização Mobile-First)
* **React Router v6** (Para navegação de páginas)
* **Vite PWA Plugin** (Para geração do Service Worker e Manifest)
* **Axios** (Para chamadas de API)
* **React Icons** (Para a interface)

### **Backend (`api/`)**

* **.NET 8 Web API**
* **ASP.NET Core**
* **MongoDB** (Como banco de dados NoSQL)
* `MongoDB.Driver` (Para conexão com o banco)
* Arquitetura de Serviços e Controllers (para lidar com o upload de imagens e dados)

## 📸 Telas do Aplicativo

*(Recomendado: Tire screenshots do seu app funcionando e coloque-as aqui)*

## 🚀 Como Executar o Projeto

Para rodar este projeto, você precisará clonar o repositório e executar o Backend e o Frontend separadamente.

> **Nota de Configuração:** O repositório já inclui arquivos `.gitignore` otimizados para as pastas de Frontend (ignorando `node_modules`, `dist`, `.env.local`, etc.) e Backend (ignorando `bin`, `obj`, `appsettings.Development.json`, `.idea/`, etc.). Isso garante que apenas o código-fonte relevante seja versionado e evita o envio de arquivos sensíveis ou desnecessários.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (v18 ou superior)
* [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
* Um servidor [MongoDB](https://www.mongodb.com/try/download/community) local ou um cluster na nuvem (Atlas).

---

### 1. Configuração do Backend (`api/`)

1.  **Navegue até a pasta da API:**
    ```bash
    cd api
    ```

2.  **Configure o Banco de Dados:**
    Abra o arquivo `appsettings.json` e altere a seção `MongoDbSettings` com a sua string de conexão e nome do banco de dados.
    *(**Nota:** Se você criar um `appsettings.Development.json` para seus testes locais, o `.gitignore` já está configurado para não enviá-lo).*
    ```json
    "MongoDbSettings": {
      "ConnectionString": "mongodb://localhost:27017",
      "DatabaseName": "CulinaryDiaryDb",
      "CollectionName": "UserRecipes"
    }
    ```

3.  **Rode o Backend:**
    O Rider ou Visual Studio fará isso, mas via terminal:
    ```bash
    # Confie no certificado de desenvolvimento (necessário para HTTPS)
    dotnet dev-certs https --trust
    
    # Restaure os pacotes
    dotnet restore
    
    # Execute o projeto
    dotnet run
    ```

4.  O servidor da API estará rodando (ex: `https://localhost:44317` ou `https://localhost:7100`). **Anote esta URL.**

---

### 2. Configuração do Frontend (`diario-culinario/`)

1.  **Navegue até a pasta do Frontend:**
    ```bash
    cd diario-culinario
    ```

2.  **Instale as dependências:**
    (A pasta `node_modules` será criada localmente e ignorada pelo Git).
    ```bash
    npm install
    ```

3.  **Configure a URL da API:**
    Este é o passo mais importante. Abra o arquivo `src/services/userRecipeApi.ts` e atualize a variável `API_URL` com o endereço do seu backend (o mesmo da Etapa 1).

    *Arquivo: `src/services/userRecipeApi.ts`*
    ```typescript
    // EX: Altere para a porta correta do seu backend
    const API_URL = 'https://localhost:44317/api/UserRecipes'; 
    ```
    *Obs: Faça o mesmo no arquivo `src/pages/MyDiaryPage.tsx` para a `BACKEND_URL` (para carregar as imagens).*

4.  **Execute o Frontend:**
    ```bash
    npm run dev
    ```

5.  **Acesse o App:**
    O aplicativo estará disponível em `https://localhost:5173`.

    > **IMPORTANTE:** Você **deve** acessar a versão `https://` (com HTTPS) no seu navegador, pois os recursos de hardware (como a câmera) só funcionam em contextos seguros. O Vite já inicia o servidor com um certificado SSL de desenvolvimento graças ao `vite.config.ts`.

---

## 👨‍💻 Autor

Feito por **Heitor Farias** como parte da atividade de PWA + Uso de recurso de Hardware + API.
