<template>
  <div id="form">
    <title>Factuur maken</title>
    <form @submit.prevent="sendRequest">
      <table>
        <tr>
          <td>
            <label for="invoice_number">Factuurnummer:</label>
          </td>
          <td>
            <input
              type="number"
              placeholder="Factuurnummer"
              name="invoice_number"
              v-model="invoice.invoice_number"
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="customer_name">Naam klant:</label>
          </td>
          <td>
            <input
              type="text"
              placeholder="Naam klant"
              name="customer_name"
              v-model="invoice.customer_name"
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="customer_address">Adres klant:</label>
          </td>
          <td>
            <input
              type="text"
              placeholder="Straat 123"
              name="customer_address1"
              v-model="invoice.customer_address1"
              required
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input
              type="text"
              placeholder="1111AA Alkmaar"
              name="customer_address2"
              v-model="invoice.customer_address2"
              required
            />
          </td>
        </tr>

        <tr>
          <td>
            <label for="payment_term">Betaal termijn in dagen:</label>
          </td>
          <td>
            <input
              type="number"
              placeholder="Betaaltermijn in dagen"
              value="7"
              name="payment_term"
              v-model="invoice.payment_term"
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <label for="products">Services:</label>
          </td>
          <td>
            <textarea
              placeholder="1;website;600\n"
              name="products"
              v-model="invoice.products"
              required
            ></textarea>
          </td>
        </tr>
        <tr>
          <td>
            <label for="note">Opmerkingen:</label>
          </td>
          <td>
            <input
              type="text"
              placeholder="Opmerkingen"
              v-model="invoice.note"
              name="note"
            />
          </td>
        </tr>
      </table>
      <input type="submit" value="Maak factuur aan" />
    </form>
    <div v-if="isLoading" class="loader loader--style1" title="0">
      <span style="vertical-align: 15px">Creating invoice...</span>
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 40 40"
        enable-background="new 0 0 40 40"
        xml:space="preserve"
      >
        <path
          opacity="0.2"
          fill="#000"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
        />
        <path
          fill="#000"
          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  </div>
</template>

<script>
import * as FileSaver from "file-saver";
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      invoice: {
        invoice_number: "",
        customer_name: "",
        customer_address1: "",
        customer_address2: "",
        payment_term: "",
        products: "",
        note: "",
      },
    };
  },
  methods: {
    sendRequest: function () {
      this.isLoading = true;
      let tempArray = this.invoice.products.split("\n");
      let products = [];
      for (let productLine of tempArray) {
        let productArray = productLine.split(";");
        let product = {
          aantal: productArray[0],
          dienst: productArray[1],
          prijs: productArray[2],
        };
        products.push(product);
      }
      let temp = this.invoice.products;
      this.invoice.products = products;
      let invoice = this.invoice;
      let json = JSON.stringify(invoice);
      this.invoice.products = temp;
      let filename = prompt('Bestandsnaam (laat leeg voor autogenerate)')
      axios
        .get("http://localhost:3000/test", {
          params: {
            json,
          },
        })
        .then(() => {
          setTimeout(() => {
            fetch("/makeinvoice", {
              headers: {
                "Content-Type": "application/json",
              },
              method: "get",
            })
              .then((res) => res.blob())
              .then((res) => {
                console.log(res);
                FileSaver.saveAs(
                  res,
                  filename ? filename : `Factuur-${this.invoice.invoice_number}-${this.invoice.customer_name}`
                );
                this.isLoading = false;
              });
          }, 5000);
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
* {
  font-family: Poppins;
}
input[type="submit"] {
  transition-duration: 0.3s;
  background-color: black;
  color: white;
  border: 2px solid gray;
  border-radius: 5px;
}
input[type="submit"]:hover {
  transition-duration: 0.3s;
  background-color: white;
  color: black;
  cursor: pointer;
}
.loader {
  margin: 0 0 2em;
  height: 80px;
  width: 30%;
  text-align: left;
  padding: 1em;
  margin: 0 auto 1em;
  display: inline-block;
  vertical-align: top;
}
svg path,
svg rect {
  fill: #0e77a4;
}
</style>

