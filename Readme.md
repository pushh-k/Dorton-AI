# ⚡ Dorton AI

### *Intelligence. Redefined.*

A full-stack AI chat platform powered by multiple LLMs — with RAG, real-time internet search, vision, document understanding, and more.

**Live Demo:** [Dorton AI](https://dorton.vercel.app/)

---

## ✨ What is Dorton AI?

**Dorton AI** is a production-grade AI assistant platform that connects multiple state-of-the-art language models under one sleek interface.

It goes beyond a simple chatbot with:

* **RAG-powered document intelligence**
* **Real-time web search**
* **Image understanding**
* **Live streaming responses**
* **Secure authentication**
* **Real-time communication**

The platform combines multiple AI providers into a unified experience while maintaining a modular, scalable architecture.

---

## 🚀 Core Features

### 🤖 Multi-LLM Support

Switch between multiple powerful AI models through a unified interface:

| Model                  | Provider   |
| ---------------------- | ---------- |
| Gemini 1.5 Pro / Flash | Google     |
| GPT-4o / GPT-3.5       | OpenAI     |
| Mistral Medium         | Mistral AI |
| Command R              | Cohere     |
| DeepSeek V1            | DeepSeek   |

Dorton AI is designed around an **LLM-router architecture**, allowing models to be switched without changing the application's core business logic.

---

### 🧠 RAG — Document Intelligence

Upload documents and interact with them directly through AI.

Dorton AI supports:

* 📄 PDF documents
* 📝 DOCX / Word files
* 🗂️ JSON data files

The RAG pipeline processes uploaded documents and retrieves relevant information before generating responses.

---

### 🌐 Real-Time Internet Search

Dorton AI integrates **Tavily Search API** with **LangChain** to provide real-time web search.

This allows the assistant to retrieve current information and ground responses using external web sources.

---

### 👁️ Vision — Image Understanding

Upload an image and ask questions about it.

Dorton AI uses multimodal LLMs to:

* Analyze images
* Describe visual content
* Answer questions about images
* Reason over visual information

---

### ⚡ Live Streaming Responses

AI responses are streamed token-by-token using **Socket.io**.

Instead of waiting for the entire response to be generated, users receive the response progressively in real time.

---

### 🔐 Secure Authentication

Dorton AI implements a secure authentication architecture featuring:

* JWT-based authentication
* Email verification
* Transactional HTML emails
* Redis-powered token blacklisting
* HttpOnly cookie sessions

---

### 📁 File & Image Management

Uploaded files and images are managed using **ImageKit CDN** for optimized storage and delivery.

---

## 🛠️ Tech Stack

### Backend

| Technology         | Purpose                               |
| ------------------ | ------------------------------------- |
| Node.js + Express  | REST API server                       |
| MongoDB + Mongoose | Primary database                      |
| Redis              | Session management & logout blacklist |
| Socket.io          | Real-time LLM streaming               |
| LangChain          | LLM orchestration & RAG pipeline      |
| Tavily Search API  | Real-time internet search             |
| ImageKit           | File & image storage CDN              |
| Brevo (SMTP)       | Transactional email delivery          |
| JWT                | Authentication tokens                 |

### Frontend

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| React + Vite     | UI framework            |
| Tailwind CSS     | Styling                 |
| Axios            | HTTP client             |
| React Router     | Client-side routing     |
| Socket.io Client | Real-time communication |

### AI / LLM Integrations

| Integration    | Usage                |
| -------------- | -------------------- |
| Google Gemini  | Primary LLM          |
| OpenAI GPT     | Alternative LLM      |
| Mistral AI     | Alternative LLM      |
| Cohere Command | Alternative LLM      |
| DeepSeek       | Alternative LLM      |
| Tavily         | Web search grounding |
| LangChain      | RAG + orchestration  |

---

## 🏗️ Architecture Overview

```text
                         User Request
                              │
                              ▼
                   React Frontend (Vite)
                              │
                       Socket.io + REST
                              │
                              ▼
                    Express Backend
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
       Auth System       LLM Router        RAG Pipeline
       JWT + Redis      Gemini / GPT      LangChain
       Brevo Email      Mistral / etc.        │
                                             │
                                      PDF / DOCX / JSON
             │                │                │
             └────────────────┼────────────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
        Web Search          Vision         File Storage
          Tavily       Multimodal LLM       ImageKit
                              │
                              ▼
                     MongoDB + Redis
```

### Data Layer

**MongoDB**

Stores:

* Users
* Conversations
* Chats
* Documents

**Redis**

Handles:

* Session-related functionality
* Token blacklisting
* Logout invalidation

---

## 🔄 Request Flow

```text
User
 │
 ▼
React Client
 │
 ├── REST API
 └── Socket.io
 │
 ▼
Express Server
 │
 ├── Authentication
 │
 ├── LLM Router
 │      ├── Gemini
 │      ├── GPT
 │      ├── Mistral
 │      ├── Cohere
 │      └── DeepSeek
 │
 ├── RAG Pipeline
 │      └── Document Processing
 │
 ├── Tavily Web Search
 │
 ├── Vision Processing
 │
 └── ImageKit Storage
 │
 ▼
MongoDB + Redis
```

---

## 🎯 Why Dorton AI?

Traditional chatbots are limited to generating responses from a single model.

**Dorton AI brings multiple AI capabilities together in one platform:**

> **Multiple LLMs + RAG + Web Search + Vision + Real-Time Streaming**

This makes Dorton AI a more flexible AI assistant platform capable of handling conversations, documents, images, and up-to-date web information.

---

