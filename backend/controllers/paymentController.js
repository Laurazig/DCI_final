import Stripe from "stripe"

// ==============================================
//stripe docs:
// ==============================================

// const stripe = require('stripe')('sk_test_51LaEKUFFbaSpzWqspGeOrP9YeK5DMhVFIjcQXRJRKqyqAyjnBV3aptWeAgT5yHjYt0aQaibgmb4ahIiT8Du1kQV200H5zP8Uga');

// const paymentIntent = await stripe.paymentIntents.create({
//   amount: 500,
//   currency: 'gbp',
//   payment_method: 'pm_card_visa',
// });
// ==============================================
//1. no stripe variable: {"error":"stripe is not defined"}"

//2. "error":"You did not provide an API key. :
//const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
//const stripe = new Stripe();

//3. key direct in variable : backend crashes: is not defined
//const stripe = new Stripe(sk_test_51LaEKUFFbaSpzWqspGeOrP9YeK5DMhVFIjcQXRJRKqyqAyjnBV3aptWeAgT5yHjYt0aQaibgmb4ahIiT8Du1kQV200H5zP8Uga);



export const paymentPost = async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            //const session = await stripe.paymentIntents.create({
            //   amount: 500,
            //   currency: 'gbp',
            //   payment_method: 'pm_card_visa',
            // });
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "EUR",
                        product_data: {
                            name: "Biobites order"
                        },
                        unit_amount: req.body.total,
                    },
                    quantity: 1
                }
            ]
        }
        )
        //react router path "We are processing your order "
        //cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
};