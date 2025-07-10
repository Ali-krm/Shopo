import { motion } from "framer-motion";
import { ChangeTitle } from "../../utils/GenralFunctions";
import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import styles from "./faq.module.scss";
import InfoSlideDown from "./InfoSlideDown";

const FAQ = () => {
  ChangeTitle("FAQ");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* <NavBar /> */}
      <div className={styles.faqContainer}>
        <div className={styles.section}>
          <h3>ORDERS</h3>
          <InfoSlideDown titel={"How can I cancel or change my order?"}>
            <p>
              Send an email to service@dick-moby.com with your order nummer and
              we will handle your request.{" "}
            </p>
          </InfoSlideDown>
          <InfoSlideDown titel={"Can I track my shipment?"}>
            <p>
              If you want to track your order, you can send an email to
              service@dick-moby.com and we will send you your tracking code.
            </p>
          </InfoSlideDown>
          <InfoSlideDown
            titel={
              "The colour that I want is not available anymore. What can I do?"
            }
          >
            <p>
              Send an email at service@dick-moby.com and we will update you as
              soon as the items are back in stock.{" "}
            </p>
          </InfoSlideDown>
        </div>
        <div className={styles.section}>
          <h3>Payment</h3>
          <InfoSlideDown titel={"What types of payment do you accept?"}>
            <p>
              We accept the following payment types: Ideal, Pay Pal, Visa,
              MasterCard, American Express, Discover, JCB and Diners Club. All
              payments on www.dick-moby.com are via a secure SSL encrypted
              server from shopify.com.
            </p>
          </InfoSlideDown>
          <InfoSlideDown
            titel={"What do I need to know when I pay with creditcard?"}
          >
            <p>
              The shipping address must be identical to the creditcard owners
              address. We don't accept shipping address changes when paying with
              creditcard.
            </p>
          </InfoSlideDown>
          <InfoSlideDown
            titel={"What do I need to know when I pay with PayPal?"}
          >
            <p>
              The shipping address must be identical to the address in the
              Paypal account. This is a security requirement from Paypal. If the
              addresses don’t match the order will not be sent.{" "}
            </p>
          </InfoSlideDown>
        </div>
        <div className={styles.section}>
          <h3>Shipping</h3>
          <InfoSlideDown titel={"Which countries do you ship to?"}>
            <p>
              Austria, Belgium, Denmark, France, Germany, Ireland, Italy,
              Luxembourg, Monaco, Netherlands, Portugal, Spain, United Kingdom,
              Andorra, Bulgaria, Croatia, Cyprus, Czech Republic, Estonia,
              Finland, Gibraltar, Greece, Hungary, Israel, Latvia, Lithuania,
              Malta, Norway, Poland, Romania, Slovakia, Slovenia, Sweden,
              Switzerland, Turkey, Ukraine, Australia, Brazil, Canada, Hong
              Kong, Iceland, Indonesia, India, Japan, Malaysia, New Zealand,
              Singapore, Thailand, United States. Is your country not on the
              list? Send an email to dick@dick-moby.com and we will figure
              something out :)
            </p>
          </InfoSlideDown>
          <InfoSlideDown titel={"How long does shipping take?"}>
            <p>
              Europe: 1-6 working days. Rest of the world may take up to 4-8
              working days depending on customs.
            </p>
          </InfoSlideDown>
          <InfoSlideDown titel={"Do I pay shipping costs?"}>
            <p>
              Free shipping worldwide on all orders over $100. All unworn items
              may be returned risk-free within 60 days of delivery.
            </p>
          </InfoSlideDown>
          <InfoSlideDown titel={"I did not receive my package, what can i do?"}>
            <p>
              In case the carrier does not succeed in delivering the item to you
              because you weren't at home, please try reaching the carrier via
              email and/or telephone. If this is not solving the problem please
              contact us at service@dick-moby.com and we’ll help you.
            </p>
          </InfoSlideDown>
        </div>
        <div className={styles.section}>
          <h3>Returns and Exchanges</h3>
          <InfoSlideDown titel={"What is your return policy?"}>
            <p>
              If 30 days have gone by since your purchase, unfortunately we
              can’t offer you a refund or exchange. To be eligible for a return,
              your item must be unused and in the same condition that you
              received it. It must also be in the original packaging.
            </p>
          </InfoSlideDown>
          <InfoSlideDown
            titel={"What do I need to do when I want to return my item?"}
          >
            <p>
              To return your product, first send an email to
              service@dick-moby.com with your order number and request. After
              confirmation from us, you can send your product to the address
              provided. Make sure to add the paperwork that was shipped along
              with the order for our reference. If you're returning from a
              country outside the EU, please state clearly on the parcel that
              the shipment is a RETURN ORDER. If you fail to do so there will be
              import duty or taxes that we will balance with your order. You
              will be responsible for the shipping costs for returning your
              item. The initial shipping costs will be refunded.
            </p>
          </InfoSlideDown>
          <InfoSlideDown
            titel={"Do I need to use a trackable shipping service?"}
          >
            <p>
              You should consider using a trackable shipping service or
              purchasing shipping insurance. We can’t guarantee that we will
              receive your returned item. Items lost in transportation will not
              be refunded.
            </p>
          </InfoSlideDown>
          <InfoSlideDown
            titel={"What do i need to do when I want to exchange my item?"}
          >
            <p>
              If your glasses are defective or damaged and within 14 days of
              receipt we can exchange them for the same glasses, if available.
              First send us an email at service@dick-moby.com and after
              confirmation from us you can send the glasses to the address
              provided. We will refund you the extra shipping costs just send us
              your proof of payment.
            </p>
          </InfoSlideDown>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default FAQ;
