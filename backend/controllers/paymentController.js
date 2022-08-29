import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const paymentPost = async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
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