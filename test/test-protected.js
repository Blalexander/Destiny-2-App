"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");

const { app, runServer, closeServer } = require("../server");
const { User } = require("../users");
const { JWT_SECRET } = require("../config");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Protected endpoint", function() {
  const email = "exampleEmail";
  const password = "examplePass";

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function() {
    return User.hashPassword(password).then(password =>
      User.create({
        email,
        password
      })
    );
  });

  afterEach(function() {
    return User.remove({});
  });

  describe("/api/protected", function() {
    it("Should reject requests with no credentials", function() {
      return chai
        .request(app)
        .get("/app/protected")
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });

    it("Should reject requests with an invalid token", function() {
      const token = jwt.sign(
        {
          email,
          password
        },
        "wrongSecret",
        {
          algorithm: "HS256",
          expiresIn: "7d"
        }
      );

      return chai
        .request(app)
        .get("/api/protected")
        .set("Authorization", `Bearer ${token}`)
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should reject requests with an expired token", function() {
      const token = jwt.sign(
        {
          user: {
            email,
            password
          },
          exp: Math.floor(Date.now() / 1000) - 10
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          subject: email
        }
      );

      return chai
        .request(app)
        .get("/api/protected")
        .set("authorization", `Bearer ${token}`)
        .then(() => expect.fail(null, null, "Request should not succeed"))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it("Should send protected data", function() {
      const token = jwt.sign(
        {
          user: {
            email,
            password
          }
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          subject: email,
          expiresIn: "7d"
        }
      );

      return chai
        .request(app)
        .get("/api/protected")
        .set("authorization", `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.data).to.equal("Snoopy");
        });
    });
  });
});
