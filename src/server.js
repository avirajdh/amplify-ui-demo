import {createServer, hasMany, Model} from "miragejs";
import { REVIEW_DATA } from "./components/reviewsData";
import { CARD_DATA } from './components/sportsCardData';

export function MakeServer() {

    let server = createServer({
        models: {
            sportscard: Model,
            review: Model,
            cart: Model
        },

        routes() {
            this.namespace = '/api';
            this.passthrough('https://cognito-idp.us-west-2.amazonaws.com/');

            this.get("/sportscards", (schema) => {
                return schema.db.sportscards
            })
            
            this.get("/carts", (schema) => {
                return schema.db.carts
            })

            this.get("/reviews", (schema) => {
                return schema.db.reviews
            })

            this.post("/carts", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                return schema.db.carts.insert(attrs)
            })

            this.post("/reviews", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                let body = schema.db.reviews.insert(attrs)
                console.log("Body",schema.db.reviews);
                return body
            })
        },
    })
    server.db.loadData({
        sportscards: CARD_DATA,
        carts: [],
        reviews: REVIEW_DATA
    })
    //return server;
}

export default MakeServer;