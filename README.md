# UNTH-Cooperative-BE
This repository contains the backend functionalities of a Cooperative Asset Management Software. The software efficiently collects stipends from Cooperative members' salaries (UNTH Staff), calculated their income with added interest monthly, and facilitated strategic loans spread over extended payment periods for trusted members.

 ## Tech Stack
- Node js
- Express
- Mongoose
- dotenv
- Joi
- Jsonwebtoken
- Bcrypt
- Morgan

## Installation
- Clone the [repo](https://github.com/Pioneer-LTD/UNTH-Cooperative-BE.git) 
- Run `npm install ` in your terminal to install packages in package.json
- Create a `.env file` and fill in values for the following variables: - `DATABASE_URI`
- Finally run `npm start` in your terminal
## Endpoints 
- Healthcheck: `/api/v1/healthcheck` 
    [ `GET`: Server Health Check ]

- [API Documentation](https://documenter.getpostman.com/view/29089023/2s9Xy3trb3) `/api/v1/docs` [ `GET`: get API Documentation] 
## Entity Relationship model
To view the Entity Relationship Diagram (ERM) navigate [here](https://dbdiagram.io/d/64d0228a02bd1c4a5e53a94a)

