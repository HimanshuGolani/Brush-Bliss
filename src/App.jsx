import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import CustomOrders from "./components/CustomOrders";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartProvider from "./components/CartProvider";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  return (
    <CartProvider>
      <SmoothScroll>
        <ScrollProgress />
        <Navbar onCartOpen={() => setCartOpen(true)} />
        <main>
          <Hero />
          <About />
          <Services />
          <CustomOrders />
          <Gallery />
          <Contact />
        </main>
        <Footer />

        <AnimatePresence>
          {cartOpen && (
            <Cart
              onClose={() => setCartOpen(false)}
              onCheckout={() => setCheckoutOpen(true)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {checkoutOpen && (
            <Checkout
              onClose={() => {
                setCheckoutOpen(false);
                setCartOpen(true);
              }}
              onComplete={(order) => {
                setCheckoutOpen(false);
                setCompletedOrder(order);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {completedOrder && (
            <OrderConfirmation
              order={completedOrder}
              onClose={() => setCompletedOrder(null)}
            />
          )}
        </AnimatePresence>
      </SmoothScroll>
    </CartProvider>
  );
}
