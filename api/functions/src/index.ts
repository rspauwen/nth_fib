import * as functions from "firebase-functions";
import * as express from "express";
import {isNumber} from "lodash";

const app = express();

app.get("/", (req, res) => res.sendStatus(200).send("Hey there!"));


app.get("/fibonacci/:nthId", (req, res) => {
  /**
   * Retrieve the nth fibonacci number
   * @param {number} n the nth number
   * @return {number} the fibonacci number
  */
  function nthFib(n: number): number {
    if (n <= 2) return n - 1;
    return nthFib(n - 2) + nthFib(n - 1);
  }

  const number = parseInt(req.params.nthId);

  functions.logger.info(number);

  if (isNumber(number)) {
    if (number > 0 && number <= 42) {
      const fibNumber = nthFib(number);

      res.status(200).send(fibNumber);
    } else {
      res.sendStatus(403); // TODO
    }
  } else {
    res.sendStatus(400);
  }
});

exports.app = functions.https.onRequest(app);
