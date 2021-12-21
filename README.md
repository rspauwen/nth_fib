# nth_fib

This repo contains code for an app that allows users to obtain the n-th number in the Fibonacci
sequence. The code consists of a NodeJS API hosted in Firebase and an Angular app that connects to this API.

The API has two endpoints: (1) return the Fibonacci number that's on the n-th position in the sequence, where the number "n" is provided by the user, and (2) return a list of previously requested Fibonacci numbers including the time of the request.

The web app, built in Angular, consists of a home, request and overview screen. The overview screen connects directly with the Firestore database because of demonstration purpose. Though it's probably cleaner if the API endpoint was used for this.
