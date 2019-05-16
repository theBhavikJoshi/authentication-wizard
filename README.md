# Authentication Wizard

An Account-Password Backend System. A live version is hosten on [https://authentication-wizard-1.herokuapp.com](https://authentication-wizard-1.herokuapp.com)

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v11.13.0

    $ npm --version
    6.9.0

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/theBhavikJoshi/authentication-wizard.git
    $ cd authentication-wizard
    $ yarn install

## Configure app

Create a new environment variable file (.env) and add the following keys with corresponding values.

  - PORT
  - SENDGRID_API_KEY
  - BASE_URL
  - MONGODB_URI

## Modules/Dependencies Used

Following npm/yarn modules were used in this project:
- body-parser - to simplify the incoming request
- dotenv - to load environment variables from .env file
- express - to create web app/api
- mongoose - Object Modelling Tool to work with MongoDB
- nodemailer - for sending emails
- nodemailer-sendgrid-transport - for configuring Sendrid as emailing service in nodemailer
- random-token - to generate random tokens
- validator - to validate emails

## Running the project

    $ yarn start
    or
    $ yarn run dev 
