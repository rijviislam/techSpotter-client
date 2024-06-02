const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// MIDDLE-WARE //
app.use(cors(corsOptions));
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_TECHSPOTTER_USER}:${process.env.DB_TECHSPOTTER_PASS}@cluster0.yy4jwyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const usersCollection = client.db("techSpotterDB").collection("users");
    const productsCollection = client
      .db("techSpotterDB")
      .collection("products");

    // SIGN TOKEN //
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(
        user,
        process.env.TECHSPOTTER_ASSESS_SECRET_TOKEN,
        {
          expiresIn: "1h",
        }
      );
      res.send({ token });
    });

    // VERIFY TOKEN //
    // const verifyToken = (req, res, next) => {
    //   console.log("inside verify token", req.headers.authorization);

    //   if (!req.headers.authorization) {
    //     return res.status(401).send({ message: "unauthorized access" });
    //   }
    //   const token = req.headers.authorization.split(" ")[1]; //cutl
    //   jwt.verify(
    //     token,
    //     process.env.TECHSPOTTER_ASSESS_SECRET_TOKEN,
    //     (err, decoded) => {
    //       if (err) {
    //         return res.status(401).send({ message: "unauthorized access" });
    //       }
    //       req.decoded = decoded;
    //       next();
    //     }
    //   );
    // };
    const verifyToken = (req, res, next) => {
      console.log("inside verify token", req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Anauthorized Access!" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(
        token,
        process.env.BISTRO_ASSESS_SECRET_TOKEN,
        (err, decoded) => {
          if (err) {
            return res.status(401).send({ message: "unauthorized access" });
          }
          req.decoded = decoded;
          next();
        }
      );
    };

    // FEATURE PRODUCTS //
    app.get("/feature-products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    // GET USER FROM DB //
    app.get("/users/user/:email", async (req, res) => {
      const email = req.params.email;
      //   if (email !== req.decoded.email) {
      //     return res.status(403).send({ message: "Forbidden Access!" });
      //   }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      console.log(user);
      res.send(user);
    });

    app.get("/my-product/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await productsCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    });

    app.put("/user", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };
      //   console.log(query);
      //   const isExistUser = await usersCollection.findOne(query);
      //   if (isExistUser) {
      //     return res.send({ message: "user already exist!", insertedId: null });
      //   }

      const isExist = await usersCollection.findOne(query);
      if (isExist) {
        if (user.status === "verified") {
          // if existing user try to change his role
          const result = await usersCollection.updateOne(query, {
            $set: { status: user?.status },
          });
          return res.send(result);
        } else {
          // if existing user login again
          return res.send(isExist);
        }
      }
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...user,
          timestamp: Date.now(),
        },
      };

      const result = await usersCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });
    app.post("/product", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Tech Spotter is running!!!");
});
app.listen(port, () => {
  console.log(`Tech Spotter is running on Port ${port} `);
});
