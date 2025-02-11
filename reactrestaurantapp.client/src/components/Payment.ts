////import { loadStripe } from '@stripe/stripe-js';
////import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

////const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

////const CheckoutForm = () => {
////    const stripe = useStripe();
////    const elements = useElements();

////    const handleSubmit = async (event: React.FormEvent) => {
////        event.preventDefault();

////        if (!stripe || !elements) {
////            return;
////        }

////        const cardElement = elements.getElement(CardElement);

////        const { error, paymentMethod } = await stripe.createPaymentMethod({
////            type: 'card',
////            card: cardElement!,
////        });

////        if (error) {
////            console.error(error);
////        } else {
////            console.log('Payment Method:', paymentMethod);
////            // Backend gönderim
////        }
////    };

////    return (
////        <form onSubmit= { handleSubmit } >
////        <CardElement />
////        < button type = "submit" disabled = {!stripe
////}>
////    Ödeme Yap
////        </button>
////        </form>
////  );
////};

////const App = () => (
////    <Elements stripe= { stripePromise } >
////    <CheckoutForm />
////    </Elements>
////);

////export default App;
