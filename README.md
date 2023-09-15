# UNTH-Cooperative-BE
This repository contains the backend functionalities of a Cooperative Asset Management Software. The software efficiently collects stipends from Cooperative members' salaries (UNTH Staff), calculated their income with added interest monthly, and facilitated strategic loans spread over extended payment periods for trusted members.

 ## Tech Stack
- Node js
- Express
- Mongoose
- dotenv
- Joi
- Jsonwebtoken
- Jest
- SuperTest
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

 - `staff: `
    [ `POST`: Register a new staff]  `/api/v1/staffs/register`
    [ `POST`: Login a staff]  `/api/v1/staffs/login`
    [ `GET`: get all staffs] `/api/v1/staffs`
    [ `GET`: get a single staff] `/api/v1/staffs/<id>`
    [ `PATCH`: update a staff] `/api/v1/staffs/<id>`
    [ `DELETE`: delete a staff] `/api/v1/staffs/<id>`

- `member: `
    [ `POST`: Register a new member]  `/api/v1/members/register`
    [ `GET`: get all members] `/api/v1/members/all`
    [ `GET`: get a single member] `/api/v1/members/<id>`
    [ `GET`: get a single member by ippis] `/api/v1/members/<ippis>`
    [ `PATCH`: update a member] `/api/v1/members/<ippis>`
    [ `DELETE`: delete a member] `/api/v1/members/<ippis>` 

- `loan: `
    [ `POST`: Register a new Loan]  `/api/v1/members/loans/register`
    [ `GET`: get all Loans] `/api/v1/members/loans/`
    [ `GET`: get a single loan] `/api/v1/members/loans/<id>`
    [ `PATCH`: update a loan] `/api/v1/members/loans/<id>`
    [ `DELETE`: delete a loan] `/api/v1/members/loans/<id>` 

- `withdraw: `
    [ `POST`: Create a new withdrawal]  `/api/v1/staffs/withdrawal`
    [ `GET`: get all withdrawals] `/api/v1/staffs/withdrawal/all`
    [ `GET`: get a single withdrawal] `/api/v1/staffs/withdrawal/:id`
    [ `PATCH`: update a withdrawal] `/api/v1/staffs/withdrawal/:id`
    [ `DELETE`: delete a withdrawal] `/api/v1/staffs/withdrawal/:id`


- [API Documentation](https://documenter.getpostman.com/view/19026826/2s9Y5VSiRW) `/api/v1/docs` [ `GET`: get API Documentation] 
## Entity Relationship model
To view the Entity Relationship Diagram (ERM) navigate [here](https://dbdiagram.io/d/64d0228a02bd1c4a5e53a94a)

