import Subscriber from '../models/Subscriber.js';

export const createSubscription = async (req, res) => {
    try {
        const subscriber = new Subscriber({
            email: req.body.email
        });
        await subscriber.save();
        res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Subscription failed' });
    }
};
