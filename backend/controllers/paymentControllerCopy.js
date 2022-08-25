//const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const paymentPost = async (req, res, next) => {
    // const storeItems = new Map([
    //     [1, { priceInCents: 10000, name: "Learn React Today" }],
    //     [2, { priceInCents: 20000, name: "Learn CSS Today" }],
    //   ])
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            // line_items: req.body.items.map(item => {
            //const storeItem = storeItems.get(item.id)
            line_items: [
                {
                    price_data: {
                        currency: "EUR",
                        product_data: {
                            name: "Biobites order"
                            //name: storeItem.name,
                        },
                        unit_amount: req.body.total,
                        //unit_amount: storeItem.priceInCents,
                    },
                    quantity: 1
                    //quantity: item.quantity,
                }
            ]
        }
        ) //success: ternery oporator cart page & setOrders & reset cart
            //success_url: `${process.env.CLIENT_URL}/success.html`, 
            //react router path "We are processing your order "
            //cancel_url: `${process.env.CLIENT_URL}/cancel.html`,

            res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
};

//previous payment controller before stripe
// import createError from "http-errors";
// import Payment from "../models/payment.js";
// export const paymentPost = async (req, res, next) => {
// };
