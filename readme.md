# Nodestore

 🏬 Store RESTServer with Node.js + Express + Mongoose + Bcrypt

**Clone the repository**

```sh
git clone https://github.com/dalejodc/nodestore.git
```

**Get into the project folder**
```sh
cd nodestore
```

**Download dependencies**
```sh
npm install
```

**Create an environment.js**

The file must be located in `server/config/environment.js` as `server/config/environment.js.example`. 

Set up your environment _dev_ or _prod_. And set your Mongodb URL in case that you are using a cloud database.
```
process.env.NODE_ENV='dev'
process.env.MONGO_URI='url_to_cloud_db'
```

**Run the server**
```sh
cd server
node server.js
```