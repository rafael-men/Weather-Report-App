# \# Weather Report App

# 

# Aplicação de previsão do tempo em React + Vite, com interface escura, e imagens de cidade.

# 

# \## Funcionalidades

# 

# \- \*\*Previsão atual + 5 dias\*\*: temperatura, sensação, umidade, pressão, visibilidade e nascer/pôr do sol.

# \- \*\*Busca com sugestões\*\*: ao digitar, aparecem cidades do mundo todo.

# \- \*\*Busca por coordenadas\*\*: selecionar uma cidade usa a lat/lon dela, evitando ambiguidades entre cidades de mesmo nome.

# \- \*\*Tradução automática\*\*: as descrições do tempo vêm da API em inglês e são convertidas para português.

# \- \*\*Ícones por condição do tempo\*\*: cada previsão exibe ícone e cor de acordo com o clima.





# \## Tecnologias

# 

# \- React 18 + Vite

# \- Tailwind CSS v4

# \- Material UI (ícones)

# \- OpenWeatherMap (clima, previsão e geocodificação)

# \- Unsplash API (imagens)

# 

# \## Como rodar

# 

# 1\. Instale as dependências:

# 

# &#x20;  ```bash

# &#x20;  npm install

# &#x20;  ```

# 

# 2\. Crie um arquivo `.env` na raiz com as chaves:

# 

# &#x20;  ```

# &#x20;  VITE\_WEATHER\_API\_KEY=suachave\_openweather

# &#x20;  VITE\_UNSPLASH\_ACCESS\_KEY=suachave\_unsplash

# &#x20;  VITE\_APP\_VERSION=1.1.0

# &#x20;  ```

# 

# 3\. Inicie em desenvolvimento:

# 

# &#x20;  ```bash

# &#x20;  npm run dev

# &#x20;  ```

# 

# 4\. Build de produção:

# 

# &#x20;  ```bash

# &#x20;  npm run build

# &#x20;  ```

# 

# \## Scripts

# 

# | Script            | Descrição                            |

# | ----------------- | ------------------------------------ |

# | `npm run dev`     | Servidor de desenvolvimento (Vite)   |

# | `npm run build`   | Gera o bundle de produção            |

# | `npm run lint`    | Roda o ESLint                        |

# | `npm run preview` | Pré-visualiza o build de produção    |

# 

