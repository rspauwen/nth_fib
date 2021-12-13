import * as cors from "cors";
import * as express from "express";
import * as functions from "firebase-functions";
import * as firebaseHelper from "firebase-functions-helper";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

const app = express();
const db = admin.firestore();
const firestoreHelper = firebaseHelper.firestoreHelper;

app.use(cors({origin: true}));

app.get("/fibonacci/:nthNum", async (req, res) => {
  /**
   * Retrieve the nth fibonacci number
   * @param {number} n the nth fib number
   * @return {number} the fibonacci number
  */
  function nthFib(n: number): number {
    if (n <= 2) return n - 1;
    return nthFib(n - 2) + nthFib(n - 1);
  }

  const number = parseInt(req.params.nthNum);
  const pw = req.query.pw; // TODO: proper auth.

  if (typeof number === "number" && pw == "vr") {
    if (number > 0 && number <= 42) {
      const fibNumber = nthFib(number);

      try {
        const fibData = {
          fibNumber: fibNumber,
          nthNumber: number,
          timestamp: new Date(),
        };

        const newFibDoc = await firestoreHelper
            .createNewDocument(db, "fibs", fibData);

        functions.logger.info(`Logged: ${newFibDoc.id}`);

        res.json(fibNumber);
      } catch (error) {
        functions.logger.error(`Error: ${error}`);
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(403); // $++
    }
  } else {
    res.sendStatus(400);
  }
});

app.get("/fibs", async (req, res) => {
  const pw = req.query.pw;
  if (pw == "vr") {
    const allFibs: FirebaseFirestore.DocumentData = [];
    const querySnapshot = await db.collection("fibs").get();
    querySnapshot.forEach((doc) => allFibs.push(doc.data()));
    res.status(200).json(allFibs);
  } else {
    res.sendStatus(403);
  }
});

exports.app = functions.https.onRequest(app);
